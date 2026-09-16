/* ═══════════════════════════════════════════════════════════
   CP Sensei — Code Editor
   CodeMirror 6 integration with Python syntax
   (Falls back to a styled textarea if CM6 fails to load)
   ═══════════════════════════════════════════════════════════ */

const Editor = (() => {
  let editorElement = null;
  let textarea = null;
  const DEFAULT_CODE = `# CP Sensei — Python Editor
# Write your solution here and click Run!

def solve():
    # Read input
    n = int(input())
    arr = list(map(int, input().split()))
    
    # Your solution here
    
    print(result)

solve()
`;

  function init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Use a styled textarea (reliable fallback, works everywhere)
    textarea = document.createElement('textarea');
    textarea.id = 'codeEditor';
    textarea.className = 'code-textarea';
    textarea.value = DEFAULT_CODE;
    textarea.spellcheck = false;
    textarea.autocomplete = 'off';
    textarea.autocapitalize = 'off';

    // Styling inline (also backed by CSS)
    Object.assign(textarea.style, {
      width: '100%',
      height: '100%',
      background: '#050816',
      color: '#f1f5f9',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: '13px',
      lineHeight: '1.6',
      padding: '16px',
      border: 'none',
      outline: 'none',
      resize: 'none',
      tabSize: 4,
    });

    // Tab key inserts spaces instead of switching focus
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const spaces = '    ';
        textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
      }
      // Ctrl/Cmd + Enter to run
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.getElementById('runBtn')?.click();
      }
    });

    container.appendChild(textarea);
    editorElement = textarea;
  }

  function getCode() {
    return textarea ? textarea.value : '';
  }

  function setCode(code) {
    if (textarea) textarea.value = code;
  }

  function clearCode() {
    if (textarea) textarea.value = '';
    textarea?.focus();
  }

  function appendCode(code) {
    if (textarea) {
      textarea.value += '\n' + code;
    }
  }

  function focus() {
    textarea?.focus();
  }

  return { init, getCode, setCode, clearCode, appendCode, focus };
})();
