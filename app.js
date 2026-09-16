/* ═══════════════════════════════════════════════════════════
   CP Sensei — Main Application
   Wires together all modules: Chat, Editor, Visualizer,
   Python Runner, Settings, Student State
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── DOM References ──────────────────────────────────────
  const $ = (id) => document.getElementById(id);

  const els = {
    chatArea: $('chatArea'),
    chatInput: $('chatInput'),
    sendBtn: $('sendBtn'),
    welcomeScreen: $('welcomeScreen'),
    welcomeTopics: $('welcomeTopics'),
    quickActions: $('quickActions'),
    topicSelect: $('topicSelect'),
    settingsBtn: $('settingsBtn'),
    settingsModal: $('settingsModal'),
    settingsClose: $('settingsClose'),
    saveSettingsBtn: $('saveSettingsBtn'),
    testConnectionBtn: $('testConnectionBtn'),
    testResult: $('testResult'),
    presetButtons: $('presetButtons'),
    apiEndpoint: $('apiEndpoint'),
    apiModel: $('apiModel'),
    apiKey: $('apiKey'),
    apiTemp: $('apiTemp'),
    apiTempValue: $('apiTempValue'),
    connectionDot: $('connectionDot'),
    progressBtn: $('progressBtn'),
    progressPanel: $('progressPanel'),
    resetBtn: $('resetBtn'),
    runBtn: $('runBtn'),
    pyodideLoading: $('pyodideLoading'),
    stdinInput: $('stdinInput'),
    outputContent: $('outputContent'),
    copyCodeBtn: $('copyCodeBtn'),
    clearCodeBtn: $('clearCodeBtn'),
    clearInputBtn: $('clearInputBtn'),
    clearOutputBtn: $('clearOutputBtn'),
    timerDisplay: $('timerDisplay'),
    timerValue: $('timerValue'),
    skillBars: $('skillBars'),
    xpValue: $('xpValue'),
    streakValue: $('streakValue'),
    statProblems: $('statProblems'),
    statXP: $('statXP'),
    statTopics: $('statTopics'),
    skillList: $('skillList'),
    panelDivider: $('panelDivider'),
    leftPanel: $('leftPanel'),
    rightPanel: $('rightPanel'),
    mainContainer: $('mainContainer'),
  };

  // ── State ───────────────────────────────────────────────
  let timerInterval = null;
  let timerSeconds = 0;
  let chatStarted = false;

  // ── Initialize ──────────────────────────────────────────
  function init() {
    Editor.init('editorContainer');
    loadSettingsUI();
    updateProgressUI();
    updateFooterSkills();
    setupEventListeners();
    setupPanelResize();
    StudentState.markActive();

    // Check if there's existing conversation history
    const history = ChatEngine.getHistory();
    if (history.length > 0) {
      showChat();
      // Re-render history
      history.forEach(msg => {
        if (msg.role === 'user') renderUserMessage(msg.content);
        if (msg.role === 'assistant') renderAIMessage(msg.content);
      });
    }
  }

  // ── Event Listeners ─────────────────────────────────────
  function setupEventListeners() {
    // Chat input
    els.chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    els.chatInput.addEventListener('input', () => {
      // Auto-resize textarea
      els.chatInput.style.height = 'auto';
      els.chatInput.style.height = Math.min(els.chatInput.scrollHeight, 120) + 'px';
    });

    els.sendBtn.addEventListener('click', handleSend);

    // Welcome topic buttons
    els.welcomeTopics.addEventListener('click', (e) => {
      const btn = e.target.closest('.welcome-topic');
      if (btn) {
        const topic = btn.dataset.topic;
        els.chatInput.value = topic;
        handleSend();
      }
    });

    // Quick action buttons
    els.quickActions.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-action-btn');
      if (btn) {
        els.chatInput.value = btn.dataset.action;
        handleSend();
      }
    });

    // Topic selector
    els.topicSelect.addEventListener('change', (e) => {
      const topic = e.target.value;
      if (topic) {
        const topicLabels = {
          'arrays': 'arrays and hashing',
          'two-pointers': 'two pointer technique',
          'sliding-window': 'sliding window pattern',
          'binary-search': 'binary search',
          'stacks': 'stacks and queues (including monotonic stack)',
          'trees': 'trees, BFS, and DFS',
          'graphs': 'graph algorithms',
          'dp': 'dynamic programming',
          'greedy': 'greedy algorithms',
          'math': 'math and number theory for CP',
          'strings': 'string algorithms',
          'segment-tree': 'segment trees and binary indexed trees',
        };
        els.chatInput.value = `Teach me about ${topicLabels[topic] || topic}`;
        handleSend();
        StudentState.exploreTopic(topic);
        e.target.value = '';
      }
    });

    // Settings
    els.settingsBtn.addEventListener('click', () => {
      els.settingsModal.classList.add('visible');
      loadSettingsUI();
    });

    els.settingsClose.addEventListener('click', () => {
      els.settingsModal.classList.remove('visible');
    });

    els.settingsModal.addEventListener('click', (e) => {
      if (e.target === els.settingsModal) {
        els.settingsModal.classList.remove('visible');
      }
    });

    els.saveSettingsBtn.addEventListener('click', saveSettings);
    els.testConnectionBtn.addEventListener('click', testConnection);

    // Preset buttons
    els.presetButtons.addEventListener('click', (e) => {
      const btn = e.target.closest('.preset-btn');
      if (btn) {
        const preset = btn.dataset.preset;
        const settings = Settings.applyPreset(preset);
        els.apiEndpoint.value = settings.endpoint;
        els.apiModel.value = settings.model;
        // Highlight active preset
        els.presetButtons.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });

    // Temperature slider
    els.apiTemp.addEventListener('input', () => {
      els.apiTempValue.textContent = els.apiTemp.value;
    });

    // Progress panel
    els.progressBtn.addEventListener('click', () => {
      els.progressPanel.classList.toggle('visible');
      updateProgressUI();
    });

    // Reset chat
    els.resetBtn.addEventListener('click', () => {
      if (confirm('Start a new conversation? Your progress will be kept.')) {
        ChatEngine.clearHistory();
        els.chatArea.innerHTML = '';
        chatStarted = false;
        showWelcome();
      }
    });

    // Run code
    els.runBtn.addEventListener('click', handleRunCode);

    // Editor actions
    els.copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(Editor.getCode()).then(() => {
        els.copyCodeBtn.textContent = '✅';
        setTimeout(() => els.copyCodeBtn.textContent = '📋', 1500);
      });
    });

    els.clearCodeBtn.addEventListener('click', () => {
      if (confirm('Clear the editor?')) Editor.clearCode();
    });

    els.clearInputBtn.addEventListener('click', () => {
      els.stdinInput.value = '';
    });

    els.clearOutputBtn.addEventListener('click', () => {
      els.outputContent.textContent = 'Click "Run" to execute your code...';
      els.outputContent.className = 'output-content';
    });

    // XP and progress events
    document.addEventListener('cpsensei:xp', (e) => {
      updateFooterXP();
      showXPToast(e.detail.amount, e.detail.reason);
    });

    document.addEventListener('cpsensei:progress', () => {
      updateProgressUI();
      updateFooterSkills();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape closes modals
      if (e.key === 'Escape') {
        els.settingsModal.classList.remove('visible');
        els.progressPanel.classList.remove('visible');
      }
    });
  }

  // ── Chat Functions ──────────────────────────────────────
  function showChat() {
    if (els.welcomeScreen) {
      els.welcomeScreen.style.display = 'none';
    }
    chatStarted = true;
  }

  function showWelcome() {
    // Re-create welcome screen
    const welcome = document.createElement('div');
    welcome.className = 'welcome-screen';
    welcome.id = 'welcomeScreen';
    welcome.innerHTML = `
      <div class="welcome-icon">⚡</div>
      <h1>Welcome to CP Sensei</h1>
      <p>Your AI-powered competitive programming tutor. I'll build your intuition step by step — not just dump code. Pick a topic or ask me anything.</p>
      <div class="welcome-topics" id="welcomeTopics">
        <button class="welcome-topic" data-topic="I'm new to CP. Where should I start?">🌱 I'm a beginner</button>
        <button class="welcome-topic" data-topic="Teach me the sliding window pattern">🪟 Sliding Window</button>
        <button class="welcome-topic" data-topic="I want to learn dynamic programming from scratch">🧩 Dynamic Programming</button>
        <button class="welcome-topic" data-topic="Help me understand binary search and when to use it">🔍 Binary Search</button>
        <button class="welcome-topic" data-topic="Teach me graph algorithms - BFS and DFS">🕸️ Graphs</button>
        <button class="welcome-topic" data-topic="I want to practice two pointer problems">👆 Two Pointers</button>
        <button class="welcome-topic" data-topic="Explain monotonic stack with examples">📚 Monotonic Stack</button>
        <button class="welcome-topic" data-topic="Help me solve this problem: given an array, find the maximum subarray sum">💡 Solve a Problem</button>
      </div>
    `;
    els.chatArea.appendChild(welcome);

    // Re-bind click handler
    welcome.querySelector('.welcome-topics').addEventListener('click', (e) => {
      const btn = e.target.closest('.welcome-topic');
      if (btn) {
        els.chatInput.value = btn.dataset.topic;
        handleSend();
      }
    });
  }

  function handleSend() {
    const message = els.chatInput.value.trim();
    if (!message || ChatEngine.isCurrentlyStreaming()) return;

    if (!chatStarted) showChat();

    renderUserMessage(message);
    els.chatInput.value = '';
    els.chatInput.style.height = 'auto';

    // Show typing indicator
    const typingEl = showTypingIndicator();

    // Send to AI
    let aiMessageEl = null;
    ChatEngine.sendMessage(
      message,
      // onToken
      (token, fullText) => {
        if (typingEl && typingEl.parentElement) typingEl.remove();
        if (!aiMessageEl) {
          aiMessageEl = createAIMessageElement();
        }
        updateAIMessageContent(aiMessageEl, fullText);
        scrollToBottom();
      },
      // onComplete
      (fullText) => {
        if (typingEl && typingEl.parentElement) typingEl.remove();
        if (!aiMessageEl && fullText) {
          aiMessageEl = createAIMessageElement();
        }
        if (aiMessageEl) {
          updateAIMessageContent(aiMessageEl, fullText);
          processVizBlocks(aiMessageEl);
          processCodeBlocks(aiMessageEl);
        }
        els.sendBtn.disabled = false;
        scrollToBottom();
        StudentState.incrementConversations();
      },
      // onError
      (error) => {
        if (typingEl && typingEl.parentElement) typingEl.remove();
        renderErrorMessage(error);
        els.sendBtn.disabled = false;
        scrollToBottom();
      }
    );

    els.sendBtn.disabled = true;
  }

  function renderUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.innerHTML = `
      <div class="message-avatar user">👤</div>
      <div class="message-content user">${escapeHtml(text)}</div>
    `;
    els.chatArea.appendChild(msg);
    scrollToBottom();
  }

  function createAIMessageElement() {
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.innerHTML = `
      <div class="message-avatar ai">⚡</div>
      <div class="message-content ai"></div>
    `;
    els.chatArea.appendChild(msg);
    return msg.querySelector('.message-content.ai');
  }

  function renderAIMessage(text) {
    const contentEl = createAIMessageElement();
    updateAIMessageContent(contentEl, text);
    processVizBlocks(contentEl);
    processCodeBlocks(contentEl);
  }

  function updateAIMessageContent(contentEl, text) {
    // Extract VIZ blocks before rendering markdown
    const vizRegex = /\[VIZ:(\w+)\s+([\s\S]*?)\]/g;
    let processedText = text;

    // Replace VIZ blocks with placeholders
    const vizBlocks = [];
    processedText = processedText.replace(vizRegex, (match, type, config) => {
      const id = `viz-${vizBlocks.length}`;
      vizBlocks.push({ id, type, configStr: config });
      return `<div id="${id}" class="viz-placeholder" data-viz-type="${type}" data-viz-config='${config.replace(/'/g, '&apos;')}'></div>`;
    });

    // Render markdown
    try {
      contentEl.innerHTML = marked.parse(processedText, {
        breaks: true,
        gfm: true,
      });
    } catch (e) {
      contentEl.innerHTML = processedText.replace(/\n/g, '<br>');
    }

    // Render KaTeX math
    try {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(contentEl, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          throwOnError: false,
        });
      }
    } catch (e) {
      // KaTeX not loaded yet, skip
    }
  }

  function processVizBlocks(contentEl) {
    const placeholders = contentEl.querySelectorAll('.viz-placeholder');
    placeholders.forEach(ph => {
      try {
        const type = ph.dataset.vizType;
        const configStr = ph.dataset.vizConfig;
        const config = JSON.parse(configStr);
        ph.innerHTML = '';
        Visualizer.render(ph, { type, config });
      } catch (e) {
        console.warn('Failed to render viz:', e);
        ph.innerHTML = `<div style="padding: 12px; color: var(--text-muted); font-size: 12px;">⚠️ Visualization failed to render</div>`;
      }
    });
  }

  function processCodeBlocks(contentEl) {
    // Add "Copy to Editor" buttons on Python code blocks
    const codeBlocks = contentEl.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      if (pre.querySelector('.code-action-bar')) return; // Already processed

      const bar = document.createElement('div');
      bar.className = 'code-action-bar';
      bar.style.cssText = 'display:flex; gap:4px; padding:4px 8px; background:var(--bg-surface); border-top:1px solid var(--border-subtle); border-radius:0 0 6px 6px;';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'viz-btn';
      copyBtn.textContent = '📋 Copy';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(block.textContent);
        copyBtn.textContent = '✅ Copied';
        setTimeout(() => copyBtn.textContent = '📋 Copy', 1500);
      };

      const editorBtn = document.createElement('button');
      editorBtn.className = 'viz-btn';
      editorBtn.textContent = '💻 Open in Editor';
      editorBtn.onclick = () => {
        Editor.setCode(block.textContent);
        editorBtn.textContent = '✅ Done';
        setTimeout(() => editorBtn.textContent = '💻 Open in Editor', 1500);
      };

      bar.append(copyBtn, editorBtn);
      pre.after(bar);
    });
  }

  function renderErrorMessage(error) {
    const msg = document.createElement('div');
    msg.className = 'message';
    const cfg = Settings.get();
    msg.innerHTML = `
      <div class="message-avatar ai" style="background: linear-gradient(135deg, #ef4444, #f97316);">⚠️</div>
      <div class="message-content ai" style="border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.05);">
        <p><strong>Connection Error</strong></p>
        <p>${escapeHtml(error)}</p>
        <p style="color: var(--text-muted); font-size: 12px; margin-top: 8px;">
          Current Provider: <strong>${escapeHtml(cfg.preset || 'custom')}</strong> (${escapeHtml(cfg.endpoint || 'no endpoint')})<br>
          💡 Click <button class="btn btn-secondary btn-sm" id="errorOpenSettingsBtn" style="padding: 2px 8px; font-size: 11px; margin-left: 4px;">⚙️ Open Settings</button> to check your model and key.
        </p>
      </div>
    `;
    const openBtn = msg.querySelector('#errorOpenSettingsBtn');
    if (openBtn) {
      openBtn.addEventListener('click', openSettingsModal);
    }
    els.chatArea.appendChild(msg);
  }

  function showTypingIndicator() {
    const msg = document.createElement('div');
    msg.className = 'message typing-message';
    msg.innerHTML = `
      <div class="message-avatar ai">⚡</div>
      <div class="message-content ai">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    els.chatArea.appendChild(msg);
    scrollToBottom();
    return msg;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      els.chatArea.scrollTop = els.chatArea.scrollHeight;
    });
  }

  // ── Code Execution ──────────────────────────────────────
  async function handleRunCode() {
    const code = Editor.getCode();
    if (!code.trim()) return;

    const stdin = els.stdinInput.value;

    // Update UI
    els.runBtn.classList.add('running');
    els.runBtn.innerHTML = '<span>⏳</span><span>Running...</span>';
    els.outputContent.textContent = 'Executing...';
    els.outputContent.className = 'output-content';

    // Show loading on first run
    if (!PythonRunner.isLoaded()) {
      els.pyodideLoading.style.display = 'flex';
    }

    try {
      const result = await PythonRunner.run(code, stdin);
      els.pyodideLoading.style.display = 'none';

      if (result.success) {
        els.outputContent.textContent = result.stdout || '(no output)';
        els.outputContent.className = 'output-content success';
        if (result.stderr) {
          els.outputContent.textContent += '\n\n⚠️ Warnings:\n' + result.stderr;
        }
      } else {
        els.outputContent.textContent = result.stderr || result.error || 'Unknown error';
        els.outputContent.className = 'output-content error';
        if (result.stdout) {
          els.outputContent.textContent = 'Output before error:\n' + result.stdout + '\n\n❌ Error:\n' + (result.stderr || result.error);
        }
      }

      // Show execution time
      const timeStr = result.time < 1000
        ? `${Math.round(result.time)}ms`
        : `${(result.time / 1000).toFixed(2)}s`;
      els.outputContent.textContent += `\n\n⏱️ Execution time: ${timeStr}`;

    } catch (e) {
      els.pyodideLoading.style.display = 'none';
      els.outputContent.textContent = `❌ Failed to run: ${e.message}\n\n💡 Python runs in your browser via Pyodide (WebAssembly). This may take a moment to load on first run.`;
      els.outputContent.className = 'output-content error';
    }

    els.runBtn.classList.remove('running');
    els.runBtn.innerHTML = '<span>▶</span><span>Run</span>';
  }

  // ── Settings UI ─────────────────────────────────────────
  function loadSettingsUI() {
    const settings = Settings.get();
    els.apiEndpoint.value = settings.endpoint || '';
    els.apiModel.value = settings.model || '';
    els.apiKey.value = settings.apiKey || '';
    els.apiTemp.value = settings.temperature || 0.7;
    els.apiTempValue.textContent = settings.temperature || 0.7;

    // Highlight active preset
    els.presetButtons.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === settings.preset);
    });
  }

  function saveSettings() {
    Settings.save({
      endpoint: els.apiEndpoint.value.trim(),
      model: els.apiModel.value.trim(),
      apiKey: els.apiKey.value.trim(),
      temperature: parseFloat(els.apiTemp.value),
    });
    els.settingsModal.classList.remove('visible');
    updateConnectionDot('unknown');
  }

  async function testConnection() {
    els.testConnectionBtn.textContent = '🔌 Testing...';
    els.testConnectionBtn.disabled = true;

    // Save current form values first
    Settings.save({
      endpoint: els.apiEndpoint.value.trim(),
      model: els.apiModel.value.trim(),
      apiKey: els.apiKey.value.trim(),
      temperature: parseFloat(els.apiTemp.value),
    });

    const result = await Settings.testConnection();

    els.testConnectionBtn.textContent = '🔌 Test Connection';
    els.testConnectionBtn.disabled = false;

    if (result.success) {
      els.testResult.textContent = `✅ Connected! Model replied: "${result.reply}"`;
      els.testResult.className = 'test-connection-result success';
      updateConnectionDot('connected');
    } else {
      els.testResult.textContent = `❌ ${result.error}`;
      els.testResult.className = 'test-connection-result error';
      updateConnectionDot('disconnected');
    }
  }

  function updateConnectionDot(status) {
    els.connectionDot.className = 'connection-dot';
    if (status === 'connected') {
      els.connectionDot.classList.add('connected');
      els.connectionDot.title = 'AI Connected';
    } else if (status === 'disconnected') {
      els.connectionDot.classList.add('disconnected');
      els.connectionDot.title = 'AI Not Connected';
    } else {
      els.connectionDot.title = 'Connection status unknown';
    }
  }

  // ── Progress UI ─────────────────────────────────────────
  function updateProgressUI() {
    const summary = StudentState.getSummary();

    els.statProblems.textContent = summary.problemsSolved;
    els.statXP.textContent = summary.totalXP;
    els.statTopics.textContent = summary.topicsExplored;

    // Skill list
    const patterns = Problems.getPatterns();
    els.skillList.innerHTML = patterns.map(p => {
      const level = summary.skillLevels[p] || 0;
      const color = StudentState.getSkillColor(p);
      const label = StudentState.getSkillLabel(p);
      return `
        <div class="skill-item">
          <span class="skill-name">${label}</span>
          <div class="skill-track">
            <div class="skill-progress" style="width: ${level}%; background: ${color};"></div>
          </div>
          <span class="skill-pct">${level}%</span>
        </div>
      `;
    }).join('');
  }

  function updateFooterSkills() {
    const summary = StudentState.getSummary();
    const topSkills = Problems.getPatterns().slice(0, 6);

    els.skillBars.innerHTML = topSkills.map(p => {
      const level = summary.skillLevels[p] || 0;
      const color = StudentState.getSkillColor(p);
      const label = StudentState.getSkillLabel(p);
      return `
        <div class="skill-pill">
          <span>${label}</span>
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${level}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join('');

    updateFooterXP();
  }

  function updateFooterXP() {
    const summary = StudentState.getSummary();
    els.xpValue.textContent = `${summary.totalXP} XP`;
    els.streakValue.textContent = `${StudentState.get().streak} day streak`;
  }

  function showXPToast(amount, reason) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 60px; right: 24px; z-index: 9999;
      padding: 10px 18px; border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #f97316);
      color: white; font-weight: 700; font-size: 14px;
      box-shadow: 0 4px 20px rgba(245,158,11,0.3);
      animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1);
      font-family: var(--font-sans);
    `;
    toast.textContent = `+${amount} XP — ${reason}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ── Panel Resize ────────────────────────────────────────
  function setupPanelResize() {
    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    els.panelDivider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = els.leftPanel.offsetWidth;
      els.panelDivider.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const newWidth = Math.max(300, Math.min(startWidth + dx, window.innerWidth - 350));
      els.leftPanel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        els.panelDivider.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  // ── Timer ───────────────────────────────────────────────
  function startTimer() {
    timerSeconds = 0;
    updateTimerDisplay();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    return timerSeconds;
  }

  function updateTimerDisplay() {
    const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const s = (timerSeconds % 60).toString().padStart(2, '0');
    els.timerValue.textContent = `${m}:${s}`;
  }

  // ── Utilities ───────────────────────────────────────────
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ── Add toast animation ─────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  // ── Boot ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

})();
