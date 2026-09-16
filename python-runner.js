/* ═══════════════════════════════════════════════════════════
   CP Sensei — Python Runner (Pyodide)
   In-browser Python execution via WebAssembly
   ═══════════════════════════════════════════════════════════ */

const PythonRunner = (() => {
  let pyodide = null;
  let loading = false;
  let loaded = false;
  const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
  const TIMEOUT_MS = 10000; // 10 second timeout

  async function ensureLoaded(onProgress) {
    if (loaded && pyodide) return pyodide;
    if (loading) {
      // Wait for existing load
      return new Promise((resolve, reject) => {
        const check = setInterval(() => {
          if (loaded && pyodide) { clearInterval(check); resolve(pyodide); }
          if (!loading && !loaded) { clearInterval(check); reject(new Error('Load failed')); }
        }, 200);
      });
    }

    loading = true;
    if (onProgress) onProgress('loading-script');

    try {
      // Load Pyodide script if not already loaded
      if (typeof loadPyodide === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = PYODIDE_CDN;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Pyodide CDN'));
          document.head.appendChild(script);
        });
      }

      if (onProgress) onProgress('initializing');

      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      });

      // Setup stdout/stderr capture
      pyodide.runPython(`
import sys
from io import StringIO

class CaptureOutput:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def reset(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def get_stdout(self):
        return self.stdout.getvalue()
    
    def get_stderr(self):
        return self.stderr.getvalue()

_capture = CaptureOutput()
      `);

      loaded = true;
      loading = false;
      if (onProgress) onProgress('ready');
      return pyodide;

    } catch (e) {
      loading = false;
      if (onProgress) onProgress('error');
      throw e;
    }
  }

  async function run(code, stdin = '') {
    const py = await ensureLoaded();

    // Reset capture
    py.runPython('_capture.reset()');

    // Setup stdin
    const stdinLines = stdin.split('\n');
    py.runPython(`
import sys
from io import StringIO

_stdin_data = ${JSON.stringify(stdin)}
sys.stdin = StringIO(_stdin_data)
sys.stdout = _capture.stdout
sys.stderr = _capture.stderr
    `);

    const startTime = performance.now();

    try {
      // Run with timeout
      const result = await Promise.race([
        (async () => {
          py.runPython(code);
          return { success: true };
        })(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Time Limit Exceeded (>${TIMEOUT_MS / 1000}s)`)), TIMEOUT_MS)
        ),
      ]);

      const elapsed = performance.now() - startTime;
      const stdout = py.runPython('_capture.get_stdout()');
      const stderr = py.runPython('_capture.get_stderr()');

      // Restore sys streams
      py.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__; sys.stdin = sys.__stdin__');

      return {
        success: true,
        stdout: stdout || '',
        stderr: stderr || '',
        time: elapsed,
      };

    } catch (e) {
      const elapsed = performance.now() - startTime;

      // Try to get any output before the error
      let stdout = '', stderr = '';
      try {
        stdout = py.runPython('_capture.get_stdout()') || '';
        stderr = py.runPython('_capture.get_stderr()') || '';
        py.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__; sys.stdin = sys.__stdin__');
      } catch (_) {}

      // Parse Python error message
      let errorMsg = e.message || String(e);
      // Clean up Pyodide error formatting
      if (errorMsg.includes('PythonError:')) {
        errorMsg = errorMsg.split('PythonError:').pop().trim();
      }

      return {
        success: false,
        stdout,
        stderr: stderr || errorMsg,
        error: errorMsg,
        time: elapsed,
      };
    }
  }

  function isLoaded() {
    return loaded;
  }

  function isLoading() {
    return loading;
  }

  return { ensureLoaded, run, isLoaded, isLoading };
})();
