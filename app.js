/* =========================================================
   Life OS · 人生管理系统
   纯原生 JS，无构建、无依赖，双击 index.html 即可运行
   数据全部保存在 localStorage
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     图标库（线性 SVG）
     --------------------------------------------------------- */
  var ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-1.7 4L16 12H5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    bulb: '<path d="M12 3a6 6 0 0 0-3.6 10.8V16h7.2v-2.2A6 6 0 0 0 12 3Z"/><path d="M9.5 19h5M10.5 21.5h3"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.2"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.6 2.1"/>',
    trend: '<path d="M4 16.5l5-5 3.5 3.5L20 7"/><path d="M15 7h5v5"/>',
    note: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    heart: '<path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z"/>',
    book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v18H6.5A1.5 1.5 0 0 1 5 19.5Z"/><path d="M8.5 7.5h6"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16.5 14.5h1.5"/>',
    brief: '<rect x="3" y="7.5" width="18" height="12.5" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18"/>',
    dumbbell: '<path d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11"/>',
    coffee: '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M4 21h13"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6M17 20a5.6 5.6 0 0 0-1.6-3.9"/>',
    sparkle: '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z"/>',
    star: '<path d="m12 3.8 2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.9l5.9-.8L12 3.8Z"/>',
    leaf: '<path d="M20 4c-8 0-13 3.6-13 9.5 0 2 .7 3.7 1.9 5C11 16.4 14 13.8 17 12"/><path d="M4 21c.4-4.5 2.6-8.3 6-10.6"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    arrowRight: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    chevronRight: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
    chevronLeft: '<path d="m15 5.5-6.5 6.5L15 18.5"/>',
    chevronDown: '<path d="m6 9.5 6 6 6-6"/>',
    more: '<circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    grip: '<circle cx="9" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none"/>',
    trash: '<path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l1 13h9l1-13M10.5 11v5M13.5 11v5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3H5.5A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16v4Z"/><path d="m14.5 5.5 4 4"/>',
    palette: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="9.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9.5" r="1.1" fill="currentColor" stroke="none"/><path d="M12 21c-1.6 0-2.4-1-2-2.4.4-1.5-.4-2.6-2-2.6"/>',
    download: '<path d="M12 3v12M7.5 11l4.5 4.5L16.5 11"/><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
    upload: '<path d="M12 16V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
    reset: '<path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5"/><path d="M4.5 4v4.5H9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    arrowUp: '<path d="M12 20V4M6 10l6-6 6 6"/>',
    arrowDown: '<path d="M12 4v16M6 14l6 6 6-6"/>',
    page: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>'
  };

  function icon(name, cls) {
    var p = ICONS[name] || ICONS.grid;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"' +
      (cls ? ' class="' + cls + '"' : '') + '>' + p + '</svg>';
  }

  /* ---------------------------------------------------------
     常量
     --------------------------------------------------------- */
  var STORE_KEY = 'lifeos.v1';            /* 旧版全站数据键，登录后仅作迁移来源 */
  var AUTH_KEY = 'lifeos.auth.v1';        /* 本机账号表 */
  var SESSION_KEY = 'lifeos.session.v1';  /* 当前登录邮箱 */
  var MIGRATED_KEY = 'lifeos.migrated.v1';/* 旧数据是否已继承 */
  var activeKey = STORE_KEY;              /* 当前账号的数据键 */

  var PALETTE = ['#3f8f63', '#6fae8b', '#5b93bf', '#c98b5e', '#b07cb5', '#d9a13d', '#6f7ba8', '#c96b6b', '#7a8b6f'];

  var MODULE_TYPES = [
    { type: 'habit', name: '习惯打卡', desc: '按天打钩的网格', icon: 'grid' },
    { type: 'okr', name: '目标 OKR', desc: '目标 + 关键结果', icon: 'target' },
    { type: 'todo', name: '待办清单', desc: '轻量的行动清单', icon: 'check' },
    { type: 'timeline', name: '日程时间轴', desc: '按小时安排一天', icon: 'clock' },
    { type: 'metric', name: '数字指标', desc: '一个数，持续记录', icon: 'trend' },
    { type: 'note', name: '文字笔记', desc: '随手写下的区块', icon: 'note' },
    { type: 'review', name: '决策复盘', desc: '选择 · 假设 · 收获', icon: 'bulb' }
  ];

  var TYPE_NAME = {
    habit: '打卡网格', okr: 'OKR', todo: '待办', timeline: '时间轴',
    metric: '指标', note: '笔记', review: '复盘'
  };

  var LIFE8 = [
    { id: 'career', name: '主业', icon: 'brief', color: '#3f8f63' },
    { id: 'workplace', name: '职场', icon: 'users', color: '#5b93bf' },
    { id: 'solo', name: '一人公司', icon: 'sparkle', color: '#b07cb5' },
    { id: 'finance', name: '财务管理', icon: 'wallet', color: '#c98b5e' },
    { id: 'growth', name: '个人提升', icon: 'book', color: '#6f7ba8' },
    { id: 'fun', name: '休闲娱乐', icon: 'coffee', color: '#d9a13d' },
    { id: 'health', name: '身心健康', icon: 'dumbbell', color: '#6fae8b' },
    { id: 'family', name: '家人关系', icon: 'heart', color: '#c96b6b' }
  ];

  var ICON_CHOICES = ['grid', 'target', 'check', 'clock', 'trend', 'note', 'bulb', 'compass',
    'flag', 'calendar', 'sun', 'moon', 'layers', 'heart', 'book', 'wallet', 'brief',
    'dumbbell', 'coffee', 'users', 'sparkle', 'star', 'leaf', 'palette'];

  /* ---------------------------------------------------------
     小工具
     --------------------------------------------------------- */
  function uid(p) { return p + '_' + Math.random().toString(36).slice(2, 9); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function hexA(hex, a) {
    var h = (hex || '#3f8f63').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return iso(new Date()); }
  function monthKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1); }
  var WEEK = ['日', '一', '二', '三', '四', '五', '六'];
  function cnDate(d) { return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'; }
  function cnShort(d) { return (d.getMonth() + 1) + '月' + d.getDate() + '日 · 周' + WEEK[d.getDay()]; }
  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return '夜深了';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }
  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  /* ---------------------------------------------------------
     状态
     --------------------------------------------------------- */
  var state;

  var PAGE_ORDER = ['overview', 'daily', 'monthly', 'yearly', 'life8', 'review'];

  function basePages() {
    return [
      { id: 'overview', name: '概览', icon: 'compass', builtin: 'overview', modules: [] },
      { id: 'daily', name: '每日日程', icon: 'sun', builtin: 'daily', modules: [] },
      { id: 'monthly', name: '月度规划', icon: 'calendar', builtin: 'monthly', modules: [] },
      { id: 'yearly', name: '年度目标', icon: 'flag', builtin: 'yearly', modules: [] },
      { id: 'life8', name: '八大模块', icon: 'layers', builtin: 'life8', modules: [] },
      { id: 'review', name: '决策复盘', icon: 'bulb', builtin: 'review', modules: [] }
    ];
  }

  function initialState() {
    return {
      v: 1,
      seeded: false,
      current: 'overview',
      settings: { name: '' },
      lines: {},
      life8: LIFE8.map(function (d) {
        return { id: d.id, name: d.name, icon: d.icon, color: d.color, score: 0, note: '' };
      }),
      pages: basePages()
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(activeKey);
      if (!raw) return initialState();
      var s = JSON.parse(raw);
      if (!s || !Array.isArray(s.pages) || !s.pages.length) return initialState();
      return normalize(s);
    } catch (e) {
      return initialState();
    }
  }

  function normalize(s) {
    var base = initialState();
    s.v = 1;
    s.settings = s.settings || {};
    s.settings.name = typeof s.settings.name === 'string' ? s.settings.name : '';
    s.settings.appName = typeof s.settings.appName === 'string' ? s.settings.appName : '';
    s.settings.tagline = typeof s.settings.tagline === 'string' ? s.settings.tagline : '';
    s.settings.actionsOpen = s.settings.actionsOpen !== false;
    s.lines = (s.lines && typeof s.lines === 'object' && !Array.isArray(s.lines)) ? s.lines : {};
    if (typeof s.current !== 'string') s.current = 'overview';
    if (!Array.isArray(s.life8) || s.life8.length !== 8) {
      s.life8 = base.life8.map(function (d) {
        var found = (s.life8 || []).filter(function (x) { return x && x.id === d.id; })[0];
        return found ? Object.assign({}, d, found) : d;
      });
    }
    s.pages = s.pages.map(function (p) {
      p.id = p.id || uid('p');
      p.name = p.name || '未命名页签';
      p.icon = p.icon || 'page';
      p.modules = Array.isArray(p.modules) ? p.modules : [];
      p.modules = p.modules.filter(Boolean).map(function (m) {
        m.id = m.id || uid('m');
        m.type = m.type || 'note';
        m.title = m.title || (TYPE_NAME[m.type] || '模块');
        m.icon = m.icon || 'note';
        m.color = m.color || PALETTE[0];
        m.w = m.w === 'full' ? 'full' : 'half';
        m.data = m.data || blankData(m.type);
        return m;
      });
      return p;
    });
    s.pages = orderBuiltinPages(s.pages);
    if (!s.pages.some(function (p) { return p.id === s.current; })) s.current = s.pages[0].id;
    return s;
  }

  /* 系统页固定按「概览 → 每日 → 月度 → 年度 → 八大模块 → 决策复盘」的时间粒度排序 */
  function orderBuiltinPages(list) {
    var rank = function (p) { return PAGE_ORDER.indexOf(p.builtin); };
    var built = list.filter(function (p) { return p.builtin; }).sort(function (a, b) { return rank(a) - rank(b); });
    var rest = list.filter(function (p) { return !p.builtin; });
    return built.concat(rest);
  }

  function save() {
    try {
      localStorage.setItem(activeKey, JSON.stringify(state));
      saveFailed = false;
    } catch (e) {
      if (!saveFailed) {
        saveFailed = true;
        toast('浏览器不允许本地存储，本次修改不会被保留');
      }
    }
  }
  var saveFailed = false;

  function currentPage() {
    return state.pages.filter(function (p) { return p.id === state.current; })[0] || state.pages[0];
  }

  function pageById(id) {
    return state.pages.filter(function (p) { return p.id === id; })[0];
  }

  function allModules() {
    var out = [];
    state.pages.forEach(function (p) { out = out.concat(p.modules); });
    return out;
  }

  function blankData(type) {
    switch (type) {
      case 'habit': return { month: monthKey(new Date()), habits: [] };
      case 'okr': return { objectives: [{ id: uid('o'), title: '新的目标', krs: [] }] };
      case 'todo': return { items: [] };
      case 'timeline': return { date: today(), items: [] };
      case 'metric': return { value: 0, unit: '', label: '', step: 1, history: [] };
      case 'note': return { text: '' };
      case 'review': return { items: [] };
      default: return {};
    }
  }

  /* ---------------------------------------------------------
     渲染：侧栏
     --------------------------------------------------------- */
  function renderNav() {
    var sys = $('#nav-system');
    var cus = $('#nav-custom');
    sys.innerHTML = '';
    cus.innerHTML = '';
    state.pages.forEach(function (p) {
      var b = document.createElement('div');
      b.className = 'nav-item' + (p.id === state.current ? ' active' : '');
      b.setAttribute('role', 'button');
      b.tabIndex = 0;
      b.dataset.page = p.id;
      b.innerHTML = icon(p.icon);

      var lab = document.createElement('span');
      lab.className = 'nav-text';
      lab.textContent = p.name;
      lab.title = p.name + '（双击或点右侧铅笔可重命名）';
      b.appendChild(lab);

      var pen = document.createElement('button');
      pen.type = 'button';
      pen.className = 'nav-pen';
      pen.title = '重命名页签';
      pen.setAttribute('aria-label', '重命名「' + p.name + '」');
      pen.innerHTML = icon('edit');
      b.appendChild(pen);

      function go() {
        if (state.current !== p.id) {
          state.current = p.id;
          save();
          renderNav();
          renderPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeSidebar();
      }

      b.addEventListener('click', function (e) {
        if (e.target.closest('.nav-pen') || e.target.closest('.rename-input')) return;
        go();
      });
      b.addEventListener('keydown', function (e) {
        if (e.target !== b) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
      pen.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        startPageRename(lab, p);
      });
      lab.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        startPageRename(lab, p);
      });

      (p.builtin ? sys : cus).appendChild(b);
    });
    if (!cus.children.length) {
      var hint = document.createElement('div');
      hint.className = 'nav-item';
      hint.style.cssText = 'color:var(--faint);font-size:12px;cursor:default';
      hint.innerHTML = '<span>还没有自定义页签</span>';
      cus.appendChild(hint);
    }
  }

  /* ---------------------------------------------------------
     通用：就地重命名
     --------------------------------------------------------- */
  function startRename(host, value, commit) {
    if (!host || host.querySelector('.rename-input')) return;
    var prev = host.innerHTML;
    host.innerHTML = '';
    var inp = document.createElement('input');
    inp.className = 'rename-input';
    inp.type = 'text';
    inp.maxLength = 24;
    inp.value = value;
    host.appendChild(inp);
    try { inp.focus(); inp.select(); } catch (e) { }

    var done = false;
    function end(ok) {
      if (done) return;
      done = true;
      var v = (inp.value || '').trim();
      if (ok && v && v !== value) {
        commit(v);
      } else if (host.isConnected) {
        host.innerHTML = prev;
      }
    }
    inp.addEventListener('mousedown', function (e) { e.stopPropagation(); });
    inp.addEventListener('click', function (e) { e.stopPropagation(); });
    inp.addEventListener('blur', function () { end(true); });
    inp.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); end(true); }
      if (e.key === 'Escape') { e.preventDefault(); end(false); }
    });
  }

  function startPageRename(host, p) {
    startRename(host, p.name, function (v) {
      p.name = v;
      save();
      renderNav();
      renderPage();
      toast('页签已重命名为「' + v + '」');
    });
  }

  function renderBrand() {
    var nameEl = $('#brand-name');
    var subEl = $('#brand-sub');
    if (nameEl) nameEl.textContent = state.settings.appName || 'Life OS';
    if (subEl) subEl.textContent = state.settings.tagline || '人生管理系统';
  }

  /* ---------------------------------------------------------
     首页：今日一句话
     --------------------------------------------------------- */
  var MOODS = ['平静', '专注', '不错', '有点累', '紧绷'];

  function todayLineBlock() {
    var key = today();
    state.lines = state.lines || {};
    var rec = state.lines[key] || (state.lines[key] = { text: '', mood: '' });
    var now = new Date();

    var sec = document.createElement('section');
    sec.className = 'today-line reveal';
    sec.innerHTML =
      '<div class="ol-top">' +
      '<span class="ol-badge">今日一句话</span>' +
      '<span class="ol-date">' + cnDate(now) + ' · 周' + WEEK[now.getDay()] + '</span>' +
      '<span class="ol-state">点击句子即可改写 · 自动保存</span>' +
      '</div>' +
      '<div class="ol-quote" contenteditable="true" role="textbox" spellcheck="false" data-ph="今天，用一句话给自己定个调…">' +
      '</div>' +
      '<div class="ol-mood"><span class="ol-mood-label">心情</span>' +
      MOODS.map(function (x) {
        return '<button class="mood-chip' + (rec.mood === x ? ' active' : '') + '" type="button" data-mood="' + x + '">' + x + '</button>';
      }).join('') +
      '</div>';

    var quote = $('.ol-quote', sec);
    quote.textContent = rec.text || '';

    var commit = function () {
      rec.text = (quote.innerText || '').replace(/\u00a0/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      state.lines[key] = rec;
      save();
      var st = $('.ol-state', sec);
      if (st) st.textContent = '已保存 · ' + cnShort(now);
    };
    var commitLazy = debounce(commit, 500);
    quote.addEventListener('input', function () {
      var st = $('.ol-state', sec);
      if (st) st.textContent = '保存中…';
      commitLazy();
    });
    quote.addEventListener('blur', commit);
    quote.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); quote.blur(); }
    });

    $$('[data-mood]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        rec.mood = rec.mood === b.dataset.mood ? '' : b.dataset.mood;
        state.lines[key] = rec;
        save();
        $$('[data-mood]', sec).forEach(function (x) { x.classList.toggle('active', x.dataset.mood === rec.mood); });
      });
    });

    return sec;
  }

  /* ---------------------------------------------------------
     渲染：页面骨架
     --------------------------------------------------------- */
  function renderPage() {
    var page = currentPage();
    var canvas = $('#canvas');
    renderBrand();
    applyActions(state.settings.actionsOpen !== false);
    $('#page-title').textContent = page.name;
    $('#page-title').title = page.name + '（点击可重命名）';
    canvas.innerHTML = '';

    if (page.builtin === 'overview') canvas.appendChild(todayLineBlock());

    // Hero
    var intro = pageIntro(page);
    var hero = document.createElement('section');
    hero.className = 'hero reveal';
    hero.innerHTML =
      '<p class="eyebrow">' + esc(intro.eyebrow) + '</p>' +
      '<h1>' + intro.h1 + '</h1>' +
      '<p class="lede">' + esc(intro.lede) + '</p>' +
      (intro.actions || '');
    canvas.appendChild(hero);

    if (page.builtin === 'overview') canvas.appendChild(kpisBlock());
    if (page.builtin === 'life8') canvas.appendChild(boardBlock());
    if (page.builtin === 'review') canvas.appendChild(loopBlock());

    // 模块区
    var head = document.createElement('div');
    head.className = 'section-head reveal';
    head.innerHTML = '<div><h2>模块画布</h2><p>' + page.modules.length + ' 个模块 · 拖拽右侧手柄可排序</p></div>' +
      '<button class="solid-btn head-add" type="button" data-act="add">＋ 添加模块</button>';
    canvas.appendChild(head);

    var grid = document.createElement('div');
    grid.className = 'modules';
    grid.id = 'modules';
    page.modules.forEach(function (m, i) {
      var card = renderCard(m);
      card.classList.add('reveal');
      card.style.animationDelay = (Math.min(i, 8) * 45) + 'ms';
      grid.appendChild(card);
    });
    canvas.appendChild(grid);
    attachDrag(grid);

    if (!page.modules.length) {
      canvas.appendChild(emptyBlock(page));
    }

    // 底部
    var foot = document.createElement('div');
    foot.className = 'section-head reveal';
    foot.style.cssText = 'margin-top:40px;justify-content:center';
    foot.innerHTML = '<button class="ghost-btn" data-act="add">＋ 添加一个模块</button>';
    canvas.appendChild(foot);

    observeReveal(canvas);
  }

  function pageIntro(page) {
    var now = new Date();
    var name = state.settings.name || '朋友';
    var lead = state.pages.filter(function (p) { return !p.builtin; });

    switch (page.builtin) {
      case 'overview':
        return {
          eyebrow: cnDate(now) + ' · 周' + WEEK[now.getDay()],
          h1: greeting() + '，' + esc(name) + '。',
          lede: '把生活拆成一个个可执行的模块 —— 记录、推进、复盘。所有数据都留在你自己的浏览器里，刷新不丢。',
          actions: state.seeded ? '' :
            '<div class="hero-actions">' +
            '<button class="solid-btn" data-act="sample">载入示例数据</button>' +
            '<button class="ghost-btn" data-act="add">从空白开始搭建</button>' +
            '</div>'
        };
      case 'yearly':
        return {
          eyebrow: '年度主题 · ' + now.getFullYear(),
          h1: '把一年，过成<em>一件作品</em>。',
          lede: '六个维度、若干关键结果。年初定方向，年尾看的是「有没有真的推进」，而不是「有没有想过」。'
        };
      case 'monthly':
        return {
          eyebrow: '月度 · ' + now.getFullYear() + ' 年 ' + (now.getMonth() + 1) + ' 月',
          h1: (now.getMonth() + 1) + ' 月，拆到<em>能立刻动手</em>。',
          lede: '年度目标落到这个月，就变成几个可量化的结果和一张打卡网格。'
        };
      case 'daily':
        return {
          eyebrow: cnDate(now) + ' · 周' + WEEK[now.getDay()],
          h1: '今天的<em>时间轴</em>。',
          lede: '一天不需要很满，只需要有几段是真正专注的。'
        };
      case 'life8':
        return {
          eyebrow: '人生系统 · 八个抽屉',
          h1: '人生的<em>八个抽屉</em>。',
          lede: '把它们分开看，才能看清哪一格正在被过度投入、哪一格已经很久没打开。'
        };
      case 'review':
        return {
          eyebrow: '决策系统 · 复盘',
          h1: '先做决定，再<em>诚实复盘</em>。',
          lede: '记录当时的假设，比记录当时的心情更有用 —— 半年后你会知道，是判断错了，还是运气不好。'
        };
      default:
        return {
          eyebrow: '自定义模块页' + (lead.length > 1 ? ' · ' + lead.length + ' 个页签' : ''),
          h1: esc(page.name) + '。',
          lede: '这一页的内容完全由你决定：加什么模块、放几个、怎么排序，都随你。'
        };
    }
  }

  function kpisBlock() {
    var mods = allModules();
    var todoTotal = 0, todoDone = 0;
    var checks = 0, checkTotal = 0;
    var krPct = [], krCount = 0;
    var revCount = 0, revScore = 0, revScored = 0;
    var mk = monthKey(new Date());

    mods.forEach(function (m) {
      var d = m.data || {};
      if (m.type === 'todo' && d.items) {
        todoTotal += d.items.length;
        todoDone += d.items.filter(function (i) { return i.done; }).length;
      }
      if (m.type === 'habit' && d.habits) {
        d.habits.forEach(function (h) {
          Object.keys(h.checks || {}).forEach(function (k) {
            if (k.indexOf(mk) === 0) checks++;
          });
          checkTotal += 30;
        });
      }
      if (m.type === 'okr' && d.objectives) {
        d.objectives.forEach(function (o) {
          (o.krs || []).forEach(function (k) {
            krCount++;
            krPct.push(clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100));
          });
        });
      }
      if (m.type === 'review' && d.items) {
        revCount += d.items.length;
        d.items.forEach(function (i) { if (i.score) { revScore += i.score; revScored++; } });
      }
    });

    var avgKr = krPct.length ? Math.round(krPct.reduce(function (a, b) { return a + b; }, 0) / krPct.length) : 0;
    var checkRate = checkTotal ? Math.round((checks / checkTotal) * 100) : 0;

    var cards = [
      {
        label: '今日待办', icon: 'check', tone: '#3f8f63',
        value: todoDone + '<small>/ ' + todoTotal + '</small>',
        note: todoTotal ? '完成度 ' + Math.round(todoDone / todoTotal * 100) + '%' : '还没有待办模块',
        bar: todoTotal ? Math.round(todoDone / todoTotal * 100) : 0
      },
      {
        label: '本月打卡', icon: 'grid', tone: '#c98b5e',
        value: checks + '<small>次</small>',
        note: '平均完成率 ' + checkRate + '%',
        bar: clamp(checkRate, 0, 100)
      },
      {
        label: '目标进度', icon: 'target', tone: '#5b93bf',
        value: avgKr + '<small>%</small>',
        note: krCount ? '共 ' + krCount + ' 个关键结果' : '先去年度目标页设定',
        bar: avgKr
      },
      {
        label: '决策复盘', icon: 'bulb', tone: '#b07cb5',
        value: revCount + '<small>条</small>',
        note: revScored ? '平均自评 ' + (revScore / revScored).toFixed(1) + ' / 5' : '记录一次真实的选择',
        bar: revScored ? Math.round((revScore / revScored) / 5 * 100) : 0
      }
    ];

    var html =
      '<section class="ovcards reveal">' +
      cards.map(function (c) {
        return '<article class="ovcard" style="--tone:' + c.tone + ';--tint:' + hexA(c.tone, 0.13) + '">' +
          '<div class="ov-top">' +
            '<span class="ov-ico">' + icon(c.icon) + '</span>' +
            '<span class="ov-label">' + esc(c.label) + '</span>' +
          '</div>' +
          '<div class="ov-bottom">' +
            '<span class="ov-value">' + c.value + '</span>' +
            '<span class="ov-note">' + esc(c.note) + '</span>' +
          '</div>' +
          '<span class="ov-bar"><i style="width:' + clamp(c.bar, 0, 100) + '%"></i></span>' +
          '</article>';
      }).join('') +
      '</section>';

    var section = document.createElement('div');
    section.innerHTML = html;
    return section.firstChild;
  }

  function kpi(label, value, sub) {
    return '<div class="kpi"><div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value">' + value + '</div>' +
      '<div class="kpi-sub">' + esc(sub) + '</div></div>';
  }

  function boardBlock() {
    var sec = document.createElement('section');
    sec.className = 'reveal';
    sec.style.marginBottom = '44px';
    sec.innerHTML = '<div class="section-head"><h2>八个抽屉</h2><p>0 – 10 分，凭直觉给当下的自己打分</p></div>';
    var board = document.createElement('div');
    board.className = 'board';
    state.life8.forEach(function (d) {
      var card = document.createElement('div');
      card.className = 'board-card';
      card.innerHTML =
        '<div class="board-top">' +
        '<span class="board-icon" style="background:' + hexA(d.color, 0.13) + ';color:' + d.color + '">' + icon(d.icon) + '</span>' +
        '<span class="board-name">' + esc(d.name) + '</span>' +
        '</div>' +
        '<div class="board-score">' + d.score + '<small> / 10</small></div>' +
        '<div class="board-bar"><i style="width:' + (d.score * 10) + '%;background:' + d.color + '"></i></div>' +
        '<input class="board-range" type="range" min="0" max="10" step="1" value="' + d.score + '" aria-label="' + esc(d.name) + ' 评分">' +
        '<input class="board-note" placeholder="一句话备注" value="' + esc(d.note || '') + '">';
      var range = $('.board-range', card);
      var note = $('.board-note', card);
      range.addEventListener('input', function () {
        d.score = Number(range.value);
        $('.board-score', card).innerHTML = d.score + '<small> / 10</small>';
        $('.board-bar i', card).style.width = (d.score * 10) + '%';
        save();
      });
      note.addEventListener('input', debounce(function () {
        d.note = note.value;
        save();
      }, 300));
      board.appendChild(card);
    });
    sec.appendChild(board);
    return sec;
  }

  function loopBlock() {
    var steps = ['决策', '监控', '计划', '执行', '记录'];
    var sec = document.createElement('div');
    sec.className = 'loop reveal';
    sec.innerHTML = steps.map(function (s, i) {
      return '<span class="loop-chip"><i></i>' + s + '</span>' +
        (i < steps.length - 1 ? '<span class="loop-arrow">' + icon('arrowRight') + '</span>' : '');
    }).join('');
    return sec;
  }

  function emptyBlock(page) {
    var welcome = !state.seeded && page.builtin === 'overview';
    var sec = document.createElement('div');
    sec.className = 'empty reveal';
    sec.innerHTML =
      '<div class="empty-mark">' + icon(welcome ? 'sparkle' : 'layers') + '</div>' +
      '<h3>' + (welcome ? '先看看它长什么样' : '这个页签还没有模块') + '</h3>' +
      '<p>' + (welcome
        ? '一键载入一套示例内容（年度目标、月度规划、日程、打卡、复盘都齐了），再按自己的方式改。也可以从空白开始。'
        : '模块是这个系统的最小单元。选一个类型，写个名字，就能开始用。') + '</p>' +
      '<div class="empty-actions">' +
      (welcome ? '<button class="solid-btn" data-act="sample">载入示例数据</button>' : '') +
      '<button class="' + (welcome ? 'ghost-btn' : 'solid-btn') + '" data-act="add">添加模块</button>' +
      '</div>';
    return sec;
  }

  function observeReveal(scope) {
    var items = $$('.reveal', scope);
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     渲染：卡片
     --------------------------------------------------------- */
  function renderCard(m) {
    var el = document.createElement('article');
    el.className = 'card' + (m.w === 'full' ? ' w-full' : '');
    el.dataset.mod = m.id;
    el.style.setProperty('--accent', m.color);

    el.innerHTML =
      '<div class="card-head">' +
      '<span class="card-icon" style="background:' + hexA(m.color, 0.13) + ';color:' + m.color + '">' + icon(m.icon) + '</span>' +
      '<span class="card-title">' + esc(m.title) + '</span>' +
      '<span class="card-type">' + (TYPE_NAME[m.type] || '') + '</span>' +
      '<span class="card-tools">' +
      '<button class="drag-handle" type="button" title="拖拽排序" aria-label="拖拽排序">' + icon('grip') + '</button>' +
      '<button class="card-del" type="button" title="删除模块" aria-label="删除模块">' + icon('trash') + '</button>' +
      '<button class="card-menu-btn" type="button" aria-label="模块菜单">' + icon('more') + '</button>' +
      '</span>' +
      '</div>' +
      '<div class="card-body"></div>';

    var body = $('.card-body', el);
    var fn = renderers[m.type] || renderers.note;
    body.innerHTML = fn.html(m);
    fn.bind(body, el, m);

    $('.card-menu-btn', el).addEventListener('click', function (e) {
      e.stopPropagation();
      openCardMenu(el, m);
    });

    $('.card-del', el).addEventListener('click', function (e) {
      e.stopPropagation();
      dialogDelete(m);
    });

    el.querySelector('.drag-handle').addEventListener('mousedown', function () {
      el.setAttribute('draggable', 'true');
    });
    el.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', m.id); } catch (err) { }
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', function () {
      el.classList.remove('dragging');
      el.removeAttribute('draggable');
      syncOrder();
    });
    return el;
  }

  function syncOrder() {
    var grid = $('#modules');
    if (!grid) return;
    var page = currentPage();
    var ids = $$('.card', grid).map(function (c) { return c.dataset.mod; });
    page.modules.sort(function (a, b) { return ids.indexOf(a.id) - ids.indexOf(b.id); });
    save();
    var counter = $('.section-head p');
    if (counter && counter.textContent.indexOf('个模块') > -1) {
      counter.textContent = page.modules.length + ' 个模块 · 拖拽右侧手柄可排序';
    }
  }

  function refreshCard(m) {
    var el = $('.card[data-mod="' + m.id + '"]');
    if (!el) return;
    var fresh = renderCard(m);
    el.replaceWith(fresh);
  }

  function attachDrag(grid) {
    grid.addEventListener('dragover', function (e) {
      var dragging = $('.dragging', grid);
      if (!dragging) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var cards = $$('.card:not(.dragging)', grid);
      var target = null, best = Infinity;
      cards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        var d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        if (d < best) { best = d; target = c; }
      });
      if (!target) return;
      var rect = target.getBoundingClientRect();
      var before;
      if (e.clientY < rect.top) before = true;
      else if (e.clientY > rect.bottom) before = false;
      else before = e.clientX < rect.left + rect.width / 2;
      if (before) grid.insertBefore(dragging, target);
      else grid.insertBefore(dragging, target.nextSibling);
    });
    grid.addEventListener('drop', function (e) { e.preventDefault(); syncOrder(); });
  }

  /* ---------------------------------------------------------
     卡片菜单
     --------------------------------------------------------- */
  function closeMenus() {
    $$('.card-menu').forEach(function (el) { el.remove(); });
  }

  function openCardMenu(card, m) {
    closeMenus();
    var menu = document.createElement('div');
    menu.className = 'card-menu';
    menu.innerHTML =
      row('edit', '重命名') +
      row('palette', '图标与配色') +
      row('layers', m.w === 'full' ? '改为半宽' : '改为整行') +
      row('copy', '复制模块') +
      row('arrowUp', '上移') +
      row('arrowDown', '下移') +
      '<div class="menu-sep"></div>' +
      row('trash', '删除模块', 'danger');
    card.appendChild(menu);

    var rows = menu.querySelectorAll('.menu-row');
    rows[0].addEventListener('click', function () { closeMenus(); dialogRename(m); });
    rows[1].addEventListener('click', function () { closeMenus(); dialogStyle(m); });
    rows[2].addEventListener('click', function () {
      closeMenus();
      m.w = m.w === 'full' ? 'half' : 'full';
      save();
      refreshCard(m);
    });
    rows[3].addEventListener('click', function () {
      closeMenus();
      var page = currentPage();
      var copy = JSON.parse(JSON.stringify(m));
      copy.id = uid('m');
      copy.title = m.title + ' 副本';
      page.modules.splice(page.modules.indexOf(m) + 1, 0, copy);
      save();
      renderPage();
      toast('已复制模块');
    });
    rows[4].addEventListener('click', function () { closeMenus(); moveModule(m, -1); });
    rows[5].addEventListener('click', function () { closeMenus(); moveModule(m, 1); });
    rows[6].addEventListener('click', function () { closeMenus(); dialogDelete(m); });

    setTimeout(function () {
      document.addEventListener('click', function onDoc() {
        closeMenus();
        document.removeEventListener('click', onDoc);
      });
    }, 0);
  }

  function row(ic, text, cls) {
    return '<button class="menu-row ' + (cls || '') + '" type="button">' + icon(ic) + '<span>' + text + '</span></button>';
  }

  function moveModule(m, dir) {
    var page = currentPage();
    var i = page.modules.indexOf(m);
    var j = i + dir;
    if (j < 0 || j >= page.modules.length) return;
    page.modules.splice(j, 0, page.modules.splice(i, 1)[0]);
    save();
    renderPage();
    syncOrder();
  }

  function dialogDelete(m) {
    openDialog(
      '<h3>删除这个模块？</h3>' +
      '<p class="sub">「' + esc(m.title) + '」里的内容会一起删除，且无法恢复。可以先导出备份。</p>' +
      '<div class="sheet-actions">' +
      '<button class="ghost-btn" data-close>再想想</button>' +
      '<button class="solid-btn" data-ok style="background:#b0443c">删除</button>' +
      '</div>',
      function (sheet, close) {
        $('[data-close]', sheet).addEventListener('click', close);
        $('[data-ok]', sheet).addEventListener('click', function () {
          var page = currentPage();
          page.modules = page.modules.filter(function (x) { return x.id !== m.id; });
          save();
          close();
          renderPage();
          toast('已删除模块');
        });
      }
    );
  }

  /* ---------------------------------------------------------
     模块渲染器
     --------------------------------------------------------- */
  var renderers = {};

  /* -------- 习惯打卡 -------- */
  renderers.habit = {
    html: function (m) {
      var d = m.data;
      var parts = (d.month || monthKey(new Date())).split('-');
      var y = Number(parts[0]), mo = Number(parts[1]);
      var days = new Date(y, mo, 0).getDate();
      var now = new Date();
      var tKey = today();

      /* 按自然周对齐：月初前的空位用上月日期补齐，月末后的空位用下月日期补齐（淡化且不可点） */
      var lead = new Date(y, mo - 1, 1).getDay();
      var trail = (7 - (lead + days) % 7) % 7;
      var cols = lead + days + trail;

      function dayInfo(offset) {
        var dt = new Date(y, mo - 1, 1 - lead + offset);
        return {
          dt: dt,
          key: iso(dt),
          num: dt.getDate(),
          inMonth: dt.getMonth() === mo - 1
        };
      }

      var cellsHead = '';
      for (var c = 0; c < cols; c++) {
        var info = dayInfo(c);
        cellsHead += '<span class="habit-wd' + (info.inMonth ? '' : ' out') + '">' + WEEK[info.dt.getDay()] + '</span>';
      }

      var rows = (d.habits || []).map(function (h) {
        var cells = '';
        var count = 0;
        for (var c2 = 0; c2 < cols; c2++) {
          var info2 = dayInfo(c2);
          if (!info2.inMonth) {
            cells += '<span class="cell filler" title="' + esc(info2.key) + '">' + info2.num + '</span>';
            continue;
          }
          var key = info2.key;
          var on = !!(h.checks && h.checks[key]);
          if (on) count++;
          cells += '<button class="cell' + (on ? ' on' : '') + (key === tKey ? ' today' : '') +
            '" type="button" data-h="' + h.id + '" data-d="' + key + '" title="' + esc(key) + '">' +
            '<span class="cell-d">' + info2.num + '</span></button>';
        }
        return '<div class="habit-name" data-h="' + h.id + '"><b title="' + esc(h.name) + '">' + esc(h.name) + '</b>' +
          '<span>' + count + '</span></div>' + cells;
      }).join('');

      var total = 0;
      (d.habits || []).forEach(function (h) {
        Object.keys(h.checks || {}).forEach(function (k) { if (k.indexOf(y + '-' + pad(mo)) === 0) total++; });
      });

      return '<div class="habit-head">' +
        '<div class="habit-month">' +
        '<button type="button" data-mv="-1" aria-label="上个月">' + icon('chevronLeft') + '</button>' +
        '<span>' + y + ' 年 ' + mo + ' 月</span>' +
        '<button type="button" data-mv="1" aria-label="下个月">' + icon('chevronRight') + '</button>' +
        '</div>' +
        '<span style="font-size:11.5px;color:var(--faint)">共 ' + total + ' 次</span>' +
        '</div>' +
        (d.habits && d.habits.length
          ? '<div class="habit-scroll"><div class="habit-table" style="grid-template-columns:minmax(var(--hname-min),var(--hname-max)) repeat(' + cols + ',var(--cell-w))">' +
          '<div class="habit-name habit-name-head" aria-hidden="true"></div>' + cellsHead + rows + '</div></div>'
          : '<p class="empty-line">还没有习惯，先加一个：</p>') +
        '<div class="habit-add">' +
        '<input class="field" data-new placeholder="例如：早起后喝一杯水" maxlength="30">' +
        '<button class="add-btn" data-addh type="button">加入</button>' +
        '</div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function addHabit() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.habits = d.habits || [];
        d.habits.push({ id: uid('h'), name: v, checks: {} });
        save();
        refreshCard(m);
        toast('已添加习惯');
      }
      $('[data-addh]', body).addEventListener('click', addHabit);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') addHabit(); });

      $$('[data-mv]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          var parts = (d.month || monthKey(new Date())).split('-');
          var dt = new Date(Number(parts[0]), Number(parts[1]) - 1 + Number(b.dataset.mv), 1);
          d.month = monthKey(dt);
          save();
          refreshCard(m);
        });
      });

      $$('.habit-name b', body).forEach(function (el, idx) {
        el.style.cursor = 'text';
        el.title = '双击重命名';
        el.addEventListener('dblclick', function () {
          var h = d.habits[idx];
          openDialog(
            '<h3>重命名习惯</h3><p class="sub">改名不会影响已有打卡记录。</p>' +
            '<input class="field" id="dv" value="' + esc(h.name) + '" maxlength="30" style="width:100%">' +
            '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>保存</button></div>',
            function (sheet, close) {
              var v = $('[data]', sheet) || $('input', sheet);
              $('[data-close]', sheet).addEventListener('click', close);
              $('[data-ok]', sheet).addEventListener('click', function () {
                h.name = (v.value || '').trim() || h.name;
                save(); close(); refreshCard(m);
              });
            }
          );
        });
      });

      $$('.cell', body).forEach(function (c) {
        c.addEventListener('click', function () {
          var h = d.habits.filter(function (x) { return x.id === c.dataset.h; })[0];
          if (!h) return;
          h.checks = h.checks || {};
          if (h.checks[c.dataset.d]) delete h.checks[c.dataset.d];
          else h.checks[c.dataset.d] = true;
          save();
          c.classList.toggle('on');
          var wrap = c.closest('.habit-table');
          var nameEl = wrap ? $('.habit-name[data-h="' + c.dataset.h + '"] span', wrap) : null;
          if (nameEl) {
            var rowCells = $$('.cell', wrap).filter(function (x) { return x.dataset.h === c.dataset.h; });
            nameEl.textContent = rowCells.filter(function (x) { return x.classList.contains('on'); }).length;
          }
        });
      });
    }
  };

  /* -------- OKR -------- */
  renderers.okr = {
    html: function (m) {
      var d = m.data;
      var objs = d.objectives || [];
      if (!objs.length) return '<p class="empty-line">还没有目标，先写一个方向。</p>';
      return objs.map(function (o) {
        var krs = o.krs || [];
        var pct = krs.length ? Math.round(krs.reduce(function (a, k) {
          return a + clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
        }, 0) / krs.length) : 0;
        return '<div class="obj" data-obj="' + o.id + '">' +
          '<div class="obj-title"><span class="dot"></span><span class="obj-name">' + esc(o.title) + '</span>' +
          '<span class="pct">' + pct + '%</span></div>' +
          (krs.length ? krs.map(function (k) {
            var p = clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
            return '<div class="kr" data-kr="' + k.id + '">' +
              '<div class="kr-wrap">' +
              '<span class="kr-text">' + esc(k.text) + '</span>' +
              '<span class="kr-num">' + k.cur + '/' + k.target + (k.unit ? ' ' + esc(k.unit) : '') + '</span>' +
              '<button class="kr-mini" type="button" data-kr-step="-1" aria-label="减少">−</button>' +
              '<button class="kr-mini" type="button" data-kr-step="1" aria-label="增加">＋</button>' +
              '</div>' +
              '<div class="kr-bar"><i style="width:' + p + '%"></i></div>' +
              '</div>';
          }).join('') : '<p class="empty-line" style="margin:0 0 8px">给这个目标配 2 – 3 个可量化的关键结果。</p>') +
          '<div class="inline-add"><input class="field" data-kr-input="' + o.id + '" placeholder="添加关键结果，用 /数字 结尾，例如：跑步 800 km">' +
          '<button class="add-btn" data-kr-add="' + o.id + '" type="button">添加</button></div>' +
          '</div>';
      }).join('') +
        '<div class="inline-add"><input class="field" data-obj-input placeholder="再定一个目标…">' +
        '<button class="add-btn" data-obj-add type="button">新目标</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.objectives = d.objectives || [];

      $$('[data-kr-step]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          var krEl = b.closest('.kr');
          var krId = krEl.dataset.kr;
          var obj = d.objectives.filter(function (o) {
            return (o.krs || []).some(function (k) { return k.id === krId; });
          })[0];
          if (!obj) return;
          var k = obj.krs.filter(function (x) { return x.id === krId; })[0];
          k.cur = clamp(Number(k.cur) + Number(b.dataset.krStep), 0, Number(k.target) || 9999);
          save();
          refreshCard(m);
        });
      });

      $$('[data-kr-add]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          var objId = b.dataset.krAdd;
          var input = $('[data-kr-input="' + objId + '"]', body);
          addKr(objId, input);
        });
      });
      $$('[data-kr-input]', body).forEach(function (inp) {
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') addKr(inp.dataset.krInput, inp);
        });
      });

      function addKr(objId, input) {
        var raw = (input.value || '').trim();
        if (!raw) { input.focus(); return; }
        var target = 10, unit = '', text = raw;
        var mv = raw.match(/(\d+(?:\.\d+)?)\s*([^\d\s]*)$/);
        if (mv) {
          target = Number(mv[1]);
          unit = mv[2] || '';
          text = raw.slice(0, mv.index).replace(/[／/·:：\-\s]+$/, '').trim() || raw;
        }
        var obj = d.objectives.filter(function (o) { return o.id === objId; })[0];
        if (!obj) return;
        obj.krs = obj.krs || [];
        obj.krs.push({ id: uid('k'), text: text, cur: 0, target: target, unit: unit });
        save();
        refreshCard(m);
      }

      var objInput = $('[data-obj-input]', body);
      $('[data-obj-add]', body).addEventListener('click', function () {
        var v = (objInput.value || '').trim();
        if (!v) { objInput.focus(); return; }
        d.objectives.push({ id: uid('o'), title: v, krs: [] });
        save();
        refreshCard(m);
      });
      objInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') $('[data-obj-add]', body).click();
      });

      $$('.obj-name', body).forEach(function (el, idx) {
        el.title = '双击重命名目标';
        el.addEventListener('dblclick', function () {
          var o = d.objectives[idx];
          openDialog(
            '<h3>重命名目标</h3><p class="sub">目标名建议写成「方向 + 程度」。</p>' +
            '<input class="field" value="' + esc(o.title) + '" style="width:100%" maxlength="60">' +
            '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>保存</button></div>',
            function (sheet, close) {
              var inp = $('input', sheet);
              $('[data-close]', sheet).addEventListener('click', close);
              $('[data-ok]', sheet).addEventListener('click', function () {
                o.title = (inp.value || '').trim() || o.title;
                save(); close(); refreshCard(m);
              });
            }
          );
        });
      });
    }
  };

  /* -------- 待办 -------- */
  renderers.todo = {
    html: function (m) {
      var items = m.data.items || [];
      var done = items.filter(function (i) { return i.done; }).length;
      var pct = items.length ? Math.round(done / items.length * 100) : 0;
      return '<div class="todo-list">' +
        (items.length ? items.map(function (i) {
          return '<div class="todo' + (i.done ? ' done' : '') + '" data-item="' + i.id + '">' +
            '<button class="check' + (i.done ? ' on' : '') + '" type="button" aria-label="完成">' + icon('check') + '</button>' +
            '<div class="todo-text">' + esc(i.text) + (i.meta ? '<span class="todo-meta">' + esc(i.meta) + '</span>' : '') + '</div>' +
            '<button class="todo-del" type="button" aria-label="删除">' + icon('x') + '</button>' +
            '</div>';
        }).join('') : '<p class="empty-line">清单是空的，从最小的一件事开始。</p>') +
        '</div>' +
        '<div class="inline-add"><input class="field" data-new placeholder="添加一件事，回车确认">' +
        '<button class="add-btn" data-add type="button">添加</button></div>' +
        (items.length ? '<div class="todo-foot"><div class="mini-progress"><i style="width:' + pct + '%"></i></div><span>' + done + ' / ' + items.length + '</span></div>' : '');
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.items = d.items || [];
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('t'), text: v, done: false });
        save();
        refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });

      $$('.todo', body).forEach(function (row) {
        var item = d.items.filter(function (x) { return x.id === row.dataset.item; })[0];
        if (!item) return;
        $('.check', row).addEventListener('click', function () {
          item.done = !item.done;
          save();
          refreshCard(m);
        });
        $('.todo-del', row).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x.id !== item.id; });
          save();
          refreshCard(m);
        });
        $('.todo-text', row).addEventListener('dblclick', function () {
          openDialog(
            '<h3>修改这一条</h3><p class="sub">只改文字，不改完成状态。</p>' +
            '<input class="field" value="' + esc(item.text) + '" style="width:100%" maxlength="120">' +
            '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>保存</button></div>',
            function (sheet, close) {
              var inp = $('input', sheet);
              $('[data-close]', sheet).addEventListener('click', close);
              $('[data-ok]', sheet).addEventListener('click', function () {
                item.text = (inp.value || '').trim() || item.text;
                save(); close(); refreshCard(m);
              });
            }
          );
        });
      });
    }
  };

  /* -------- 时间轴 -------- */
  renderers.timeline = {
    html: function (m) {
      var d = m.data;
      var items = (d.items || []).slice().sort(function (a, b) { return (a.time || '') < (b.time || '') ? -1 : 1; });
      var dt = new Date(d.date || today());
      return '<div class="tl-head">' +
        icon('calendar') + '<span>' + cnShort(dt) + '</span>' +
        '<span class="tl-count">' + items.length + ' 项安排</span></div>' +
        '<div class="tl">' +
        (items.length ? items.map(function (i, idx) {
          return '<div class="tl-item' + (idx === 0 ? ' is-now' : '') + '" data-tl="' + i.id + '">' +
            '<span class="tl-dot"></span>' +
            '<span class="tl-time">' + esc(i.time || '--:--') + '</span>' +
            '<span class="tl-body"><span class="tl-text">' + esc(i.text) +
            (i.tag ? '<span class="tl-tag">' + esc(i.tag) + '</span>' : '') + '</span></span>' +
            '<button class="todo-del" type="button" aria-label="删除">' + icon('x') + '</button>' +
            '</div>';
        }).join('') : '<p class="empty-line">今天还没有安排。</p>') +
        '</div>' +
        '<div class="inline-add">' +
        '<input class="field" type="time" data-time style="max-width:104px;flex:none" value="09:00">' +
        '<input class="field" data-text placeholder="做什么">' +
        '<button class="add-btn" data-add type="button">加入</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.items = d.items || [];
      function add() {
        var t = $('[data-time]', body).value || '09:00';
        var text = ($('[data-text]', body).value || '').trim();
        if (!text) { $('[data-text]', body).focus(); return; }
        d.items.push({ id: uid('e'), time: t, text: text, tag: '' });
        save();
        refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      $('[data-text]', body).addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-tl]', body).forEach(function (row) {
        var btn = $('.todo-del', row);
        if (!btn) return;
        btn.addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x.id !== row.dataset.tl; });
          save();
          refreshCard(m);
        });
      });
    }
  };

  /* -------- 数字指标 -------- */
  renderers.metric = {
    html: function (m) {
      var d = m.data;
      var hist = (d.history || []).slice(-12);
      var max = Math.max.apply(null, hist.map(function (h) { return Number(h.v) || 0; }).concat([1]));
      var prev = hist.length > 1 ? Number(hist[hist.length - 2].v) : null;
      var cur = Number(d.value) || 0;
      var delta = prev == null ? null : cur - prev;
      return '<div class="metric-main"><span class="metric-value">' +
        (Number.isInteger(cur) ? cur : cur.toFixed(1)) + '</span>' +
        (d.unit ? '<span class="metric-unit">' + esc(d.unit) + '</span>' : '') + '</div>' +
        (d.label ? '<div class="kpi-sub" style="margin-top:6px">' + esc(d.label) + '</div>' : '') +
        (delta != null ? '<div class="metric-delta' + (delta < 0 ? ' down' : '') + '">' +
          (delta === 0 ? '与上次持平' : (delta > 0 ? '↑ ' : '↓ ') + Math.abs(Number(delta.toFixed(1)))) + '</div>' : '') +
        (hist.length ? '<div class="metric-bars">' + hist.map(function (h) {
          return '<i style="height:' + Math.max(6, (Number(h.v) / max) * 100) + '%" title="' + esc(h.d) + '：' + h.v + '"></i>';
        }).join('') + '</div>' : '') +
        '<div class="metric-ctl">' +
        '<button class="step-btn" type="button" data-d="-1">− ' + (d.step || 1) + '</button>' +
        '<button class="step-btn" type="button" data-d="1">＋ ' + (d.step || 1) + '</button>' +
        '<button class="step-btn" type="button" data-log>记录今天</button>' +
        '</div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.history = d.history || [];
      var step = Number(d.step) || 1;
      $$('[data-d]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          d.value = Number((Number(d.value) + Number(b.dataset.d) * step).toFixed(2));
          save();
          refreshCard(m);
        });
      });
      $('[data-log]', body).addEventListener('click', function () {
        var t = today();
        d.history = d.history.filter(function (h) { return h.d !== t; });
        d.history.push({ d: t, v: Number(d.value) });
        d.history = d.history.slice(-60);
        save();
        refreshCard(m);
        toast('已记录 ' + t);
      });
    }
  };

  /* -------- 笔记 -------- */
  renderers.note = {
    html: function (m) {
      return '<textarea class="note-area" rows="5" placeholder="写点什么…（自动保存，无需按钮）">' + esc(m.data.text || '') + '</textarea>';
    },
    bind: function (body, card, m) {
      var ta = $('.note-area', body);
      function fit() {
        ta.style.height = 'auto';
        ta.style.height = Math.max(120, ta.scrollHeight) + 'px';
      }
      fit();
      ta.addEventListener('input', debounce(function () {
        m.data.text = ta.value;
        save();
        fit();
      }, 350));
    }
  };

  /* -------- 决策复盘 -------- */
  renderers.review = {
    html: function (m) {
      var items = m.data.items || [];
      if (!items.length) {
        return '<p class="empty-line">记下一个正在纠结的决定，半年后回来看。</p>' +
          '<div class="inline-add"><input class="field" data-new placeholder="例如：要不要接这个项目">' +
          '<button class="add-btn" data-add type="button">记录</button></div>';
      }
      return items.map(function (it) {
        return '<div class="rev" data-rev="' + it.id + '">' +
          '<div class="rev-top">' +
          '<span class="rev-title">' + esc(it.title || '未命名的决定') + '</span>' +
          '<span class="rev-date">' + esc(it.date || '') + '</span>' +
          '<span class="rev-dots">' + [1, 2, 3, 4, 5].map(function (n) {
            return '<button type="button" data-score="' + n + '" class="' + (it.score >= n ? 'on' : '') + '" aria-label="' + n + ' 分"></button>';
          }).join('') + '</span>' +
          '</div>' +
          '<div class="rev-field"><label>当时的假设</label><textarea rows="1" data-f="hypothesis" placeholder="我以为…">' + esc(it.hypothesis || '') + '</textarea></div>' +
          '<div class="rev-field"><label>结果与收获</label><textarea rows="1" data-f="outcome" placeholder="实际上…">' + esc(it.outcome || '') + '</textarea></div>' +
          '</div>';
      }).join('') +
        '<div class="inline-add"><input class="field" data-new placeholder="再记一个决定">' +
        '<button class="add-btn" data-add type="button">记录</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.items = d.items || [];
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        var dd = new Date();
        d.items.push({
          id: uid('r'), title: v, date: dd.getFullYear() + '.' + pad(dd.getMonth() + 1),
          hypothesis: '', outcome: '', score: 0
        });
        save();
        refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });

      $$('.rev', body).forEach(function (row) {
        var it = d.items.filter(function (x) { return x.id === row.dataset.rev; })[0];
        if (!it) return;
        $$('[data-score]', row).forEach(function (b) {
          b.addEventListener('click', function () {
            it.score = it.score === Number(b.dataset.score) ? 0 : Number(b.dataset.score);
            save();
            $$('[data-score]', row).forEach(function (x, i) {
              x.classList.toggle('on', it.score >= i + 1);
            });
          });
        });
        $$('textarea', row).forEach(function (ta) {
          function fit() { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
          fit();
          ta.addEventListener('input', debounce(function () {
            it[ta.dataset.f] = ta.value;
            save();
            fit();
          }, 300));
        });
      });
    }
  };

  /* ---------------------------------------------------------
     弹窗
     --------------------------------------------------------- */
  var overlay = $('#overlay');

  function openDialog(inner, mount) {
    overlay.hidden = false;
    overlay.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + inner + '</div>';
    var sheet = $('.sheet', overlay);
    function close() { overlay.hidden = true; overlay.innerHTML = ''; }
    overlay.onclick = function (e) { if (e.target === overlay) close(); };
    $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
    if (mount) mount(sheet, close);
    var first = sheet.querySelector('input, textarea');
    if (first) setTimeout(function () { first.focus(); if (first.select) first.select(); }, 60);
    return close;
  }

  function closeDialog() {
    overlay.hidden = true;
    overlay.innerHTML = '';
  }

  /* -------- 添加模块 -------- */
  function dialogAddModule() {
    var sel = { type: 'todo', icon: 'check', color: PALETTE[0] };

    openDialog(
      '<h3>添加模块</h3>' +
      '<p class="sub">模块是画布的最小单元：可以先加一个类型试试，名字、图标、配色之后都能改。</p>' +
      '<div class="sheet-label">类型</div>' +
      '<div class="type-grid">' + MODULE_TYPES.map(function (t) {
        return '<button class="type-opt' + (t.type === sel.type ? ' active' : '') + '" type="button" data-type="' + t.type + '">' +
          '<span class="to-icon">' + icon(t.icon) + '</span>' +
          '<span><b>' + t.name + '</b><small>' + t.desc + '</small></span></button>';
      }).join('') + '</div>' +
      '<div class="sheet-label">名称</div>' +
      '<input class="field" data-title style="width:100%" maxlength="40" value="待办清单" placeholder="例如：每周复盘">' +
      '<div class="sheet-label">图标</div>' +
      '<div class="icon-grid">' + ICON_CHOICES.map(function (n) {
        return '<button class="icon-opt' + (n === sel.icon ? ' active' : '') + '" type="button" data-icon="' + n + '">' + icon(n) + '</button>';
      }).join('') + '</div>' +
      '<div class="sheet-label">配色</div>' +
      '<div class="swatches">' + PALETTE.map(function (c, i) {
        return '<button class="swatch' + (i === 0 ? ' active' : '') + '" type="button" data-color="' + c + '" style="background:' + c + '"></button>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>添加到当前页</button></div>',
      function (sheet, close) {
        var titleInput = $('[data-title]', sheet);
        var iconGrid = $('.icon-grid', sheet);
        var swatches = $('.swatches', sheet);

        function setType(tp) {
          sel.type = tp;
          $$('.type-opt', sheet).forEach(function (b) { b.classList.toggle('active', b.dataset.type === tp); });
          var meta = MODULE_TYPES.filter(function (t) { return t.type === tp; })[0];
          titleInput.value = meta.name;
          sel.icon = meta.icon;
          $$('.icon-opt', iconGrid).forEach(function (b) { b.classList.toggle('active', b.dataset.icon === sel.icon); });
        }

        $$('.type-opt', sheet).forEach(function (b) {
          b.addEventListener('click', function () { setType(b.dataset.type); });
        });
        $$('.icon-opt', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            sel.icon = b.dataset.icon;
            $$('.icon-opt', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });
        $$('.swatch', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            sel.color = b.dataset.color;
            $$('.swatch', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });

        $('[data-ok]', sheet).addEventListener('click', function () {
          var m = {
            id: uid('m'),
            type: sel.type,
            title: (titleInput.value || '').trim() || '未命名模块',
            icon: sel.icon,
            color: sel.color,
            w: sel.type === 'habit' ? 'full' : 'half',
            data: blankData(sel.type)
          };
          currentPage().modules.push(m);
          save();
          close();
          renderPage();
          toast('已添加「' + m.title + '」');
        });
      }
    );
  }

  /* -------- 重命名 -------- */
  function dialogRename(m) {
    openDialog(
      '<h3>重命名模块</h3><p class="sub">只改标题，不影响内容。</p>' +
      '<input class="field" style="width:100%" maxlength="40" value="' + esc(m.title) + '">' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        var inp = $('input', sheet);
        $('[data-ok]', sheet).addEventListener('click', function () {
          m.title = (inp.value || '').trim() || m.title;
          save(); close(); refreshCard(m);
        });
      }
    );
  }

  /* -------- 图标与配色 -------- */
  function dialogStyle(m) {
    var color = m.color;
    openDialog(
      '<h3>图标与配色</h3><p class="sub">模块的图标和颜色会用在标题、进度条和打卡格上。</p>' +
      '<div class="sheet-label">图标</div>' +
      '<div class="icon-grid">' + ICON_CHOICES.map(function (n) {
        return '<button class="icon-opt' + (n === m.icon ? ' active' : '') + '" type="button" data-icon="' + n + '">' + icon(n) + '</button>';
      }).join('') + '</div>' +
      '<div class="sheet-label">配色</div>' +
      '<div class="swatches">' + PALETTE.map(function (c) {
        return '<button class="swatch' + (c === m.color ? ' active' : '') + '" type="button" data-color="' + c + '" style="background:' + c + '"></button>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        $$('[data-icon]', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            m.icon = b.dataset.icon;
            $$('[data-icon]', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });
        $$('.swatch', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            color = b.dataset.color;
            $$('.swatch', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });
        $('[data-ok]', sheet).addEventListener('click', function () {
          m.color = color;
          save(); close(); refreshCard(m);
        });
      }
    );
  }

  /* -------- 新建页签 -------- */
  function dialogAddPage() {
    var iconName = 'page';
    openDialog(
      '<h3>新建页签</h3><p class="sub">一个页签是一块独立的画布，比如「一人公司」「考研」「副业」。</p>' +
      '<div class="sheet-label">页签名称</div>' +
      '<input class="field" style="width:100%" maxlength="20" placeholder="例如：一人公司">' +
      '<div class="sheet-label">图标</div>' +
      '<div class="icon-grid">' + ICON_CHOICES.map(function (n) {
        return '<button class="icon-opt' + (n === iconName ? ' active' : '') + '" type="button" data-icon="' + n + '">' + icon(n) + '</button>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button><button class="solid-btn" data-ok>创建</button></div>',
      function (sheet, close) {
        var inp = $('input', sheet);
        $$('[data-icon]', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            iconName = b.dataset.icon;
            $$('[data-icon]', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });
        $('[data-ok]', sheet).addEventListener('click', function () {
          var name = (inp.value || '').trim();
          if (!name) { inp.focus(); return; }
          var p = { id: uid('p'), name: name, icon: iconName, builtin: null, modules: [] };
          state.pages.push(p);
          state.current = p.id;
          save();
          close();
          renderNav();
          renderPage();
          toast('已创建页签「' + name + '」');
        });
      }
    );
  }

  /* -------- 页签设置 -------- */
  function dialogPages() {
    openDialog(
      '<h3>页签设置</h3><p class="sub">点击任意一行可改名（系统页也可以改名，改名后依然不可删除）；自定义页签可以改名或移除，页内模块会一起删除。</p>' +
      '<div class="page-list">' + state.pages.map(function (p) {
        return '<div class="page-row" data-page="' + p.id + '">' + icon(p.icon) +
          '<span>' + esc(p.name) + '</span>' +
          '<span class="tag">' + (p.builtin ? '系统' : p.modules.length + ' 个模块') + '</span>' +
          (p.builtin ? '' : '<button type="button" data-del title="删除">' + icon('trash') + '</button>') +
          '</div>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button>' +
      '<button class="solid-btn" data-newpage>新建页签</button></div>',
      function (sheet, close) {
        $$('[data-del]', sheet).forEach(function (b) {
          b.addEventListener('click', function (e) {
            e.stopPropagation();
            var id = b.closest('.page-row').dataset.page;
            var p = pageById(id);
            if (!p || p.builtin) return;
            if (!window.confirm('删除页签「' + p.name + '」及其中的 ' + p.modules.length + ' 个模块？')) return;
            state.pages = state.pages.filter(function (x) { return x.id !== id; });
            if (state.current === id) state.current = state.pages[0].id;
            save(); close(); renderNav(); renderPage();
            toast('已删除页签');
          });
        });
        $$('.page-row', sheet).forEach(function (rowEl) {
          rowEl.addEventListener('click', function (e) {
            if (e.target.closest('button[data-del]')) return;
            var p = pageById(rowEl.dataset.page);
            if (!p) return;
            var inp = window.prompt('页签名称', p.name);
            if (inp == null) return;
            p.name = inp.trim() || p.name;
            save(); close(); renderNav(); renderPage();
          });
        });
        $('[data-newpage]', sheet).addEventListener('click', function () { close(); dialogAddPage(); });
      }
    );
  }

  /* ---------------------------------------------------------
     导入 / 导出 / 重置
     --------------------------------------------------------- */
  function exportData() {
    var data = JSON.stringify(state, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'life-os-backup-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('已导出 JSON 备份');
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var obj = JSON.parse(String(reader.result));
        if (!obj || !Array.isArray(obj.pages) || !obj.pages.length) throw new Error('bad');
        state = normalize(obj);
        save();
        renderNav();
        renderPage();
        toast('导入成功，共 ' + state.pages.length + ' 个页签');
      } catch (e) {
        toast('导入失败：不是有效的备份文件');
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    openDialog(
      '<h3>清空全部数据？</h3>' +
      '<p class="sub">所有页签和模块都会被删除，仅保留系统页的空画布。建议先导出备份。</p>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok style="background:#b0443c">确认清空</button></div>',
      function (sheet, close) {
        $('[data-ok]', sheet).addEventListener('click', function () {
          try { localStorage.removeItem(activeKey); } catch (e) { }
          state = initialState();
          save();
          close();
          renderNav();
          renderPage();
          toast('已清空');
        });
      }
    );
  }

  function loadSample() {
    openDialog(
      '<h3>载入示例数据</h3>' +
      '<p class="sub">会用一套完整示例（年度目标 / 月度规划 / 每日日程 / 打卡 / 复盘 / 一个人公司页签）替换当前内容。你随时可以清空重来。</p>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>载入</button></div>',
      function (sheet, close) {
        $('[data-ok]', sheet).addEventListener('click', function () {
          state = buildSample();
          save();
          close();
          renderNav();
          renderPage();
          toast('示例数据已载入，随便改');
        });
      }
    );
  }

  /* ---------------------------------------------------------
     示例数据
     --------------------------------------------------------- */
  function mkMod(type, title, ic, color, w, data) {
    return { id: uid('m'), type: type, title: title, icon: ic, color: color, w: w || 'half', data: data };
  }

  function mockChecks(days, seed) {
    var out = {};
    for (var i = 0; i < days; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      if ((i * 3 + seed) % 7 !== 0 && (i + seed) % 5 !== 0) out[iso(d)] = true;
    }
    return out;
  }

  function buildSample() {
    var s = initialState();
    s.seeded = true;
    s.settings.name = '北辰';
    s.current = 'overview';

    var mk = monthKey(new Date());
    var t = today();

    s.life8 = [
      { id: 'career', name: '主业', icon: 'brief', color: '#3f8f63', score: 8, note: '做深一条主线' },
      { id: 'workplace', name: '职场', icon: 'users', color: '#5b93bf', score: 7, note: '少说，多做，留痕' },
      { id: 'solo', name: '一人公司', icon: 'sparkle', color: '#b07cb5', score: 6, note: '先跑通最小闭环' },
      { id: 'finance', name: '财务管理', icon: 'wallet', color: '#c98b5e', score: 7, note: '每月 1 号对账' },
      { id: 'growth', name: '个人提升', icon: 'book', color: '#6f7ba8', score: 8, note: '每天 30 页' },
      { id: 'fun', name: '休闲娱乐', icon: 'coffee', color: '#d9a13d', score: 5, note: '这格欠费了' },
      { id: 'health', name: '身心健康', icon: 'dumbbell', color: '#6fae8b', score: 7, note: '一周三次力量' },
      { id: 'family', name: '家人关系', icon: 'heart', color: '#c96b6b', score: 8, note: '周末一次长电话' }
    ];

    /* ---- 概览 ---- */
    pageByIdIn(s, 'overview').modules = [
      mkMod('todo', '今天的三件大事', 'check', '#3f8f63', 'half', {
        items: [
          { id: uid('t'), text: '把人生管理系统的模块引擎跑通', done: true },
          { id: uid('t'), text: '给 12 月排一版内容日历', done: false },
          { id: uid('t'), text: '晚上 8 点前离开电脑，出门走 30 分钟', done: false }
        ]
      }),
      mkMod('habit', '晨间习惯', 'sun', '#6fae8b', 'half', {
        month: mk,
        habits: [
          { id: uid('h'), name: '起床后喝一杯水', checks: mockChecks(24, 1) },
          { id: uid('h'), name: '10 分钟拉伸', checks: mockChecks(24, 3) },
          { id: uid('h'), name: '写 3 行晨间日记', checks: mockChecks(24, 5) }
        ]
      }),
      mkMod('note', '这一周想记住的一句话', 'note', '#c98b5e', 'full', {
        text: '不追求把每一天填满，只追求每一天有一件事是真正推进了的。\n\n—— 写在 11 月的一个周三晚上'
      })
    ];

    /* ---- 年度目标 ---- */
    pageByIdIn(s, 'yearly').modules = [
      mkMod('okr', '健康 · 身体是底盘', 'heart', '#6fae8b', 'half', {
        objectives: [{
          id: uid('o'), title: '把体能拉回 2023 年的状态', krs: [
            { id: uid('k'), text: '力量训练', cur: 68, target: 156, unit: '次' },
            { id: uid('k'), text: '跑量', cur: 486, target: 800, unit: 'km' },
            { id: uid('k'), text: '睡满 7.5 小时', cur: 178, target: 250, unit: '天' }
          ]
        }]
      }),
      mkMod('okr', '工作 · 把专业做成资产', 'brief', '#3f8f63', 'half', {
        objectives: [{
          id: uid('o'), title: '从「干活的人」变成「有方法的人」', krs: [
            { id: uid('k'), text: '交付旗舰项目', cur: 3, target: 4, unit: '个' },
            { id: uid('k'), text: '沉淀方法论文章', cur: 15, target: 24, unit: '篇' },
            { id: uid('k'), text: '带教新人独立负责项目', cur: 1, target: 2, unit: '人' }
          ]
        }]
      }),
      mkMod('okr', '财务 · 一年存下 24 万', 'wallet', '#c98b5e', 'half', {
        objectives: [{
          id: uid('o'), title: '现金流稳定，且有自己的储备', krs: [
            { id: uid('k'), text: '年度储蓄', cur: 19.6, target: 24, unit: '万' },
            { id: uid('k'), text: '副业收入', cur: 4.2, target: 8, unit: '万' },
            { id: uid('k'), text: '应急金覆盖月数', cur: 5, target: 9, unit: '个月' }
          ]
        }]
      }),
      mkMod('note', '年度关键词', 'star', '#b07cb5', 'half', {
        text: '稳 · 深 · 松弛\n\n稳：不再频繁换方向。\n深：一件小事做到别人替代不了。\n松弛：允许自己有无所事事的一天。'
      })
    ];

    /* ---- 月度规划 ---- */
    pageByIdIn(s, 'monthly').modules = [
      mkMod('todo', '11 月目标拆解', 'target', '#3f8f63', 'half', {
        items: [
          { id: uid('t'), text: '首页改版：3 个页面全部上线', done: true, meta: '工作' },
          { id: uid('t'), text: '完成年度复盘初稿', done: false, meta: '复盘' },
          { id: uid('t'), text: '带爸妈做一次体检', done: false, meta: '家人' },
          { id: uid('t'), text: '读完《深度工作》', done: true, meta: '阅读' },
          { id: uid('t'), text: '把副业定价方案定下来', done: false, meta: '一人公司' }
        ]
      }),
      mkMod('metric', '本月阅读', 'book', '#6f7ba8', 'half', {
        value: 3, unit: '本', label: '目标 4 本 · 每天 30 页', step: 1,
        history: [{ d: '2026-07', v: 2 }, { d: '2026-08', v: 4 }, { d: '2026-09', v: 3 }, { d: '2026-10', v: 2 }, { d: '2026-11', v: 3 }]
      }),
      mkMod('habit', '每日打卡', 'grid', '#3f8f63', 'full', {
        month: mk,
        habits: [
          { id: uid('h'), name: '运动 30 分钟', checks: mockChecks(26, 2) },
          { id: uid('h'), name: '写作 500 字', checks: mockChecks(26, 4) },
          { id: uid('h'), name: '不刷短句超过 30 分钟', checks: mockChecks(26, 6) },
          { id: uid('h'), name: '23:30 前上床', checks: mockChecks(26, 1) }
        ]
      })
    ];

    /* ---- 每日日程 ---- */
    pageByIdIn(s, 'daily').modules = [
      mkMod('timeline', '今日时间轴', 'clock', '#3f8f63', 'full', {
        date: t,
        items: [
          { id: uid('e'), time: '07:20', text: '起床 · 拉伸 10 分钟 · 一杯水', tag: '晨间' },
          { id: uid('e'), time: '09:00', text: '深度工作：模块引擎与拖拽排序', tag: '专注' },
          { id: uid('e'), time: '12:30', text: '午饭 + 楼下走一圈', tag: '休息' },
          { id: uid('e'), time: '14:00', text: '11 月复盘会，过一遍关键结果', tag: '工作' },
          { id: uid('e'), time: '19:00', text: '读《深度工作》30 页', tag: '阅读' },
          { id: uid('e'), time: '22:30', text: '关电脑，写 3 行日记', tag: '收尾' }
        ]
      }),
      mkMod('todo', '三件大事', 'check', '#c98b5e', 'half', {
        items: [
          { id: uid('t'), text: '把首页交互定稿', done: true },
          { id: uid('t'), text: '回复两封重要的邮件', done: false },
          { id: uid('t'), text: '晚上不加班', done: false }
        ]
      }),
      mkMod('note', '生活记录 · 心情与睡眠', 'moon', '#6f7ba8', 'half', {
        text: '睡眠：7 小时 20 分，中途醒过一次。\n心情：平静偏轻快，下午有点闷。\n身体：肩颈紧，晚上做了 10 分钟拉伸。\n\n今天最想记住的瞬间：下楼买咖啡时，风是凉的。'
      })
    ];

    /* ---- 八大模块 ---- */
    pageByIdIn(s, 'life8').modules = [
      mkMod('note', '八个抽屉怎么用', 'bulb', '#3f8f63', 'full', {
        text: '每月底花 10 分钟：给八格各打一个分，写一句备注。\n\n不是为了追求每格都 10 分 —— 而是看清「哪一格连续三个月在掉分」。那通常就是下一步要处理的事。'
      })
    ];

    /* ---- 决策复盘 ---- */
    pageByIdIn(s, 'review').modules = [
      mkMod('review', '最近的三个决定', 'bulb', '#b07cb5', 'full', {
        items: [
          {
            id: uid('r'), title: '要不要开始做「一人公司」', date: '2026.08', score: 4,
            hypothesis: '我假设：每周能稳定挤出 10 小时，就足以跑通一个最小付费闭环。',
            outcome: '实际每周只有 6 小时；但转化率比预期高，第一个月就有 3 个付费用户。判断方向对了，时间预估错了。'
          },
          {
            id: uid('r'), title: '要不要接那个「看起来很大」的项目', date: '2026.10', score: 3,
            hypothesis: '我假设：接大项目能换来更多话语权。',
            outcome: '话语权没换到，换来的是三个月没有周末。教训：先问清楚决策权在谁手上，再谈投入。'
          }
        ]
      }),
      mkMod('note', '我的决策原则', 'compass', '#3f8f63', 'full', {
        text: '1.  reversible 的决定，快；不可逆的决定，慢。\n2.  先写下「我现在的假设是什么」，再动手。\n3.  如果一件事只能靠意志力维持，说明系统设计错了。'
      })
    ];

    /* ---- 自定义页示例 ---- */
    s.pages.push({
      id: uid('p'), name: '一人公司', icon: 'sparkle', builtin: null,
      modules: [
        mkMod('okr', '产品线 · 只做一个', 'target', '#b07cb5', 'half', {
          objectives: [{
            id: uid('o'), title: '把最小闭环跑通，再谈扩张', krs: [
              { id: uid('k'), text: '付费用户', cur: 12, target: 30, unit: '人' },
              { id: uid('k'), text: '月经常性收入', cur: 4200, target: 12000, unit: '元' },
              { id: uid('k'), text: '交付文档完成度', cur: 6, target: 10, unit: '篇' }
            ]
          }]
        }),
        mkMod('metric', '本月订阅收入', 'wallet', '#c98b5e', 'half', {
          value: 12800, unit: '元', label: '目标 15000 元', step: 500,
          history: [{ d: '2026-07', v: 3600 }, { d: '2026-08', v: 5200 }, { d: '2026-09', v: 7400 }, { d: '2026-10', v: 9600 }, { d: '2026-11', v: 12800 }]
        }),
        mkMod('todo', '本周推进', 'check', '#3f8f63', 'full', {
          items: [
            { id: uid('t'), text: '写一版报价页文案', done: true },
            { id: uid('t'), text: '给 5 个老客户发一封回访邮件', done: false },
            { id: uid('t'), text: '把交付流程整理成 SOP', done: false }
          ]
        })
      ]
    });

    return s;
  }

  function pageByIdIn(s, id) {
    return s.pages.filter(function (p) { return p.id === id; })[0];
  }

  /* ---------------------------------------------------------
     交互
     --------------------------------------------------------- */
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.hidden = true; }, 320);
    }, 2000);
  }

  function openSidebar() {
    $('#sidebar').classList.add('open');
    $('#scrim').classList.add('show');
  }
  function closeSidebar() {
    $('#sidebar').classList.remove('open');
    $('#scrim').classList.remove('show');
  }

  function bindGlobal() {
    $('#brand-mark').innerHTML = icon('leaf');
    $('#btn-menu').innerHTML = icon('menu');

    $('#btn-menu').addEventListener('click', openSidebar);
    $('#scrim').addEventListener('click', closeSidebar);
    $('#btn-add-module').addEventListener('click', dialogAddModule);
    $('#btn-add-page').addEventListener('click', dialogAddPage);
    $('#btn-page-menu').addEventListener('click', dialogPages);
    applyActions(actionsOpen());
    $('#btn-actions-toggle').addEventListener('click', toggleActions);

    /* 侧栏顶部系统名称 / 副标题：点击就地重命名 */
    $('#brand-name').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var el = this;
      startRename(el, state.settings.appName || 'Life OS', function (v) {
        state.settings.appName = v;
        save();
        renderBrand();
        toast('系统名称已更新');
      });
    });
    $('#brand-sub').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      startRename(this, state.settings.tagline || '人生管理系统', function (v) {
        state.settings.tagline = v;
        save();
        renderBrand();
        toast('副标题已更新');
      });
    });

    /* 顶栏页面标题：点击改当前页名称 */
    $('#page-title').addEventListener('click', function (e) {
      e.stopPropagation();
      var p = currentPage();
      startPageRename(this, p);
    });

    document.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      if (act) {
        var a = act.dataset.act;
        if (a === 'add') dialogAddModule();
        if (a === 'export') exportData();
        if (a === 'import') $('#file-import').click();
        if (a === 'reset') resetAll();
        if (a === 'sample') {
          if (state.seeded || allModules().length) loadSample();
          else { state = buildSample(); save(); renderNav(); renderPage(); toast('示例数据已载入'); }
        }
        if (a === 'home') {
          state.current = 'overview';
          save(); renderNav(); renderPage();
          e.preventDefault();
        }
        return;
      }
      var brand = e.target.closest('.brand');
      if (brand) e.preventDefault();
    });

    $('#file-import').addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0];
      if (f) importData(f);
      e.target.value = '';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!overlay.hidden) closeDialog();
        closeMenus();
        closeSidebar();
      }
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeDialog();
    });
  }

  /* ---------------------------------------------------------
     顶栏操作区：可折叠（状态随账号持久化）
     --------------------------------------------------------- */
  function applyActions(open) {
    var box = $('#topbar-actions');
    var btn = $('#btn-actions-toggle');
    var bar = $('#topbar');
    if (!box || !btn) return;
    box.hidden = !open;
    bar.classList.toggle('actions-hidden', !open);
    btn.innerHTML = icon(open ? 'chevronRight' : 'chevronLeft');
    btn.title = open ? '隐藏「页签设置 / 添加模块」' : '展开「页签设置 / 添加模块」';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function actionsOpen() { return !(state && state.settings && state.settings.actionsOpen === false); }

  function toggleActions() {
    state.settings.actionsOpen = !(state.settings.actionsOpen !== false);
    save();
    applyActions(state.settings.actionsOpen);
    toast(state.settings.actionsOpen ? '操作区已展开' : '操作区已隐藏，点小箭头展开');
  }

  /* ---------------------------------------------------------
     邮箱登录（纯前端，账号与数据都只存在本机浏览器）
     --------------------------------------------------------- */
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function safeDel(k) { try { localStorage.removeItem(k); } catch (e) { } }

  function keyFor(email) { return STORE_KEY + '::' + email; }
  function normalizeEmail(v) { return String(v || '').trim().toLowerCase(); }
  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function hashPass(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  function readAccounts() {
    try {
      var a = JSON.parse(safeGet(AUTH_KEY) || '{}');
      return (a && typeof a === 'object' && !Array.isArray(a)) ? a : {};
    } catch (e) { return {}; }
  }
  function writeAccounts(a) { safeSet(AUTH_KEY, JSON.stringify(a)); }
  function currentEmail() { return normalizeEmail(safeGet(SESSION_KEY)); }

  /* 旧版 lifeos.v1 数据在首次登录时继承给该账号（只继承一次，两份互不影响） */
  function inheritLegacy(email) {
    if (safeGet(MIGRATED_KEY)) return false;
    var legacy = safeGet(STORE_KEY);
    safeSet(MIGRATED_KEY, '1');
    if (!legacy) return false;
    var target = keyFor(email);
    if (safeGet(target)) return false;
    safeSet(target, legacy);
    return true;
  }

  function showAuth(msg) {
    document.documentElement.classList.add('locked');
    document.documentElement.classList.remove('authed');
    state = initialState();
    var auth = $('#auth');
    auth.hidden = false;
    var err = $('#auth-error');
    if (msg) { err.textContent = msg; err.hidden = false; } else { err.hidden = true; }
    $('#auth-mark').innerHTML = icon('leaf');
    setTimeout(function () { var e = $('#auth-email'); if (e) e.focus(); }, 60);
  }

  function enterApp(email, isNew) {
    activeKey = keyFor(email);
    var inherited = inheritLegacy(email);
    state = loadState();
    $('#auth').hidden = true;
    document.documentElement.classList.remove('locked');
    document.documentElement.classList.add('authed');
    $('#user-mail').textContent = email;
    $('#user-mail').title = email;
    renderNav();
    renderPage();
    if (inherited) toast('已把原有本机数据继承到 ' + email);
    else if (isNew) toast('已为该邮箱创建本地账号');
    else toast('欢迎回来，' + email);
  }

  function bindAuth() {
    $('#auth-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = normalizeEmail($('#auth-email').value);
      var pass = $('#auth-pass').value || '';
      var err = $('#auth-error');
      function fail(m) { err.textContent = m; err.hidden = false; }
      if (!isValidEmail(email)) return fail('请输入有效的邮箱地址');
      if (pass.length < 4) return fail('密码至少 4 位');
      var acc = readAccounts();
      var rec = acc[email];
      if (rec) {
        if (rec.h !== hashPass(pass)) return fail('密码不正确，请重试');
      } else {
        acc[email] = { h: hashPass(pass), at: Date.now() };
        writeAccounts(acc);
      }
      err.hidden = true;
      safeSet(SESSION_KEY, email);
      $('#auth-pass').value = '';
      enterApp(email, !rec);
    });

    $('#auth-clear').addEventListener('click', function () {
      if (!confirm('这会清除本机保存的全部账号与数据，且不可恢复。继续？')) return;
      var keys = [];
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf('lifeos.') === 0) keys.push(k);
        }
      } catch (e) { }
      keys.forEach(safeDel);
      location.reload();
    });

    $('#btn-logout').addEventListener('click', function () {
      if (!confirm('退出登录？数据已按邮箱保存在本机，用同一邮箱可再次进入。')) return;
      safeDel(SESSION_KEY);
      location.reload();
    });
  }

  /* ---------------------------------------------------------
     启动
     --------------------------------------------------------- */
  function boot() {
    bindGlobal();
    bindAuth();
    var email = currentEmail();
    if (email && readAccounts()[email]) {
      enterApp(email);
    } else {
      if (email) safeDel(SESSION_KEY);
      showAuth();
    }
    document.body.classList.add('ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
