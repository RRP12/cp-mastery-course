/* ═══════════════════════════════════════════════════════════
   CP Sensei — Visualization Engine
   Canvas-based animated data structure visualizations
   ═══════════════════════════════════════════════════════════ */

const Visualizer = (() => {

  const COLORS = {
    bg: '#050816',
    cell: '#171d4a',
    cellHighlight: '#7c3aed',
    cellActive: '#06b6d4',
    cellSuccess: '#10b981',
    cellDanger: '#ef4444',
    cellWarning: '#f59e0b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: 'rgba(148,163,184,0.2)',
    pointer1: '#7c3aed',
    pointer2: '#06b6d4',
    pointer3: '#ec4899',
    edge: 'rgba(148,163,184,0.3)',
    edgeActive: '#7c3aed',
    window: 'rgba(124,58,237,0.15)',
    windowBorder: '#7c3aed',
  };

  // ── Array Visualization ───────────────────────────────
  function drawArray(canvas, config) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const {
      values = [],
      highlights = {},    // { index: color }
      pointers = {},      // { index: { label, color } }
      windowStart = -1,
      windowEnd = -1,
      label = '',
      cellSize = 48,
    } = config;

    const padding = 24;
    const n = values.length;
    const totalW = n * cellSize + (n - 1) * 4 + padding * 2;
    const totalH = cellSize + padding * 2 + (label ? 28 : 0) + (Object.keys(pointers).length > 0 ? 32 : 0);

    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = totalW + 'px';
    canvas.style.height = totalH + 'px';
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, totalW, totalH);

    // Label
    let yOffset = padding;
    if (label) {
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label.toUpperCase(), padding, yOffset + 4);
      yOffset += 22;
    }

    // Sliding window background
    if (windowStart >= 0 && windowEnd >= 0) {
      const wx = padding + windowStart * (cellSize + 4) - 4;
      const ww = (windowEnd - windowStart + 1) * (cellSize + 4);
      ctx.fillStyle = COLORS.window;
      ctx.strokeStyle = COLORS.windowBorder;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(wx, yOffset - 4, ww, cellSize + 8, 6);
      ctx.fill();
      ctx.stroke();
    }

    // Cells
    values.forEach((val, i) => {
      const x = padding + i * (cellSize + 4);
      const y = yOffset;

      // Cell background
      const hlColor = highlights[i];
      ctx.fillStyle = hlColor || COLORS.cell;
      ctx.beginPath();
      ctx.roundRect(x, y, cellSize, cellSize, 6);
      ctx.fill();

      // Cell border
      ctx.strokeStyle = hlColor ? 'rgba(255,255,255,0.2)' : COLORS.border;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Value
      ctx.fillStyle = hlColor ? '#ffffff' : COLORS.text;
      ctx.font = '600 14px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(val), x + cellSize / 2, y + cellSize / 2);

      // Index
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = '400 9px JetBrains Mono, monospace';
      ctx.fillText(String(i), x + cellSize / 2, y - 6);
    });

    // Pointers
    const pointerKeys = Object.keys(pointers);
    if (pointerKeys.length > 0) {
      const py = yOffset + cellSize + 8;
      pointerKeys.forEach((idx) => {
        const { label: pLabel, color } = pointers[idx];
        const x = padding + parseInt(idx) * (cellSize + 4) + cellSize / 2;

        // Arrow
        ctx.fillStyle = color || COLORS.pointer1;
        ctx.beginPath();
        ctx.moveTo(x, py);
        ctx.lineTo(x - 5, py + 8);
        ctx.lineTo(x + 5, py + 8);
        ctx.closePath();
        ctx.fill();

        // Label
        ctx.fillStyle = color || COLORS.pointer1;
        ctx.font = '700 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pLabel, x, py + 20);
      });
    }
  }

  // ── DP Table Visualization ────────────────────────────
  function drawDPTable(canvas, config) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const {
      table = [[]],
      rowLabels = [],
      colLabels = [],
      highlights = {},  // 'row-col': color
      activeCell = null, // { row, col }
      label = 'DP Table',
      cellSize = 44,
    } = config;

    const padding = 32;
    const rows = table.length;
    const cols = table[0]?.length || 0;
    const labelOffset = rowLabels.length > 0 ? 36 : 0;
    const headerOffset = colLabels.length > 0 ? 24 : 0;
    const totalW = cols * (cellSize + 2) + padding * 2 + labelOffset;
    const totalH = rows * (cellSize + 2) + padding * 2 + headerOffset + (label ? 28 : 0);

    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = totalW + 'px';
    canvas.style.height = totalH + 'px';
    ctx.scale(dpr, dpr);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, totalW, totalH);

    let yStart = padding;
    if (label) {
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label.toUpperCase(), padding, yStart + 4);
      yStart += 22;
    }

    // Column labels
    if (colLabels.length > 0) {
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = '500 10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      colLabels.forEach((cl, j) => {
        const x = padding + labelOffset + j * (cellSize + 2) + cellSize / 2;
        ctx.fillText(String(cl), x, yStart + 4);
      });
      yStart += headerOffset;
    }

    // Rows
    for (let i = 0; i < rows; i++) {
      const y = yStart + i * (cellSize + 2);

      // Row label
      if (rowLabels[i] !== undefined) {
        ctx.fillStyle = COLORS.textMuted;
        ctx.font = '500 10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(String(rowLabels[i]), padding + labelOffset - 8, y + cellSize / 2 + 4);
      }

      for (let j = 0; j < cols; j++) {
        const x = padding + labelOffset + j * (cellSize + 2);
        const key = `${i}-${j}`;
        const isActive = activeCell && activeCell.row === i && activeCell.col === j;
        const hlColor = highlights[key];

        // Cell
        ctx.fillStyle = isActive ? COLORS.cellActive : (hlColor || COLORS.cell);
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, 4);
        ctx.fill();

        if (isActive) {
          ctx.strokeStyle = COLORS.cellActive;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Value
        const val = table[i][j];
        if (val !== undefined && val !== null) {
          ctx.fillStyle = isActive ? '#ffffff' : (hlColor ? '#ffffff' : COLORS.text);
          ctx.font = '600 12px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(val), x + cellSize / 2, y + cellSize / 2);
        }
      }
    }
  }

  // ── Graph/Tree Visualization ──────────────────────────
  function drawGraph(canvas, config) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const {
      nodes = [],       // [{ id, x, y, label, color }]
      edges = [],       // [{ from, to, weight, color, directed }]
      highlights = {},  // { nodeId: color }
      visited = [],     // [nodeId]
      label = '',
      width = 400,
      height = 280,
    } = config;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    if (label) {
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label.toUpperCase(), 16, 20);
    }

    const nodeRadius = 20;

    // Draw edges
    edges.forEach(({ from, to, weight, color, directed }) => {
      const fromNode = nodes.find(n => n.id === from);
      const toNode = nodes.find(n => n.id === to);
      if (!fromNode || !toNode) return;

      ctx.strokeStyle = color || COLORS.edge;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();

      // Arrowhead for directed
      if (directed) {
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const arrowX = toNode.x - nodeRadius * Math.cos(angle);
        const arrowY = toNode.y - nodeRadius * Math.sin(angle);
        ctx.fillStyle = color || COLORS.edge;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
          arrowX - 10 * Math.cos(angle - 0.4),
          arrowY - 10 * Math.sin(angle - 0.4)
        );
        ctx.lineTo(
          arrowX - 10 * Math.cos(angle + 0.4),
          arrowY - 10 * Math.sin(angle + 0.4)
        );
        ctx.closePath();
        ctx.fill();
      }

      // Weight label
      if (weight !== undefined) {
        const mx = (fromNode.x + toNode.x) / 2;
        const my = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = COLORS.textMuted;
        ctx.font = '500 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(weight), mx, my - 8);
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const hlColor = highlights[node.id];
      const isVisited = visited.includes(node.id);

      // Glow effect for highlighted nodes
      if (hlColor) {
        ctx.shadowColor = hlColor;
        ctx.shadowBlur = 15;
      }

      ctx.fillStyle = hlColor || (isVisited ? COLORS.cellSuccess : (node.color || COLORS.cell));
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = hlColor ? 'rgba(255,255,255,0.3)' : COLORS.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(node.label || node.id), node.x, node.y);
    });
  }

  // ── Stack/Queue Visualization ─────────────────────────
  function drawStack(canvas, config) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const {
      values = [],
      highlights = {},
      label = 'Stack',
      isQueue = false,
      cellWidth = 60,
      cellHeight = 36,
    } = config;

    const padding = 24;
    const n = values.length;
    const totalW = cellWidth + padding * 2 + 40;
    const totalH = n * (cellHeight + 2) + padding * 2 + 28;

    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = totalW + 'px';
    canvas.style.height = totalH + 'px';
    ctx.scale(dpr, dpr);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, totalW, totalH);

    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), padding, padding + 4);

    // Draw cells (top = last element for stack, first for queue)
    const ordered = isQueue ? [...values] : [...values].reverse();
    ordered.forEach((val, i) => {
      const x = padding;
      const y = padding + 22 + i * (cellHeight + 2);
      const origIdx = isQueue ? i : values.length - 1 - i;
      const hlColor = highlights[origIdx];

      ctx.fillStyle = hlColor || COLORS.cell;
      ctx.beginPath();
      ctx.roundRect(x, y, cellWidth, cellHeight, 4);
      ctx.fill();

      ctx.fillStyle = hlColor ? '#ffffff' : COLORS.text;
      ctx.font = '600 13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(val), x + cellWidth / 2, y + cellHeight / 2);

      // Top/Front indicator
      if (i === 0) {
        ctx.fillStyle = COLORS.pointer1;
        ctx.font = '600 10px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(isQueue ? '← front' : '← top', x + cellWidth + 8, y + cellHeight / 2 + 4);
      }
    });
  }

  // ── Parse VIZ blocks from AI output ───────────────────
  function parseVizBlock(vizText) {
    try {
      // Format: [VIZ:type json_config]
      const match = vizText.match(/\[VIZ:(\w+)\s+([\s\S]+)\]/);
      if (!match) return null;

      const type = match[1];
      const configStr = match[2].trim();
      const config = JSON.parse(configStr);

      return { type, config };
    } catch (e) {
      console.warn('Failed to parse VIZ block:', e);
      return null;
    }
  }

  // ── Render a visualization ────────────────────────────
  function render(container, vizData) {
    const { type, config } = vizData;
    const wrapper = document.createElement('div');
    wrapper.className = 'viz-container';

    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);

    // Add playback controls for animations
    const controls = document.createElement('div');
    controls.className = 'viz-controls';

    // Render based on type
    switch (type) {
      case 'array':
        drawArray(canvas, config);
        break;
      case 'dp':
      case 'table':
        drawDPTable(canvas, config);
        break;
      case 'graph':
      case 'tree':
        drawGraph(canvas, config);
        break;
      case 'stack':
      case 'queue':
        drawStack(canvas, { ...config, isQueue: type === 'queue' });
        break;
      default:
        wrapper.innerHTML = `<div style="padding: 16px; color: var(--text-muted);">Unknown visualization type: ${type}</div>`;
    }

    container.appendChild(wrapper);
    return wrapper;
  }

  // ── Animate an array operation ────────────────────────
  async function animateArray(container, frames, intervalMs = 600) {
    const wrapper = document.createElement('div');
    wrapper.className = 'viz-container';
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);

    const controls = document.createElement('div');
    controls.className = 'viz-controls';

    let playing = true;
    let currentFrame = 0;

    const playBtn = document.createElement('button');
    playBtn.className = 'viz-btn active';
    playBtn.textContent = '⏸ Pause';
    playBtn.onclick = () => {
      playing = !playing;
      playBtn.textContent = playing ? '⏸ Pause' : '▶ Play';
      playBtn.classList.toggle('active', playing);
    };

    const stepBtn = document.createElement('button');
    stepBtn.className = 'viz-btn';
    stepBtn.textContent = '⏭ Step';
    stepBtn.onclick = () => {
      if (currentFrame < frames.length - 1) {
        currentFrame++;
        drawArray(canvas, frames[currentFrame]);
      }
    };

    const resetBtn = document.createElement('button');
    resetBtn.className = 'viz-btn';
    resetBtn.textContent = '⏮ Reset';
    resetBtn.onclick = () => {
      currentFrame = 0;
      drawArray(canvas, frames[0]);
    };

    const frameLabel = document.createElement('span');
    frameLabel.style.cssText = 'color: var(--text-muted); font-size: 11px; font-family: var(--font-mono);';

    controls.append(resetBtn, playBtn, stepBtn, frameLabel);
    wrapper.appendChild(controls);
    container.appendChild(wrapper);

    // Initial draw
    if (frames.length > 0) drawArray(canvas, frames[0]);

    // Animation loop
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!playing) return;
        if (currentFrame >= frames.length - 1) {
          clearInterval(interval);
          resolve();
          return;
        }
        currentFrame++;
        frameLabel.textContent = `${currentFrame + 1}/${frames.length}`;
        drawArray(canvas, frames[currentFrame]);
      }, intervalMs);
    });
  }

  return { drawArray, drawDPTable, drawGraph, drawStack, parseVizBlock, render, animateArray };
})();
