/* ═══════════════════════════════════════════════════════════
   CP Sensei — Student State Manager
   Tracks progress, XP, skills, and learning history
   ═══════════════════════════════════════════════════════════ */

const StudentState = (() => {
  const STORAGE_KEY = 'cpsensei_student';

  const SKILL_COLORS = {
    'arrays': '#7c3aed',
    'hashing': '#a78bfa',
    'two-pointers': '#06b6d4',
    'sliding-window': '#0ea5e9',
    'binary-search': '#10b981',
    'stacks': '#f59e0b',
    'trees': '#ec4899',
    'graphs': '#8b5cf6',
    'dp': '#ef4444',
    'greedy': '#f97316',
    'math': '#14b8a6',
    'strings': '#6366f1',
    'segment-tree': '#d946ef',
  };

  const SKILL_LABELS = {
    'arrays': 'Arrays',
    'hashing': 'Hashing',
    'two-pointers': 'Two Ptrs',
    'sliding-window': 'Sliding Win',
    'binary-search': 'Bin Search',
    'stacks': 'Stacks',
    'trees': 'Trees',
    'graphs': 'Graphs',
    'dp': 'DP',
    'greedy': 'Greedy',
    'math': 'Math',
    'strings': 'Strings',
    'segment-tree': 'Seg Trees',
  };

  const XP_VALUES = {
    PROBLEM_EASY: 20,
    PROBLEM_MEDIUM: 50,
    PROBLEM_HARD: 100,
    TOPIC_EXPLORED: 10,
    STREAK_BONUS: 15,
    FIRST_SOLVE: 10,
  };

  const defaults = {
    totalXP: 0,
    streak: 0,
    lastActiveDate: null,
    problemsSolved: [],          // [{ id, solvedAt, attempts, timeMs }]
    topicsExplored: [],          // [pattern strings]
    skillLevels: {},             // { pattern: 0-100 }
    conversationCount: 0,
    createdAt: new Date().toISOString(),
  };

  let state = { ...defaults };

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = { ...defaults, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('StudentState: load failed', e);
    }
    updateStreak();
    return state;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('StudentState: save failed', e);
    }
  }

  function get() {
    return { ...state };
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (!state.lastActiveDate) {
      state.streak = 0;
      return;
    }
    const lastDate = new Date(state.lastActiveDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, streak unchanged
    } else if (diffDays === 1) {
      // Consecutive day
      state.streak++;
    } else {
      // Streak broken
      state.streak = 0;
    }
    state.lastActiveDate = today;
    save();
  }

  function markActive() {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastActiveDate !== today) {
      updateStreak();
      state.lastActiveDate = today;
      save();
    }
  }

  function addXP(amount, reason) {
    state.totalXP += amount;
    save();
    // Trigger UI update event
    document.dispatchEvent(new CustomEvent('cpsensei:xp', { detail: { amount, reason, total: state.totalXP } }));
  }

  function solveProblem(problemId, attempts = 1, timeMs = 0) {
    if (state.problemsSolved.find(p => p.id === problemId)) return; // Already solved

    const problem = Problems.getById(problemId);
    if (!problem) return;

    state.problemsSolved.push({
      id: problemId,
      solvedAt: new Date().toISOString(),
      attempts,
      timeMs,
    });

    // Award XP
    const xpMap = { Easy: XP_VALUES.PROBLEM_EASY, Medium: XP_VALUES.PROBLEM_MEDIUM, Hard: XP_VALUES.PROBLEM_HARD };
    const xp = xpMap[problem.difficulty] || 20;
    addXP(xp, `Solved: ${problem.title}`);

    // Update skill levels
    problem.pattern.forEach(p => {
      const total = Problems.getByPattern(p).length;
      const solved = state.problemsSolved.filter(s => {
        const sp = Problems.getById(s.id);
        return sp && sp.pattern.includes(p);
      }).length;
      state.skillLevels[p] = Math.min(100, Math.round((solved / total) * 100));
    });

    save();
    document.dispatchEvent(new CustomEvent('cpsensei:progress', { detail: state }));
  }

  function exploreTopic(pattern) {
    if (!state.topicsExplored.includes(pattern)) {
      state.topicsExplored.push(pattern);
      addXP(XP_VALUES.TOPIC_EXPLORED, `Explored: ${SKILL_LABELS[pattern] || pattern}`);
      save();
    }
  }

  function incrementConversations() {
    state.conversationCount++;
    save();
  }

  function getSkillLevel(pattern) {
    return state.skillLevels[pattern] || 0;
  }

  function getSkillColor(pattern) {
    return SKILL_COLORS[pattern] || '#7c3aed';
  }

  function getSkillLabel(pattern) {
    return SKILL_LABELS[pattern] || pattern;
  }

  function getSummary() {
    return {
      totalXP: state.totalXP,
      streak: state.streak,
      problemsSolved: state.problemsSolved.length,
      topicsExplored: state.topicsExplored.length,
      skillLevels: { ...state.skillLevels },
      solvedIds: state.problemsSolved.map(p => p.id),
    };
  }

  function getForAI() {
    // Compact summary for the AI system prompt
    const summary = getSummary();
    const weakest = Object.entries(summary.skillLevels)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .map(([p, lvl]) => `${SKILL_LABELS[p]}(${lvl}%)`)
      .join(', ');

    const strongest = Object.entries(summary.skillLevels)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([p, lvl]) => `${SKILL_LABELS[p]}(${lvl}%)`)
      .join(', ');

    return {
      level: summary.totalXP < 100 ? 'beginner' : summary.totalXP < 500 ? 'intermediate' : 'advanced',
      totalXP: summary.totalXP,
      problemsSolved: summary.problemsSolved,
      topicsExplored: state.topicsExplored,
      weakestSkills: weakest || 'none yet',
      strongestSkills: strongest || 'none yet',
      solvedProblemIds: summary.solvedIds,
    };
  }

  function reset() {
    state = { ...defaults, createdAt: new Date().toISOString() };
    save();
    document.dispatchEvent(new CustomEvent('cpsensei:progress', { detail: state }));
  }

  function exportData() {
    return JSON.stringify(state, null, 2);
  }

  function importData(json) {
    try {
      const imported = JSON.parse(json);
      state = { ...defaults, ...imported };
      save();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Initialize
  load();

  return {
    load, save, get, markActive, addXP, solveProblem, exploreTopic,
    incrementConversations, getSkillLevel, getSkillColor, getSkillLabel,
    getSummary, getForAI, reset, exportData, importData,
    SKILL_COLORS, SKILL_LABELS, XP_VALUES,
  };
})();
