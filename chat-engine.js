/* ═══════════════════════════════════════════════════════════
   CP Sensei — Chat Engine
   Streaming AI conversation with platform-agnostic backend
   ═══════════════════════════════════════════════════════════ */

const ChatEngine = (() => {
  let conversationHistory = [];
  let isStreaming = false;
  let abortController = null;
  const HISTORY_KEY = 'cpsensei_history';
  const MAX_HISTORY = 50; // Keep last N messages to fit context window

  function loadHistory() {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) conversationHistory = JSON.parse(saved);
    } catch (e) {
      conversationHistory = [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(conversationHistory.slice(-MAX_HISTORY)));
    } catch (e) {
      console.warn('ChatEngine: save history failed', e);
    }
  }

  function clearHistory() {
    conversationHistory = [];
    saveHistory();
  }

  function getHistory() {
    return [...conversationHistory];
  }

  function addMessage(role, content) {
    conversationHistory.push({ role, content });
    if (conversationHistory.length > MAX_HISTORY) {
      // Keep system message + trim oldest
      conversationHistory = conversationHistory.slice(-MAX_HISTORY);
    }
    saveHistory();
  }

  function buildMessages(userMessage) {
    const studentContext = StudentState.getForAI();
    const systemPrompt = SystemPrompt.build(studentContext);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-MAX_HISTORY),
      { role: 'user', content: userMessage },
    ];

    return messages;
  }

  async function sendMessage(userMessage, onToken, onComplete, onError) {
    if (isStreaming) {
      if (abortController) abortController.abort();
    }

    const settings = Settings.get();
    if (!settings.endpoint) {
      onError('No AI endpoint configured. Click ⚙️ Settings to set one up.');
      return;
    }

    isStreaming = true;
    abortController = new AbortController();

    // Add user message to history
    addMessage('user', userMessage);

    const messages = buildMessages(userMessage);
    // Remove the duplicate user message we just added (it's already in history)
    messages.pop();

    const url = `${settings.endpoint.replace(/\/+$/, '')}/chat/completions`;
    const headers = { 'Content-Type': 'application/json' };
    if (settings.apiKey) headers['Authorization'] = `Bearer ${settings.apiKey}`;

    const body = {
      model: settings.model,
      messages,
      temperature: settings.temperature || 0.7,
      max_tokens: settings.maxTokens || 4096,
      stream: true,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`API Error (${response.status}): ${errorText.slice(0, 300)}`);
      }

      // Stream SSE response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const json = JSON.parse(trimmed.slice(6));
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              fullResponse += delta;
              onToken(delta, fullResponse);
            }
          } catch (e) {
            // Skip malformed SSE chunks
          }
        }
      }

      // Add assistant response to history
      addMessage('assistant', fullResponse);
      isStreaming = false;
      onComplete(fullResponse);

    } catch (e) {
      isStreaming = false;
      if (e.name === 'AbortError') {
        onComplete(fullResponse || '(cancelled)');
        return;
      }

      // Try non-streaming fallback
      try {
        const fallbackResponse = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({ ...body, stream: false }),
        });

        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          const content = data.choices?.[0]?.message?.content || '';
          addMessage('assistant', content);
          onToken(content, content);
          onComplete(content);
          return;
        }
      } catch (_) {}

      // Remove the failed user message from history
      conversationHistory.pop();
      saveHistory();
      onError(e.message || 'Failed to connect to AI. Check your settings.');
    }
  }

  function stopStreaming() {
    if (abortController) {
      abortController.abort();
      isStreaming = false;
    }
  }

  function isCurrentlyStreaming() {
    return isStreaming;
  }

  // Initialize
  loadHistory();

  return {
    sendMessage, stopStreaming, isCurrentlyStreaming,
    clearHistory, getHistory, addMessage, loadHistory,
  };
})();
