/* ═══════════════════════════════════════════════════════════
   CP Sensei — Settings Manager
   Platform-agnostic AI configuration
   ═══════════════════════════════════════════════════════════ */

const Settings = (() => {
  const STORAGE_KEY = 'cpsensei_settings';

  const PRESETS = {
    ollama: {
      name: 'Ollama',
      endpoint: 'http://localhost:11434/v1',
      model: 'llama3.1',
      apiKey: '',
      temperature: 0.7,
    },
    openai: {
      name: 'OpenAI',
      endpoint: 'https://api.openai.com/v1',
      model: 'gpt-4o-mini',
      apiKey: '',
      temperature: 0.7,
    },
    gemini: {
      name: 'Gemini',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai',
      model: 'gemini-2.0-flash',
      apiKey: '',
      temperature: 0.7,
    },
    openrouter: {
      name: 'OpenRouter',
      endpoint: 'https://openrouter.ai/api/v1',
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      apiKey: '',
      temperature: 0.7,
    },
    custom: {
      name: 'Custom',
      endpoint: '',
      model: '',
      apiKey: '',
      temperature: 0.7,
    },
  };

  const defaults = {
    preset: 'ollama',
    endpoint: PRESETS.ollama.endpoint,
    model: PRESETS.ollama.model,
    apiKey: '',
    temperature: 0.7,
    maxTokens: 4096,
  };

  let current = { ...defaults };

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        current = { ...defaults, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Settings: failed to load', e);
    }
    return current;
  }

  function save(settings) {
    current = { ...current, ...settings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('Settings: failed to save', e);
    }
    return current;
  }

  function get() {
    return { ...current };
  }

  function applyPreset(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) return current;
    current.preset = presetName;
    current.endpoint = preset.endpoint;
    current.model = preset.model;
    if (presetName !== 'custom') {
      // Don't overwrite apiKey when switching presets
    }
    current.temperature = preset.temperature;
    return current;
  }

  async function testConnection() {
    const { endpoint, model, apiKey } = current;
    if (!endpoint) {
      return { success: false, error: 'No endpoint configured' };
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

      const url = `${endpoint.replace(/\/+$/, '')}/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Say "connected" in one word.' }],
          max_tokens: 10,
          temperature: 0,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        return { success: false, error: `HTTP ${res.status}: ${errorText.slice(0, 200)}` };
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '';
      return { success: true, reply: reply.trim() };
    } catch (e) {
      return { success: false, error: e.message || 'Connection failed' };
    }
  }

  function getPresets() {
    return { ...PRESETS };
  }

  // Initialize
  load();

  return { load, save, get, applyPreset, testConnection, getPresets };
})();
