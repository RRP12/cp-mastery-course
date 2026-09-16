/* ═══════════════════════════════════════════════════════════
   CP Sensei — Settings Manager
   Platform-agnostic AI configuration
   ═══════════════════════════════════════════════════════════ */

const Settings = (() => {
  const STORAGE_KEY = 'cpsensei_settings';

  const PRESETS = {
    unsloth: {
      name: 'Unsloth',
      endpoint: 'http://localhost:8888/v1',
      model: 'unsloth/LFM2.5-1.2B-Thinking-GGUF',
      apiKey: 'sk-unsloth-0dcbffd787cb1cd4e7a5ba2c2757980a',
      temperature: 0.7,
    },
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
    preset: 'unsloth',
    endpoint: PRESETS.unsloth.endpoint,
    model: PRESETS.unsloth.model,
    apiKey: PRESETS.unsloth.apiKey,
    temperature: 0.7,
    maxTokens: 4096,
  };

  let current = { ...defaults };

  function load() {
    try {
      const savedStr = localStorage.getItem(STORAGE_KEY);
      if (savedStr) {
        const saved = JSON.parse(savedStr);
        // Auto-upgrade from outdated or empty ollama/unsloth configs
        if (saved.preset === 'ollama' && !saved.apiKey) {
          current = { ...defaults };
          save(current);
        } else if (saved.preset === 'unsloth' && (saved.model === 'default' || !saved.apiKey || !saved.model)) {
          current = { ...defaults, ...saved, model: PRESETS.unsloth.model, apiKey: PRESETS.unsloth.apiKey };
          save(current);
        } else {
          current = { ...defaults, ...saved };
        }
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
    if (preset.apiKey) {
      current.apiKey = preset.apiKey;
    }
    current.temperature = preset.temperature;
    return current;
  }

  async function testConnection() {
    const { endpoint, model, apiKey } = current;
    if (!endpoint) {
      return { success: false, error: 'No endpoint configured' };
    }

    const testPayload = {
      model,
      messages: [{ role: 'user', content: 'Say "connected" in one word.' }],
      max_tokens: 10,
      temperature: 0,
    };
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
    const url = `${endpoint.replace(/\/+$/, '')}/chat/completions`;

    try {
      let res;
      // Try local proxy first for localhost/127.0.0.1 to avoid browser CORS issues
      if (url.includes(':8888') || url.includes('localhost') || url.includes('127.0.0.1')) {
        res = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, headers, body: testPayload }),
          signal: AbortSignal.timeout(10000),
        }).catch(() => null);
      }

      if (!res || !res.ok) {
        res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(testPayload),
          signal: AbortSignal.timeout(10000),
        });
      }

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        return { success: false, error: `HTTP ${res.status}: ${errorText.slice(0, 200)}` };
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '';
      return { success: true, reply: reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim() };
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
