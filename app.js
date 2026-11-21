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
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.6 20.5a7.4 7.4 0 0 1 14.8 0"/>',
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
    page: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16.4 16.4 4.1 4.1"/>',
    auto: '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2Z" fill="currentColor" stroke="none"/>',
    folder: '<path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.2l1.8 2.2h8A2 2 0 0 1 20.5 9.7v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z"/>',
    cmd: '<path d="M8 4.5A2.5 2.5 0 1 1 10.5 7v10A2.5 2.5 0 1 1 8 14.5h8A2.5 2.5 0 1 1 13.5 17V7A2.5 2.5 0 1 1 16 9.5H8"/>',
    cornerDown: '<path d="M4 5v6a3 3 0 0 0 3 3h13"/><path d="m15.5 9 4.5 5-4.5 5"/>'
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
  var THEME_KEY = 'lifeos.theme.v1';      /* 外观偏好：auto / light / dark */
  var activeKey = STORE_KEY;              /* 当前账号的数据键 */

  /* ---------------------------------------------------------
     外观（浅色 / 深色 / 跟随系统）与动效偏好
     --------------------------------------------------------- */
  var darkMedia = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var motionMedia = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function motionOK() {
    return !(motionMedia && motionMedia.matches);
  }

  function themePref() {
    var v = 'auto';
    try { v = localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) { v = 'auto'; }
    return v === 'light' || v === 'dark' ? v : 'auto';
  }

  function resolvedTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return darkMedia && darkMedia.matches ? 'dark' : 'light';
  }

  function applyTheme(mode, silent) {
    var m = mode || themePref();
    var real = resolvedTheme(m);
    /* 换主题瞬间：临时开启全局颜色过渡，图标做一次旋转 */
    var rootEl = document.documentElement;
    if (motionOK()) {
      rootEl.classList.add('theme-fade');
      clearTimeout(themeFadeTimer);
      themeFadeTimer = setTimeout(function () { rootEl.classList.remove('theme-fade'); }, 320);
    }
    rootEl.setAttribute('data-theme', real);
    rootEl.style.colorScheme = real;
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', real === 'dark' ? '#0b0b0d' : '#fbfbfd');

    var btn = $('#btn-theme');
    if (btn) {
      var label = m === 'auto' ? '跟随系统' : (m === 'light' ? '浅色' : '深色');
      btn.innerHTML = icon(m === 'auto' ? 'auto' : (m === 'light' ? 'sun' : 'moon'));
      btn.title = '外观：' + label + '（点击切换）';
      btn.setAttribute('aria-label', '外观：' + label + '，点击切换');
      btn.dataset.theme = m;
      if (!silent && motionOK()) {
        btn.classList.remove('turning');
        void btn.offsetWidth;
        btn.classList.add('turning');
        setTimeout(function () { btn.classList.remove('turning'); }, 320);
      }
    }
    if (!silent) {
      toast('外观已切换为「' + (m === 'auto' ? '跟随系统' : label2(m)) + '」', icon(m === 'auto' ? 'auto' : (m === 'light' ? 'sun' : 'moon')));
    }
  }

  var themeFadeTimer = 0;

  function label2(m) { return m === 'light' ? '浅色' : '深色'; }

  function cycleTheme() {
    var order = ['auto', 'light', 'dark'];
    var next = order[(order.indexOf(themePref()) + 1) % order.length];
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { }
    applyTheme(next);
  }

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

  /* 数字滚动递增：data-to 为目标值，260ms 内缓出逼近（reduced-motion 下直接落位） */
  function animateNums(scope, sel) {
    $$(sel, scope).forEach(function (el) {
      var to = Number(el.dataset.to || 0);
      if (!isFinite(to)) return;
      if (!motionOK()) { el.textContent = to; return; }
      var t0 = 0;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / 260);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* 进度条从 0 增长到 data-w */
  function animateBars(scope, sel) {
    var bars = $$(sel, scope);
    if (!bars.length) return;
    if (!motionOK()) {
      bars.forEach(function (b) { b.style.width = (b.dataset.w || 0) + '%'; });
      return;
    }
    requestAnimationFrame(function () {
      bars.forEach(function (b) { b.style.width = (b.dataset.w || 0) + '%'; });
    });
  }
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
  /* 日期 / 月份字符串工具：日程与月度计划共用同一套 'YYYY-MM-DD'、'YYYY-MM' 口径 */
  function isDateStr(v) { return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v); }
  function isMonthStr(v) { return typeof v === 'string' && /^\d{4}-\d{2}$/.test(v); }
  function parseISO(s) {
    var p = String(s || '').split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) || 1);
  }
  function shiftISO(s, n) {
    var d = isDateStr(s) ? parseISO(s) : new Date();
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  function shiftMonth(s, n) {
    var p = (isMonthStr(s) ? s : monthKey(new Date())).split('-');
    return monthKey(new Date(Number(p[0]), Number(p[1]) - 1 + n, 1));
  }
  function monthLabel(m) {
    var p = String(m || '').split('-');
    return p[0] + ' 年 ' + Math.max(1, Number(p[1]) || 1) + ' 月';
  }
  function shortDate(s) { return isDateStr(s) ? cnShort(parseISO(s)) : String(s || ''); }
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

  /* 窗口尺寸变化后重排文本域高度（防抖） */
  var reflowLazy = debounce(function () { autoGrow(document); }, 200);

  /* ---------------------------------------------------------
     状态
     --------------------------------------------------------- */
  var state;
  /* 非 null 时表示正在渲染「每日日程」页，值为当前查看的 'YYYY-MM-DD' */
  var dailyView = null;
  /* 旧数据迁移标记：加载时若给日程任务补了 id / 日期，需立即落盘，保证引用串稳定 */
  var dailyMigrated = false;

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
      settings: { name: '', fold: { sys: false, cus: false, blocks: {} } },
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
    var foldSrc = (s.settings.fold && typeof s.settings.fold === 'object' && !Array.isArray(s.settings.fold))
      ? s.settings.fold : {};
    s.settings.fold = {
      sys: !!foldSrc.sys,
      cus: !!foldSrc.cus,
      blocks: (foldSrc.blocks && typeof foldSrc.blocks === 'object' && !Array.isArray(foldSrc.blocks)) ? foldSrc.blocks : {}
    };
    /* 我的模块页分组已移除，折叠状态不再保留 cus 键 */
    if (s.settings.fold && 'cus' in s.settings.fold) delete s.settings.fold.cus;
    /* 每日日程当前查看的日期 / 月度计划当前查看的月份（跨刷新、跨月切换都靠这两项） */
    s.settings.dailyDate = isDateStr(s.settings.dailyDate) ? s.settings.dailyDate : today();
    s.settings.planMonth = isMonthStr(s.settings.planMonth) ? s.settings.planMonth : monthKey(new Date());
    /* 月度计划清单：{ 'YYYY-MM': ['pageId::moduleId::itemId', ...] }，存引用不存副本 */
    s.plan = (s.plan && typeof s.plan === 'object' && !Array.isArray(s.plan)) ? s.plan : {};
    Object.keys(s.plan).forEach(function (k) {
      if (!Array.isArray(s.plan[k])) { delete s.plan[k]; return; }
      s.plan[k] = s.plan[k].filter(function (x) { return typeof x === 'string' && x.indexOf('::') > 0; });
    });
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
    s.pages.forEach(function (pg) { normalizeOkrPage(pg); });
    /* 旧数据兼容：为每日日程里的每条任务补稳定唯一 id 与所属日期，供月度计划引用 */
    s.pages.forEach(function (pg) { migrateDailyTasks(pg, s); });
    s.pages = orderBuiltinPages(s.pages);
    /* 侧栏已不再展示自定义页：当前页若指向隐藏页，回退到系统页首页 */
    var visible = s.pages.filter(function (p) { return p.builtin; });
    if (!visible.length) visible = s.pages.slice();
    if (!visible.some(function (p) { return p.id === s.current; })) {
      s.current = visible[0].id;
      hiddenPageFallback = true;
    }
    return s;
  }

  /* 系统页固定按「概览 → 每日 → 月度 → 年度 → 八大模块 → 决策复盘」的时间粒度排序 */
  function orderBuiltinPages(list) {
    var rank = function (p) { return PAGE_ORDER.indexOf(p.builtin); };
    var built = list.filter(function (p) { return p.builtin; }).sort(function (a, b) { return rank(a) - rank(b); });
    var rest = list.filter(function (p) { return !p.builtin; });
    return built.concat(rest);
  }

  var hiddenPageFallback = false;

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

  /* 旧数据兼容：OKR 的目标次数可能缺失或为 0，统一补成正整数（默认 10） */
  function normalizeOkrPage(pg) {
    (pg.modules || []).forEach(function (m) {
      if (!m || m.type !== 'okr') return;
      m.data = (m.data && typeof m.data === 'object') ? m.data : {};
      m.data.objectives = (Array.isArray(m.data.objectives) ? m.data.objectives : []).filter(Boolean).map(function (o) {
        o.id = o.id || uid('o');
        o.title = typeof o.title === 'string' ? o.title : '新的目标';
        o.krs = (Array.isArray(o.krs) ? o.krs : []).filter(Boolean).map(function (k) {
          k.id = k.id || uid('k');
          k.text = typeof k.text === 'string' ? k.text : '关键结果';
          k.cur = Math.max(0, Number(k.cur) || 0);
          var t = Number(k.target);
          k.target = (isFinite(t) && t > 0) ? Math.floor(t) : 10;
          /* 旧数据里完成数可能大于目标，向上兼容，避免出现 12/10 这类怪值 */
          if (k.cur > k.target) k.target = Math.ceil(k.cur);
          k.unit = typeof k.unit === 'string' ? k.unit : '';
          return k;
        });
        return o;
      });
    });
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
    if (!sys) return;
    sys.innerHTML = '';
    /* 侧栏只保留系统页分组；自定义页数据仍保存在本地，仅不再渲染入口 */
    state.pages.forEach(function (p) {
      if (!p.builtin) return;
      var b = document.createElement('div');
      b.className = 'nav-item' + (p.id === state.current ? ' active' : '');
      b.setAttribute('role', 'button');
      b.tabIndex = 0;
      b.dataset.page = p.id;
      if (p.id === state.current) b.setAttribute('aria-current', 'page');
      b.setAttribute('aria-label', p.name + (p.builtin ? '（系统页）' : ''));
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

      sys.appendChild(b);
    });
  }

  var NAV_GROUPS = [
    { group: '#group-system', btn: '#fold-system', key: 'sys', label: '系统页' }
  ];

  function applyNavFold() {
    var f = foldState();
    NAV_GROUPS.forEach(function (g) {
      var box = $(g.group), btn = $(g.btn);
      if (!box || !btn) return;
      var on = !!f[g.key];
      box.classList.toggle('is-folded', on);
      btn.setAttribute('aria-expanded', on ? 'false' : 'true');
      btn.title = (on ? '展开' : '折叠') + '「' + g.label + '」';
      btn.setAttribute('aria-label', (on ? '展开' : '折叠') + '「' + g.label + '」');
    });
  }

  function bindNavFold() {
    NAV_GROUPS.forEach(function (g) {
      var btn = $(g.btn);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var f = foldState();
        if (f[g.key]) delete f[g.key]; else f[g.key] = true;
        save();
        applyNavFold();
      });
    });
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

  /* ---------------------------------------------------------
     折叠：侧栏分组 + 内容区块（状态按账号持久化到 settings.fold）
     --------------------------------------------------------- */
  function foldState() {
    if (!state.settings.fold || typeof state.settings.fold !== 'object') {
      state.settings.fold = { sys: false, cus: false, blocks: {} };
    }
    var f = state.settings.fold;
    if (!f.blocks || typeof f.blocks !== 'object' || Array.isArray(f.blocks)) f.blocks = {};
    return f;
  }

  function foldGet(key) {
    return !!foldState().blocks[key];
  }

  function foldSet(key, on) {
    var f = foldState();
    if (on) f.blocks[key] = true; else delete f.blocks[key];
    save();
  }

  /* 文本域自动撑高：只在「已挂载且可见」时测量。
     脱离文档或 display:none 时 scrollHeight 为 0，直接写死会把输入框压成 0 高。 */
  function autoGrow(root) {
    $$('.rev-field textarea, .note-area', root || document).forEach(function (ta) {
      if (!ta.isConnected || !ta.getClientRects().length) return;
      var min = ta.classList.contains('note-area') ? 120 : 36;
      ta.style.height = 'auto';
      var h = ta.scrollHeight;
      // border-box：把上下边框高度补回去，避免最后一两像素被裁
      var extra = Math.max(0, ta.offsetHeight - ta.clientHeight);
      ta.style.height = Math.max(min, h + extra) + 'px';
    });
  }

  /* 把 sec 内除表头外的内容包进可折叠容器，并在表头右侧放一个旋转箭头按钮。
     折叠仅作用于「整块」层级（分组 / 独立区块），用 display 切换，
     不使用 grid 0fr + overflow:hidden —— 那会把内部卡片正文裁成 0 高。 */
  function foldSection(sec, key, headSel) {
    if (!sec) return sec;
    var head = $(headSel, sec);
    if (!head) return sec;

    var body = document.createElement('div');
    body.className = 'fold-body';
    var inner = document.createElement('div');
    inner.className = 'fold-inner';
    Array.prototype.slice.call(sec.children).forEach(function (c) {
      if (c !== head) inner.appendChild(c);
    });
    body.appendChild(inner);
    sec.appendChild(body);

    var label = (head.querySelector('h2') || head.querySelector('.ol-badge') || {}).textContent || '区块';
    label = String(label).trim().replace(/^＋\s*/, '');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fold-btn';
    btn.innerHTML = icon('chevronDown');

    if (head.classList.contains('section-head')) {
      var tools = head.querySelector('.head-tools');
      if (!tools) {
        tools = document.createElement('div');
        tools.className = 'head-tools';
        Array.prototype.slice.call(head.children).forEach(function (c) {
          if (c.tagName === 'BUTTON') tools.appendChild(c);
        });
        head.appendChild(tools);
      }
      tools.appendChild(btn);
    } else {
      head.appendChild(btn);
    }

    var on = foldGet(key);
    var hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'fold-hint';
    hint.textContent = '已收起「' + label + '」，点击展开';
    sec.appendChild(hint);

    function apply() {
      sec.classList.toggle('is-folded', on);
      body.hidden = on;
      hint.hidden = !on;
      btn.setAttribute('aria-expanded', on ? 'false' : 'true');
      btn.title = (on ? '展开' : '折叠') + '「' + label + '」';
      btn.setAttribute('aria-label', (on ? '展开' : '折叠') + '「' + label + '」');
      // 展开后重新测量内部文本域高度（收起期间无法测量）
      if (!on) requestAnimationFrame(function () { autoGrow(sec); });
    }
    function toggle() {
      on = !on;
      foldSet(key, on);
      apply();
    }
    btn.addEventListener('click', toggle);
    hint.addEventListener('click', toggle);
    apply();
    return sec;
  }

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

    foldSection(sec, 'todayLine', '.ol-top');
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
    $('#page-title').setAttribute('aria-label', '当前页：' + page.name + '，点击重命名');
    document.title = page.name + ' · ' + (state.settings.appName || 'Life OS');
    canvas.innerHTML = '';
    /* 每日日程页：所有日程模块只渲染「当前查看日期」的任务；其它页面为 null（渲染全部） */
    dailyView = page.builtin === 'daily' ? (isDateStr(state.settings.dailyDate) ? state.settings.dailyDate : today()) : null;

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
    if (page.builtin === 'daily') canvas.appendChild(dailyBarBlock());
    if (page.builtin === 'monthly') canvas.appendChild(agendaBlock());
    if (page.builtin === 'life8') canvas.appendChild(boardBlock());
    if (page.builtin === 'review') canvas.appendChild(loopBlock());

    // 模块区（整块可折叠）
    var modsWrap = document.createElement('section');
    modsWrap.className = 'modules-wrap';

    var head = document.createElement('div');
    head.className = 'section-head reveal';
    head.innerHTML = '<div><h2>模块画布</h2><p>' + page.modules.length + ' 个模块 · 拖拽右侧手柄可排序</p></div>' +
      '<button class="solid-btn head-add" type="button" data-act="add">＋ 添加模块</button>';
    modsWrap.appendChild(head);

    var grid = document.createElement('div');
    grid.className = 'modules';
    grid.id = 'modules';
    page.modules.forEach(function (m, i) {
      var card = renderCard(m);
      card.classList.add('reveal');
      grid.appendChild(card);
    });
    modsWrap.appendChild(grid);
    if (!page.modules.length) modsWrap.appendChild(emptyBlock(page));
    foldSection(modsWrap, 'modules:' + page.id, '.section-head');
    canvas.appendChild(modsWrap);
    attachDrag(grid);



    // 底部
    var foot = document.createElement('div');
    foot.className = 'section-head reveal';
    foot.style.cssText = 'margin-top:40px;justify-content:center';
    foot.innerHTML = '<button class="ghost-btn" data-act="add">＋ 添加一个模块</button>';
    canvas.appendChild(foot);

    observeReveal(canvas);
    // 卡片挂载到文档后再测量文本域高度（脱离文档时测不到高度）
    requestAnimationFrame(function () { autoGrow(canvas); });
    // 页面切换：淡入 + 轻微上移（移除后强制回流以便反复触发）
    canvas.classList.remove('page-enter');
    void canvas.offsetWidth;
    canvas.classList.add('page-enter');
    clearBusy();
  }

  function pageIntro(page) {
    var now = new Date();
    var name = userName();
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
      case 'monthly': {
        var pm = isMonthStr(state.settings.planMonth) ? state.settings.planMonth : monthKey(now);
        var pmm = Number(pm.slice(5, 7));
        return {
          eyebrow: '月度 · ' + pm.slice(0, 4) + ' 年 ' + pmm + ' 月',
          h1: pmm + ' 月，拆到<em>能立刻动手</em>。',
          lede: '年度目标落到这个月，就变成几个可量化的结果和一张打卡网格；当月日程任务也会自动汇总到这里。'
        };
      }
      case 'daily': {
        var dd = isDateStr(state.settings.dailyDate) ? parseISO(state.settings.dailyDate) : now;
        return {
          eyebrow: cnDate(dd) + ' · 周' + WEEK[dd.getDay()],
          h1: dd.getTime() === parseISO(today()).getTime() ? '今天的<em>时间轴</em>。' : esc(cnShort(dd)) + '，<em>这一天</em>。',
          lede: '一天不需要很满，只需要有几段是真正专注的；这一天的任务会自动出现在月度计划里。'
        };
      }
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

  /* ---------------------------------------------------------
     每日日程 ⇄ 月度计划
     同一份数据源：任务始终存在日程模块的 data.items 里，月度计划只存
     'pageId::moduleId::itemId' 引用串，因此改文字 / 勾完成是双向同步的。
     --------------------------------------------------------- */
  function dailyPage() {
    return state ? state.pages.filter(function (p) { return p.builtin === 'daily'; })[0] : null;
  }

  /* 每日日程页只显示「当前查看日期」的任务；其它页面显示全部（历史行为不变） */
  function visibleDailyItems(list) {
    var all = (list || []).filter(Boolean);
    if (!dailyView) return all;
    return all.filter(function (i) { return (i.date || '') === dailyView; });
  }

  function migrateDailyTasks(pg, s) {
    if (!pg || pg.builtin !== 'daily') return;
    var fallback = (s && s.settings && isDateStr(s.settings.dailyDate)) ? s.settings.dailyDate : today();
    /* 旧数据可能没有 id（或历史上有重复 id），这里统一补全并去重，
       引用串 'pageId::moduleId::itemId' 才能稳定不失效 */
    var used = {};
    (pg.modules || []).forEach(function (m) {
      if (!m || (m.type !== 'todo' && m.type !== 'timeline')) return;
      m.data = (m.data && typeof m.data === 'object') ? m.data : (blankData(m.type) || {});
      var modDate = isDateStr(m.data.date) ? m.data.date : fallback;
      var items = Array.isArray(m.data.items) ? m.data.items.filter(Boolean) : [];
      items.forEach(function (it) {
        var pre = m.type === 'timeline' ? 'e' : 't';
        if (!it.id || typeof it.id !== 'string' || used[it.id]) { it.id = uid(pre); dailyMigrated = true; }
        while (used[it.id]) { it.id = uid(pre); dailyMigrated = true; }
        used[it.id] = 1;
        it.text = String(it.text == null ? '' : it.text);
        it.done = !!it.done;
        if (!isDateStr(it.date)) { it.date = modDate; dailyMigrated = true; }
        if (m.type === 'timeline') {
          it.time = it.time || '09:00';
          it.tag = typeof it.tag === 'string' ? it.tag : '';
        }
      });
      m.data.items = items;
      if (m.type === 'timeline') m.data.date = modDate;
    });
  }

  function taskRef(pageId, moduleId, itemId) { return pageId + '::' + moduleId + '::' + itemId; }

  /* 汇总某个月份（'YYYY-MM'）全部日程任务，按日期、时间排序 */
  function collectDayTasks(month) {
    var pg = dailyPage();
    var out = [];
    if (!pg || !isMonthStr(month)) return out;
    var seen = {};
    (pg.modules || []).forEach(function (m) {
      if (!m || (m.type !== 'todo' && m.type !== 'timeline')) return;
      ((m.data && m.data.items) || []).forEach(function (it) {
        if (!it || !isDateStr(it.date) || it.date.slice(0, 7) !== month) return;
        var key = taskRef(pg.id, m.id, it.id);
        if (seen[key]) return;
        seen[key] = 1;
        out.push({
          key: key, date: it.date, text: it.text || '', done: !!it.done,
          time: it.time || '', tag: it.tag || '', type: m.type,
          pageId: pg.id, moduleId: m.id, item: it
        });
      });
    });
    out.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      if (a.time !== b.time) return (a.time || '') < (b.time || '') ? -1 : 1;
      return (a.text || '') < (b.text || '') ? -1 : 1;
    });
    return out;
  }

  function planPicks(month) {
    state.plan = state.plan || {};
    if (!Array.isArray(state.plan[month])) state.plan[month] = [];
    return state.plan[month];
  }

  function goToDate(date) {
    state.settings.dailyDate = isDateStr(date) ? date : today();
    var pg = dailyPage();
    if (pg) state.current = pg.id;
    save();
    renderNav();
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* 每日日程：日期切换条 */
  function dailyBarBlock() {
    var d = isDateStr(state.settings.dailyDate) ? state.settings.dailyDate : today();
    var dt = parseISO(d);
    var isToday = d === today();
    var total = collectDayTasks(d.slice(0, 7)).filter(function (t) { return t.date === d; }).length;

    var sec = document.createElement('section');
    sec.className = 'day-bar reveal';
    sec.innerHTML =
      '<div class="day-bar-main">' +
      '<button class="icon-btn day-nav" type="button" data-day="-1" aria-label="前一天" title="前一天">' + icon('chevronLeft') + '</button>' +
      '<div class="day-now">' +
      '<strong>' + esc(cnDate(dt)) + '</strong>' +
      '<span>周' + WEEK[dt.getDay()] + ' · ' + total + ' 项任务</span>' +
      (isToday ? '<em class="day-tag">今天</em>' : '') +
      '</div>' +
      '<button class="icon-btn day-nav" type="button" data-day="1" aria-label="后一天" title="后一天">' + icon('chevronRight') + '</button>' +
      '<input class="day-input" type="date" value="' + d + '" aria-label="选择日期" />' +
      '</div>' +
      '<div class="day-bar-side">' +
      (isToday ? '' : '<button class="ghost-btn tiny" type="button" data-day-now>回到今天</button>') +
      '<button class="ghost-btn tiny" type="button" data-open-month>月度计划' + icon('arrowRight') + '</button>' +
      '</div>';

    $$('[data-day]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        state.settings.dailyDate = shiftISO(d, Number(b.dataset.day));
        save();
        renderPage();
      });
    });
    var now = $('[data-day-now]', sec);
    if (now) now.addEventListener('click', function () {
      state.settings.dailyDate = today();
      save();
      renderPage();
    });
    var om = $('[data-open-month]', sec);
    if (om) om.addEventListener('click', function () {
      var mp = state.pages.filter(function (p) { return p.builtin === 'monthly'; })[0];
      if (!mp) { toast('没有找到月度计划页'); return; }
      state.current = mp.id;
      save();
      renderNav();
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var input = $('.day-input', sec);
    input.addEventListener('change', function () {
      if (!isDateStr(input.value)) { input.value = d; return; }
      state.settings.dailyDate = input.value;
      save();
      renderPage();
    });
    return sec;
  }

  /* 月度计划：本月日程任务聚合 + 计划清单（引用） */
  function agendaBlock() {
    var sec = document.createElement('section');
    sec.className = 'agenda reveal';
    sec.id = 'agenda-block';
    fillAgenda(sec);
    return sec;
  }

  function fillAgenda(sec) {
    var month = isMonthStr(state.settings.planMonth) ? state.settings.planMonth : monthKey(new Date());
    var tasks = collectDayTasks(month);
    var byKey = {};
    tasks.forEach(function (t) { byKey[t.key] = t; });

    var picks = planPicks(month);
    var validPicks = picks.filter(function (k) { return !!byKey[k]; });
    if (validPicks.length !== picks.length) { state.plan[month] = validPicks; save(); }
    var pickedSet = {};
    validPicks.forEach(function (k) { pickedSet[k] = 1; });

    var groups = [];
    var cur = null;
    tasks.forEach(function (t) {
      if (!cur || cur.date !== t.date) { cur = { date: t.date, items: [] }; groups.push(cur); }
      cur.items.push(t);
    });

    var doneN = tasks.filter(function (t) { return t.done; }).length;

    var html =
      '<div class="agenda-head">' +
      '<div class="agenda-title"><h2>本月日程任务</h2>' +
      '<p>' + tasks.length + ' 项 · 完成 ' + doneN + ' 项 · 已加入计划 ' + validPicks.length + ' 项</p></div>' +
      '<div class="agenda-nav">' +
      '<button class="icon-btn" type="button" data-month="-1" aria-label="上一月" title="上一月">' + icon('chevronLeft') + '</button>' +
      '<span class="agenda-month">' + esc(monthLabel(month)) + '</span>' +
      '<button class="icon-btn" type="button" data-month="1" aria-label="下一月" title="下一月">' + icon('chevronRight') + '</button>' +
      '<button class="ghost-btn tiny" type="button" data-month-now>本月</button>' +
      '</div>' +
      '</div>';

    if (!tasks.length) {
      html +=
        '<div class="agenda-empty">' +
        '<span class="agenda-empty-icon">' + icon('calendar') + '</span>' +
        '<p>本月还没有日程任务</p>' +
        '<span class="agenda-empty-sub">去每日日程加几条，这里会自动聚合出来，并可直接加入本月计划。</span>' +
        '<button class="solid-btn" type="button" data-goto-daily>去每日日程添加</button>' +
        '</div>';
    } else {
      html += '<div class="agenda-groups">' + groups.map(function (g) {
        var pending = g.items.filter(function (t) { return !t.done; }).length;
        return '<div class="agenda-group">' +
          '<div class="agenda-day">' +
          '<span class="agenda-date">' + esc(shortDate(g.date)) + '</span>' +
          '<span class="agenda-day-meta">' + g.items.length + ' 项' + (pending ? ' · 待办 ' + pending : ' · 全部完成') + '</span>' +
          '<button class="link-btn" type="button" data-jump="' + g.date + '">查看当天' + icon('arrowRight') + '</button>' +
          '</div>' +
          g.items.map(function (t) {
            var inPlan = !!pickedSet[t.key];
            return '<div class="agenda-item' + (t.done ? ' done' : '') + '" data-key="' + esc(t.key) + '">' +
              '<button class="check' + (t.done ? ' on' : '') + '" type="button" data-check' +
              ' aria-label="' + (t.done ? '标记为未完成' : '标记为完成') + '">' + icon('check') + '</button>' +
              '<button class="agenda-text" type="button" data-jump="' + t.date + '" title="点击跳到当天">' + esc(t.text || '（未命名任务）') + '</button>' +
              (t.time && t.type === 'timeline' ? '<span class="agenda-time">' + esc(t.time) + '</span>' : '') +
              (t.tag ? '<span class="agenda-tag">' + esc(t.tag) + '</span>' : '') +
              '<button class="pick-btn' + (inPlan ? ' on' : '') + '" type="button" data-pick title="' +
              (inPlan ? '点击移出本月计划' : '加入本月计划（引用，不复制）') + '">' +
              (inPlan ? '已加入' : '＋ 加入计划') + '</button>' +
              '</div>';
          }).join('') +
          '</div>';
      }).join('') + '</div>';
    }

    if (validPicks.length) {
      html +=
        '<div class="plan-list">' +
        '<div class="plan-head"><h3>本月计划清单</h3><span>引用自每日日程 · 完成状态双向同步</span></div>' +
        validPicks.map(function (k) {
          var t = byKey[k];
          return '<div class="plan-item' + (t.done ? ' done' : '') + '" data-key="' + esc(k) + '">' +
            '<button class="check' + (t.done ? ' on' : '') + '" type="button" data-check>' + icon('check') + '</button>' +
            '<span class="plan-date">' + esc(Number(t.date.slice(5, 7)) + '/' + Number(t.date.slice(8, 10))) + '</span>' +
            '<button class="agenda-text" type="button" data-jump="' + t.date + '" title="点击跳到当天">' + esc(t.text || '（未命名任务）') + '</button>' +
            '<button class="plan-off" type="button" data-unpick title="移出计划" aria-label="移出计划">' + icon('x') + '</button>' +
            '</div>';
        }).join('') +
        '</div>';
    }

    sec.innerHTML = html;

    function refresh() { fillAgenda(sec); }

    $$('[data-month]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        state.settings.planMonth = shiftMonth(month, Number(b.dataset.month));
        save();
        renderPage();   /* 整页重绘：页头月份与聚合结果一起刷新 */
      });
    });
    var nowBtn = $('[data-month-now]', sec);
    if (nowBtn) nowBtn.addEventListener('click', function () {
      state.settings.planMonth = monthKey(new Date());
      save();
      renderPage();
    });
    var gd = $('[data-goto-daily]', sec);
    if (gd) gd.addEventListener('click', function () { goToDate(today()); });

    $$('[data-jump]', sec).forEach(function (b) {
      b.addEventListener('click', function () { goToDate(b.dataset.jump); });
    });

    $$('[data-check]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        var host = b.closest('[data-key]');
        var t = host ? byKey[host.dataset.key] : null;
        if (!t) { toast('这条任务已不在日程里，正在刷新'); refresh(); return; }
        t.item.done = !t.item.done;
        save();
        refresh();
      });
    });

    $$('[data-pick]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        var host = b.closest('[data-key]');
        if (!host) return;
        var key = host.dataset.key;
        var arr = planPicks(month);
        var i = arr.indexOf(key);
        if (i > -1) { arr.splice(i, 1); toast('已从本月计划移出'); }
        else { arr.push(key); toast('已加入本月计划（引用，改动会同步）'); }
        save();
        refresh();
      });
    });

    $$('[data-unpick]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        var host = b.closest('[data-key]');
        if (!host) return;
        var arr = planPicks(month);
        var i = arr.indexOf(host.dataset.key);
        if (i > -1) arr.splice(i, 1);
        save();
        toast('已从本月计划移出');
        refresh();
      });
    });
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
        num: todoDone, unit: '/ ' + todoTotal,
        note: todoTotal ? '完成度 ' + Math.round(todoDone / todoTotal * 100) + '%' : '还没有待办模块',
        bar: todoTotal ? Math.round(todoDone / todoTotal * 100) : 0
      },
      {
        label: '本月打卡', icon: 'grid', tone: '#c98b5e',
        num: checks, unit: '次',
        note: '平均完成率 ' + checkRate + '%',
        bar: clamp(checkRate, 0, 100)
      },
      {
        label: '目标进度', icon: 'target', tone: '#5b93bf',
        num: avgKr, unit: '%',
        note: krCount ? '共 ' + krCount + ' 个关键结果' : '先去年度目标页设定',
        bar: avgKr
      },
      {
        label: '决策复盘', icon: 'bulb', tone: '#b07cb5',
        num: revCount, unit: '条',
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
            '<span class="ov-value"><span class="num" data-to="' + c.num + '">0</span><small>' + esc(c.unit) + '</small></span>' +
            '<span class="ov-note">' + esc(c.note) + '</span>' +
          '</div>' +
          '<span class="ov-bar"><i data-w="' + clamp(c.bar, 0, 100) + '" style="width:0"></i></span>' +
          '</article>';
      }).join('') +
      '</section>';

    var section = document.createElement('div');
    section.innerHTML = html;
    var sec = section.firstChild;
    /* 挂载后再播放：数字滚动递增 + 进度条从 0 增长 */
    requestAnimationFrame(function () { animateNums(sec, '.ov-value .num'); animateBars(sec, '.ov-bar i'); });
    return sec;
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
        '<div class="board-bar"><i data-w="' + (d.score * 10) + '" style="width:0;background:' + d.color + '"></i></div>' +
        '<input class="board-range" type="range" min="0" max="10" step="1" value="' + d.score + '" aria-label="' + esc(d.name) + ' 评分">' +
        '<input class="board-note" placeholder="一句话备注" value="' + esc(d.note || '') + '">';
      var range = $('.board-range', card);
      var note = $('.board-note', card);
      range.addEventListener('input', function () {
        d.score = Number(range.value);
        $('.board-score', card).innerHTML = d.score + '<small> / 10</small>';
        var bar = $('.board-bar i', card);
        bar.dataset.w = d.score * 10;
        bar.style.width = (d.score * 10) + '%';
        save();
      });
      note.addEventListener('input', debounce(function () {
        d.note = note.value;
        save();
      }, 300));
      board.appendChild(card);
    });
    sec.appendChild(board);
    foldSection(sec, 'board', '.section-head');
    requestAnimationFrame(function () { animateBars(sec, '.board-bar i'); });
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
    /* 同一容器内逐项错峰：26ms 递增，第 9 项起封顶（每个列表各自计数，避免互相干扰） */
    items.forEach(function (el) {
      var parent = el.parentElement || scope;
      var n = parent.__revN || 0;
      parent.__revN = n + 1;
      el.style.setProperty('--d', (Math.min(n, 8) * 26) + 'ms');
    });
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

    var handle = el.querySelector('.drag-handle');
    handle.addEventListener('mousedown', function () {
      el.setAttribute('draggable', 'true');
    });
    handle.addEventListener('focus', function () {
      el.classList.add('handle-focus');
    });
    handle.addEventListener('blur', function () {
      el.classList.remove('handle-focus');
    });
    handle.addEventListener('keydown', function (e) {
      var dir = 0;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') dir = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') dir = 1;
      if (!dir) return;
      e.preventDefault();
      moveCard(el, dir);
    });
    el.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', m.id); } catch (err) { }
      el.classList.add('dragging');
      el.setAttribute('aria-grabbed', 'true');
      document.body.classList.add('is-dragging');
    });
    el.addEventListener('dragend', function () {
      el.classList.remove('dragging');
      el.removeAttribute('draggable');
      el.removeAttribute('aria-grabbed');
      document.body.classList.remove('is-dragging');
      el.classList.add('drop-in');
      setTimeout(function () { el.classList.remove('drop-in'); }, 460);
      syncOrder();
    });
    return el;
  }

  /* 键盘排序：手柄聚焦后按方向键移动 */
  function moveCard(el, dir) {
    var grid = el.parentNode;
    if (!grid) return;
    var sib = dir < 0 ? el.previousElementSibling : el.nextElementSibling;
    if (!sib) {
      toast(dir < 0 ? '已经是第一个模块了' : '已经是最后一个模块了');
      return;
    }
    if (dir < 0) grid.insertBefore(el, sib);
    else grid.insertBefore(sib, el);

    el.classList.add('drop-in');
    setTimeout(function () { el.classList.remove('drop-in'); }, 460);
    syncOrder();
    var h = $('.drag-handle', el);
    if (h) { try { h.focus({ preventScroll: true }); } catch (e) { } }
    var idx = Array.prototype.indexOf.call(grid.children, el);
    toast('已移动到第 ' + (idx + 1) + ' 位');
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
    requestAnimationFrame(function () { autoGrow(fresh); });
  }

  /* FLIP：让被挤开的卡片平滑落位（拖拽重排时使用，尊重减少动效偏好） */
  function flipCards(grid, mutate) {
    if (!motionOK()) { mutate(); return; }
    var cards = $$('.card', grid).filter(function (c) { return !c.classList.contains('dragging'); });
    var before = [];
    cards.forEach(function (c) { before.push([c, c.getBoundingClientRect()]); });
    mutate();
    before.forEach(function (pair) {
      var c = pair[0], b = pair[1];
      if (!c.isConnected) return;
      var a = c.getBoundingClientRect();
      var dx = b.left - a.left, dy = b.top - a.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      c.style.transition = 'none';
      c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      requestAnimationFrame(function () {
        c.style.transition = 'transform .34s cubic-bezier(.16,1,.3,1)';
        c.style.transform = '';
        setTimeout(function () { c.style.transition = ''; c.style.transform = ''; }, 400);
      });
    });
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
      var ref = before ? target : target.nextSibling;
      if (dragging.nextSibling === ref || dragging === ref) return;
      flipCards(grid, function () { grid.insertBefore(dragging, ref); });
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
          ? '<div class="habit-scroll"><div class="habit-table" style="grid-template-columns:minmax(var(--hname-min),var(--hname-max)) repeat(' + cols + ',minmax(var(--cell-min),1fr))">' +
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
          /* 打卡轻弹反馈 */
          if (motionOK()) {
            c.classList.remove('poped');
            void c.offsetWidth;
            c.classList.add('poped');
            setTimeout(function () { c.classList.remove('poped'); }, 260);
          }
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
              '<button class="kr-num" type="button" data-kr-edit="' + k.id + '" title="点击修改目标次数">' +
              k.cur + '/' + k.target + (k.unit ? ' ' + esc(k.unit) : '') + '</button>' +
              '<button class="kr-mini" type="button" data-kr-step="-1" aria-label="减少">−</button>' +
              '<button class="kr-mini" type="button" data-kr-step="1" aria-label="增加">＋</button>' +
              '</div>' +
              '<div class="kr-bar"><i style="width:' + p + '%"></i></div>' +
              '</div>';
          }).join('') : '<p class="empty-line" style="margin:0 0 8px">给这个目标配 2 – 3 个可量化的关键结果。</p>') +
          '<div class="inline-add">' +
          '<input class="field" data-kr-input="' + o.id + '" placeholder="添加关键结果，例如：跑步 800 km">' +
          '<input class="field kr-target-field" type="number" inputmode="numeric" min="1" step="1"' +
          ' data-kr-target="' + o.id + '" placeholder="目标 10" aria-label="目标次数" title="目标次数，默认 10">' +
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
        var tField = $('[data-kr-target="' + objId + '"]', body);
        var target = 10, unit = '', text = raw;
        /* 文本末尾的「数字 + 单位」仍可作为快捷写法 */
        var mv = raw.match(/(\d+(?:\.\d+)?)\s*([^\d\s]*)$/);
        if (mv) {
          target = Number(mv[1]);
          unit = mv[2] || '';
          text = raw.slice(0, mv.index).replace(/[／/·:：\-\s]+$/, '').trim() || raw;
        }
        /* 输入框里显式填写的目标次数优先 */
        if (tField) {
          var tv = String(tField.value || '').trim();
          if (tv) {
            if (!/^\d+$/.test(tv) || Number(tv) < 1) {
              tField.focus(); tField.select();
              toast('目标次数需为正整数');
              return;
            }
            target = Number(tv);
          }
        }
        var obj = d.objectives.filter(function (o) { return o.id === objId; })[0];
        if (!obj) return;
        obj.krs = obj.krs || [];
        obj.krs.push({ id: uid('k'), text: text, cur: 0, target: target, unit: unit });
        save();
        refreshCard(m);
        toast('已添加，目标 ' + target);
      }

      /* 点击「完成/目标」数字：修改目标次数 */
      $$('[data-kr-edit]', body).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var krId = btn.dataset.krEdit;
          var obj = null, kr = null;
          d.objectives.forEach(function (o) {
            (o.krs || []).forEach(function (k) { if (k.id === krId) { obj = o; kr = k; } });
          });
          if (!kr) return;
          openDialog(
            '<h3>修改目标次数</h3>' +
            '<p class="sub">「' + esc(kr.text) + '」当前完成 <b>' + kr.cur + '</b> 次。目标次数需为正整数，且不能小于当前完成次数。</p>' +
            '<input class="field" id="kr-target-edit" type="number" inputmode="numeric" min="1" step="1"' +
            ' value="' + (Number(kr.target) || 10) + '" style="width:100%;margin-top:4px">' +
            '<p class="sub" id="kr-target-err" style="margin:8px 0 0;color:var(--danger)" hidden></p>' +
            '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
            '<button class="solid-btn" data-ok>保存</button></div>',
            function (sheet, close) {
              var inp = $('#kr-target-edit', sheet);
              var err = $('#kr-target-err', sheet);
              inp.focus();
              inp.select();
              $('[data-close]', sheet).addEventListener('click', close);
              function submit() {
                var v = String(inp.value || '').trim();
                if (!/^\d+$/.test(v) || Number(v) < 1) {
                  err.textContent = '请填写正整数，例如 10。';
                  err.hidden = false;
                  inp.focus();
                  return;
                }
                var n = Number(v);
                if (n < Number(kr.cur || 0)) {
                  err.textContent = '目标次数不能小于当前完成次数（' + kr.cur + '）。';
                  err.hidden = false;
                  inp.focus();
                  return;
                }
                kr.target = n;
                save();
                close();
                refreshCard(m);
                toast('目标次数已更新为 ' + n);
              }
              $('[data-ok]', sheet).addEventListener('click', submit);
              inp.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') submit();
              });
            }
          );
        });
      });

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
      var items = visibleDailyItems(m.data.items);
      var done = items.filter(function (i) { return i.done; }).length;
      var pct = items.length ? Math.round(done / items.length * 100) : 0;
      return '<div class="todo-list">' +
        (items.length ? items.map(function (i) {
          return '<div class="todo' + (i.done ? ' done' : '') + '" data-item="' + esc(i.id) + '">' +
            '<button class="check' + (i.done ? ' on' : '') + '" type="button" aria-label="完成">' + icon('check') + '</button>' +
            '<div class="todo-text">' + esc(i.text) + (i.meta ? '<span class="todo-meta">' + esc(i.meta) + '</span>' : '') + '</div>' +
            '<button class="todo-del" type="button" aria-label="删除">' + icon('x') + '</button>' +
            '</div>';
        }).join('') : '<p class="empty-line">' + (dailyView ? '这一天还没有待办，加一条试试。' : '清单是空的，从最小的一件事开始。') + '</p>') +
        '</div>' +
        '<div class="inline-add"><input class="field" data-new placeholder="' + (dailyView ? '添加这一天的待办，回车确认' : '添加一件事，回车确认') + '">' +
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
        var item = { id: uid('t'), text: v, done: false };
        /* 在每日日程页新增的待办，归属当前查看的那一天，月度计划才能按日期聚合 */
        if (dailyView) item.date = dailyView;
        d.items.push(item);
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
      var day = dailyView || (isDateStr(d.date) ? d.date : today());
      var items = visibleDailyItems(d.items).slice().sort(function (a, b) { return (a.time || '') < (b.time || '') ? -1 : 1; });
      var doneN = items.filter(function (i) { return i.done; }).length;
      return '<div class="tl-head">' +
        icon('calendar') + '<span>' + esc(cnShort(parseISO(day))) + '</span>' +
        '<span class="tl-count">' + items.length + ' 项安排' + (doneN ? ' · 完成 ' + doneN : '') + '</span></div>' +
        '<div class="tl">' +
        (items.length ? items.map(function (i, idx) {
          return '<div class="tl-item' + (idx === 0 && !i.done ? ' is-now' : '') + (i.done ? ' done' : '') + '" data-tl="' + esc(i.id) + '">' +
            (dailyView
              ? '<button class="check tl-check' + (i.done ? ' on' : '') + '" type="button" data-tl-check aria-label="完成">' + icon('check') + '</button>'
              : '<span class="tl-dot"></span>') +
            '<span class="tl-time">' + esc(i.time || '--:--') + '</span>' +
            '<span class="tl-body"><span class="tl-text">' + esc(i.text) +
            (i.tag ? '<span class="tl-tag">' + esc(i.tag) + '</span>' : '') + '</span></span>' +
            '<button class="todo-del" type="button" aria-label="删除">' + icon('x') + '</button>' +
            '</div>';
        }).join('') : '<p class="empty-line">' + (dailyView ? '这一天还没有安排。' : '今天还没有安排。') + '</p>') +
        '</div>' +
        '<div class="inline-add">' +
        '<input class="field" type="time" data-time style="max-width:104px;flex:none" value="09:00">' +
        '<input class="field" data-text placeholder="做什么">' +
        '<button class="add-btn" data-add type="button">加入</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.items = d.items || [];
      var day = dailyView || (isDateStr(d.date) ? d.date : today());
      function add() {
        var t = $('[data-time]', body).value || '09:00';
        var text = ($('[data-text]', body).value || '').trim();
        if (!text) { $('[data-text]', body).focus(); return; }
        d.items.push({ id: uid('e'), time: t, text: text, tag: '', date: day, done: false });
        save();
        refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      $('[data-text]', body).addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-tl]', body).forEach(function (row) {
        var del = $('.todo-del', row);
        if (del) del.addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x.id !== row.dataset.tl; });
          save();
          refreshCard(m);
        });
        var ck = $('[data-tl-check]', row);
        if (ck) ck.addEventListener('click', function () {
          var it = d.items.filter(function (x) { return x.id === row.dataset.tl; })[0];
          if (!it) return;
          it.done = !it.done;
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
      ta.addEventListener('input', debounce(function () {
        m.data.text = ta.value;
        save();
        autoGrow(ta.parentNode);
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
          ta.addEventListener('input', debounce(function () {
            it[ta.dataset.f] = ta.value;
            save();
            autoGrow(ta.parentNode);
          }, 300));
        });
      });
    }
  };

  /* ---------------------------------------------------------
     弹窗
     --------------------------------------------------------- */
  var overlay = $('#overlay');
  var lastDialogFocus = null;

  function dialogFocusables(sheet) {
    return $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', sheet)
      .filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  var activeDialogClose = null;
  function openDialog(inner, mount) {
    lastDialogFocus = document.activeElement;
    overlay.hidden = false;
    overlay.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" tabindex="-1">' + inner + '</div>';
    document.documentElement.classList.add('dialog-open');
    var sheet = $('.sheet', overlay);
    function close() {
      overlay.hidden = true;
      overlay.innerHTML = '';
      document.documentElement.classList.remove('dialog-open');
      activeDialogClose = null;
      if (lastDialogFocus && lastDialogFocus.isConnected && lastDialogFocus.focus) {
        try { lastDialogFocus.focus({ preventScroll: true }); } catch (e) { }
      }
      lastDialogFocus = null;
    }
    activeDialogClose = close;
    overlay.onclick = function (e) { if (e.target === overlay) close(); };
    overlay.onkeydown = function (e) {
      if (e.key !== 'Tab') return;
      var list = dialogFocusables(sheet);
      if (!list.length) { e.preventDefault(); return; }
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
    if (mount) mount(sheet, close);
    var first = sheet.querySelector('input, textarea') || dialogFocusables(sheet)[0] || sheet;
    setTimeout(function () {
      try {
        first.focus();
        if (first.select && first.tagName === 'INPUT') first.select();
      } catch (e) { }
    }, 60);
    return close;
  }

  function closeDialog() {
    if (activeDialogClose) { activeDialogClose(); return; }
    overlay.hidden = true;
    overlay.innerHTML = '';
    document.documentElement.classList.remove('dialog-open');
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

  /* -------- 页签设置（仅系统页：可改名，不可删除） -------- */
  function dialogPages() {
    var list = state.pages.filter(function (p) { return p.builtin; });
    openDialog(
      '<h3>页签设置</h3><p class="sub">点击任意一行可改名（系统页不可删除）。</p>' +
      '<div class="page-list">' + list.map(function (p) {
        return '<div class="page-row" data-page="' + p.id + '">' + icon(p.icon) +
          '<span>' + esc(p.name) + '</span>' +
          '<span class="tag">系统</span>' +
          '</div>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button></div>',
      function (sheet, close) {
        $$('.page-row', sheet).forEach(function (rowEl) {
          rowEl.addEventListener('click', function () {
            var p = pageById(rowEl.dataset.page);
            if (!p) return;
            var inp = window.prompt('页签名称', p.name);
            if (inp == null) return;
            p.name = inp.trim() || p.name;
            save(); close(); renderNav(); renderPage();
          });
        });
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
        showSkeleton(state.pages.length ? currentPage().modules.length || 3 : 3);
        setTimeout(function () {
          renderPage();
          toast('导入成功，共 ' + state.pages.length + ' 个页签');
        }, 260);
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
    s.settings.name = emailPrefix() || '北辰';
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

    return s;
  }

  function pageByIdIn(s, id) {
    return s.pages.filter(function (p) { return p.id === id; })[0];
  }

  /* ---------------------------------------------------------
     全局搜索（⌘K / Ctrl+K）
     --------------------------------------------------------- */
  var cmdkEl = $('#cmdk');
  var cmdkInput = $('#cmdk-input');
  var cmdkList = $('#cmdk-list');
  var cmdkResults = [];
  var cmdkIndex = 0;

  function searchEntries() {
    var out = [];
    /* 侧栏只保留系统页：命令面板不再索引隐藏的自定义页 */
    state.pages.filter(function (p) { return p.builtin; }).forEach(function (p) {
      out.push({
        kind: 'page', group: '页签', page: p.id, icon: p.icon,
        text: p.name, meta: '系统页 · ' + p.modules.length + ' 个模块',
        keys: p.name
      });
      p.modules.forEach(function (m) {
        var typeName = TYPE_NAME[m.type] || '';
        out.push({
          kind: 'module', group: '模块', page: p.id, mod: m.id, icon: m.icon,
          text: m.title, meta: p.name + ' · ' + typeName,
          keys: m.title + ' ' + typeName
        });
        var d = m.data || {};
        function push(icon, text, meta) {
          if (!text) return;
          out.push({
            kind: 'item', group: '内容', page: p.id, mod: m.id, icon: icon,
            text: String(text), meta: p.name + ' · ' + meta, keys: String(text)
          });
        }
        if (m.type === 'todo' && d.items) {
          d.items.forEach(function (i) { push('check', i.text, i.done ? '已完成' : '待办'); });
        }
        if (m.type === 'habit' && d.habits) {
          d.habits.forEach(function (h) { push('sun', h.name, '习惯'); });
        }
        if (m.type === 'okr' && d.objectives) {
          d.objectives.forEach(function (o) {
            push('target', o.title, '目标');
            (o.krs || []).forEach(function (k) { push('target', k.text, '关键结果 · ' + o.title); });
          });
        }
        if (m.type === 'review' && d.items) {
          d.items.forEach(function (i) { push('bulb', i.title || '未命名决定', '决策复盘'); });
        }
        if (m.type === 'timeline' && d.items) {
          d.items.forEach(function (i) { push('clock', i.text, (i.time || '') + ' 日程'); });
        }
        if (m.type === 'note' && d.text) {
          push('note', String(d.text).replace(/\s+/g, ' ').slice(0, 48), '笔记');
        }
      });
    });
    out.push({ kind: 'action', group: '操作', icon: 'plus', text: '添加模块', meta: '在当前页新建一个模块', keys: '添加 新建 模块', run: dialogAddModule });
    out.push({ kind: 'action', group: '操作', icon: 'download', text: '导出备份', meta: '把当前数据导出为 JSON', keys: '导出 备份 下载 json', run: exportData });
    out.push({ kind: 'action', group: '操作', icon: 'user', text: '修改用户名', meta: '当前：' + userName(), keys: '用户名 昵称 账户 名字 账号', run: openAccountDialog });
    out.push({ kind: 'action', group: '操作', icon: 'auto', text: '切换外观', meta: '在跟随系统 / 浅色 / 深色之间切换', keys: '主题 深浅色 外观 暗色', run: cycleTheme });
    return out;
  }

  function scoreEntry(e, q) {
    var t = e.text.toLowerCase();
    var k = (e.keys || '').toLowerCase();
    if (t === q) return 100;
    if (t.indexOf(q) === 0) return 80;
    if (t.indexOf(q) > -1) return 60;
    if (k.indexOf(q) > -1) return 40;
    if ((e.meta || '').toLowerCase().indexOf(q) > -1) return 20;
    return -1;
  }

  function renderCmdk(q) {
    var query = (q || '').trim().toLowerCase();
    var all = searchEntries();
    if (!query) {
      cmdkResults = all.filter(function (e) { return e.kind !== 'item'; }).slice(0, 12);
    } else {
      cmdkResults = all.map(function (e) { return { e: e, s: scoreEntry(e, query) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 30)
        .map(function (x) { return x.e; });
    }
    if (cmdkIndex >= cmdkResults.length) cmdkIndex = Math.max(0, cmdkResults.length - 1);

    if (!cmdkResults.length) {
      cmdkList.innerHTML = '<div class="cmdk-empty">' +
        '<span class="cmdk-empty-ico">' + icon('search') + '</span>' +
        '<p>没有找到「' + esc(q || '') + '」</p>' +
        '<small>试试页签名、模块名，或者待办 / 目标 / 笔记里的词</small></div>';
      return;
    }

    var html = '';
    var lastGroup = '';
    cmdkResults.forEach(function (e, i) {
      if (e.group !== lastGroup) {
        html += '<div class="cmdk-group">' + e.group + '</div>';
        lastGroup = e.group;
      }
      html += '<button class="cmdk-row' + (i === cmdkIndex ? ' is-active' : '') + '" type="button" role="option" ' +
        'aria-selected="' + (i === cmdkIndex ? 'true' : 'false') + '" data-idx="' + i + '">' +
        '<span class="cmdk-row-ico">' + icon(e.icon) + '</span>' +
        '<span class="cmdk-row-text"><b>' + esc(e.text) + '</b><small>' + esc(e.meta || '') + '</small></span>' +
        '<span class="cmdk-row-go">' + icon('cornerDown') + '</span>' +
        '</button>';
    });
    cmdkList.innerHTML = html;

    $$('.cmdk-row', cmdkList).forEach(function (row) {
      row.addEventListener('click', function () { activateCmdk(Number(row.dataset.idx)); });
      row.addEventListener('mousemove', function () {
        var idx = Number(row.dataset.idx);
        if (idx === cmdkIndex) return;
        cmdkIndex = idx;
        $$('.cmdk-row', cmdkList).forEach(function (r) {
          var on = Number(r.dataset.idx) === idx;
          r.classList.toggle('is-active', on);
          r.setAttribute('aria-selected', on ? 'true' : 'false');
        });
      });
    });
  }

  function moveCmdk(delta) {
    if (!cmdkResults.length) return;
    var len = cmdkResults.length;
    cmdkIndex = (cmdkIndex + delta + len) % len;
    $$('.cmdk-row', cmdkList).forEach(function (r) {
      var on = Number(r.dataset.idx) === cmdkIndex;
      r.classList.toggle('is-active', on);
      r.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var active = $('.cmdk-row.is-active', cmdkList);
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest' });
  }

  function activateCmdk(i) {
    var e = cmdkResults[i];
    if (!e) return;
    var input = cmdkInput.value;
    closeCmdk();
    if (e.kind === 'action') {
      if (e.text === '切换外观') e.run();
      else setTimeout(e.run, 60);
      return;
    }
    if (state.current !== e.page) {
      state.current = e.page;
      save();
      renderNav();
      renderPage();
    } else if (input) {
      /* 同页也重绘一次，确保高亮目标存在 */
    }
    closeSidebar();
    if (e.mod) setTimeout(function () { highlightCard(e.mod); }, 80);
    else { try { $('#canvas').scrollTo({ top: 0, behavior: motionOK() ? 'smooth' : 'auto' }); } catch (err) { } }
  }

  function highlightCard(id) {
    var el = $('.card[data-mod="' + id + '"]');
    if (!el) return;
    try { el.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'center' }); } catch (e) { }
    el.classList.add('is-target');
    el.tabIndex = -1;
    try { el.focus({ preventScroll: true }); } catch (e) { }
    clearTimeout(el._hl);
    el._hl = setTimeout(function () { el.classList.remove('is-target'); }, 2100);
  }

  function openCmdk() {
    if (!cmdkEl || !cmdkEl.hidden) return;
    if (document.documentElement.classList.contains('locked')) return;
    cmdkEl.hidden = false;
    cmdkIndex = 0;
    cmdkInput.value = '';
    renderCmdk('');
    document.documentElement.classList.add('cmdk-open');
    setTimeout(function () { try { cmdkInput.focus(); } catch (e) { } }, 30);
  }

  function closeCmdk() {
    if (!cmdkEl || cmdkEl.hidden) return;
    cmdkEl.hidden = true;
    document.documentElement.classList.remove('cmdk-open');
    var open = $('#btn-search');
    if (open) { try { open.focus({ preventScroll: true }); } catch (e) { } }
  }

  /* ---------------------------------------------------------
     骨架屏（数据重建时的占位）
     --------------------------------------------------------- */
  function showSkeleton(count) {
    var canvas = $('#canvas');
    if (!canvas) return;
    var grid = document.createElement('div');
    grid.className = 'modules skeleton-grid';
    var n = Math.max(2, Math.min(count || 3, 6));
    var html = '';
    for (var i = 0; i < n; i++) {
      html += '<div class="skel-card' + (i === 2 && n > 3 ? ' w-full' : '') + '" aria-hidden="true">' +
        '<div class="skel-head"><span class="skel skel-ico"></span><span class="skel skel-line" style="width:36%"></span></div>' +
        '<div class="skel skel-line" style="width:82%"></div>' +
        '<div class="skel skel-line" style="width:64%"></div>' +
        '<div class="skel skel-line" style="width:44%"></div>' +
        '</div>';
    }
    grid.innerHTML = html;
    canvas.innerHTML = '';
    canvas.appendChild(grid);
    canvas.setAttribute('aria-busy', 'true');
  }

  function clearBusy() {
    var canvas = $('#canvas');
    if (canvas) canvas.removeAttribute('aria-busy');
  }

  /* ---------------------------------------------------------
     交互
     --------------------------------------------------------- */
  function toast(msg, ico) {
    var el = $('#toast');
    el.innerHTML = (ico ? '<span class="toast-ico">' + ico + '</span>' : '') +
      '<span class="toast-msg">' + esc(msg) + '</span>';
    el.hidden = false;
    el.classList.remove('show');
    /* 强制重排，让连续 toast 也有淡入 */
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.hidden = true; }, 320);
    }, 2200);
  }

  function openSidebar() {
    $('#sidebar').classList.add('open');
    $('#scrim').classList.add('show');
    document.body.classList.add('nav-open');
    var btn = $('#btn-menu');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    var first = $('#nav-system .nav-item');
    if (first && window.innerWidth <= 900) {
      setTimeout(function () { try { first.focus({ preventScroll: true }); } catch (e) { } }, 120);
    }
  }
  function closeSidebar() {
    $('#sidebar').classList.remove('open');
    $('#scrim').classList.remove('show');
    document.body.classList.remove('nav-open');
    var btn = $('#btn-menu');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function bindGlobal() {
    $('#brand-mark').innerHTML = icon('leaf');
    $('#btn-menu').innerHTML = icon('menu');
    $('#btn-menu').setAttribute('aria-controls', 'sidebar');
    $('#btn-menu').setAttribute('aria-expanded', 'false');

    $('#btn-menu').addEventListener('click', function () {
      if (document.body.classList.contains('nav-open')) closeSidebar();
      else openSidebar();
    });
    $('#scrim').addEventListener('click', closeSidebar);
    $('#btn-add-module').addEventListener('click', dialogAddModule);
    var pageMenuBtn = $('#btn-page-menu');
    if (pageMenuBtn) pageMenuBtn.addEventListener('click', dialogPages);
    applyActions(actionsOpen());
    $('#btn-actions-toggle').addEventListener('click', toggleActions);

    /* 外观：默认跟随系统，手动可切换浅色 / 深色 */
    applyTheme(themePref(), true);
    var themeBtn = $('#btn-theme');
    if (themeBtn) themeBtn.addEventListener('click', cycleTheme);
    if (darkMedia) {
      var onScheme = function () {
        if (themePref() === 'auto') applyTheme('auto', true);
      };
      if (darkMedia.addEventListener) darkMedia.addEventListener('change', onScheme);
      else if (darkMedia.addListener) darkMedia.addListener(onScheme);
    }

    /* 全局搜索 */
    var searchIco = $('#search-ico');
    if (searchIco) searchIco.innerHTML = icon('search');
    var cmdkIco = $('#cmdk-ico');
    if (cmdkIco) cmdkIco.innerHTML = icon('search');
    var searchBtn = $('#btn-search');
    if (searchBtn) searchBtn.addEventListener('click', openCmdk);
    if (cmdkInput) {
      cmdkInput.addEventListener('input', function () {
        cmdkIndex = 0;
        renderCmdk(cmdkInput.value);
      });
      cmdkInput.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); moveCmdk(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moveCmdk(-1); }
        else if (e.key === 'Enter') { e.preventDefault(); activateCmdk(cmdkIndex); }
        else if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); }
        else if (e.key === 'Tab') {
          e.preventDefault();
        }
      });
    }
    var cmdkClose = $('#cmdk-close');
    if (cmdkClose) cmdkClose.addEventListener('click', closeCmdk);
    if (cmdkEl) {
      cmdkEl.addEventListener('click', function (e) {
        if (e.target === cmdkEl) closeCmdk();
      });
    }

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
      var k = (e.key || '').toLowerCase();
      if ((e.metaKey || e.ctrlKey) && !e.altKey && k === 'k') {
        e.preventDefault();
        if (cmdkEl && cmdkEl.hidden) openCmdk();
        else closeCmdk();
        return;
      }
      if (e.key === 'Escape') {
        if (cmdkEl && !cmdkEl.hidden) { closeCmdk(); return; }
        if (!overlay.hidden) closeDialog();
        closeMenus();
        closeSidebar();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeSidebar();
      reflowLazy();
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

  /* ---------------------------------------------------------
     用户名：默认取邮箱 @ 前缀，可自定义，按账号隔离持久化
     --------------------------------------------------------- */
  function emailPrefix(email) {
    var e = normalizeEmail(email || currentEmail());
    var at = e.indexOf('@');
    var p = at > 0 ? e.slice(0, at) : e;
    return String(p || '').trim();
  }

  function userName() {
    var n = (state && state.settings && typeof state.settings.name === 'string') ? state.settings.name.trim() : '';
    if (n) return n;
    return emailPrefix() || '朋友';
  }

  function setUserName(raw) {
    var v = String(raw || '').replace(/[\u0000-\u001f\u007f]/g, '').trim();
    if (v.length > 16) v = v.slice(0, 16);
    state.settings.name = v || emailPrefix();
    save();
    renderPage();
    return state.settings.name;
  }

  function openAccountDialog() {
    var email = currentEmail();
    var cur = (state.settings && state.settings.name) || '';
    openDialog(
      '<h3>账户设置</h3>' +
      '<p class="sub">用户名用于首页问候语，默认取邮箱 @ 前的前缀。修改只影响当前账号（' + esc(email) + '）。</p>' +
      '<input class="field" id="acc-name" maxlength="16" style="width:100%;margin-top:4px"' +
      ' value="' + esc(cur) + '" placeholder="' + esc(emailPrefix(email) || '你的名字') + '"' +
      ' aria-label="用户名">' +
      '<p class="sub" style="margin:8px 0 0">1 – 16 个字；留空则恢复为邮箱前缀。</p>' +
      '<p class="sub" id="acc-err" style="margin:8px 0 0;color:var(--danger)" hidden></p>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        var inp = $('#acc-name', sheet);
        var err = $('#acc-err', sheet);
        inp.focus();
        inp.select();
        $('[data-close]', sheet).addEventListener('click', close);
        function submit() {
          var v = String(inp.value || '').replace(/[\u0000-\u001f\u007f]/g, '').trim();
          if (v.length > 16) {
            err.textContent = '用户名最多 16 个字。';
            err.hidden = false;
            inp.focus();
            return;
          }
          var next = setUserName(v);
          close();
          $('#user-mail').title = '当前账号：' + currentEmail() + ' · 点击修改用户名（' + next + '）';
          toast('用户名已更新为「' + next + '」');
        }
        $('[data-ok]', sheet).addEventListener('click', submit);
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') submit();
        });
      }
    );
  }

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
    if (hiddenPageFallback) { hiddenPageFallback = false; save(); }
    /* 旧数据补 id 后立即落盘，避免刷新后又重新生成一批 id 导致引用失效 */
    if (dailyMigrated) { dailyMigrated = false; save(); }
    /* 侧栏不再展示自定义页：上次停留在隐藏页时，回退系统页首页并落盘 */
    var sysPages = state.pages.filter(function (p) { return p.builtin; });
    if (!sysPages.some(function (p) { return p.id === state.current; })) {
      state.current = (sysPages[0] || state.pages[0]).id;
      save();
    }
    if (!String(state.settings.name || '').trim()) {
      state.settings.name = emailPrefix(email);
      save();
    }
    $('#auth').hidden = true;
    document.documentElement.classList.remove('locked');
    document.documentElement.classList.add('authed');
    $('#user-mail').textContent = email;
    $('#user-mail').title = '当前账号：' + email + ' · 点击修改用户名';
    applyNavFold();
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

    $('#user-mail').addEventListener('click', function () {
      if (currentEmail()) openAccountDialog();
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
    bindNavFold();
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
