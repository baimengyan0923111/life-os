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
    cornerDown: '<path d="M4 5v6a3 3 0 0 0 3 3h13"/><path d="m15.5 9 4.5 5-4.5 5"/>',
    cloud: '<path d="M7 18.5a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.3 9.9a3.9 3.9 0 0 1 .1 8.6H7Z"/>',
    eye: '<path d="M2.6 12S6.1 6.6 12 6.6 21.4 12 21.4 12 17.9 17.4 12 17.4 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="2.7"/>',
    eyeOff: '<path d="M4 4.2 20 20"/><path d="M9.9 6a9.9 9.9 0 0 1 2.1-.2c5.9 0 9.4 6.2 9.4 6.2a17.4 17.4 0 0 1-3.2 3.9"/><path d="M6.5 7.7A16.8 16.8 0 0 0 2.6 12s3.5 5.4 9.4 5.4a9.8 9.8 0 0 0 3.3-.6"/><path d="M9.7 10a3 3 0 0 0 4.2 4.2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.6" cy="6" r="1.1"/><circle cx="4.6" cy="12" r="1.1"/><circle cx="4.6" cy="18" r="1.1"/>',
    timer: '<circle cx="12" cy="13.5" r="7"/><path d="M12 10v3.6l2.2 1.6"/><path d="M9.4 3.4h5.2"/>',
    hourglass: '<path d="M7 3.5h10M7 20.5h10"/><path d="M8.2 3.5c0 3.6 3.8 5.2 3.8 8.5s-3.8 5-3.8 8.5"/><path d="M15.8 3.5c0 3.6-3.8 5.2-3.8 8.5s3.8 5 3.8 8.5"/>',
    pin: '<path d="M12 21v-6.4"/><path d="M8.4 3.6h7.2l-1 4.4 2 2.6v2H7.4v-2l2-2.6z"/>',
    home: '<path d="M4 10.4 12 4l8 6.4"/><path d="M6.4 9.6V20h11.2V9.6"/><path d="M10 20v-4.6h4V20"/>',
    cup: '<path d="M6 8h10v6.4a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4z"/><path d="M16 9.4h1.6a2.2 2.2 0 0 1 0 4.4H16"/><path d="M6 20.6h11"/>',
    droplet: '<path d="M12 3.6c3 3.6 5.4 6.2 5.4 9a5.4 5.4 0 0 1-10.8 0c0-2.8 2.4-5.4 5.4-9z"/>',
    bed: '<path d="M3.6 19v-9"/><path d="M3.6 15.4h16.8V19"/><path d="M8 15.4v-2.6h6v2.6"/>',
    apple: '<path d="M12 7.6c1-1.4 2.6-2 4-1.4 1.8.8 2.6 3.2 2 6-.6 2.8-2.4 5.4-4.2 5.4-.8 0-1.2-.4-1.8-.4s-1 .4-1.8.4c-1.8 0-3.6-2.6-4.2-5.4-.6-2.8.2-5.2 2-6 1.4-.6 3 0 4 1.4z"/><path d="M12 7.6c0-1.8.6-3 2-3.6"/>',
    cake: '<path d="M4 20.4h16"/><path d="M5.4 20.4v-5.2h13.2v5.2"/><path d="M5.4 15.2c1.4 1.4 2.8 1.4 4.2 0s2.8-1.4 4.2 0 2.8 1.4 4.8 0"/><path d="M12 10V6.6"/><path d="M12 5.4a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4"/>',
    gift: '<path d="M4 10.4h16v3.2H4z"/><path d="M5.6 13.6V20h12.8v-6.4"/><path d="M12 10.4V20"/><path d="M12 10.4C10.4 7 8.6 6.2 7.4 7.4c-1.2 1.2.4 3 4.6 3zM12 10.4c1.6-3.4 3.4-4.2 4.6-3 1.2 1.2-.4 3-4.6 3z"/>',
    shoppingBag: '<path d="M5.6 8h12.8l-1.2 12H6.8z"/><path d="M9 8V6.6a3 3 0 0 1 6 0V8"/>',
    smile: '<circle cx="12" cy="12" r="8.4"/><path d="M8.6 14.2c.8 1.4 2 2.2 3.4 2.2s2.6-.8 3.4-2.2"/><circle cx="9.4" cy="10.2" r=".9"/><circle cx="14.6" cy="10.2" r=".9"/>',
    music: '<path d="M9 17.4V6.6l9-2v10.6"/><circle cx="6.8" cy="17.8" r="2.2"/><circle cx="15.8" cy="15.6" r="2.2"/>',
    plane: '<path d="M21 4 3 11l6.4 2.6L12 20l3-5.4L21 4z"/><path d="M9.4 13.6 21 4"/>',
    map: '<path d="M9.4 4.6 4 6.6v13l5.4-2 5.2 2L20 17.6v-13L14.6 6.6z"/><path d="M9.4 4.6v13M14.6 6.6v13"/>',
    building: '<path d="M5 20.4V4.6h9v15.8"/><path d="M14 9.4h5v11"/><path d="M8 8h3M8 11.4h3M8 14.8h3"/><path d="M3.6 20.4h16.8"/>',
    sitemap: '<rect x="9.2" y="3.4" width="5.6" height="4.4" rx="1.2"/><rect x="3" y="16.2" width="5.6" height="4.4" rx="1.2"/><rect x="15.4" y="16.2" width="5.6" height="4.4" rx="1.2"/><path d="M12 7.8v4.4M5.8 16.2v-4h12.4v4"/>',
    kanban: '<rect x="3.4" y="4.4" width="5" height="15.2" rx="1.4"/><rect x="9.6" y="4.4" width="5" height="10.4" rx="1.4"/><rect x="15.8" y="4.4" width="5" height="6.4" rx="1.4"/>',
    layout: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2"/><path d="M12 3.6v16.8M3.6 12h16.8"/>',
    code: '<path d="M9 8 4.6 12 9 16"/><path d="M15 8l4.4 4L15 16"/>',
    mail: '<rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2"/><path d="m4.6 7 7.4 6 7.4-6"/>',
    message: '<path d="M20.4 12.4c0 3.6-3.8 6.4-8.4 6.4-1 0-2-.12-2.9-.34L4.2 20l1.3-3.6A6.2 6.2 0 0 1 3.6 12.4C3.6 8.8 7.4 6 12 6s8.4 2.8 8.4 6.4z"/>',
    link: '<path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l2.4-2.4a3.6 3.6 0 0 0-5.1-5.1l-1 1"/><path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-2.4 2.4a3.6 3.6 0 0 0 5.1 5.1l1-1"/>',
    shield: '<path d="M12 3.6 5.4 6.2v5.4c0 4 2.8 7.2 6.6 8.8 3.8-1.6 6.6-4.8 6.6-8.8V6.2z"/>',
    lock: '<rect x="5" y="10.4" width="14" height="9.6" rx="2.2"/><path d="M8.2 10.4V8a3.8 3.8 0 0 1 7.6 0v2.4"/>',
    bookmark: '<path d="M6.6 3.6h10.8v16.8L12 16.2l-5.4 4.2z"/>',
    journal: '<rect x="5" y="3.6" width="14" height="16.8" rx="2"/><path d="M9 3.6v16.8M12.4 8.4h3.6M12.4 12.2h3.6"/>',
    quote: '<path d="M10 7H6.6A2.2 2.2 0 0 0 4.4 9.2v2.6c0 1.2 1 2.2 2.2 2.2h1.6c0 2-1 3.4-3 4.4"/><path d="M20 7h-3.4a2.2 2.2 0 0 0-2.2 2.2v2.6c0 1.2 1 2.2 2.2 2.2h1.6c0 2-1 3.4-3 4.4"/>',
    cap: '<path d="M3.4 9.4 12 5.6l8.6 3.8-8.6 3.8z"/><path d="M7 11.2v4.2c0 1.6 2.2 2.8 5 2.8s5-1.2 5-2.8v-4.2"/><path d="M20.6 9.4v5.2"/>',
    language: '<circle cx="12" cy="12" r="8.4"/><path d="M3.8 12h16.4"/><path d="M12 3.6c2.2 2.2 3.4 5.2 3.4 8.4s-1.2 6.2-3.4 8.4c-2.2-2.2-3.4-5.2-3.4-8.4s1.2-6.2 3.4-8.4z"/>',
    flask: '<path d="M9.4 3.6h5.2M10.4 3.6v5L5.6 17.6a2 2 0 0 0 1.8 2.8h9.2a2 2 0 0 0 1.8-2.8L13.6 8.6v-5"/><path d="M7.6 14.6h8.8"/>',
    atom: '<circle cx="12" cy="12" r="1.8"/><ellipse cx="12" cy="12" rx="8.6" ry="3.6"/><ellipse cx="12" cy="12" rx="8.6" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8.6" ry="3.6" transform="rotate(120 12 12)"/>',
    edit: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13.6 6.4 17.6 10.4"/>',
    run: '<circle cx="14.6" cy="5.4" r="2"/><path d="M13.4 9.4 9.6 12l2.6 2.4-1.4 4.2"/><path d="M12.2 14.4 8 16.2"/><path d="M13.4 9.4l3.6 1.6.8 3.4"/>',
    pill: '<rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-45 12 12)"/><path d="M9 9l6 6"/>',
    sprout: '<path d="M12 20.4v-7.6"/><path d="M12 13.4C10 10.6 7.4 10 5 10.6c.2 2.6 2.2 4.4 5.2 4.6"/><path d="M12 12.6c1.4-2.6 3.8-3.6 6.4-3.2-.2 2.8-2.2 4.6-5.2 4.8"/>',
    mountain: '<path d="M3 18.6h18"/><path d="M3.6 18.6 9.4 8l3.4 5.6 2-3 5.6 8z"/>',
    fire: '<path d="M12 20.4c3 0 5-2 5-4.8 0-3.6-3.4-5.2-3.4-8.6-2.2 1.2-2.6 3.4-2.6 5-1-.8-1.6-2-1.6-3.4-1.6 1.6-2.4 4-2.4 6.2 0 3.4 2 5.6 5 5.6z"/>',
    anchor: '<circle cx="12" cy="5.4" r="2.2"/><path d="M12 7.6v12.8"/><path d="M8.4 10.4h7.2"/><path d="M4.6 13.6c0 3.6 3.2 6.8 7.4 6.8s7.4-3.2 7.4-6.8"/>',
    gauge: '<path d="M4 17.6a8.6 8.6 0 1 1 16 0"/><path d="M12 13.4 15.6 9"/><circle cx="12" cy="17.6" r="1.4"/>',
    yen: '<path d="M7 5.4 12 12l5-6.6"/><path d="M12 12v7"/><path d="M8.6 13.4h6.8M8.6 16.4h6.8"/>',
    card: '<rect x="3" y="6" width="18" height="12" rx="2.4"/><path d="M3 10h18"/><path d="M6.6 14.4h3.4"/>',
    receipt: '<path d="M6 3.6h12v16.8l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"/><path d="M9 8h6M9 11.4h6"/>',
    calculator: '<rect x="5" y="3.6" width="14" height="16.8" rx="2.2"/><path d="M8.4 7.6h7.2"/><path d="M8.6 12h.8M11.6 12h.8M14.6 12h.8M8.6 16h.8M11.6 16h.8M14.6 16h.8"/>',
    percent: '<path d="M6.4 17.6 17.6 6.4"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="16" r="2"/>',
    barChart: '<path d="M4 18h16"/><rect x="6" y="12" width="3.4" height="6"/><rect x="11.4" y="8" width="3.4" height="10"/><rect x="16.8" y="4.6" width="3.4" height="13.4"/>',
    pieChart: '<circle cx="12" cy="12" r="8.4"/><path d="M12 12V3.6"/><path d="M12 12l7.4 4.2"/>',
    repeat: '<path d="M4.4 11.4V9a2.4 2.4 0 0 1 2.4-2.4h10.4"/><path d="M15 4.2 17.6 6.6 15 9"/><path d="M19.6 12.6V15a2.4 2.4 0 0 1-2.4 2.4H6.8"/><path d="M9 15l-2.6 2.4L9 19.8"/>',
    arrowUpRight: '<path d="M7 17 17 7"/><path d="M9.4 7H17v7.6"/>',
    crown: '<path d="M4 8.4 8 12l4-6.4 4 6.4 4-3.6-1.6 9.2H5.6z"/>',
    trophy: '<path d="M8 4.6h8v4.2a4 4 0 0 1-8 0z"/><path d="M8 5.6H5.4v1.8a3 3 0 0 0 2.8 3"/><path d="M16 5.6h2.6v1.8a3 3 0 0 1-2.8 3"/><path d="M12 12.8v3.6"/><path d="M8.6 20h6.8l-.8-3.6H9.4z"/>',
    play: '<circle cx="12" cy="12" r="8.4"/><path d="M10.2 8.6 16 12l-5.8 3.4z"/>',
    filter: '<path d="M4 6h16l-6.2 7.2v5.4l-3.6 1.8v-7.2z"/>',
    tag: '<path d="M20 12.6V4.6a.6.6 0 0 0-.6-.6h-8L3.6 11.6 12 20z"/><circle cx="15.6" cy="8" r="1.2"/>'
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

  /* 配色：24 色，按 紫 / 蓝 / 青 / 绿 / 黄 / 橙 / 红 / 粉 / 棕 / 中性 分组。
     只存一套色值：暗色下由 CSS 的 color-mix 自动降饱和，避免维护两份调色板 */
  var PALETTE_GROUPS = [
    { key: 'purple', name: '紫', colors: ['#6b4ca8', '#8a6fc7', '#a98ad6', '#b07cb5'] },
    { key: 'blue', name: '蓝', colors: ['#5b93bf', '#6f7ba8', '#4c7a9e'] },
    { key: 'cyan', name: '青', colors: ['#4f9c9c', '#56a8a0'] },
    { key: 'green', name: '绿', colors: ['#6fae8b', '#5f9e6f'] },
    { key: 'yellow', name: '黄', colors: ['#d9a13d', '#c9b24a'] },
    { key: 'orange', name: '橙', colors: ['#c98b5e', '#d07a4a'] },
    { key: 'red', name: '红', colors: ['#c96b6b', '#b3564f'] },
    { key: 'pink', name: '粉', colors: ['#c48fb4', '#d98aa8'] },
    { key: 'brown', name: '棕', colors: ['#9c7b5f', '#8a6a52'] },
    { key: 'neutral', name: '中性', colors: ['#7d7689', '#6b6478', '#a5a1b5'] }
  ];
  var PALETTE = PALETTE_GROUPS.reduce(function (acc, g) { return acc.concat(g.colors); }, []);

  /* 8 套推荐组合：在一堆图标和颜色之间帮用户直接选好一套 */
  var COLOR_PRESETS = [
    { name: '学习计划', type: 'okr', icon: 'book', color: '#5b93bf', desc: '书本 + 蓝' },
    { name: '健身训练', type: 'habit', icon: 'dumbbell', color: '#c98b5e', desc: '哑铃 + 橙' },
    { name: '阅读清单', type: 'reading', icon: 'bookmark', color: '#56a8a0', desc: '书签 + 青' },
    { name: '财务记账', type: 'counter', icon: 'wallet', color: '#5f9e6f', desc: '钱包 + 绿' },
    { name: '每周复盘', type: 'review', icon: 'repeat', color: '#8a6fc7', desc: '循环箭头 + 紫' },
    { name: '灵感收集', type: 'excerpt', icon: 'bulb', color: '#d9a13d', desc: '灯泡 + 黄' },
    { name: '项目跟进', type: 'milestone', icon: 'target', color: '#6f7ba8', desc: '目标 + 靛' },
    { name: '习惯打卡', type: 'habit', icon: 'check', color: '#6b4ca8', desc: '勾 + 紫' }
  ];

  /* 17 种类型：全部有数据字段 + 渲染 + 编辑，可真实使用（新增沿用同一 state 与同步链路） */
  var MODULE_TYPES = [
    { type: 'todo', name: '待办清单', desc: '轻量的行动清单', icon: 'check', color: '#6b4ca8', title: '待办清单', w: 'half' },
    { type: 'habit', name: '习惯追踪', desc: '按天打钩的网格', icon: 'grid', color: '#6fae8b', title: '习惯打卡', w: 'full' },
    { type: 'timeline', name: '时间轴日程', desc: '按小时安排一天', icon: 'clock', color: '#5b93bf', title: '今日时间轴', w: 'full' },
    { type: 'note', name: '笔记随记', desc: '随手写下的区块', icon: 'note', color: '#c98b5e', title: '随手记', w: 'half' },
    { type: 'goal', name: '目标进度条', desc: '一个目标 + 进度', icon: 'target', color: '#6b4ca8', title: '目标进度', w: 'half' },
    { type: 'counter', name: '计数器', desc: '一天几次，加减记录', icon: 'cup', color: '#4f9c9c', title: '喝水打卡', w: 'half' },
    { type: 'milestone', name: '里程碑进度', desc: '分阶段推进的节点', icon: 'flag', color: '#6f7ba8', title: '里程碑', w: 'half' },
    { type: 'reading', name: '阅读清单', desc: '想读 / 在读 / 读完', icon: 'bookmark', color: '#56a8a0', title: '阅读清单', w: 'half' },
    { type: 'kanban', name: '周看板', desc: '待办 / 进行中 / 完成', icon: 'kanban', color: '#8a6fc7', title: '本周看板', w: 'full' },
    { type: 'dashboard', name: '指标仪表盘', desc: '多个数字一起看', icon: 'gauge', color: '#5b93bf', title: '关键指标', w: 'half' },
    { type: 'diary', name: '每日一句话', desc: '一天只写一句', icon: 'journal', color: '#d9a13d', title: '每日一句话', w: 'half' },
    { type: 'excerpt', name: '阅读摘录', desc: '句子 + 出处', icon: 'quote', color: '#d9a13d', title: '摘录本', w: 'half' },
    { type: 'quadrant', name: '四象限待办', desc: '紧急 × 重要', icon: 'layout', color: '#c96b6b', title: '四象限', w: 'half' },
    { type: 'countdown', name: '倒计时纪念日', desc: '还有几天 / 已过几天', icon: 'hourglass', color: '#b07cb5', title: '倒计时', w: 'half' },
    { type: 'okr', name: '目标 OKR', desc: '目标 + 关键结果', icon: 'compass', color: '#6b4ca8', title: '目标 OKR', w: 'half' },
    { type: 'metric', name: '数字指标', desc: '一个数，持续记录', icon: 'trend', color: '#6f7ba8', title: '数字指标', w: 'half' },
    { type: 'review', name: '决策复盘', desc: '选择 · 假设 · 收获', icon: 'bulb', color: '#b07cb5', title: '决策复盘', w: 'half' }
  ];

  var TYPE_NAME = {
    todo: '待办', habit: '打卡网格', timeline: '时间轴', note: '笔记',
    goal: '进度条', counter: '计数器', milestone: '里程碑', reading: '书单',
    kanban: '看板', dashboard: '仪表盘', diary: '一句话', excerpt: '摘录',
    quadrant: '四象限', countdown: '倒计时',
    okr: 'OKR', metric: '指标', review: '复盘'
  };

  var LIFE8 = [
    { id: 'career', name: '主业', icon: 'brief', color: '#6b4ca8' },
    { id: 'workplace', name: '职场', icon: 'users', color: '#5b93bf' },
    { id: 'solo', name: '一人公司', icon: 'sparkle', color: '#b07cb5' },
    { id: 'finance', name: '财务管理', icon: 'wallet', color: '#c98b5e' },
    { id: 'growth', name: '个人提升', icon: 'book', color: '#6f7ba8' },
    { id: 'fun', name: '休闲娱乐', icon: 'coffee', color: '#d9a13d' },
    { id: 'health', name: '身心健康', icon: 'dumbbell', color: '#6fae8b' },
    { id: 'family', name: '家人关系', icon: 'heart', color: '#c96b6b' }
  ];

  /* 图标选择器：分组 + 可搜索（共 80 个，全部内联 SVG 24×24 stroke 1.6） */
  var ICON_GROUPS = [
    { name: '常用', icons: ['check', 'list', 'grid', 'clock', 'calendar', 'timer', 'hourglass', 'flag', 'target', 'compass', 'pin', 'star'] },
    { name: '生活', icons: ['sun', 'moon', 'heart', 'home', 'coffee', 'cup', 'droplet', 'bed', 'apple', 'cake', 'gift', 'shoppingBag', 'smile', 'music', 'plane', 'map', 'users'] },
    { name: '工作', icons: ['brief', 'building', 'layers', 'sitemap', 'kanban', 'layout', 'code', 'mail', 'message', 'link', 'shield', 'lock'] },
    { name: '学习', icons: ['book', 'bookmark', 'journal', 'quote', 'cap', 'language', 'note', 'bulb', 'flask', 'atom', 'edit'] },
    { name: '健康', icons: ['dumbbell', 'run', 'pill', 'leaf', 'sprout', 'mountain', 'fire', 'anchor', 'gauge'] },
    { name: '财务', icons: ['wallet', 'yen', 'card', 'receipt', 'calculator', 'percent', 'barChart', 'pieChart', 'trend'] },
    { name: '时间灵感', icons: ['repeat', 'arrowUpRight', 'sparkle', 'palette', 'crown', 'trophy', 'play', 'filter', 'tag', 'eye'] }
  ];
  /* 图标中文别名：搜索时既能打英文 key 也能打中文 */
  var ICON_ALIAS = {
    check: '勾 完成 打钩', list: '列表 清单', grid: '网格 打卡', clock: '时钟 时间', calendar: '日历 日期',
    timer: '计时 番茄', hourglass: '沙漏 倒计时', flag: '旗 里程碑', target: '目标 靶心', compass: '罗盘 方向',
    pin: '钉 固定', star: '星 收藏', sun: '太阳 早晨', moon: '月亮 夜晚', heart: '心 喜欢', home: '家 房子',
    coffee: '咖啡 休闲', cup: '杯 喝水', droplet: '水滴 喝', bed: '床 睡眠', apple: '苹果 饮食',
    cake: '蛋糕 生日', gift: '礼物 惊喜', shoppingBag: '购物 买', smile: '笑脸 心情', music: '音乐 听歌',
    plane: '飞机 旅行', map: '地图 路线', users: '人 团队', brief: '公文包 工作', building: '楼 公司',
    layers: '层 结构', sitemap: '结构 组织', kanban: '看板 列', layout: '布局 四象限', code: '代码 开发',
    mail: '邮件 收件', message: '消息 聊天', link: '链接 关联', shield: '盾 防护', lock: '锁 安全',
    book: '书 读书 学习', bookmark: '书签 阅读', journal: '日记 本子', quote: '引用 摘录', cap: '学士帽 学习',
    language: '语言 外语', note: '笔记 便签', bulb: '灯泡 灵感', flask: '试管 实验', atom: '原子 科学',
    edit: '笔 编辑 写作', dumbbell: '哑铃 健身', run: '跑步 运动', pill: '药 吃药', leaf: '叶 自然',
    sprout: '发芽 成长', mountain: '山 目标', fire: '火 连续', anchor: '锚 稳定', gauge: '仪表 指标',
    wallet: '钱包 记账', yen: '钱 收入', card: '卡 支付', receipt: '小票 账单', calculator: '计算 算',
    percent: '百分比 折扣', barChart: '柱状 数据', pieChart: '饼图 占比', trend: '趋势 曲线',
    repeat: '循环 复盘 每周', arrowUpRight: '上升 前进', sparkle: '闪光 亮点', palette: '调色 设计',
    crown: '皇冠 优先', trophy: '奖杯 成就', play: '播放 开始', filter: '筛选 过滤', tag: '标签 分类', eye: '眼睛 观察'
  };
  var ICON_CHOICES = ICON_GROUPS.reduce(function (acc, g) { return acc.concat(g.icons); }, []);

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
    var h = (hex || '#6b4ca8').replace('#', '');
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

  /* 系统页顺序：概览 → 年度目标 → 月度规划 → 每日日程 → 八大模块 → 决策复盘
     按「年 → 月 → 日」的时间粒度收窄；这里就是唯一配置源，侧栏 / 顶部页签 / ⌘K / 数字快捷键都读它 */
  var PAGE_ORDER = ['overview', 'yearly', 'monthly', 'daily', 'life8', 'review'];

  function basePages() {
    return [
      { id: 'overview', name: '概览', icon: 'compass', builtin: 'overview', modules: [] },
      { id: 'yearly', name: '年度目标', icon: 'flag', builtin: 'yearly', modules: [] },
      { id: 'monthly', name: '月度规划', icon: 'calendar', builtin: 'monthly', modules: [] },
      { id: 'daily', name: '每日日程', icon: 'sun', builtin: 'daily', modules: [] },
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
    /* 云端凭据永远不进 state：导入外部备份时顺手清理 */
    delete s.cloud;
    delete s.cloudSync;
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
      p.modules = p.modules.filter(function (m) { return !!m && typeof m === 'object'; }).map(function (m) {
        m.id = m.id || uid('m');
        m.type = m.type || 'note';
        m.title = m.title || (TYPE_NAME[m.type] || '模块');
        m.icon = m.icon || 'note';
        m.color = m.color || PALETTE[0];
        m.w = m.w === 'full' ? 'full' : 'half';
        /* 按类型把 data 洗成确定可渲染的结构（null / 半截对象 / 旧字段都会被修好） */
        sanitizeModuleData(m);   /* 函数内部已把 m.data 洗成规范结构，切勿整体回写（曾导致 m.data === m 自引用） */
        return m;
      });
      return p;
    });
    s.pages.forEach(function (pg) { normalizeOkrPage(pg); });
    /* 旧数据兼容：为每日日程里的每条任务补稳定唯一 id 与所属日期，供月度计划引用 */
    s.pages.forEach(function (pg) { migrateDailyTasks(pg, s); });
    /* V5：今日三件事 / 心情精力 / 人生轮盘 / 周复盘 / OKR 归档 / 习惯周目标 */
    normalizeCoach(s);
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

  /* 系统页固定按「概览 → 年度 → 月度 → 每日 → 八大模块 → 决策复盘」的时间粒度排序（年→月→日） */
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
    cloudAfterSave();
    sbAfterSave();
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

  /* ---------------------------------------------------------
     数据加固（修复「概览写 3 个模块却只渲染 1 张卡」的根因）
     normalize 原先只做 filter(Boolean)，历史 / 导入 / 旧版本数据里
     半截对象或 null 项进入 items 后，renderCard 会在渲染第一张卡时抛错，
     异常冒泡出 renderPage 的循环 → 同页后续卡片全部不再渲染（模块数照常统计）。
     这里按类型把每个可见字段洗成确定可渲染的值，并丢掉无法修复的条目。
     --------------------------------------------------------- */
  function str(v, d) {
    if (typeof v === 'string') return v;
    if (typeof v === 'number' && isFinite(v)) return String(v);
    return d || '';
  }
  function num(v, d) {
    var n = Number(v);
    return isFinite(n) ? n : (d || 0);
  }
  function objArr(v) {
    return Array.isArray(v) ? v.filter(function (x) { return x && typeof x === 'object'; }) : [];
  }
  function objMap(v) {
    return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
  }

  function sanitizeModuleData(m) {
    var d = objMap(m.data);
    m.data = d;
    switch (m.type) {
      case 'todo':
        d.items = objArr(d.items).map(function (it) {
          return { id: it.id || uid('t'), text: str(it.text), done: !!it.done, ref: it.ref };
        }).filter(function (it) { return it.text; });
        break;
      case 'habit':
        d.month = isMonthStr(d.month) ? d.month : monthKey(new Date());
        d.habits = objArr(d.habits).map(function (h) {
          var src = objMap(h.checks);
          var safe = {};
          Object.keys(src).forEach(function (k) { if (isDateStr(k) && src[k]) safe[k] = true; });
          return { id: h.id || uid('h'), name: str(h.name, '未命名习惯'), checks: safe, goal: Math.max(0, num(h.goal, 0)) };
        }).filter(function (h) { return !!h.name; });
        break;
      case 'timeline':
        d.date = isDateStr(d.date) ? d.date : today();
        d.items = objArr(d.items).map(function (it) {
          return {
            id: it.id || uid('tl'), text: str(it.text), start: str(it.start), end: str(it.end),
            done: !!it.done, ref: it.ref
          };
        }).filter(function (it) { return it.text; });
        break;
      case 'metric':
        d.value = num(d.value, 0);
        d.unit = str(d.unit);
        d.label = str(d.label);
        d.step = num(d.step, 1) || 1;
        d.history = objArr(d.history).map(function (h) {
          return { d: isDateStr(h.d) ? h.d : today(), v: num(h.v, 0) };
        });
        break;
      case 'note':
        d.text = str(d.text);
        break;
      case 'goal':
        d.items = objArr(d.items).map(function (g) {
          return {
            id: g.id || uid('g'), title: str(g.title, '目标'),
            cur: Math.max(0, num(g.cur, 0)), target: Math.max(0, num(g.target, 10)), unit: str(g.unit)
          };
        }).filter(function (g) { return !!g.title; });
        break;
      case 'counter':
        d.items = objArr(d.items).map(function (c) {
          return {
            id: c.id || uid('c'), name: str(c.name, '计数'), unit: str(c.unit, '次'),
            val: num(c.val, 0), step: num(c.step, 1) || 1, goal: Math.max(0, num(c.goal, 0))
          };
        }).filter(function (c) { return !!c.name; });
        break;
      case 'milestone':
        d.items = objArr(d.items).map(function (i) {
          return {
            id: i.id || uid('ms'), title: str(i.title, '里程碑'),
            date: isDateStr(i.date) ? i.date : '', done: !!i.done
          };
        }).filter(function (i) { return !!i.title; });
        break;
      case 'reading':
        d.items = objArr(d.items).map(function (b) {
          var st = b.status === 'reading' || b.status === 'done' ? b.status : 'want';
          return {
            id: b.id || uid('bk'), title: str(b.title, '未命名'), author: str(b.author), status: st,
            cur: Math.max(0, num(b.cur, 0)), total: Math.max(0, num(b.total, 0)), note: str(b.note)
          };
        }).filter(function (b) { return !!b.title; });
        break;
      case 'kanban':
        d.cols = Array.isArray(d.cols) && d.cols.length >= 2
          ? d.cols.map(function (c) { return str(c, '列'); })
          : ['待办', '进行中', '已完成'];
        d.items = objArr(d.items).map(function (i) {
          return {
            id: i.id || uid('kb'), text: str(i.text),
            col: clamp(Math.floor(num(i.col, 0)), 0, d.cols.length - 1)
          };
        }).filter(function (i) { return !!i.text; });
        break;
      case 'dashboard':
        d.metrics = objArr(d.metrics).map(function (k) {
          return {
            id: k.id || uid('kpi'), label: str(k.label, '指标'), value: num(k.value, 0),
            unit: str(k.unit), target: Math.max(0, num(k.target, 0))
          };
        }).filter(function (k) { return !!k.label; });
        break;
      case 'diary':
        var srcE = objMap(d.entries);
        var safeE = {};
        Object.keys(srcE).forEach(function (k) {
          if (isDateStr(k) && srcE[k]) safeE[k] = str(srcE[k]).slice(0, 120);
        });
        d.entries = safeE;
        break;
      case 'excerpt':
        d.items = objArr(d.items).map(function (q) {
          return {
            id: q.id || uid('ex'), text: str(q.text), source: str(q.source),
            page: str(q.page), at: isDateStr(q.at) ? q.at : ''
          };
        }).filter(function (q) { return !!q.text; });
        break;
      case 'quadrant':
        d.items = objArr(d.items).map(function (i) {
          return {
            id: i.id || uid('q'), text: str(i.text),
            urgent: !!i.urgent, important: !!i.important, done: !!i.done
          };
        }).filter(function (i) { return !!i.text; });
        break;
      case 'countdown':
        d.items = objArr(d.items).map(function (c) {
          return {
            id: c.id || uid('cd'), title: str(c.title, '纪念日'),
            date: isDateStr(c.date) ? c.date : '', repeat: c.repeat === 'year' ? 'year' : ''
          };
        }).filter(function (c) { return !!c.title; });
        break;
      case 'okr':
        d.objectives = objArr(d.objectives).map(function (o) {
          return { id: o.id || uid('o'), title: str(o.title, '新的目标'), krs: Array.isArray(o.krs) ? o.krs : [] };
        });
        break;
      case 'review':
        d.items = objArr(d.items).map(function (it) {
          return {
            id: it.id || uid('r'), title: str(it.title, '未命名的决定'), date: str(it.date),
            hypothesis: str(it.hypothesis), outcome: str(it.outcome), score: clamp(num(it.score, 0), 0, 5)
          };
        });
        break;
      default: break;
    }
    return d;
  }

  function sanitizePageData(pg) {
    (pg.modules || []).forEach(function (m) { sanitizeModuleData(m); });
    return pg;
  }

  /* 新增模块时给的默认内容：新卡片一落地就是能用的样子，而不是一堆空字段 */
  function seedModuleData(type) {
    /* 注意：这里必须用空对象起点，不能再回调 blankData —— 否则两者互递归会栈溢出 */
    var base = {};
    var t = today();
    switch (type) {
      case 'goal':
        base.items = [{ id: uid('g'), title: '本周跑量', cur: 0, target: 20, unit: '公里' }];
        break;
      case 'counter':
        base.items = [{ id: uid('c'), name: '喝水', unit: '杯', val: 0, step: 1, goal: 8 }];
        break;
      case 'milestone':
        base.items = [
          { id: uid('ms'), title: '启动', date: t, done: true },
          { id: uid('ms'), title: '跑通最小闭环', date: shiftISO(t, 14), done: false },
          { id: uid('ms'), title: '复盘并放大', date: shiftISO(t, 45), done: false }
        ];
        break;
      case 'reading':
        base.items = [{ id: uid('bk'), title: '一本想读的书', author: '', status: 'reading', cur: 0, total: 320, note: '' }];
        break;
      case 'kanban':
        base.items = [
          { id: uid('kb'), text: '把本周要推的事拆成卡片', col: 0 },
          { id: uid('kb'), text: '已经开工的那一件', col: 1 }
        ];
        break;
      case 'dashboard':
        base.metrics = [
          { id: uid('kpi'), label: '深睡时长', value: 0, unit: 'h', target: 7.5 },
          { id: uid('kpi'), label: '省下的钱', value: 0, unit: '元', target: 2000 }
        ];
        break;
      case 'excerpt':
        base.items = [{ id: uid('ex'), text: '把打动你的那句话抄在这里', source: '', page: '', at: t }];
        break;
      case 'quadrant':
        base.items = [
          { id: uid('q'), text: '重要且紧急的一件事', urgent: true, important: true, done: false },
          { id: uid('q'), text: '重要但不紧急的长期事', urgent: false, important: true, done: false }
        ];
        break;
      case 'countdown':
        base.items = [{ id: uid('cd'), title: '下一个重要日子', date: shiftISO(t, 30), repeat: '' }];
        break;
      case 'diary':
        base.entries = {};
        break;
      default: break;
    }
    return base;
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
      default: return seedModuleData(type);
    }
  }

  /* ---------------------------------------------------------
     顶栏引导胶囊：仅在真正没有任何数据时出现
     --------------------------------------------------------- */
  function hasUserData() {
    if (state.seeded) return true;
    if (state.lines && Object.keys(state.lines).length) return true;
    if (allModules().length) return true;
    return false;
  }

  function updateGuideButtons() {
    var show = !hasUserData();
    ['#btn-guide-sample', '#btn-guide-blank'].forEach(function (sel) {
      var el = $(sel);
      if (!el) return;
      if (show) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
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
    updateGuideButtons();
    $('#page-title').textContent = page.name;
    $('#page-title').title = page.name + '（点击可重命名）';
    $('#page-title').setAttribute('aria-label', '当前页：' + page.name + '，点击重命名');
    document.title = page.name + ' · ' + (state.settings.appName || 'Life OS');
    canvas.innerHTML = '';
    /* 页面类型挂在 canvas 上，样式表据此给不同页各自的尺度（概览仪表盘 / 各类详情页） */
    canvas.dataset.page = page.builtin || 'custom';
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

    /* 概览仪表盘：响应式网格，首屏给出今日聚焦 / 时间轴 / 习惯 / OKR / 心情 / 全局速览 */
    if (page.builtin === 'overview') canvas.appendChild(overviewBoard());
    /* 今日聚焦：三件事 + 容量 + 逾期 */
    if (page.builtin === 'overview') {
      var fb = focusBlock();
      fb.id = 'focus-card';
      canvas.appendChild(fb);
      var mb0 = moodBlock();
      mb0.id = 'mood-block';
      canvas.appendChild(mb0);
      canvas.appendChild(kpisBlock());
    }
    if (page.builtin === 'daily') canvas.appendChild(dailyBarBlock());
    if (page.builtin === 'monthly') canvas.appendChild(agendaBlock());
    if (page.builtin === 'life8') canvas.appendChild(boardBlock());
    /* 人生轮盘：八大领域雷达图 + 季度快照对比 */
    if (page.builtin === 'life8') canvas.appendChild(wheelBlock());
    if (page.builtin === 'review') canvas.appendChild(loopBlock());
    /* 周复盘：自动汇总 + 四栏手填 + 历史 */
    if (page.builtin === 'review') canvas.appendChild(weeklyBlock());
    /* OKR 等权汇总 + 季度归档 */
    if (page.builtin === 'yearly') canvas.appendChild(okrBlock());

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
      /* 单张卡渲染异常只降级这张卡，绝不中断同页后续卡片（概览「3 个模块只显示 1 张」的根因） */
      var card;
      try {
        card = renderCard(m);
      } catch (err) {
        card = renderCardError(m, err);
      }
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

  /* ========= 概览仪表盘（响应式网格 + 紧凑卡片） ========= */

  /* 概览卡片跳转：系统页直接切换，块内内容用锚点滚动 */
  function ovGo(id) {
    if (!pageById(id)) return;
    if (state.current === id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    state.current = id;
    save();
    renderNav();
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function ovScrollTo(sel) {
    var el = $(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ovCard(o) {
    return '<div class="ov-card' + (o.wide ? ' wide' : '') + '" data-ov-go="' + esc(o.go || '') + '"' +
      (o.anchor ? ' data-ov-anchor="' + esc(o.anchor) + '"' : '') +
      ' role="button" tabindex="0" aria-label="' + esc(o.title) + '，点击查看详情">' +
      '<div class="ov-head"><span class="ov-ico" style="--c:' + esc(o.color || '#6b4ca8') + '">' + icon(o.icon) + '</span>' +
      '<span class="ov-title">' + esc(o.title) + '</span>' +
      (o.meta ? '<span class="ov-meta">' + o.meta + '</span>' : '') +
      '<span class="ov-more">详情 ›</span></div>' +
      '<div class="ov-body">' + o.body + '</div>' +
      '</div>';
  }

  /* 近 7 天心情曲线（迷你折线，无坐标轴） */
  function moodSpark() {
    var days = [];
    for (var i = 6; i >= 0; i--) days.push(shiftISO(today(), -i));
    var vals = days.map(function (d) {
      var r = moodOf(d);
      return r && r.mood ? clamp(Number(r.mood) || 0, 0, 10) : null;
    });
    var known = vals.filter(function (v) { return v != null; });
    if (!known.length) return '<p class="ov-empty">近 7 天还没有心情记录。</p>';
    var w = 200, h = 46, n = vals.length;
    var pts = [];
    vals.forEach(function (v, i) {
      if (v == null) return;
      var x = n > 1 ? (i / (n - 1)) * w : w / 2;
      var y = h - (v / 10) * (h - 6) - 3;
      pts.push([x, y]);
    });
    var line = pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    var area = '0,' + h + ' ' + line + ' ' + w + ',' + h;
    return '<svg class="ov-spark" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polygon points="' + area + '" fill="currentColor" opacity=".12"></polygon>' +
      '<polyline points="' + line + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>' +
      '</svg>';
  }

  function overviewBoard() {
    var key = today();
    var sec = document.createElement('section');
    sec.className = 'ov-board reveal';
    sec.id = 'overview-board';
    var cards = [];

    /* ① 今日聚焦 */
    var mits = mitsOf(key).filter(function (x) { return String(x.text || '').trim(); });
    var mitDone = mits.filter(function (x) { return x.done; }).length;
    cards.push(ovCard({
      title: '今日聚焦', icon: 'target', color: '#6b4ca8', go: 'overview', anchor: '#focus-card',
      meta: mits.length ? mitDone + '/' + mits.length : '未设定',
      body: mits.length
        ? '<ul class="ov-mini">' + mits.slice(0, 3).map(function (x) {
          return '<li class="' + (x.done ? 'done' : '') + '"><i>' + (x.done ? '✓' : '·') + '</i>' + esc(x.text) + '</li>';
        }).join('') + '</ul>'
        : '<p class="ov-empty">今天还没有挑出最重要的事。</p>'
    }));

    /* ② 今日时间轴摘要 */
    var tl = [], tlMods = 0;
    (pageById('daily') ? pageById('daily').modules : []).forEach(function (m) {
      if (!m || m.type !== 'timeline') return;
      tlMods += 1;
      (m.data.items || []).forEach(function (it) {
        if (!it) return;
        var d = isDateStr(it.date) ? it.date : key;
        if (d === key) tl.push(it);
      });
    });
    tl.sort(function (a, b) { return String(a.start || a.time || '').localeCompare(String(b.start || b.time || '')); });
    cards.push(ovCard({
      title: '今日时间轴', icon: 'clock', color: '#5b93bf', go: 'daily',
      meta: tl.length + ' 段安排',
      body: tl.length
        ? '<ul class="ov-mini">' + tl.slice(0, 3).map(function (it) {
          return '<li><i>' + esc(it.start || it.time || '--:--') + '</i>' + esc(it.text || '未命名') + '</li>';
        }).join('') + '</ul>'
        : '<p class="ov-empty">今天的时间轴还空着。</p>'
    }));

    /* ③ 习惯打卡 */
    var habits = [];
    state.pages.forEach(function (p) {
      (p.modules || []).forEach(function (m) {
        if (!m || m.type !== 'habit') return;
        (m.data.habits || []).forEach(function (h) { if (h) habits.push(h); });
      });
    });
    var hit = habits.filter(function (h) { return h.checks && h.checks[key]; }).length;
    cards.push(ovCard({
      title: '习惯打卡', icon: 'grid', color: '#6fae8b', go: 'daily',
      meta: habits.length ? hit + '/' + habits.length + ' 已完成' : '未建立',
      body: habits.length
        ? '<ul class="ov-mini">' + habits.slice(0, 3).map(function (h) {
          var on = !!(h.checks && h.checks[key]);
          return '<li class="' + (on ? 'done' : '') + '"><i>' + (on ? '✓' : '○') + '</i>' + esc(h.name) + '</li>';
        }).join('') + '</ul>'
        : '<p class="ov-empty">还没有习惯，加一条每天的固定动作。</p>'
    }));

    /* ④ OKR 进度 */
    var krPcts = [], objNames = [];
    state.pages.forEach(function (p) {
      (p.modules || []).forEach(function (m) {
        if (!m || m.type !== 'okr') return;
        (m.data.objectives || []).forEach(function (o) {
          var krs = (o.krs || []).filter(Boolean);
          if (!krs.length) return;
          var pct = Math.round(krs.reduce(function (a, k) {
            return a + clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
          }, 0) / krs.length);
          krPcts.push(pct);
          objNames.push({ name: o.title, pct: pct });
        });
      });
    });
    var okrAvg = krPcts.length ? Math.round(krPcts.reduce(function (a, b) { return a + b; }, 0) / krPcts.length) : 0;
    objNames.sort(function (a, b) { return b.pct - a.pct; });
    cards.push(ovCard({
      title: 'OKR 进度', icon: 'compass', color: '#8a6fc7', go: 'yearly',
      meta: krPcts.length ? '平均 <b>' + okrAvg + '%</b>' : '未建立',
      body: objNames.length
        ? '<ul class="ov-mini ov-bars">' + objNames.slice(0, 2).map(function (o) {
          return '<li><span>' + esc(o.name) + '</span><em>' + o.pct + '%</em>' +
            '<span class="ov-bar"><i style="width:' + o.pct + '%"></i></span></li>';
        }).join('') + '</ul>'
        : '<p class="ov-empty">还没有年度目标。</p>'
    }));

    /* ⑤ 心情与精力（近 7 天） */
    var mt = moodOf(key) || {};
    cards.push(ovCard({
      title: '心情曲线', icon: 'smile', color: '#d9a13d', go: 'overview', anchor: '#mood-block',
      meta: mt.mood ? '今日 <b>' + mt.mood + '/10</b>' : '今日未记',
      body: moodSpark()
    }));

    /* ⑥ 全局速览：各页模块数 + 最近的纪念日 */
    var chip = state.pages.filter(function (p) { return p.builtin; }).map(function (p) {
      return '<span class="ov-chip"><i></i>' + esc(p.name.replace(/·.*/, '')) + '<b>' + (p.modules || []).length + '</b></span>';
    }).join('');
    var nextCd = null;
    state.pages.forEach(function (p) {
      (p.modules || []).forEach(function (m) {
        if (!m || m.type !== 'countdown') return;
        (m.data.items || []).forEach(function (c) {
          if (!c || !isDateStr(c.date)) return;
          var left = dayDiff(today(), c.date);
          if (left >= 0 && (!nextCd || left < nextCd.left)) nextCd = { left: left, title: c.title };
        });
      });
    });
    cards.push(ovCard({
      title: '全局速览', icon: 'layers', color: '#7d7689', go: 'life8',
      meta: nextCd ? '最近纪念日 <b>' + nextCd.left + ' 天</b>' : '',
      body: '<div class="ov-chips">' + chip + '</div>' +
        (nextCd ? '<p class="ov-line">' + esc(nextCd.title) + ' · 还有 ' + nextCd.left + ' 天</p>' : '')
    }));

    sec.innerHTML = '<div class="ov-grid">' + cards.join('') + '</div>';

    $$('[data-ov-go]', sec).forEach(function (el) {
      function open() {
        var anchor = el.dataset.ovAnchor || '';
        var go = el.dataset.ovGo || '';
        if (go && go !== state.current) { ovGo(go); return; }
        if (anchor) {
          /* 同页：滚动到对应区块 */
          if (state.current !== go && go) { ovGo(go); }
          setTimeout(function () { ovScrollTo(anchor); }, 60);
        }
      }
      el.addEventListener('click', open);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    return sec;
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
          /* 引导按钮已收进顶栏（载入示例 / 空白搭建），这里只留一句轻提示 */
          actions: ''
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
          /* 时间范围升级：只有单一时间的旧数据，自动补 end = start + 30 分钟 */
          if (!isTimeStr(it.start)) { it.start = it.time; dailyMigrated = true; }
          if (!isTimeStr(it.end)) { it.end = fromMin(toMin(it.start) + tlDefMin()); dailyMigrated = true; }
          if (it.src && typeof it.src === 'object') {
            if (!it.src.ref || !isDateStr(it.src.date)) delete it.src;
            else if (typeof it.src.fp !== 'string') it.src.fp = tlFp(it);
          } else if ('src' in it) {
            delete it.src;
          }
        }
      });
      m.data.items = items;
      if (m.type === 'timeline') m.data.date = modDate;
    });
  }

  function taskRef(pageId, moduleId, itemId) { return pageId + '::' + moduleId + '::' + itemId; }

  /* ---------------------------------------------------------
     日程时间范围（start / end）
     旧数据只有单一 time：读取时自动补成「原时间 → 原时间 + 30 分钟」，
     原 time 字段保留不丢，保证月度计划、搜索等旧逻辑继续可用。
     --------------------------------------------------------- */
  function tlDefMin() { return 30; }

  function isTimeStr(v) {
    return typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
  }

  function toMin(v) {
    if (!isTimeStr(v)) return null;
    var p = v.split(':');
    return Number(p[0]) * 60 + Number(p[1]);
  }

  function fromMin(n) {
    n = ((Math.round(n) % 1440) + 1440) % 1440;
    return ('0' + Math.floor(n / 60)).slice(-2) + ':' + ('0' + (n % 60)).slice(-2);
  }

  function tlStart(it) {
    if (it && isTimeStr(it.start)) return it.start;
    if (it && isTimeStr(it.time)) return it.time;
    return '09:00';
  }

  function tlEnd(it) {
    if (it && isTimeStr(it.end)) return it.end;
    var s = toMin(tlStart(it));
    return fromMin(s + tlDefMin());
  }

  /* 结束早于开始 = 跨零点，按次日处理 */
  function tlCross(it) { return toMin(tlEnd(it)) < toMin(tlStart(it)); }

  function tlDur(it) {
    var s = toMin(tlStart(it)), e = toMin(tlEnd(it));
    return e >= s ? e - s : 1440 - s + e;
  }

  function tlRangeText(it) {
    return tlStart(it) + ' – ' + (tlCross(it) ? '次日 ' : '') + tlEnd(it);
  }

  /* 把 start/end 写回条目，并同步旧的单时间字段 */
  function tlFix(it) {
    it.start = tlStart(it);
    it.end = tlEnd(it);
    it.time = it.start;
    return it;
  }

  /* ---------------------------------------------------------
     引用某天行程
     --------------------------------------------------------- */
  function tlFp(it) {
    return [String((it && it.text) || ''), tlStart(it), tlEnd(it), String((it && it.tag) || '')].join('\u0001');
  }

  function dayOfModule(m) {
    if (dailyView) return dailyView;
    var d = m && m.data && m.data.date;
    return isDateStr(d) ? d : today();
  }

  function tlItemsOf(m) {
    m.data = (m.data && typeof m.data === 'object') ? m.data : {};
    if (!Array.isArray(m.data.items)) m.data.items = [];
    return m.data.items;
  }

  function findTimelineItem(ref) {
    var parts = String(ref || '').split('::');
    if (parts.length !== 3) return null;
    var pg = pageById(parts[0]);
    if (!pg) return null;
    var m = (pg.modules || []).filter(function (x) { return x && x.id === parts[1]; })[0];
    if (!m || !m.data || !Array.isArray(m.data.items)) return null;
    var it = m.data.items.filter(function (x) { return x && x.id === parts[2]; })[0];
    return it ? { page: pg, module: m, item: it } : null;
  }

  /* 某一天的全部时间轴条目（跨所有页签的时间轴模块） */
  function dayTimelineItems(date) {
    var out = [];
    if (!isDateStr(date)) return out;
    (state.pages || []).forEach(function (pg) {
      (pg.modules || []).forEach(function (m) {
        if (!m || m.type !== 'timeline' || !m.data || !Array.isArray(m.data.items)) return;
        var modDay = isDateStr(m.data.date) ? m.data.date : '';
        m.data.items.forEach(function (it) {
          if (!it) return;
          var d = isDateStr(it.date) ? it.date : modDay;
          if (d !== date) return;
          out.push({ ref: taskRef(pg.id, m.id, it.id), pageId: pg.id, moduleId: m.id, item: it, date: date });
        });
      });
    });
    out.sort(function (a, b) { return toMin(tlStart(a.item)) - toMin(tlStart(b.item)); });
    return out;
  }

  /* 日期 → 已引用的来源日期集合，用于防循环 */
  function dayQuoteMap() {
    var map = {};
    (state.pages || []).forEach(function (pg) {
      (pg.modules || []).forEach(function (m) {
        if (!m || m.type !== 'timeline' || !m.data || !Array.isArray(m.data.items)) return;
        m.data.items.forEach(function (it) {
          if (!it || !it.src || !isDateStr(it.src.date) || !isDateStr(it.date)) return;
          if (it.date === it.src.date) return;
          (map[it.date] = map[it.date] || {})[it.src.date] = 1;
        });
      });
    });
    return map;
  }

  function dayReaches(map, from, to, seen) {
    if (from === to) return true;
    seen = seen || {};
    if (seen[from]) return false;
    seen[from] = 1;
    var next = map[from] || {};
    var keys = Object.keys(next);
    for (var i = 0; i < keys.length; i++) {
      if (dayReaches(map, keys[i], to, seen)) return true;
    }
    return false;
  }

  function srcLabel(src) {
    var d = src && isDateStr(src.date) ? src.date : '';
    return d ? '引自 ' + d.slice(5) : '引自其他日期';
  }

  /* 引用状态：missing 来源已删 / stale 来源已更新 / 一致 */
  function srcState(it) {
    if (!it || !it.src || !it.src.ref) return null;
    var found = findTimelineItem(it.src.ref);
    if (!found) return { missing: true, label: srcLabel(it.src) };
    return {
      label: srcLabel(it.src),
      found: found,
      stale: tlFp(found.item) !== String(it.src.fp || '')
    };
  }

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
          start: tlStart(it), end: tlEnd(it),
          pageId: pg.id, moduleId: m.id, item: it
        });
      });
    });
    out.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      var am = (a.type === 'timeline' ? toMin(a.start) : toMin(a.time));
      var bm = (b.type === 'timeline' ? toMin(b.start) : toMin(b.time));
      if (am !== bm) return am - bm;
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
              (t.type === 'timeline' ? '<span class="agenda-time">' + esc(tlRangeText(t.item)) + '</span>' : '') +
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
        label: '今日待办', icon: 'check', tone: '#6b4ca8',
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
        '<span class="board-icon" style="--m-color:' + d.color + '">' + icon(d.icon) + '</span>' +
        '<span class="board-name">' + esc(d.name) + '</span>' +
        '</div>' +
        '<div class="board-score">' + d.score + '<small> / 10</small></div>' +
        '<div class="board-bar"><i data-w="' + (d.score * 10) + '" style="width:0;--m-color:' + d.color + '"></i></div>' +
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
        /* 让同页的人生轮盘雷达图跟随分数即时重绘 */
        try { document.dispatchEvent(new CustomEvent('life8:change')); } catch (e) { }
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
      '<h3>' + (welcome ? '这里还很空' : '这个页签还没有模块') + '</h3>' +
      '<p>' + (welcome
        ? '先从一个小模块开始就好 —— 想看完整的样子，点顶栏的「载入示例」；想自己搭，点「空白搭建」就够了。'
        : '模块是这个系统的最小单元。选一个类型，写个名字，就能开始用。') + '</p>' +
      (welcome ? '' :
        '<div class="empty-actions"><button class="solid-btn" data-act="add">添加模块</button></div>');
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
  /* 单张卡片渲染失败时的降级卡：给标题、原因与「重建内容」入口，保证同页其它卡片照常渲染 */
  function renderCardError(m, err) {
    var el = document.createElement('article');
    el.className = 'card mod card-error';
    el.style.setProperty('--c', (m && m.color) || '#6b4ca8');
    el.dataset.id = (m && m.id) || '';
    el.innerHTML = '<header class="card-head">' +
      '<span class="card-ico">' + icon((m && m.icon) || 'note') + '</span>' +
      '<div class="card-titles"><h3>' + esc((m && m.title) || '这个模块') + '</h3>' +
      '<p class="card-sub">内容结构异常，已单独隔离，不影响其它卡片</p></div></header>' +
      '<div class="card-body"><p class="ov-empty">错误：' + esc(String((err && err.message) || err || '未知')) + '</p></div>' +
      '<footer class="card-foot"><button class="ghost-btn" data-fix="' + esc((m && m.id) || '') + '">重建内容</button></footer>';
    el.querySelector('[data-fix]').addEventListener('click', function () {
      var target = (currentPage().modules || []).filter(function (x) { return x && x.id === (m && m.id); })[0];
      if (!target) return;
      target.data = blankData(target.type);
      save();
      renderPage();
      toast('已重建「' + (target.title || '模块') + '」的默认内容');
    });
    return el;
  }

  function renderCard(m) {
    var el = document.createElement('article');
    el.className = 'card' + (m.w === 'full' ? ' w-full' : '');
    el.dataset.mod = m.id;
    el.style.setProperty('--m-color', m.color || 'var(--brand-accent)');

    el.innerHTML =
      '<div class="card-head">' +
      '<span class="card-icon" style="--m-color:' + (m.color || '#6b4ca8') + '">' + icon(m.icon) + '</span>' +
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
      var monthStr = d.month || monthKey(new Date());
      var parts = monthStr.split('-');
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
          '<span class="hn-meta" data-meta="' + h.id + '">' + habitMetaText(h, monthStr) + '</span></div>' + cells;
      }).join('');

      /* V8：热度改为与网格列对齐的一行细刻度，替代原先占满整卡的大方格热力图 */
      var heat = heatLevel(d, monthStr);
      var heatCells = '';
      for (var c3 = 0; c3 < cols; c3++) {
        var info3 = dayInfo(c3);
        if (!info3.inMonth) { heatCells += '<span class="heat-bar blank"></span>'; continue; }
        var hv = null;
        for (var q = 0; q < heat.length; q++) { if (heat[q].key === info3.key) { hv = heat[q]; break; } }
        heatCells += '<span class="heat-bar l' + (hv ? hv.level : 0) + '" data-heat="' + info3.key + '" title="' +
          esc(info3.key) + ' · 完成 ' + (hv ? hv.count : 0) + ' 个习惯"></span>';
      }

      var total = 0;
      (d.habits || []).forEach(function (h) {
        Object.keys(h.checks || {}).forEach(function (k) { if (k.indexOf(y + '-' + pad(mo)) === 0) total++; });
      });
      var totalGoal = (d.habits || []).length * days;
      var totalPct = totalGoal ? Math.round(total / totalGoal * 100) : 0;

      return '<div class="habit-head">' +
        '<div class="habit-month">' +
        '<button type="button" data-mv="-1" aria-label="上个月">' + icon('chevronLeft') + '</button>' +
        '<span>' + y + ' 年 ' + mo + ' 月</span>' +
        '<button type="button" data-mv="1" aria-label="下个月">' + icon('chevronRight') + '</button>' +
        '</div>' +
        '<span class="habit-sum" data-hsum>' + total + '/' + totalGoal + ' · ' + totalPct + '%</span>' +
        '</div>' +
        (d.habits && d.habits.length
          ? '<div class="habit-scroll"><div class="habit-table" style="grid-template-columns:minmax(var(--hname-min),var(--hname-max)) repeat(' + cols + ',minmax(var(--cell-min),1fr))">' +
          '<div class="habit-name habit-name-head" aria-hidden="true"></div>' + cellsHead + rows +
          '<div class="habit-name habit-heat-label">每日热度</div>' + heatCells + '</div></div>'
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
          /* V8：打卡后统一刷新左侧小字（连续天数 / 本月完成）与热度刻度 */
          paintHabitStats(body, m);
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
        var pcts = krs.map(function (k) {
          return clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
        });
        var pct = krs.length ? Math.round(pcts.reduce(function (a, b) { return a + b; }, 0) / pcts.length) : 0;
        var hit = pcts.filter(function (p) { return p >= 100; }).length;
        var left = krs.length - hit;
        var sub = krs.length
          ? ('小目标 ' + krs.length + ' 个 · 已达成 ' + hit + ' 个' + (left > 0 ? ' · 还差 ' + left + ' 个' : ' · 全部达成'))
          : '还没拆小目标，先定一个能落地的小步';
        return '<div class="obj' + (krs.length && !left ? ' obj-allhit' : '') + '" data-obj="' + o.id + '">' +
          '<div class="obj-hero">' +
            '<div class="obj-hero-l">' +
              '<span class="obj-kicker">大目标</span>' +
              '<span class="obj-name">' + esc(o.title) + '</span>' +
              '<span class="obj-sub">' + sub + '</span>' +
            '</div>' +
            '<div class="obj-ring" style="--p:' + pct + '" role="img" aria-label="总进度 ' + pct + '%">' +
              '<i></i><b>' + pct + '%</b></div>' +
          '</div>' +
          (krs.length ? '<div class="obj-tree">' + krs.map(function (k, idx) {
            var p = clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
            var hitK = p >= 100;
            return '<div class="kr' + (hitK ? ' kr-hit' : '') + '" data-kr="' + k.id + '">' +
              '<span class="kr-node">' + (hitK ? icon('check') : (idx + 1)) + '</span>' +
              '<div class="kr-main">' +
                '<div class="kr-wrap">' +
                  '<span class="kr-text">' + esc(k.text) + '</span>' +
                  '<span class="kr-pct">' + Math.round(p) + '%</span>' +
                '</div>' +
                '<div class="kr-bar"><i style="width:' + p.toFixed(1) + '%"></i></div>' +
                '<div class="kr-tools">' +
                  '<button class="kr-num" type="button" data-kr-edit="' + k.id + '" title="点击修改目标次数">' +
                  k.cur + ' / ' + k.target + (k.unit ? ' ' + esc(k.unit) : '') + '</button>' +
                  '<button class="kr-mini" type="button" data-kr-step="-1" aria-label="减少">−</button>' +
                  '<button class="kr-mini" type="button" data-kr-step="1" aria-label="增加">＋</button>' +
                '</div>' +
              '</div>' +
              '</div>';
          }).join('') + '</div>'
            : '<p class="empty-line" style="margin:0 0 8px">给这个目标配 2 – 3 个可量化的小目标。</p>') +
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
      var allHit = items.length > 0 && done === items.length;
      /* 非每日视图（如系统页的「年度达成奖励」）加一条成就进度，强化「解锁奖励」的激励感 */
      var ach = (!dailyView && items.length) ? '<div class="ach' + (allHit ? ' ach-hit' : '') + '">' +
        '<span class="ach-ico">' + icon(allHit ? 'trophy' : 'star') + '</span>' +
        '<div class="ach-main">' +
        '<div class="ach-top"><span class="ach-label">' +
        (allHit ? '全部解锁 · 奖励到手' : '已解锁 <b>' + done + '</b> / ' + items.length + ' 项奖励') +
        '</span><span class="ach-pct">' + pct + '%</span></div>' +
        '<div class="ach-track"><i style="width:' + pct + '%"></i></div>' +
        '</div></div>' : '';
      return ach + '<div class="todo-list">' +
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
        (items.length && !ach ? '<div class="todo-foot"><div class="mini-progress"><i style="width:' + pct + '%"></i></div><span>' + done + ' / ' + items.length + '</span></div>' : '');
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
      var day = dayOfModule(m);
      var items = visibleDailyItems(d.items).slice().sort(function (a, b) {
        var x = toMin(tlStart(a)), y = toMin(tlStart(b));
        return (x == null ? 0 : x) - (y == null ? 0 : y);
      });
      var doneN = items.filter(function (i) { return i.done; }).length;
      return '<div class="tl-head">' +
        icon('calendar') + '<span>' + esc(cnShort(parseISO(day))) + '</span>' +
        '<span class="tl-count">' + items.length + ' 项安排' + (doneN ? ' · 完成 ' + doneN : '') + '</span>' +
        '<button class="tl-quote" type="button" data-tl-quote title="引用某天行程：选一个历史日期，勾选那天要搬过来的安排，一次复制到这一天">' +
        icon('copy') + '<span>引用某天</span></button>' +
        '</div>' +
        '<div class="tl">' +
        (items.length ? items.map(function (i, idx) {
          var st = srcState(i);
          return '<div class="tl-item' + (idx === 0 && !i.done ? ' is-now' : '') + (i.done ? ' done' : '') + '" data-tl="' + esc(i.id) + '">' +
            (dailyView
              ? '<button class="check tl-check' + (i.done ? ' on' : '') + '" type="button" data-tl-check aria-label="完成">' + icon('check') + '</button>'
              : '<span class="tl-dot"></span>') +
            '<button class="tl-time" type="button" data-tl-edit title="点击修改时间范围">' + esc(tlRangeText(i)) + '</button>' +
            '<span class="tl-body"><span class="tl-text">' + esc(i.text) +
            (i.tag ? '<span class="tl-tag">' + esc(i.tag) + '</span>' : '') + '</span>' +
            (st ? '<span class="tl-src-line"><button class="tl-src' +
              (st.stale ? ' is-stale' : '') + (st.missing ? ' is-gone' : '') + '" type="button" data-tl-src title="' +
              (st.missing ? '来源条目已被删除，点击可取消引用' : (st.stale ? '来源已更新，点击同步最新内容' : '点开可取消引用，或跳到来源那天')) + '">' +
              icon('cornerDown') + '<span>' + esc(st.label) +
              (st.stale ? ' · 来源已更新' : '') + (st.missing ? ' · 来源已删除' : '') + '</span></button></span>' : '') +
            '</span>' +
            '<button class="todo-del" type="button" aria-label="删除">' + icon('x') + '</button>' +
            '</div>';
        }).join('') : '<p class="empty-line">' + (dailyView ? '这一天还没有安排。' : '今天还没有安排。') + '</p>') +
        '</div>' +
        '<div class="inline-add tl-add">' +
        '<span class="tl-add-times">' +
        '<input class="field tl-time-in" type="time" data-start aria-label="开始时间" value="09:00">' +
        '<span class="tl-dash">–</span>' +
        '<input class="field tl-time-in" type="time" data-end aria-label="结束时间" value="09:30">' +
        '</span>' +
        '<input class="field tl-add-text" data-text placeholder="做什么">' +
        '<button class="add-btn" data-add type="button">加入</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.items = d.items || [];
      var day = dayOfModule(m);
      function add() {
        var sIn = $('[data-start]', body), eIn = $('[data-end]', body), tIn = $('[data-text]', body);
        var text = (tIn.value || '').trim();
        if (!text) { tIn.focus(); return; }
        var s = isTimeStr(sIn.value) ? sIn.value : '09:00';
        var e = isTimeStr(eIn.value) ? eIn.value : fromMin(toMin(s) + tlDefMin());
        if (e === s) { toast('结束时间和开始时间一样，先改成更晚（或跨零点更早）的时间'); eIn.focus(); return; }
        d.items.push({ id: uid('e'), start: s, end: e, time: s, text: text, tag: '', date: day, done: false });
        save();
        refreshCard(m);
        tIn.value = '';
        sIn.value = e === s ? s : e;
        eIn.value = fromMin(toMin(e) + tlDefMin());
      }
      $('[data-add]', body).addEventListener('click', add);
      $('[data-text]', body).addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      var qb = $('[data-tl-quote]', body);
      if (qb) qb.addEventListener('click', function () { openQuotePanel(m, day); });
      $$('[data-tl]', body).forEach(function (row) {
        var id = row.dataset.tl;
        function pick() { return d.items.filter(function (x) { return x && x.id === id; })[0]; }
        var del = $('.todo-del', row);
        if (del) del.addEventListener('click', function () {
          var it = pick();
          var hadSrc = !!(it && it.src);
          d.items = d.items.filter(function (x) { return !x || x.id !== id; });
          save();
          refreshCard(m);
          if (hadSrc) toast('已删除这一条（它原本是一条例程引用，来源那天不受影响）');
        });
        var ck = $('[data-tl-check]', row);
        if (ck) ck.addEventListener('click', function () {
          var it = pick();
          if (!it) return;
          it.done = !it.done;
          save();
          refreshCard(m);
        });
        var ed = $('[data-tl-edit]', row);
        if (ed) ed.addEventListener('click', function () {
          var it = pick();
          if (it) openTlEdit(m, it);
        });
        var sr = $('[data-tl-src]', row);
        if (sr) sr.addEventListener('click', function (e) {
          e.stopPropagation();
          var it = pick();
          if (it) openSrcActions(m, it);
        });
      });
    }
  };

  /* -------- 时间轴：时间范围 + 引用某天行程 -------- */
  function fmtDur(min) {
    var n = Math.max(0, Math.round(Number(min) || 0));
    var h = Math.floor(n / 60), mm = n % 60;
    if (!h) return mm + ' 分钟';
    return h + ' 小时' + (mm ? ' ' + mm + ' 分钟' : '');
  }

  /* 有行程的历史日期（不含当天），最近的排前面 */
  function recentDaysWithItems(target, limit) {
    var cnt = {};
    (state.pages || []).forEach(function (pg) {
      (pg.modules || []).forEach(function (m) {
        if (!m || m.type !== 'timeline' || !m.data || !Array.isArray(m.data.items)) return;
        var modDay = isDateStr(m.data.date) ? m.data.date : '';
        m.data.items.forEach(function (it) {
          if (!it) return;
          var dt = isDateStr(it.date) ? it.date : modDay;
          if (!dt || dt >= target) return;
          cnt[dt] = (cnt[dt] || 0) + 1;
        });
      });
    });
    return Object.keys(cnt).sort().reverse().slice(0, limit || 6).map(function (dt) {
      return { date: dt, n: cnt[dt] };
    });
  }

  /* 某天的全部时间轴条目（用于引用预览） */
  function dayItemsAll(date) {
    var list = dayTimelineItems(date).filter(function (x) {
      /* 被隐藏（删除但保留历史）的条目不再参与引用 */
      return !(x.item && x.item.hidden);
    });
    return list;
  }

  function openTlEdit(m, it) {
    var day = isDateStr(it.date) ? it.date : dayOfModule(m);
    var st = srcState(it);
    openDialog(
      '<h3>编辑安排</h3>' +
      '<p class="sub">' + esc(cnDate(parseISO(day))) + ' · 结束早于开始会按次日处理</p>' +
      '<div class="sheet-label">时间范围</div>' +
      '<div class="tl-form-row">' +
      '<input class="field" type="time" data-f-start value="' + esc(tlStart(it)) + '" aria-label="开始时间">' +
      '<span class="tl-dash">–</span>' +
      '<input class="field" type="time" data-f-end value="' + esc(tlEnd(it)) + '" aria-label="结束时间">' +
      '</div>' +
      '<p class="tl-hint" data-f-hint></p>' +
      '<div class="sheet-label">内容</div>' +
      '<input class="field tl-f-wide" data-f-text maxlength="80" placeholder="做什么" value="' + esc(it.text || '') + '">' +
      '<div class="sheet-label">标签</div>' +
      '<input class="field tl-f-wide" data-f-tag maxlength="12" placeholder="可选，例如 晨间" value="' + esc(it.tag || '') + '">' +
      (st && !st.missing ? '<p class="tl-src-note">这一条' + esc(st.label) + '，改这里不会影响来源那天。</p>' : '') +
      (st && st.missing ? '<p class="tl-src-note">来源条目已被删除，这一条现在是独立安排。</p>' : '') +
      '<div class="sheet-actions">' +
      '<button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        var sIn = $('[data-f-start]', sheet), eIn = $('[data-f-end]', sheet), hint = $('[data-f-hint]', sheet);
        function sync() {
          var s = isTimeStr(sIn.value) ? sIn.value : tlStart(it);
          var e = isTimeStr(eIn.value) ? eIn.value : tlEnd(it);
          if (s === e) {
            hint.className = 'tl-hint is-bad';
            hint.textContent = '结束时间不能和开始时间相同';
            return;
          }
          var probe = { start: s, end: e };
          var cross = tlCross(probe);
          hint.className = 'tl-hint' + (cross ? ' is-cross' : '');
          hint.textContent = '时长 ' + fmtDur(tlDur(probe)) + (cross ? ' · 跨零点，结束算作次日' : '');
        }
        [sIn, eIn].forEach(function (inp) {
          inp.addEventListener('input', sync);
          inp.addEventListener('change', sync);
        });
        sync();
        $('[data-ok]', sheet).addEventListener('click', function () {
          var s = sIn.value, e = eIn.value;
          if (!isTimeStr(s) || !isTimeStr(e)) { toast('开始和结束时间都要填完整'); return; }
          if (s === e) { toast('结束时间需要晚于开始时间，跨零点可直接选更早的时间'); return; }
          it.start = s; it.end = e; it.time = s;
          var txt = ($('[data-f-text]', sheet).value || '').trim();
          it.text = txt || it.text || '未命名安排';
          it.tag = ($('[data-f-tag]', sheet).value || '').trim();
          save();
          close();
          refreshCard(m);
          toast('已更新「' + it.text + '」· ' + tlRangeText(it));
        });
      }
    );
  }

  function openSrcActions(m, it) {
    var st = srcState(it);
    if (!st) return;
    if (st.stale && st.found) {
      syncFromSrc(m, it, st.found);
      return;
    }
    var day = it.src && isDateStr(it.src.date) ? it.src.date : '';
    openDialog(
      '<h3>这条例程' + esc(st.label) + '</h3>' +
      '<p class="sub">' + (st.missing
        ? '来源那天的那一条已经被删掉了，这里只剩复制过来的一份。'
        : '它当初从来源那天整条复制过来，之后两边各自独立；来源那天的改动不会自动影响到这里。') + '</p>' +
      (day ? '<p class="tl-src-note">来源日期：' + esc(cnDate(parseISO(day))) + '</p>' : '') +
      '<div class="sheet-actions">' +
      '<button class="ghost-btn" data-close>关闭</button>' +
      (day ? '<button class="ghost-btn" data-jump>跳到那天</button>' : '') +
      '<button class="solid-btn" data-unlink>取消引用</button></div>',
      function (sheet, close) {
        var jump = $('[data-jump]', sheet);
        if (jump) jump.addEventListener('click', function () {
          close();
          goToDate(day);
        });
        $('[data-unlink]', sheet).addEventListener('click', function () {
          delete it.src;
          save();
          close();
          renderPage();
          toast('已取消引用，这一条现在是独立安排');
        });
      }
    );
  }

  /* 来源更新：一键把内容同步成来源最新 */
  function syncFromSrc(m, it, found) {
    var s = found.item;
    it.text = String(s.text || '');
    it.tag = String(s.tag || '');
    it.start = tlStart(s);
    it.end = tlEnd(s);
    it.time = it.start;
    it.src = it.src || {};
    it.src.fp = tlFp(s);
    if (isDateStr(s.date)) it.src.date = s.date;
    save();
    renderPage();
    toast('已同步为来源最新内容 · ' + tlRangeText(it));
  }

  function openQuotePanel(m, day) {
    var target = day;
    var picked = {};
    var days = recentDaysWithItems(target, 6);
    var srcDay = days.length ? days[0].date : shiftISO(target, -1);
    var targetItems = tlItemsOf(m);

    function itemDay(x) {
      return isDateStr(x && x.date) ? x.date : dayOfModule(m);
    }

    function listOf() {
      return dayItemsAll(srcDay).filter(function (x) {
        return !!(x.item && String(x.item.text || '').trim());
      });
    }

    openDialog(
      '<h3>引用某天行程</h3>' +
      '<p class="sub">选一天，把那天要用的安排勾过来，一次复制到' + esc(cnShort(parseISO(target))) +
      '；复制后条目上会留「引自 X」标记，来源那天的改动会在标记处提示。</p>' +
      '<div class="sheet-label">来源日期</div>' +
      '<div class="tl-form-row"><input class="field tl-f-date" type="date" data-src max="' + shiftISO(target, -1) + '" value="' + esc(srcDay) + '"></div>' +
      '<div class="qt-days" data-days></div>' +
      '<div class="qt-bar"><label class="qt-all"><input type="checkbox" data-all><span>全选</span></label>' +
      '<span class="qt-hint" data-hint></span></div>' +
      '<div class="qt-list" data-list></div>' +
      '<div class="sheet-actions">' +
      '<button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok disabled>添加 0 项</button></div>',
      function (sheet, close) {
        var dateIn = $('[data-src]', sheet);
        var daysBox = $('[data-days]', sheet);
        var listBox = $('[data-list]', sheet);
        var hint = $('[data-hint]', sheet);
        var allBox = $('[data-all]', sheet);
        var okBtn = $('[data-ok]', sheet);

        function blocked() {
          if (srcDay === target) return '不能引用当天，请选择更早的日期。';
          if (dayReaches(dayQuoteMap(), srcDay, target)) {
            return '「' + srcDay.slice(5) + '」已经引用了这一天的安排，再反向引用会绕成循环，换一天吧。';
          }
          return '';
        }

        function pickedCount() {
          return Object.keys(picked).filter(function (k) { return picked[k]; }).length;
        }

        function renderDays() {
          daysBox.innerHTML = days.length ? days.map(function (x) {
            var wait = dayReaches(dayQuoteMap(), x.date, target);
            return '<button class="qt-day' + (x.date === srcDay ? ' active' : '') + (wait ? ' is-wait' : '') +
              '" type="button" data-day="' + esc(x.date) + '" title="' + esc(cnDate(parseISO(x.date))) + '">' +
              x.date.slice(5) + '<i>' + x.n + '</i></button>';
          }).join('') : '<span class="qt-none">最近没有可引用的历史行程</span>';
          $$('[data-day]', daysBox).forEach(function (b) {
            b.addEventListener('click', function () {
              srcDay = b.dataset.day;
              dateIn.value = srcDay;
              picked = {};
              renderDays();
              renderList();
            });
          });
        }

        function renderList() {
          var why = blocked();
          allBox.checked = false;
          allBox.disabled = !!why;
          okBtn.textContent = '添加 0 项';
          okBtn.disabled = true;
          if (why) {
            hint.className = 'qt-hint is-warn';
            hint.textContent = why;
            listBox.innerHTML = '<p class="empty-line">' + esc(why) + '</p>';
            return;
          }
          var list = listOf();
          if (!list.length) {
            hint.className = 'qt-hint';
            hint.textContent = '';
            listBox.innerHTML = '<p class="empty-line">这一天没有可复制的安排。</p>';
            return;
          }
          hint.className = 'qt-hint';
          hint.textContent = '共 ' + list.length + ' 项';
          listBox.innerHTML = list.map(function (x) {
            var it = x.item;
            var ref = x.ref;
            var dup = targetItems.some(function (y) {
              if (!y || itemDay(y) !== target) return false;
              return String(y.text || '') === String(it.text || '') &&
                tlStart(y) === tlStart(it) && tlEnd(y) === tlEnd(it);
            });
            var dis = dup || !!it.hidden;
            return '<label class="qt-row' + (dis ? ' is-off' : '') + '">' +
              '<input type="checkbox" data-ref="' + esc(ref) + '"' + (dis ? ' disabled' : '') + '>' +
              '<span class="qt-time">' + esc(tlRangeText(it)) + '</span>' +
              '<span class="qt-text">' + esc(it.text) + '</span>' +
              (dup ? '<span class="qt-badge">当天已有</span>' : '') +
              '</label>';
          }).join('');
          $$('[data-ref]', listBox).forEach(function (box) {
            box.addEventListener('change', function () {
              picked[box.dataset.ref] = box.checked;
              var n = pickedCount();
              okBtn.textContent = '添加 ' + n + ' 项';
              okBtn.disabled = !n;
            });
          });
          allBox.onchange = function () {
            var on = allBox.checked;
            $$('[data-ref]', listBox).forEach(function (box) {
              if (box.disabled) return;
              box.checked = on;
              picked[box.dataset.ref] = on;
            });
            var n = pickedCount();
            okBtn.textContent = '添加 ' + n + ' 项';
            okBtn.disabled = !n;
          };
        }

        dateIn.addEventListener('change', function () {
          srcDay = isDateStr(dateIn.value) ? dateIn.value : srcDay;
          picked = {};
          renderDays();
          renderList();
        });

        okBtn.addEventListener('click', function () {
          var refs = Object.keys(picked).filter(function (k) { return picked[k]; });
          if (!refs.length) return;
          var added = 0, skipped = 0;
          refs.forEach(function (ref) {
            var found = findTimelineItem(ref);
            if (!found) { skipped++; return; }
            var s = found.item;
            if (!String(s.text || '').trim()) { skipped++; return; }
            var dup = targetItems.some(function (y) {
              if (!y || itemDay(y) !== target) return false;
              return String(y.text || '') === String(s.text || '') &&
                tlStart(y) === tlStart(s) && tlEnd(y) === tlEnd(s);
            });
            if (dup) { skipped++; return; }
            var rec = {
              id: uid('e'),
              start: tlStart(s),
              end: tlEnd(s),
              time: tlStart(s),
              text: String(s.text || ''),
              tag: String(s.tag || ''),
              date: target,
              done: false,
              src: { ref: ref, date: srcDay, fp: tlFp(s) }
            };
            targetItems.push(rec);
            added++;
          });
          save();
          close();
          renderPage();
          toast('已从 ' + srcDay.slice(5) + ' 复制 ' + added + ' 项' + (skipped ? '，跳过 ' + skipped + ' 项重复或失效条目' : ''));
        });

        renderDays();
        renderList();
      }
    );
  }

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

  /* 云同步面板在窄屏是底部抽屉：关闭后清掉类名，避免影响其它弹窗 */
  if (overlay && window.MutationObserver) {
    new MutationObserver(function () {
      if (overlay.hidden) overlay.classList.remove('cloud-open');
    }).observe(overlay, { attributes: true, attributeFilter: ['hidden'] });
  }

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

  /* ========= 新增的模块类型渲染器（14 种里新增的 10 种） ========= */
  /* 两个日期相差几天（b - a，字符串 YYYY-MM-DD） */
  function dayDiff(a, b) {
    var da = parseISO(a), db = parseISO(b);
    if (!da || !db) return 0;
    return Math.round((db - da) / 86400000);
  }

  /* -------- 目标进度条 -------- */
  renderers.goal = {
    html: function (m) {
      var items = m.data.items || [];
      return '<div class="goal-list">' + (items.length ? items.map(function (g) {
        var pct = g.target > 0 ? clamp(Math.round(g.cur / g.target * 100), 0, 100) : 0;
        return '<div class="goal-row" data-item="' + esc(g.id) + '">' +
          '<div class="goal-head"><span class="goal-title">' + esc(g.title) + '</span>' +
          '<span class="goal-num"><b>' + g.cur + '</b> / ' + g.target + (g.unit ? ' ' + esc(g.unit) : '') +
          ' · ' + pct + '%</span></div>' +
          '<div class="mini-progress"><i style="width:' + pct + '%"></i></div>' +
          '<div class="goal-ops">' +
          '<button class="icon-mini" type="button" data-dec aria-label="减">' + icon('x') + '</button>' +
          '<button class="icon-mini" type="button" data-inc aria-label="加">' + icon('check') + '</button>' +
          '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button>' +
          '</div></div>';
      }).join('') : '<p class="empty-line">还没有目标，先写下一个想推进的数字。</p>') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="添加目标，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('g'), title: v, cur: 0, target: 10, unit: '' });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (row) {
        var g = d.items.filter(function (x) { return x.id === row.dataset.item; })[0];
        if (!g) return;
        $('[data-inc]', row).addEventListener('click', function () {
          g.cur = Math.min(g.target || 999999, g.cur + 1); save(); refreshCard(m);
        });
        $('[data-dec]', row).addEventListener('click', function () {
          g.cur = Math.max(0, g.cur - 1); save(); refreshCard(m);
        });
        $('[data-del]', row).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== g; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 计数器（喝水杯数这类） -------- */
  renderers.counter = {
    html: function (m) {
      var items = m.data.items || [];
      return '<div class="counter-list">' + (items.length ? items.map(function (c) {
        var pct = c.goal > 0 ? clamp(Math.round(c.val / c.goal * 100), 0, 100) : 0;
        return '<div class="counter-row" data-item="' + esc(c.id) + '">' +
          '<div class="counter-main"><span class="counter-name">' + esc(c.name) + '</span>' +
          '<span class="counter-val"><b>' + c.val + '</b><i>' + esc(c.unit || '次') + '</i>' +
          (c.goal > 0 ? '<em>/ ' + c.goal + '</em>' : '') + '</span></div>' +
          (c.goal > 0 ? '<div class="mini-progress"><i style="width:' + pct + '%"></i></div>' : '') +
          '<div class="counter-ops"><button class="ghost-btn sm" type="button" data-minus>-</button>' +
          '<button class="solid-btn sm" type="button" data-plus>+ ' + (c.step || 1) + '</button>' +
          '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></div>' +
          '</div>';
      }).join('') : '<p class="empty-line">还没有计数器，比如「喝水 8 杯」「抽空练琴 3 次」。</p>') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="添加计数项，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('c'), name: v, unit: '次', val: 0, step: 1, goal: 0 });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (row) {
        var c = d.items.filter(function (x) { return x.id === row.dataset.item; })[0];
        if (!c) return;
        $('[data-plus]', row).addEventListener('click', function () {
          c.val += c.step || 1; save(); refreshCard(m);
        });
        $('[data-minus]', row).addEventListener('click', function () {
          c.val = Math.max(0, c.val - (c.step || 1)); save(); refreshCard(m);
        });
        $('[data-del]', row).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== c; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 里程碑进度 -------- */
  renderers.milestone = {
    html: function (m) {
      var items = (m.data.items || []).slice().sort(function (a, b) {
        return (a.date || '9999').localeCompare(b.date || '9999');
      });
      var done = items.filter(function (i) { return i.done; }).length;
      var pct = items.length ? Math.round(done / items.length * 100) : 0;
      return '<div class="ms-head"><div class="mini-progress"><i style="width:' + pct + '%"></i></div>' +
        '<span class="ms-count"><b>' + done + '</b>/' + items.length + ' 节点</span></div>' +
        '<ul class="ms-list">' + (items.length ? items.map(function (i) {
          var left = i.date ? dayDiff(today(), i.date) : null;
          var state = i.done ? 'done' : (left != null && left < 0 ? 'late' : '');
          return '<li class="ms-row ' + state + '" data-item="' + esc(i.id) + '">' +
            '<button class="check' + (i.done ? ' on' : '') + '" type="button" data-toggle aria-label="完成">' + icon('check') + '</button>' +
            '<span class="ms-title">' + esc(i.title) + '</span>' +
            '<input class="date-mini" type="date" data-date value="' + esc(i.date) + '">' +
            '<span class="ms-date">' +
            (i.done ? '已完成' : (left == null ? '未排期' : (left >= 0 ? '还有 ' + left + ' 天' : '逾期 ' + (-left) + ' 天'))) + '</span>' +
            '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></li>';
        }).join('') : '<li class="empty-line">把一个大目标拆成几个节点，进度就看得见了。</li>') + '</ul>' +
        '<div class="inline-add"><input class="field" data-new placeholder="添加里程碑，回车确认">' +
        '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('ms'), title: v, date: '', done: false });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (row) {
        var i = d.items.filter(function (x) { return x.id === row.dataset.item; })[0];
        if (!i) return;
        $('[data-toggle]', row).addEventListener('click', function () {
          i.done = !i.done; save(); refreshCard(m);
        });
        var di = $('[data-date]', row);
        if (di) di.addEventListener('change', function () {
          i.date = isDateStr(di.value) ? di.value : ''; save(); refreshCard(m);
        });
        $('[data-del]', row).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== i; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 阅读清单 -------- */
  var READ_STATUS = { want: '想读', reading: '在读', done: '读完' };
  renderers.reading = {
    html: function (m) {
      var items = m.data.items || [];
      var reading = items.filter(function (b) { return b.status === 'reading'; }).length;
      var done = items.filter(function (b) { return b.status === 'done'; }).length;
      return '<div class="read-head"><span>在读 <b>' + reading + '</b></span><span>读完 <b>' + done + '</b></span>' +
        '<span>共 <b>' + items.length + '</b> 本</span></div>' +
        '<ul class="read-list">' + (items.length ? items.map(function (b) {
          var pct = b.total > 0 ? clamp(Math.round(b.cur / b.total * 100), 0, 100) : 0;
          return '<li class="read-row" data-item="' + esc(b.id) + '">' +
            '<button class="read-tag ' + b.status + '" type="button" data-cycle>' + READ_STATUS[b.status] + '</button>' +
            '<span class="read-title">' + esc(b.title) + (b.author ? '<i>' + esc(b.author) + '</i>' : '') + '</span>' +
            (b.total > 0 ? '<input class="num-mini" type="number" min="0" data-cur value="' + b.cur + '" aria-label="已读页数">' +
              '<span class="read-pct">' + pct + '%</span>' : '') +
            '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></li>';
        }).join('') : '<li class="empty-line">想读的书先记下来，读到哪也记一下。</li>') + '</ul>' +
        '<div class="inline-add"><input class="field" data-new placeholder="添加书名，回车确认">' +
        '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('bk'), title: v, author: '', status: 'want', cur: 0, total: 0, note: '' });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (row) {
        var b = d.items.filter(function (x) { return x.id === row.dataset.item; })[0];
        if (!b) return;
        $('[data-cycle]', row).addEventListener('click', function () {
          b.status = b.status === 'want' ? 'reading' : (b.status === 'reading' ? 'done' : 'want');
          save(); refreshCard(m);
        });
        var ci = $('[data-cur]', row);
        if (ci) ci.addEventListener('change', function () {
          b.cur = b.total > 0 ? clamp(Math.round(Number(ci.value) || 0), 0, b.total) : Math.max(0, Math.round(Number(ci.value) || 0));
          save(); refreshCard(m);
        });
        $('[data-del]', row).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== b; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 周看板 -------- */
  renderers.kanban = {
    html: function (m) {
      var d = m.data;
      var cols = d.cols || ['待办', '进行中', '已完成'];
      var items = d.items || [];
      return '<div class="kb-board">' + cols.map(function (name, ci) {
        var list = items.filter(function (i) { return i.col === ci; });
        return '<div class="kb-col"><div class="kb-colhead"><span>' + esc(name) + '</span><b>' + list.length + '</b></div>' +
          list.map(function (i) {
            return '<div class="kb-card" data-item="' + esc(i.id) + '">' +
              '<span>' + esc(i.text) + '</span>' +
              '<span class="kb-ops">' +
              (ci > 0 ? '<button type="button" data-move="-1" aria-label="左移">‹</button>' : '') +
              (ci < cols.length - 1 ? '<button type="button" data-move="1" aria-label="右移">›</button>' : '') +
              '<button type="button" data-del aria-label="删除">' + icon('x') + '</button></span></div>';
          }).join('') + '</div>';
      }).join('') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="加一张卡片到「' + esc(cols[0]) + '」，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var cols = d.cols || [];
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('kb'), text: v, col: 0 });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (el) {
        var it = d.items.filter(function (x) { return x.id === el.dataset.item; })[0];
        if (!it) return;
        $$('[data-move]', el).forEach(function (b) {
          b.addEventListener('click', function () {
            it.col = clamp(it.col + Number(b.dataset.move), 0, (cols.length || 3) - 1);
            save(); refreshCard(m);
          });
        });
        $('[data-del]', el).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== it; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 指标仪表盘 -------- */
  renderers.dashboard = {
    html: function (m) {
      var metrics = m.data.metrics || [];
      return '<div class="dash-grid">' + (metrics.length ? metrics.map(function (k) {
        var pct = k.target > 0 ? clamp(Math.round(k.value / k.target * 100), 0, 100) : 0;
        return '<div class="dash-cell" data-item="' + esc(k.id) + '">' +
          '<span class="dash-label">' + esc(k.label) + '</span>' +
          '<span class="dash-value"><b>' + k.value + '</b>' + (k.unit ? '<i>' + esc(k.unit) + '</i>' : '') + '</span>' +
          (k.target > 0 ? '<span class="dash-target">目标 ' + k.target + ' · ' + pct + '%</span>' +
            '<div class="mini-progress"><i style="width:' + pct + '%"></i></div>' : '') +
          '<span class="dash-ops"><button type="button" data-dec>-</button>' +
          '<button type="button" data-inc>+</button>' +
          '<button type="button" data-del aria-label="删除">' + icon('x') + '</button></span>' +
          '</div>';
      }).join('') : '<p class="empty-line">把最关心的几个数字放上来，一眼能看到趋势。</p>') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="添加指标名，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.metrics.push({ id: uid('kpi'), label: v, value: 0, unit: '', target: 0 });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (el) {
        var k = d.metrics.filter(function (x) { return x.id === el.dataset.item; })[0];
        if (!k) return;
        $('[data-inc]', el).addEventListener('click', function () { k.value += 1; save(); refreshCard(m); });
        $('[data-dec]', el).addEventListener('click', function () { k.value -= 1; save(); refreshCard(m); });
        $('[data-del]', el).addEventListener('click', function () {
          d.metrics = d.metrics.filter(function (x) { return x !== k; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 每日一句话 -------- */
  renderers.diary = {
    html: function (m) {
      var entries = m.data.entries || {};
      var keys = Object.keys(entries).sort().reverse();
      var t = today();
      var todayText = entries[t] || '';
      return '<div class="diary-today"><span class="diary-date">' + esc(cnShort(parseISO(t))) + '</span>' +
        '<textarea class="field diary-input" data-today rows="2" maxlength="120" placeholder="今天用一句话概括……">' + esc(todayText) + '</textarea>' +
        '</div>' +
        '<ul class="diary-list">' + (keys.length ? keys.slice(0, 8).map(function (k) {
          var d = parseISO(k);
          return '<li class="diary-row"><span class="diary-md">' + (d ? (d.getMonth() + 1) + '/' + d.getDate() : k) + '</span>' +
            '<span class="diary-text">' + esc(entries[k]) + '</span>' +
            '<button class="todo-del" type="button" data-del="' + esc(k) + '" aria-label="删除">' + icon('x') + '</button></li>';
        }).join('') : '<li class="empty-line">还没写过一句话，从今天开始。</li>') + '</ul>' +
        (keys.length ? '<p class="diary-foot">已连续记录 ' + streakOf(Object.keys(entries)) + ' 天</p>' : '');
    },
    bind: function (body, card, m) {
      var d = m.data;
      d.entries = objMap(d.entries);
      var ta = $('[data-today]', body);
      function commit() {
        var v = (ta.value || '').trim();
        var t = today();
        if (v) d.entries[t] = v.slice(0, 120); else delete d.entries[t];
        save();
      }
      ta.addEventListener('blur', commit);
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); refreshCard(m); }
      });
      $$('[data-del]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          delete d.entries[b.dataset.del]; save(); refreshCard(m);
        });
      });
    }
  };

  /* 连续记录天数（由日期键数组算） */
  function streakOf(dates) {
    var set = {};
    (dates || []).forEach(function (k) { if (isDateStr(k)) set[k] = true; });
    var n = 0, cur = today();
    if (!set[cur]) cur = shiftISO(cur, -1);
    while (set[cur]) { n += 1; cur = shiftISO(cur, -1); }
    return n;
  }

  /* -------- 阅读摘录 -------- */
  renderers.excerpt = {
    html: function (m) {
      var items = (m.data.items || []).slice().reverse().slice(0, 6);
      return '<div class="ex-list">' + (items.length ? items.map(function (q) {
        return '<figure class="ex-item" data-item="' + esc(q.id) + '">' +
          '<blockquote>' + esc(q.text) + '</blockquote>' +
          '<figcaption>' + (q.source ? '— ' + esc(q.source) : '') + (q.page ? ' · ' + esc(q.page) : '') +
          '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></figcaption></figure>';
      }).join('') : '<p class="empty-line">读到好句子就存进来，配一句出处。</p>') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="粘贴一句摘录，回车保存">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('ex'), text: v, source: '', page: '', at: today() });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (el) {
        var q = d.items.filter(function (x) { return x.id === el.dataset.item; })[0];
        if (!q) return;
        $('[data-del]', el).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== q; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 四象限待办 -------- */
  var QUAD_META = [
    { key: 'q1', name: '重要且紧急', hint: '马上做' },
    { key: 'q2', name: '重要不紧急', hint: '排进计划' },
    { key: 'q3', name: '紧急不重要', hint: '尽量委托' },
    { key: 'q4', name: '不重要不紧急', hint: '可以放下' }
  ];
  function quadKeyOf(i) {
    if (i.important && i.urgent) return 'q1';
    if (i.important) return 'q2';
    if (i.urgent) return 'q3';
    return 'q4';
  }
  renderers.quadrant = {
    html: function (m) {
      var items = m.data.items || [];
      return '<div class="quad-grid">' + QUAD_META.map(function (q) {
        var list = items.filter(function (i) { return quadKeyOf(i) === q.key; });
        return '<div class="quad-cell"><div class="quad-head"><span>' + q.name + '</span><i>' + q.hint + '</i></div>' +
          list.map(function (i) {
            return '<div class="quad-item' + (i.done ? ' done' : '') + '" data-item="' + esc(i.id) + '">' +
              '<button class="check' + (i.done ? ' on' : '') + '" type="button" data-toggle aria-label="完成">' + icon('check') + '</button>' +
              '<span>' + esc(i.text) + '</span>' +
              '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></div>';
          }).join('') + '</div>';
      }).join('') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="添加任务到第一象限，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('q'), text: v, urgent: true, important: true, done: false });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (el) {
        var it = d.items.filter(function (x) { return x.id === el.dataset.item; })[0];
        if (!it) return;
        $('[data-toggle]', el).addEventListener('click', function () {
          it.done = !it.done; save(); refreshCard(m);
        });
        $('[data-del]', el).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== it; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 倒计时 / 纪念日 -------- */
  renderers.countdown = {
    html: function (m) {
      var items = m.data.items || [];
      return '<div class="cd-list">' + (items.length ? items.map(function (c) {
        var left = c.date ? dayDiff(today(), c.date) : null;
        var label = left == null ? '未设日期' : (left === 0 ? '就是今天' : (left > 0 ? '还有 ' + left + ' 天' : '已过 ' + (-left) + ' 天'));
        return '<div class="cd-item" data-item="' + esc(c.id) + '">' +
          '<span class="cd-days">' + (left == null ? '—' : Math.abs(left)) + '</span>' +
          '<input class="date-mini" type="date" data-date value="' + esc(c.date) + '">' +
          '<span class="cd-body"><b>' + esc(c.title) + '</b>' +
          '<i>' + label + '</i></span>' +
          '<button class="todo-del" type="button" data-del aria-label="删除">' + icon('x') + '</button></div>';
      }).join('') : '<p class="empty-line">纪念日、截止日放进来，心里有个数。</p>') + '</div>' +
      '<div class="inline-add"><input class="field" data-new placeholder="添加纪念日，回车确认">' +
      '<button class="add-btn" data-add type="button">添加</button></div>';
    },
    bind: function (body, card, m) {
      var d = m.data;
      var input = $('[data-new]', body);
      function add() {
        var v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        d.items.push({ id: uid('cd'), title: v, date: '', repeat: '' });
        save(); refreshCard(m);
      }
      $('[data-add]', body).addEventListener('click', add);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      $$('[data-item]', body).forEach(function (el) {
        var c = d.items.filter(function (x) { return x.id === el.dataset.item; })[0];
        if (!c) return;
        var di = $('[data-date]', el);
        if (di) di.addEventListener('change', function () {
          c.date = isDateStr(di.value) ? di.value : ''; save(); refreshCard(m);
        });
        $('[data-del]', el).addEventListener('click', function () {
          d.items = d.items.filter(function (x) { return x !== c; }); save(); refreshCard(m);
        });
      });
    }
  };

  /* -------- 添加模块 -------- */
  /* ========= 图标 / 配色 / 推荐组合 选择器（添加模块与改样式共用） ========= */

  function pickerHTML(sel) {
    var iconGroups = ICON_GROUPS.map(function (g) {
      return '<div class="icon-group" data-group>' +
        '<div class="ig-title">' + esc(g.name) + '</div>' +
        '<div class="icon-grid">' + g.icons.map(function (n) {
          return '<button class="icon-opt' + (n === sel.icon ? ' active' : '') + '" type="button" data-icon="' + n +
            '" title="' + esc(ICON_ALIAS[n] || n) + '" aria-label="' + esc(ICON_ALIAS[n] || n) + '">' + icon(n) + '</button>';
        }).join('') + '</div></div>';
    }).join('');

    var presets = COLOR_PRESETS.map(function (p, i) {
      return '<button class="preset' + (sel.icon === p.icon && sel.color === p.color ? ' active' : '') +
        '" type="button" data-preset="' + i + '" title="' + esc(p.desc) + '">' +
        '<span class="pre-ic" style="border-color:' + p.color + '">' + icon(p.icon) + '</span>' +
        '<span class="pre-tx"><b>' + esc(p.name) + '</b><small>' + esc(p.desc) + '</small></span></button>';
    }).join('');

    var colorGroups = PALETTE_GROUPS.map(function (g) {
      return '<div class="color-group"><span class="cg-title">' + esc(g.name) + '</span>' +
        '<span class="cg-swatches">' + g.colors.map(function (c) {
          return '<button class="swatch' + (c === sel.color ? ' active' : '') + '" type="button" data-color="' + c +
            '" style="background:' + c + '" aria-label="配色 ' + c + '"></button>';
        }).join('') + '</span></div>';
    }).join('');

    /* 顺序：推荐组合置顶（直接可见可点）→ 图标（分组 + 搜索）→ 配色（分组） */
    return '<div class="sheet-label">推荐组合<small>一键套用类型 + 图标 + 配色</small></div>' +
      '<div class="presets">' + presets + '</div>' +
      '<div class="pick-tools"><span class="sheet-label">图标</span>' +
      '<input class="field pick-search" data-icon-search placeholder="搜索图标：书 / 钱 / 跑步 / book" aria-label="搜索图标"></div>' +
      '<div class="icon-groups" data-icon-groups>' + iconGroups +
      '<p class="pick-none" data-icon-none hidden>没有匹配的图标，换个词试试。</p></div>' +
      '<div class="sheet-label">配色<small>24 色 · 按色系分组</small></div>' +
      '<div class="color-groups">' + colorGroups + '</div>';
  }

  /* 绑定选择器：sel 对象就地更新，onPreset 可选（用于同时改名称） */
  function bindPicker(sheet, sel, onPreset) {
    function markIcon() {
      $$('[data-icon]', sheet).forEach(function (b) { b.classList.toggle('active', b.dataset.icon === sel.icon); });
    }
    function markColor() {
      $$('.swatch', sheet).forEach(function (b) { b.classList.toggle('active', b.dataset.color === sel.color); });
    }
    function markPreset() {
      $$('[data-preset]', sheet).forEach(function (b) {
        var p = COLOR_PRESETS[Number(b.dataset.preset)];
        b.classList.toggle('active', !!p && p.icon === sel.icon && p.color === sel.color);
      });
    }

    $$('[data-icon]', sheet).forEach(function (b) {
      b.addEventListener('click', function () { sel.icon = b.dataset.icon; markIcon(); markPreset(); });
    });
    $$('.swatch', sheet).forEach(function (b) {
      b.addEventListener('click', function () { sel.color = b.dataset.color; markColor(); markPreset(); });
    });
    $$('[data-preset]', sheet).forEach(function (b) {
      b.addEventListener('click', function () {
        var p = COLOR_PRESETS[Number(b.dataset.preset)];
        if (!p) return;
        sel.icon = p.icon;
        sel.color = p.color;
        markIcon(); markColor(); markPreset();
        if (onPreset) onPreset(p);
      });
    });

    /* 图标搜索：英文 key + 中文别名都能命中，空分组自动隐藏 */
    var search = $('[data-icon-search]', sheet);
    var none = $('[data-icon-none]', sheet);
    if (search) {
      search.addEventListener('input', function () {
        var q = (search.value || '').trim().toLowerCase();
        var any = false;
        $$('.icon-group', sheet).forEach(function (g) {
          var hit = 0;
          $$('.icon-opt', g).forEach(function (b) {
            var key = (b.dataset.icon || '').toLowerCase();
            var alias = (ICON_ALIAS[b.dataset.icon] || '').toLowerCase();
            var on = !q || key.indexOf(q) >= 0 || alias.indexOf(q) >= 0;
            b.classList.toggle('hide', !on);
            if (on) hit += 1;
          });
          g.hidden = hit === 0 && !!q;
          if (hit) any = true;
        });
        if (none) none.hidden = !!any || !q;
      });
    }
  }

  /* -------- 添加模块（17 种类型 + 分组图标 + 24 色 + 推荐组合） -------- */
  function dialogAddModule() {
    var first = MODULE_TYPES[0];
    var sel = { type: first.type, icon: first.icon, color: first.color };

    openDialog(
      '<h3>添加模块</h3>' +
      '<p class="sub">模块是画布的最小单元：选一个类型，名字、图标、配色都能马上改。</p>' +
      '<div class="sheet-label">类型<small>' + MODULE_TYPES.length + ' 种 · 都能直接记东西</small></div>' +
      '<div class="type-grid type-grid-tall">' + MODULE_TYPES.map(function (t) {
        return '<button class="type-opt' + (t.type === sel.type ? ' active' : '') + '" type="button" data-type="' + t.type + '">' +
          '<span class="to-icon">' + icon(t.icon) + '</span>' +
          '<span><b>' + t.name + '</b><small>' + t.desc + '</small></span></button>';
      }).join('') + '</div>' +
      '<div class="sheet-label">名称</div>' +
      '<input class="field" style="width:100%" data-title maxlength="40" value="' + esc(first.title) + '" placeholder="例如：每周复盘">' +
      pickerHTML(sel) +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>添加到当前页</button></div>',
      function (sheet, close) {
        var titleInput = $('[data-title]', sheet);

        $$('.type-opt', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            var tp = b.dataset.type;
            var meta = MODULE_TYPES.filter(function (t) { return t.type === tp; })[0];
            if (!meta) return;
            sel.type = tp;
            /* 类型切换：默认名称与默认图标跟着走，配色保持用户选择 */
            sel.icon = meta.icon;
            titleInput.value = meta.title || meta.name;
            $$('.type-opt', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
            $$('[data-icon]', sheet).forEach(function (x) { x.classList.toggle('active', x.dataset.icon === sel.icon); });
            $$('[data-preset]', sheet).forEach(function (x) {
              var p = COLOR_PRESETS[Number(x.dataset.preset)];
              x.classList.toggle('active', !!p && p.icon === sel.icon && p.color === sel.color);
            });
          });
        });

        bindPicker(sheet, sel, function (p) {
          titleInput.value = p.name;
          if (p.type) {
            sel.type = p.type;
            $$('.type-opt', sheet).forEach(function (x) { x.classList.toggle('active', x.dataset.type === p.type); });
          }
        });

        $('[data-ok]', sheet).addEventListener('click', function () {
          var meta = MODULE_TYPES.filter(function (t) { return t.type === sel.type; })[0] || first;
          var m = {
            id: uid('m'),
            type: sel.type,
            title: (titleInput.value || '').trim() || meta.title || meta.name,
            icon: sel.icon,
            color: sel.color,
            w: meta.w || (sel.type === 'habit' || sel.type === 'kanban' || sel.type === 'timeline' ? 'full' : 'half'),
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

  /* -------- 图标与配色（同一套选择器） -------- */
  function dialogStyle(m) {
    var sel = { icon: m.icon, color: m.color };
    openDialog(
      '<h3>图标与配色</h3><p class="sub">图标和颜色会用在标题、进度条和打卡格上；推荐组合可以先一键套用。</p>' +
      pickerHTML(sel) +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        bindPicker(sheet, sel);
        $('[data-ok]', sheet).addEventListener('click', function () {
          m.icon = sel.icon;
          m.color = sel.color;
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
  /* 导出前剔除云同步凭据：token 只留在本机，绝不进备份文件 */
  function sanitizeExport(obj) {
    var clone;
    try { clone = JSON.parse(JSON.stringify(obj)); } catch (e) { return obj; }
    if (!clone || typeof clone !== 'object') return clone;
    ['cloud', 'cloudSync', 'token', 'gistToken', 'githubToken'].forEach(function (k) { delete clone[k]; });
    function scrub(o) {
      if (!o || typeof o !== 'object') return;
      Object.keys(o).forEach(function (k) {
        if (/token|gistId/i.test(k)) { delete o[k]; return; }
        scrub(o[k]);
      });
    }
    scrub(clone);
    return clone;
  }

  function exportData() {
    var data = JSON.stringify(sanitizeExport(state), null, 2);
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
          (state.pages || []).forEach(function (pg) { migrateDailyTasks(pg, state); });
          normalizeCoach(state);
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
      { id: 'career', name: '主业', icon: 'brief', color: '#6b4ca8', score: 8, note: '做深一条主线' },
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
      mkMod('todo', '今天的三件大事', 'check', '#6b4ca8', 'half', {
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
      mkMod('okr', '工作 · 把专业做成资产', 'brief', '#6b4ca8', 'half', {
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
      mkMod('todo', '11 月目标拆解', 'target', '#6b4ca8', 'half', {
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
      mkMod('habit', '每日打卡', 'grid', '#6b4ca8', 'full', {
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
      mkMod('timeline', '今日时间轴', 'clock', '#6b4ca8', 'full', {
        date: t,
        items: [
          { id: uid('e'), date: t, time: '07:20', text: '起床 · 拉伸 10 分钟 · 一杯水', tag: '晨间' },
          { id: uid('e'), date: t, time: '09:00', text: '深度工作：模块引擎与拖拽排序', tag: '专注' },
          { id: uid('e'), date: t, time: '12:30', text: '午饭 + 楼下走一圈', tag: '休息' },
          { id: uid('e'), date: t, time: '14:00', text: '11 月复盘会，过一遍关键结果', tag: '工作' },
          { id: uid('e'), date: t, time: '19:00', text: '读《深度工作》30 页', tag: '阅读' },
          { id: uid('e'), date: t, time: '22:30', text: '关电脑，写 3 行日记', tag: '收尾' },
          /* 前一天的两条，用来演示「引用某天行程」：在今天的页面上把它们复制过来 */
          { id: uid('e'), date: shiftISO(t, -1), start: '07:30', end: '07:50', time: '07:30', text: '晨间拉伸 + 冥想', tag: '晨间' },
          { id: uid('e'), date: shiftISO(t, -1), start: '20:00', end: '21:00', time: '20:00', text: '跑步 5 公里', tag: '运动' }
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
      mkMod('note', '八个抽屉怎么用', 'bulb', '#6b4ca8', 'full', {
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
      mkMod('note', '我的决策原则', 'compass', '#6b4ca8', 'full', {
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
      /* 空查询：先按 PAGE_ORDER 列出全部系统页签（顺序与侧栏一致），再补最近可跳转的模块 */
      var pageRows = all.filter(function (e) { return e.kind === 'page'; });
      var modRows = all.filter(function (e) { return e.kind === 'module'; }).slice(0, Math.max(4, 12 - pageRows.length));
      cmdkResults = pageRows.concat(modRows);
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
     云端账号与数据同步（Supabase）
     只用 fetch 直连 Supabase Auth / REST，不引入任何第三方库
     会话键：lifeos.sb.v1（access_token / refresh_token / expires_at / uid / email）
     数据表：public.life_os_state(user_id, data, rev, client_updated_at, updated_at)
     --------------------------------------------------------- */
  var SB_URL = 'https://bmfbizhacrzvhohhevpo.supabase.co';
  var SB_ANON = 'sb_publishable_WHjW9GvlXc7lr0xpvJmrqA_5U9HLFRz';
  var SB_SESSION_KEY = 'lifeos.sb.v1';
  var SB_SYNC_KEY = 'lifeos.sb.sync';        /* 每账号一份：lifeos.sb.sync::邮箱 */
  var SB_ROLLBACK_KEY = 'lifeos.sb.rollback';/* 下载覆盖前快照：lifeos.sb.rollback::邮箱 */
  var SB_TABLE = 'life_os_state';
  var SB_AUTO_DELAY = 1500;                  /* 数据变动后的自动同步防抖（静默后台推送） */
  var SB_CHANNEL = 'lifeos.sb.channel';      /* 同浏览器多标签页互通 */

  var sbUi = { busy: 0, offline: false, msg: null, syncing: false };
  var sbSuppress = false;      /* 程序化改写 state 期间不触发上传、不打页面时间戳 */
  var sbPushTimer = null;
  var sbRefreshTimer = null;
  var sbConflictOpen = false;
  var sbReconciling = false;   /* 同一时刻只跑一个对齐流程 */
  var sbReconcileAgain = false;
  var sbOfflineTimer = null;
  var sbBc = null;             /* BroadcastChannel 实例 */
  var sbTabId = 'tab-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  var sbLastToastAt = 0;
  var sbOnlineHooked = false;

  /* ---------------- 基础工具 ---------------- */
  function sbErr(code, msg, status) {
    var e = new Error(msg || code);
    e.code = code;
    e.status = status || 0;
    return e;
  }

  function sbText(d) {
    if (!d) return '';
    if (typeof d === 'string') return d;
    return String(d.message || d.error_description || d.error || d.msg || d.hint || '');
  }

  function sbHttpError(status, data) {
    var code = String((data && data.code) || (data && data.error) || '');
    var text = sbText(data);
    var s = (code + ' ' + text).toLowerCase();
    if (status === 400 || status === 401 || status === 403 || status === 422 || status === 409 ||
        /user_already_exists|already registered|email_exists|weak_password|password should be at least|invalid_email|email_not_confirmed|not confirmed/.test(s)) {
      if (/email_not_confirmed|email not confirmed|not confirmed/.test(s)) {
        return sbErr('EMAIL_UNCONFIRMED', text || '邮箱尚未确认', status);
      }
      if (/invalid_credentials|invalid login credentials|invalid grant|invalid_grant/.test(s)) {
        return sbErr('BAD_PASSWORD', text || '邮箱或密码不正确', status);
      }
      if (/user_already_exists|already registered|already been registered|email_exists/.test(s)) {
        return sbErr('EMAIL_EXISTS', text || '邮箱已注册', status);
      }
      if (/weak_password|password should be at least|password is too short|password_too_short/.test(s)) {
        return sbErr('WEAK_PASSWORD', text || '密码强度不足', status);
      }
      if (/invalid_email|unable to validate email|email address .* invalid/.test(s)) {
        return sbErr('BAD_EMAIL', text || '邮箱格式不正确', status);
      }
      if (/rate_limit|too many|over_/i.test(s)) return sbErr('RATE', text || '请求过于频繁', status);
      if (status === 401 || status === 403) return sbErr('UNAUTH', text || '登录状态已失效', status);
      return sbErr('BAD', text || '云端拒绝了这个请求', status);
    }
    if (status === 404) {
      if (/pgrst205|schema cache|does not exist|not find the table/.test(s)) {
        return sbErr('NO_TABLE', text || '数据表不存在', status);
      }
      return sbErr('NO_TABLE', text || '云端资源不存在', status);
    }
    if (status === 409) return sbErr('CONFLICT', text || '数据版本冲突', status);
    if (status === 429) return sbErr('RATE', text || '请求过于频繁', status);
    if (status === 422) return sbErr('BAD', text || '云端不接受这份数据', status);
    if (status >= 500) return sbErr('SERVER', text || '云端服务异常', status);
    return sbErr('BAD', text || ('请求失败（' + status + '）'), status);
  }

  /* 统一的错误文案：全中文、可操作 */
  function sbErrInfo(e) {
    var c = e && e.code;
    if (c === 'NETWORK') {
      return { type: 'warn', text: '网络不通，没能连上云端。可以继续用本机数据离线使用，网络恢复后会自动补同步。', action: 'retry', offline: true };
    }
    if (c === 'NO_TABLE') {
      return { type: 'err', text: '云端数据表还不存在（public.life_os_state）。请在 Supabase SQL Editor 里建好表后点「重试」，其它功能不受影响。', action: 'retry' };
    }
    if (c === 'UNAUTH') {
      return { type: 'err', text: '登录状态已失效，请重新登录云端账号后再同步。', action: 'relogin' };
    }
    if (c === 'EMAIL_UNCONFIRMED') {
      return { type: 'warn', text: '邮箱还没确认。请到邮箱里点开确认链接，回来就能登录；没收到可以点「重新发送确认邮件」。', action: 'resend' };
    }
    if (c === 'BAD_PASSWORD') return { type: 'err', text: '邮箱或密码不正确，请重新输入。' };
    if (c === 'EMAIL_EXISTS') return { type: 'err', text: '这个邮箱已经注册过了，请直接登录；忘记密码可以用「忘记密码」找回。' };
    if (c === 'WEAK_PASSWORD') return { type: 'err', text: '密码太短了，至少 6 位。' };
    if (c === 'BAD_EMAIL') return { type: 'err', text: '这个邮箱地址云端不接受，请检查是否写错。' };
    if (c === 'RATE') return { type: 'warn', text: '请求太频繁被云端限流了，请等一会儿再试。' };
    if (c === 'SERVER') return { type: 'err', text: '云端服务暂时异常，请稍后点「重试」。' };
    if (c === 'CONFLICT') return { type: 'warn', text: '云端数据版本冲突，请点「立即同步」重新核对。' };
    return { type: 'err', text: (e && e.message) || '云端请求失败，请稍后重试。' };
  }

  /* ---------------- 网络层 ---------------- */
  function sbRequest(path, opt) {
    opt = opt || {};
    var headers = { apikey: SB_ANON };
    if (opt.token) headers.Authorization = 'Bearer ' + opt.token;
    if (opt.body !== undefined) headers['Content-Type'] = 'application/json';
    if (opt.headers) {
      Object.keys(opt.headers).forEach(function (k) { headers[k] = opt.headers[k]; });
    }
    var init = { method: opt.method || 'GET', headers: headers, mode: 'cors', cache: 'no-store' };
    if (opt.body !== undefined) init.body = JSON.stringify(opt.body);
    return fetch(SB_URL + path, init).then(function (res) {
      return res.text().then(function (txt) {
        var data = null;
        if (txt) {
          try { data = JSON.parse(txt); } catch (e) { data = txt; }
        }
        if (res.ok) return data;
        throw sbHttpError(res.status, data);
      });
    }, function () {
      throw sbErr('NETWORK', '网络不通，无法连接云端服务');
    });
  }

  /* ---------------- 会话 ---------------- */
  function sbReadSession() {
    try {
      var s = JSON.parse(safeGet(SB_SESSION_KEY) || 'null');
      if (!s || !s.access_token) return null;
      return s;
    } catch (e) { return null; }
  }
  function sbWriteSession(s) {
    if (!s) safeDel(SB_SESSION_KEY);
    else safeSet(SB_SESSION_KEY, JSON.stringify(s));
  }
  function sbLoggedIn() { return !!sbReadSession(); }
  function sbCurrentEmail() { var s = sbReadSession(); return s ? normalizeEmail(s.email) : ''; }

  function sbAdoptToken(r, fallback) {
    if (!r || !r.access_token) throw sbErr('BAD', '云端没有返回登录凭证');
    var fb = fallback || {};
    var user = r.user || {};
    var s = {
      access_token: r.access_token,
      refresh_token: r.refresh_token || fb.refresh_token || '',
      expires_at: Date.now() + ((Number(r.expires_in) || 3600) * 1000),
      uid: user.id || fb.uid || '',
      email: normalizeEmail(user.email || fb.email || ''),
      at: Date.now()
    };
    sbWriteSession(s);
    sbScheduleRefresh();
    return s;
  }

  function sbScheduleRefresh() {
    clearTimeout(sbRefreshTimer);
    sbRefreshTimer = null;
    var s = sbReadSession();
    if (!s || !s.refresh_token) return;
    var wait = (Number(s.expires_at) || 0) - Date.now() - 60000;
    if (wait < 5000) wait = 5000;
    if (wait > 1800000) wait = 1800000;
    sbRefreshTimer = setTimeout(function () {
      sbEnsureSession().then(function () {
        updateCloudEntry();
      }, function (e) {
        if (e && (e.code === 'UNAUTH' || e.code === 'BAD_PASSWORD')) sbSessionExpired();
        else { sbUi.offline = true; updateCloudEntry(); }
      });
    }, wait);
  }

  /* 取可用会话：60 秒内将过期就先刷新 */
  function sbEnsureSession() {
    var s = sbReadSession();
    if (!s) return Promise.reject(sbErr('UNAUTH', '未登录云端账号'));
    if (s.access_token && (Number(s.expires_at) || 0) - Date.now() > 60000) {
      return Promise.resolve(s);
    }
    if (!s.refresh_token) return Promise.reject(sbErr('UNAUTH', '缺少刷新凭证'));
    return sbRequest('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST', body: { refresh_token: s.refresh_token }
    }).then(function (r) {
      return sbAdoptToken(r, s);
    }, function (e) {
      if (e && e.code === 'NETWORK') throw e;
      sbWriteSession(null);
      throw sbErr('UNAUTH', '登录状态已过期，请重新登录');
    });
  }

  /* 刷新/校验彻底失败：回登录页，数据仍在本地 */
  function sbSessionExpired() {
    sbWriteSession(null);
    clearTimeout(sbPushTimer);
    sbPushTimer = null;
    updateCloudEntry();
    if ($('#auth') && $('#auth').hidden) {
      showAuth('云端登录状态已过期，请重新登录。本机数据不受影响。');
    }
  }

  /* ---------------- Auth 接口 ---------------- */
  function sbSignUp(email, password) {
    return sbRequest('/auth/v1/signup', {
      method: 'POST', body: { email: email, password: password }
    }).then(function (r) {
      if (r && r.access_token) return { session: sbAdoptToken(r), needConfirm: false };
      return { session: null, needConfirm: true, email: (r && r.email) || email };
    });
  }

  function sbSignIn(email, password) {
    return sbRequest('/auth/v1/token?grant_type=password', {
      method: 'POST', body: { email: email, password: password }
    }).then(function (r) { return sbAdoptToken(r); });
  }

  function sbRecover(email) {
    return sbRequest('/auth/v1/recover', { method: 'POST', body: { email: email } });
  }

  function sbResendConfirm(email) {
    return sbRequest('/auth/v1/resend', { method: 'POST', body: { type: 'signup', email: email } });
  }

  function sbSignOutRemote() {
    var s = sbReadSession();
    if (!s) return Promise.resolve();
    return sbRequest('/auth/v1/logout', { method: 'POST', token: s.access_token, body: {} })
      .then(function () { return null; }, function () { return null; });
  }

  function sbFetchUser() {
    return sbEnsureSession().then(function (s) {
      return sbRequest('/auth/v1/user', { token: s.access_token });
    });
  }

  /* ---------------- 数据接口 ---------------- */
  function sbSyncStoreKey() { return SB_SYNC_KEY + '::' + (currentEmail() || sbCurrentEmail() || 'local'); }
  function sbSnapStoreKey() { return SB_ROLLBACK_KEY + '::' + (currentEmail() || sbCurrentEmail() || 'local'); }

  function sbReadMeta() {
    try {
      var m = JSON.parse(safeGet(sbSyncStoreKey()) || 'null');
      if (!m || typeof m !== 'object') m = {};
      return {
        lastFp: typeof m.lastFp === 'string' ? m.lastFp : '',
        lastAt: Number(m.lastAt) || 0,
        remoteAt: Number(m.remoteAt) || 0,
        rev: Number(m.rev) || 0
      };
    } catch (e) {
      return { lastFp: '', lastAt: 0, remoteAt: 0, rev: 0 };
    }
  }
  function sbWriteMeta(m) { safeSet(sbSyncStoreKey(), JSON.stringify(m)); }

  function sbSnapRead() {
    try {
      var s = JSON.parse(safeGet(sbSnapStoreKey()) || 'null');
      return (s && s.data) ? s : null;
    } catch (e) { return null; }
  }
  function sbSnapWrite(data) {
    try {
      safeSet(sbSnapStoreKey(), JSON.stringify({ at: Date.now(), data: data }));
    } catch (e) { }
  }

  function sbGetRow() {
    var s = sbReadSession();
    if (!s) return Promise.reject(sbErr('UNAUTH', '未登录云端账号'));
    if (!s.uid) return Promise.reject(sbErr('UNAUTH', '缺少用户标识，请重新登录'));
    return sbEnsureSession().then(function (ses) {
      var q = '/rest/v1/' + SB_TABLE + '?select=*&user_id=eq.' + encodeURIComponent(ses.uid);
      return sbRequest(q, { token: ses.access_token });
    }).then(function (rows) {
      if (Array.isArray(rows)) return rows[0] || null;
      return rows || null;
    });
  }

  function sbUpsertRow(data) {
    var s = sbReadSession();
    if (!s) return Promise.reject(sbErr('UNAUTH', '未登录云端账号'));
    if (!s.uid) return Promise.reject(sbErr('UNAUTH', '缺少用户标识，请重新登录'));
    return sbEnsureSession().then(function (ses) {
      return sbRequest('/rest/v1/' + SB_TABLE, {
        method: 'POST',
        token: ses.access_token,
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: {
          user_id: ses.uid,
          data: data,
          client_updated_at: new Date().toISOString()
        }
      });
    }).then(function (r) {
      if (Array.isArray(r)) return r[0] || null;
      return r || null;
    });
  }

  /* ---------------- 数据指纹 / 内容判定 ---------------- */
  /* p.up 是「页面最后改动时刻」这类易变字段：只服务合并，不参与内容比对，
     否则每次打时间戳都会让指纹变化，被误判成本机改动并反复回推 */
  function sbVolatile(obj) {
    if (!obj) return obj;
    var c;
    try { c = JSON.parse(JSON.stringify(obj)); } catch (e) { return obj; }
    if (c && Array.isArray(c.pages)) {
      c.pages.forEach(function (p) { if (p && typeof p === 'object') delete p.up; });
    }
    return c;
  }

  function sbFp(obj) { return cloudFp(sbVolatile(obj)); }

  /* 云端原始 JSON 与内存 state 的形态不同（normalize 会补默认字段与 id），
     必须先归一化再取指纹，否则每次打开都会被误判成「本地/云端都改过」 */
  function sbNormFp(data) {
    if (!data) return '';
    try { return sbFp(normalize(JSON.parse(JSON.stringify(data)))); } catch (e) { return ''; }
  }

  function sbLocalHasContent() {
    if (!state) return false;
    var hit = false;
    try {
      if (state.lines && typeof state.lines === 'object' && Object.keys(state.lines).length) hit = true;
      (state.life8 || []).forEach(function (d) {
        if (Number(d.score) > 0) hit = true;
        if (d.note && String(d.note).trim()) hit = true;
      });
      (state.pages || []).forEach(function (p) {
        if (hit) return;
        if (!Array.isArray(p.modules)) return;
        p.modules.forEach(function (m) {
          if (!m || typeof m !== 'object') return;
          Object.keys(m).forEach(function (k) {
            var v = m[k];
            if (Array.isArray(v) && v.length) hit = true;
            if (typeof v === 'string' && v.trim() && v !== m.type) hit = true;
          });
        });
      });
    } catch (e) { }
    return hit;
  }

  /* ---------------- 同步状态与入口 ---------------- */
  function sbStatusInfo() {
    if (!sbLoggedIn()) return { key: 'off', text: '未登录云端', panel: '未登录云端' };
    if (sbUi.syncing || sbUi.busy > 0) return { key: 'busy', text: '同步中', panel: '同步中' };
    if (sbUi.offline) return { key: 'offline', text: '离线', panel: '离线，稍后自动补传' };
    var meta = sbReadMeta();
    if (!meta.lastFp) return { key: 'new', text: '已开启', panel: '自动同步已开启' };
    if (sbFp(state) !== meta.lastFp) return { key: 'busy', text: '同步中', panel: '同步中' };
    return { key: 'ok', text: '已同步', panel: '已同步 · ' + sbClock(meta.lastAt) };
  }

  function sbTime(ts) {
    if (!ts) return '—';
    try { return cloudFmtTime(ts); } catch (e) { return new Date(ts).toLocaleString('zh-CN'); }
  }

  function sbSetMsg(type, text, action) {
    if (!text) sbUi.msg = null;
    else sbUi.msg = { type: type || 'info', text: text, action: action || '' };
    sbPaint();
  }

  /* 面板打开时原地刷新状态行：从「同步中」自动落到「已同步 · 时间」，无需用户点击 */
  function sbPaintRows() {
    var stEl = $('#sb-stat');
    if (stEl) {
      var st = sbStatusInfo();
      var html = '<span class="sb-dot" data-s="' + esc(st.key) + '"></span>' + esc(st.panel || st.text);
      var vEl = stEl.querySelector('.sb-v');
      if (vEl) { if (vEl.innerHTML !== html) vEl.innerHTML = html; }
    }
    var lastEl = $('#sb-last');
    if (lastEl) {
      var v2 = lastEl.querySelector('.sb-v');
      var meta = sbReadMeta();
      var txt = meta.lastAt ? sbTime(meta.lastAt) : '尚未同步';
      if (v2 && v2.textContent !== txt) v2.textContent = txt;
    }
  }

  var sbTick = null;
  function sbWatch() {
    if (sbTick) return;
    sbTick = setInterval(function () {
      if (!cloudIsOpen()) { clearInterval(sbTick); sbTick = null; return; }
      sbPaintRows();
    }, 400);
  }

  function sbPaint() {
    sbPaintRows();
    var box = $('#sb-msg');
    if (!box) return;
    var m = sbUi.msg;
    if (!m) { box.hidden = true; box.className = 'cloud-msg'; box.innerHTML = ''; return; }
    box.hidden = false;
    box.className = 'cloud-msg is-' + m.type;
    var label = { retry: '重试', relogin: '重新登录', resend: '重新发送确认邮件' }[m.action] || '处理';
    box.innerHTML = '<span class="cm-text">' + esc(m.text) + '</span>' +
      (m.action ? '<button class="cm-act" type="button" data-sb="' + esc(m.action) + '">' + esc(label) + '</button>' : '');
  }

  function sbFail(e, where) {
    var info = sbErrInfo(e);
    if (info.offline) sbUi.offline = true;
    updateCloudEntry();
    sbSetMsg(info.type, info.text, info.action);
    return info;
  }

  /* ---------------- 同步主流程 ---------------- */
  function sbPushNow(silent, opts) {
    if (!sbLoggedIn()) return Promise.resolve();
    opts = opts || {};
    var fp = sbFp(state);
    var payload = JSON.parse(JSON.stringify(state));
    sbUi.syncing = true;
    sbUi.busy++;
    updateCloudEntry();
    if (!silent) sbSetMsg('info', '正在上传到云端…');
    return sbUpsertRow(payload).then(function (row) {
      sbUi.busy--; sbUi.syncing = false; sbUi.offline = false;
      var meta = sbReadMeta();
      meta.lastFp = fp;
      meta.lastAt = Date.now();
      if (row) {
        if (row.rev !== undefined && row.rev !== null) meta.rev = Number(row.rev) || 0;
        var at = Date.parse(row.client_updated_at || row.updated_at || '');
        meta.remoteAt = isNaN(at) ? Date.now() : at;
      } else {
        meta.remoteAt = Date.now();
      }
      sbWriteMeta(meta);
      updateCloudEntry();
      sbSetMsg('ok', '已同步 · ' + sbTime(meta.lastAt));
      if (silent) sbLightToast('已与云端同步');
      else toast('已与云端同步');
      sbBroadcast();
      return row;
    }).catch(function (e) {
      sbUi.busy--; sbUi.syncing = false;
      sbFail(e, 'push');
    });
  }

  function sbApplyRemote(data, fp, rev, remoteAt, silent) {
    if (!data || !Array.isArray(data.pages) || !data.pages.length) {
      sbSetMsg('err', '云端数据格式不正确，已跳过下载，本机数据未受影响。');
      return;
    }
    sbSnapWrite(state);
    sbSuppress = true;
    state = normalize(JSON.parse(JSON.stringify(data)));
    save();
    sbSuppress = false;
    cloudResetStamps(state);
    var meta = sbReadMeta();
    /* 用「归一化落盘后」的本机指纹作基线：避免 normalize 补字段后被误判成本机改动，反复回推 */
    meta.lastFp = sbFp(state);
    meta.lastAt = Date.now();
    meta.rev = Number(rev) || 0;
    meta.remoteAt = Number(remoteAt) || Date.now();
    sbWriteMeta(meta);
    renderNav();
    renderPage();
    updateCloudEntry();
    sbSetMsg('ok', '已拉取云端数据 · ' + sbTime(meta.lastAt));
    if (silent === false) toast('已拉取云端数据');
    else sbLightToast('已与云端同步');
    sbBroadcast();
  }

  /* 两端都改过：三选一 */
  function sbOpenConflict(remoteData, remoteFp, rev, remoteAt) {
    if (sbConflictOpen) return;
    sbConflictOpen = true;
    var meta = sbReadMeta();
    openDialog(
      '<h3>两边都有改动</h3>' +
      '<p class="sub">这台电脑和云端在「上次同步之后都被改过」，才会出现这个提示（日常使用碰不到）。' +
      '上一次同步：' + esc(sbTime(meta.lastAt)) + '。默认推荐合并：逐页保留较新的那一份。</p>' +
      '<div class="sb-conflict-list">' +
      '<div class="sb-cf"><b>本机</b><span>' + ((state.pages || []).length) + ' 个页面 · 指纹 ' + esc(sbFp(state)) + '</span></div>' +
      '<div class="sb-cf"><b>云端</b><span>' + ((remoteData && remoteData.pages) ? remoteData.pages.length : 0) + ' 个页面 · 指纹 ' + esc(remoteFp) + '</span></div>' +
      '</div>' +
      '<div class="sheet-actions sheet-actions-wrap">' +
      '<button class="solid-btn" type="button" data-merge>合并（推荐，逐页取较新）</button>' +
      '<button class="ghost-btn" type="button" data-local>用本机覆盖云端</button>' +
      '<button class="ghost-btn" type="button" data-remote>用云端覆盖本机</button>' +
      '<button class="ghost-btn" type="button" data-close>先不动</button></div>',
      function (sheet, close) {
        function done() { sbConflictOpen = false; close(); }
        $('[data-local]', sheet).addEventListener('click', function () {
          done();
          sbPushNow(false);
        });
        $('[data-remote]', sheet).addEventListener('click', function () {
          done();
          sbApplyRemote(remoteData, remoteFp, rev, remoteAt, false);
        });
        $('[data-merge]', sheet).addEventListener('click', function () {
          done();
          var merged = cloudMerge(state, remoteData || { pages: [] });
          sbSuppress = true;
          state = normalize(merged);
          save();
          sbSuppress = false;
          cloudResetStamps(state);
          renderNav();
          renderPage();
          toast('已合并两边数据');
          sbPushNow(false);
        });
        $('[data-close]', sheet).addEventListener('click', function () { sbConflictOpen = false; });
      }
    );
  }

  /* ---------------- 全自动静默同步引擎 ---------------- */
  /* 原则：常规使用零确认。只有「两端自上次同步后都改过同一份数据」才算真冲突。 */

  function sbClock(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  }

  /* 轻提示：右下角浮出 1.5 秒自动消失，不打断任何操作 */
  function sbLightToast(text) {
    var now = Date.now();
    if (now - sbLastToastAt < 900) return;
    sbLastToastAt = now;
    toast(text || '已与云端同步', '', 1500);
  }

  /* 同浏览器多标签页：把「我同步过了」广播出去，避免其它标签页用旧数据反推覆盖 */
  function sbBroadcast() {
    try {
      if (sbBc) sbBc.postMessage({ from: sbTabId, at: Date.now(), fp: sbFp(state) });
    } catch (e) { }
  }

  function sbInitChannel() {
    if (!sbOnlineHooked) {
      sbOnlineHooked = true;
      window.addEventListener('online', function () {
        sbUi.offline = false;
        updateCloudEntry();
        if (sbLoggedIn()) sbReconcile({ reason: 'online' });
      });
      window.addEventListener('offline', function () {
        sbUi.offline = true;
        updateCloudEntry();
      });
    }
    if (!sbBc && typeof BroadcastChannel !== 'function') {
      window.addEventListener('storage', function (e) {
        if (!e || !e.key) return;
        if (e.key.indexOf('lifeos.v1') !== 0) return;
        sbOnOtherTab({ from: 'storage', at: Date.now() });
      });
      return;
    }
    if (sbBc) return;
    try {
      sbBc = new BroadcastChannel(SB_CHANNEL);
      sbBc.onmessage = function (ev) { sbOnOtherTab(ev && ev.data); };
    } catch (e) {
      sbBc = null;
    }
  }

  /* 收到其它标签页的同步结果：把内存里的 state 对齐到共享存储，不再反向推送 */
  function sbOnOtherTab(msg) {
    if (!msg || msg.from === sbTabId) return;
    if (sbSuppress) return;
    if (sbPushTimer) return;  /* 本地还有未推送的改动，交给自己的防抖流程 */
    sbStateFromStore();
  }

  function sbStateFromStore() {
    if (!state) return;
    var raw = safeGet(keyFor(currentEmail() || sbCurrentEmail() || 'local'));
    if (!raw) return;
    var incoming;
    try { incoming = normalize(JSON.parse(raw)); } catch (e) { return; }
    if (!incoming || sbFp(incoming) === sbFp(state)) return;
    sbSuppress = true;
    state = incoming;
    sbSuppress = false;
    renderNav();
    renderPage();
    updateCloudEntry();
  }

  function sbScheduleOfflineRetry() {
    clearTimeout(sbOfflineTimer);
    sbOfflineTimer = setTimeout(function () {
      if (!sbLoggedIn()) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) { sbScheduleOfflineRetry(); return; }
      sbReconcile({ reason: 'retry' });
    }, 8000);
  }

  /* 核心：拉一次云端 → 判定 推 / 拉 / 冲突，全程不需要用户确认 */
  function sbReconcile(opts) {
    opts = opts || {};
    if (!sbLoggedIn()) return Promise.resolve(null);
    if (sbReconciling) { sbReconcileAgain = true; return Promise.resolve(null); }
    sbReconciling = true;
    sbUi.busy++;
    updateCloudEntry();
    return sbGetRow().then(function (row) {
      sbUi.busy--;
      sbUi.offline = false;
      clearTimeout(sbOfflineTimer);
      updateCloudEntry();
      var meta = sbReadMeta();
      var localFp = sbFp(state);
      var remoteData = (row && row.data) ? row.data : null;
      var remoteFp = sbNormFp(remoteData);
      var rev = row ? (Number(row.rev) || 0) : 0;
      var remoteAt = row ? Date.parse(row.client_updated_at || row.updated_at || '') : 0;
      if (isNaN(remoteAt)) remoteAt = 0;

      /* ① 云端为空 */
      if (!remoteFp) {
        if (sbLocalHasContent()) return sbPushNow(true, opts);
        meta.lastFp = localFp;
        meta.lastAt = meta.lastAt || Date.now();
        meta.rev = rev || meta.rev;
        meta.remoteAt = remoteAt || meta.remoteAt;
        sbWriteMeta(meta);
        updateCloudEntry();
        return null;
      }
      /* ② 两边内容完全一致：只更新基线 */
      if (remoteFp === localFp) {
        meta.lastFp = localFp;
        meta.lastAt = meta.lastAt || Date.now();
        meta.rev = rev || meta.rev;
        meta.remoteAt = remoteAt || meta.remoteAt;
        sbWriteMeta(meta);
        updateCloudEntry();
        return null;
      }
      var localChanged = localFp !== meta.lastFp;
      var remoteChanged = remoteFp !== meta.lastFp;

      /* ③ 首次对齐（还没有基线）：以云端为准静默拉取，拉取前自动存快照 */
      if (!meta.lastFp) {
        sbApplyRemote(remoteData, remoteFp, rev, remoteAt, true);
        return null;
      }
      /* ④ 真冲突：两端自上次同步后都改过 */
      if (localChanged && remoteChanged) {
        sbOpenConflict(remoteData, remoteFp, rev, remoteAt);
        return null;
      }
      /* ⑤ 只有云端变了：自动下载 */
      if (remoteChanged) {
        sbApplyRemote(remoteData, remoteFp, rev, remoteAt, true);
        return null;
      }
      /* ⑥ 只有本机变了：自动上传 */
      if (localChanged) return sbPushNow(true, opts);
      return null;
    }).catch(function (e) {
      sbUi.busy--;
      sbFail(e, 'pull');
      sbScheduleOfflineRetry();
      return null;
    }).then(function (r) {
      sbReconciling = false;
      if (sbReconcileAgain) {
        sbReconcileAgain = false;
        setTimeout(function () { sbReconcile({ reason: 'queued' }); }, 60);
      }
      return r;
    });
  }

  /* 登录后 / 页面打开时对齐一次：全自动，无弹窗 */
  function sbAfterEnter() {
    updateCloudEntry();
    sbInitChannel();
    if (!sbLoggedIn()) return;
    sbScheduleRefresh();
    sbReconcile({ reason: 'open' });
  }

  /* 手动兜底「立即同步」：走同一套对齐逻辑，只是多给一次明确反馈 */
  function sbSyncNow() {
    if (!sbLoggedIn()) { sbSetMsg('err', '请先登录云端账号'); return; }
    if (sbUi.busy > 0) { sbSetMsg('info', '正在同步中，稍等片刻…'); return; }
    sbUi.syncing = true;
    updateCloudEntry();
    sbSetMsg('info', '正在和云端核对…');
    sbReconcile({ reason: 'manual' }).then(function () {
      sbUi.syncing = false;
      updateCloudEntry();
      if (sbConflictOpen) return;  /* 真冲突时交给冲突面板，不再叠加成功提示 */
      if (!sbUi.msg || sbUi.msg.type === 'info') {
        var m = sbReadMeta();
        sbSetMsg('ok', '已与云端同步 · ' + sbTime(m.lastAt));
      }
      toast('已与云端同步');
    });
  }

  /* 手动下载云端 */
  function sbPullNow() {
    if (!sbLoggedIn()) { sbSetMsg('err', '请先登录云端账号'); return; }
    if (sbUi.busy > 0) return;
    sbUi.busy++;
    sbUi.syncing = true;
    updateCloudEntry();
    sbGetRow().then(function (row) {
      sbUi.busy--;
      sbUi.syncing = false;
      if (!row || !row.data) { sbSetMsg('warn', '云端还没有数据，先点「上传本机」。'); return; }
      var remoteFp = sbFp(row.data);
      var remoteAt = Date.parse(row.client_updated_at || row.updated_at || '');
      if (isNaN(remoteAt)) remoteAt = 0;
      if (remoteFp === sbFp(state)) { sbSetMsg('ok', '云端数据和本机一致，无需下载。'); updateCloudEntry(); return; }
      sbApplyRemote(row.data, remoteFp, Number(row.rev) || 0, remoteAt, false);
    }).catch(function (e) {
      sbUi.busy--;
      sbUi.syncing = false;
      sbFail(e, 'pull');
    });
  }

  function sbRestoreSnap() {
    var snap = sbSnapRead();
    if (!snap) { sbSetMsg('err', '没有可用的覆盖前快照'); return; }
    sbSuppress = true;
    state = normalize(JSON.parse(JSON.stringify(snap.data)));
    save();
    sbSuppress = false;
    cloudResetStamps(state);
    renderNav();
    renderPage();
    updateCloudEntry();
    toast('已恢复覆盖前的本机数据');
    sbSetMsg('ok', '已恢复覆盖前的本机数据（' + sbTime(snap.at) + '）');
  }

  /* 保存后的联动：1.5 秒防抖，后台静默对齐（推/拉/冲突自动判定） */
  function sbAfterSave() {
    if (sbSuppress) return;
    updateCloudEntry();
    if (!sbLoggedIn()) return;
    clearTimeout(sbPushTimer);
    sbPushTimer = setTimeout(sbAutoPush, SB_AUTO_DELAY);
  }

  function sbAutoPush() {
    sbPushTimer = null;
    if (!sbLoggedIn()) return;
    if (sbUi.busy > 0) { sbPushTimer = setTimeout(sbAutoPush, SB_AUTO_DELAY); return; }
    sbReconcile({ reason: 'edit' });
  }

  /* ---------------- 退出登录 ---------------- */
  function sbSignOutFlow() {
    var email = sbCurrentEmail() || currentEmail();
    openDialog(
      '<h3>退出云端账号？</h3>' +
      '<p class="sub">退出后这台电脑需要重新登录才能同步。数据可以留在本机，也可以一并清除。</p>' +
      '<p class="sub" style="margin-top:6px">当前账号：<b>' + esc(email) + '</b></p>' +
      '<div class="sheet-actions sheet-actions-wrap">' +
      '<button class="ghost-btn" type="button" data-close>取消</button>' +
      '<button class="ghost-btn" type="button" data-keep>保留本机数据并退出</button>' +
      '<button class="solid-btn cloud-danger" type="button" data-wipe>清除本机缓存并退出</button></div>',
      function (sheet, close) {
        function finish(wipe) {
          sbSignOutRemote().then(function () { return null; });
          sbWriteSession(null);
          clearTimeout(sbPushTimer);
          clearTimeout(sbRefreshTimer);
          sbPushTimer = null;
          sbRefreshTimer = null;
          safeDel(SESSION_KEY);
          if (wipe) {
            try {
              safeDel(keyFor(email));
              safeDel(sbSyncStoreKey());
              safeDel(sbSnapStoreKey());
            } catch (e) { }
          }
          close();
          location.reload();
        }
        $('[data-keep]', sheet).addEventListener('click', function () { finish(false); });
        $('[data-wipe]', sheet).addEventListener('click', function () { finish(true); });
      }
    );
  }

  /* ---------------- 云同步面板里的云端区块 ---------------- */
  function sbRowHtml(k, v, id) {
    return '<div class="sb-row"' + (id ? ' id="' + esc(id) + '"' : '') +
      '><span class="sb-k">' + esc(k) + '</span><span class="sb-v">' + v + '</span></div>';
  }

  function sbPanelHtml() {
    var st = sbStatusInfo();
    var s = sbReadSession();
    var html = '<h3 class="cloud-h3">云端账号<span class="cloud-tag">Supabase</span></h3>';
    if (!s) {
      html += '<p class="sub">这台电脑还没有登录云端账号。登录后数据会在所有设备之间保持一致。</p>' +
        '<div class="cloud-msg" id="sb-msg" hidden></div>' +
        '<div class="sb-actions"><button class="solid-btn" type="button" data-sb="login">去登录云端账号</button></div>' +
        '<p class="sub sb-tip">想用旧的本机账号也可以：退出后在登录页选「本机账号离线登录」。</p>';
      return '<div class="sb-sec">' + html + '</div>';
    }
    var meta = sbReadMeta();
    var snap = sbSnapRead();
    html += '<div class="sb-rows">' +
      sbRowHtml('状态', '<span class="sb-dot" data-s="' + esc(st.key) + '"></span>' + esc(st.panel || st.text), 'sb-stat') +
      sbRowHtml('自动同步', '已开启<span class="sb-sub">改动 1.5 秒后自动上传，打开页面自动拉取</span>') +
      sbRowHtml('登录邮箱', esc(s.email || '')) +
      sbRowHtml('最后同步', esc(meta.lastAt ? sbTime(meta.lastAt) : '尚未同步'), 'sb-last') +
      '</div>' +
      '<div class="cloud-msg" id="sb-msg" hidden></div>' +
      '<div class="sb-actions">' +
      '<button class="solid-btn" type="button" data-sb="sync">立即同步</button>' +
      '<button class="ghost-btn" type="button" data-sb="push">上传本机</button>' +
      '<button class="ghost-btn" type="button" data-sb="pull">下载云端</button>' +
      (snap ? '<button class="ghost-btn" type="button" data-sb="restore">恢复覆盖前数据</button>' : '') +
      '<button class="ghost-btn" type="button" data-sb="signout">退出登录</button>' +
      '</div>' +
      '<p class="sub sb-tip">云端与本机自动双向同步，不需要点任何按钮；「立即同步」只是手动兜底。离线时继续用本机数据，网络恢复后自动补传。</p>';
    return '<div class="sb-sec">' + html + '</div>';
  }

  function sbAction(name) {
    switch (name) {
      case 'login':
        closeDialog();
        safeDel(SESSION_KEY);
        showAuth();
        break;
      case 'sync': sbSyncNow(); break;
      case 'push': sbPushNow(false); break;
      case 'pull': sbPullNow(); break;
      case 'restore': sbRestoreSnap(); break;
      case 'signout': sbSignOutFlow(); break;
      case 'retry': sbSyncNow(); break;
      case 'relogin':
        sbWriteSession(null);
        closeDialog();
        safeDel(SESSION_KEY);
        showAuth('请重新登录云端账号。本机数据仍在。');
        break;
      case 'resend': {
        var em = sbCurrentEmail() || normalizeEmail($('#auth-email') ? $('#auth-email').value : '');
        if (!em) { sbSetMsg('warn', '请先填写邮箱'); break; }
        sbResendConfirm(em).then(function () {
          sbSetMsg('ok', '确认邮件已重新发送到 ' + em + '，请到邮箱点开确认链接。');
        }).catch(function (e) { sbFail(e, 'resend'); });
        break;
      }
    }
  }

  function sbMount(sheet) {
    sheet.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-sb]') : null;
      if (!b || !sheet.contains(b)) return;
      sbAction(b.getAttribute('data-sb'));
    });
  }

  /* ---------------------------------------------------------
     云同步（GitHub Gist）
     浏览器直连 GitHub REST API，数据只在本机与自己的私有 Gist 之间流动
     --------------------------------------------------------- */
  var CLOUD_KEY = 'lifeos.cloud.v1';                /* 每账号一份：lifeos.cloud.v1::邮箱 */
  var CLOUD_ROLLBACK_KEY = 'lifeos.cloud.rollback'; /* 覆盖前快照：lifeos.cloud.rollback::邮箱 */
  var CLOUD_MOCK_DB = 'lifeos.mockcloud.v1';        /* 模拟后端的本机存储（真 token 不会用到） */
  var GIST_MARK = 'lifeos-sync';
  var GIST_FILE = 'lifeos-data.json';
  var GIST_API = 'https://api.github.com';

  var cloudSuppress = false;    /* 程序化改写 state 期间：不打页面时间戳、不触发自动同步 */
  var cloudBusy = 0;            /* 进行中的请求数，用于状态显示 */
  var cloudAutoTimer = null;    /* 自动同步防抖定时器 */
  var cloudPageStamps = null;   /* 页面指纹缓存，用于给改动过的页面打时间戳 */
  var cloudPending = null;      /* 双向同步暂存的云端数据 */
  var cloudEnterFromLogin = false; /* 本次进入应用是否刚在登录页登录（决定是否弹「云端有更新数据」） */
  var cloudEnterLocalEmpty = false; /* 本次登录时这台电脑是否还没有该邮箱的本地数据 */
  var cloudUi = { view: 'main', msg: null };
  var cloudDraft = { token: '', reveal: false };

  /* ---------- 账号隔离的存储 ---------- */
  function cloudOwner() { return currentEmail() || 'local'; }
  function cloudStoreKey() { return CLOUD_KEY + '::' + cloudOwner(); }
  function cloudSnapKey() { return CLOUD_ROLLBACK_KEY + '::' + cloudOwner(); }

  function readCloud() {
    try {
      var c = JSON.parse(safeGet(cloudStoreKey()) || 'null');
      if (!c || typeof c !== 'object') return null;
      if (!c.token || !c.gistId) return null;
      return c;
    } catch (e) { return null; }
  }
  function writeCloud(cfg) {
    if (!cfg || !cfg.token || !cfg.gistId) { safeDel(cloudStoreKey()); return; }
    safeSet(cloudStoreKey(), JSON.stringify(cfg));
  }
  function cloudSnapRead() {
    try {
      var o = JSON.parse(safeGet(cloudSnapKey()) || 'null');
      return o && o.data ? o : null;
    } catch (e) { return null; }
  }
  function cloudSnapWrite() {
    try { safeSet(cloudSnapKey(), JSON.stringify({ at: Date.now(), data: state })); } catch (e) { }
  }
  function cloudSnapClear() { safeDel(cloudSnapKey()); }

  /* ---------- 指纹：稳定序列化 + 哈希，用于判断两端是否改动 ---------- */
  /* 稳定序列化：键排序 + 递归展开，用于两端内容比对。
     带环引用保护（seen 集合）与深度上限，任何异常的循环结构都不会把页面打崩。 */
  function cloudStable(v, _seen) {
    var seen = _seen || [];
    if (v === null || typeof v !== 'object') return JSON.stringify(v === undefined ? null : v);
    if (seen.indexOf(v) >= 0) return '"@cycle"';
    if (seen.length > 40) return '"@deep"';
    seen = seen.concat([v]);
    if (Array.isArray(v)) {
      return '[' + v.map(function (x) { return cloudStable(x, seen); }).join(',') + ']';
    }
    return '{' + Object.keys(v).sort().map(function (k) {
      return JSON.stringify(k) + ':' + cloudStable(v[k], seen);
    }).join(',') + '}';
  }
  function cloudFp(obj) {
    var s = cloudStable(obj);
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36) + '.' + s.length;
  }

  /* ---------- 页面时间戳：让「逐页取较新」有依据 ---------- */
  function cloudStampPages() {
    if (!state || !Array.isArray(state.pages)) return;
    var now = Date.now();
    var map = {};
    state.pages.forEach(function (p) {
      var sig = cloudStable(p);
      var prev = cloudPageStamps && cloudPageStamps[p.id];
      if (!prev || prev.sig !== sig) {
        p.up = now;
        map[p.id] = { sig: cloudStable(p) };
      } else {
        map[p.id] = prev;
      }
    });
    cloudPageStamps = map;
  }
  function cloudResetStamps(s) {
    cloudPageStamps = {};
    ((s && s.pages) || []).forEach(function (p) {
      cloudPageStamps[p.id] = { sig: cloudStable(p) };
    });
  }

  /* ---------- 云同步失败对象 ---------- */
  function cloudErr(code, msg) { var e = new Error(msg); e.code = code; return e; }

  /* ---------- 模拟后端：没有真 token 时保证界面可用 ---------- */
  function cloudIsMock(token) { return /^mock/i.test(String(token || '')); }
  function cloudMockDb() {
    try { return JSON.parse(safeGet(CLOUD_MOCK_DB) || '{}') || {}; } catch (e) { return {}; }
  }
  function cloudMockSave(db) { safeSet(CLOUD_MOCK_DB, JSON.stringify(db)); }
  function cloudMockGists(token) {
    var db = cloudMockDb();
    if (!db[token]) db[token] = { gists: {}, seq: 1 };
    return { db: db, bucket: db[token] };
  }
  function cloudMockRequest(token, method, path, body) {
    return new Promise(function (resolve) { setTimeout(resolve, 240); }).then(function () {
      var t = String(token || '').toLowerCase();
      if (t.indexOf('invalid') >= 0) throw cloudErr('TOKEN', '模拟：token 无效');
      if (t.indexOf('rate') >= 0) throw cloudErr('RATE', '模拟：触发限流');
      if (t.indexOf('offline') >= 0) throw cloudErr('NETWORK', '模拟：网络失败');
      var box = cloudMockGists(token);
      var bucket = box.bucket;
      if (method === 'GET' && path.indexOf('/gists?') === 0) {
        var list = Object.keys(bucket.gists).map(function (id) { return bucket.gists[id]; });
        cloudMockSave(box.db);
        return list;
      }
      if (method === 'POST' && path === '/gists') {
        var id = 'mock' + (1000 + bucket.seq++) + 'abcdef012345';
        bucket.gists[id] = {
          id: id,
          description: (body && body.description) || '',
          public: false,
          files: (body && body.files) || {},
          updated_at: new Date().toISOString()
        };
        cloudMockSave(box.db);
        return bucket.gists[id];
      }
      var m = path.match(/^\/gists\/([^/?]+)$/);
      if (m) {
        var g = bucket.gists[m[1]];
        if (!g) throw cloudErr('MISSING', '模拟：gist 已被删除');
        if (method === 'PATCH') {
          if (body && body.files && body.files[GIST_FILE]) g.files[GIST_FILE] = body.files[GIST_FILE];
          if (body && typeof body.description === 'string') g.description = body.description;
          g.updated_at = new Date().toISOString();
          cloudMockSave(box.db);
        }
        return g;
      }
      throw cloudErr('HTTP', '模拟：接口异常');
    });
  }

  /* ---------- 真实 API 封装 ---------- */
  function cloudRequest(token, method, path, body) {
    var opt = {
      method: method,
      headers: {
        'Authorization': 'token ' + token,
        'Accept': 'application/vnd.github+json'
      }
    };
    if (body) {
      opt.headers['Content-Type'] = 'application/json';
      opt.body = JSON.stringify(body);
    }
    return fetch(GIST_API + path, opt).then(function (res) {
      return res.text().then(function (txt) {
        var data = null;
        try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = null; }
        if (res.ok) return data;
        var remain = res.headers.get('x-ratelimit-remaining');
        if (res.status === 401) throw cloudErr('TOKEN', 'token 无效（401）');
        if (res.status === 403) {
          if (remain === '0' || /rate limit/i.test(txt || '')) throw cloudErr('RATE', '触发限流（403）');
          throw cloudErr('FORBIDDEN', '权限不足（403）');
        }
        if (res.status === 404) throw cloudErr('MISSING', 'gist 不存在（404）');
        if (res.status === 422) throw cloudErr('BAD', '写入被拒绝（422）');
        throw cloudErr('HTTP', '接口异常（' + res.status + '）');
      });
    }, function () {
      throw cloudErr('NETWORK', '网络失败');
    });
  }

  function cloudApi(token, method, path, body) {
    return (cloudIsMock(token) ? cloudMockRequest : cloudRequest)(token, method, path, body);
  }

  function cloudFindGist(token) {
    return cloudApi(token, 'GET', '/gists?per_page=100&page=1').then(function (list) {
      var arr = Array.isArray(list) ? list : [];
      for (var i = 0; i < arr.length; i++) {
        if (String(arr[i].description || '').indexOf(GIST_MARK) >= 0) return arr[i];
      }
      return null;
    });
  }
  function cloudCreateGist(token, payload) {
    var files = {};
    files[GIST_FILE] = { content: payload };
    return cloudApi(token, 'POST', '/gists', {
      description: GIST_MARK + ' · Life OS 云同步数据（私有，请勿删除）',
      public: false,
      files: files
    });
  }
  function cloudFetchGist(token, id) { return cloudApi(token, 'GET', '/gists/' + id); }
  function cloudPutGist(token, id, payload) {
    var files = {};
    files[GIST_FILE] = { content: payload };
    return cloudApi(token, 'PATCH', '/gists/' + id, { files: files });
  }

  /* ---------- 云端载荷 ---------- */
  function cloudPayload() {
    return JSON.stringify({ app: 'life-os', v: 1, savedAt: new Date().toISOString(), data: state });
  }
  function cloudParse(text) {
    var o = JSON.parse(text);
    if (o && o.data && Array.isArray(o.data.pages) && o.data.pages.length) return o.data;
    if (o && Array.isArray(o.pages) && o.pages.length) return o;
    throw cloudErr('PAYLOAD', '云端数据格式不正确');
  }
  function cloudReadRemote(gist) {
    var f = gist && gist.files && gist.files[GIST_FILE];
    if (!f) throw cloudErr('NOFILE', '云端没有数据文件');
    if (f.truncated && f.raw_url) {
      return fetch(f.raw_url).then(function (r) { return r.text(); }, function () {
        throw cloudErr('NETWORK', '拉取云端文件失败');
      });
    }
    return Promise.resolve(String(f.content || ''));
  }

  /* ---------- 时间显示 ---------- */
  function cloudFmtTime(ts) {
    if (!ts) return '—';
    var d = new Date(ts);
    if (isNaN(d.getTime())) return '—';
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  /* ---------- 状态 ---------- */
  function cloudStatusInfo() {
    var cfg = readCloud();
    if (!cfg) return { key: 'off', text: '未绑定' };
    if (cloudBusy > 0) return { key: 'busy', text: '同步中' };
    if (!cfg.lastSyncRev) return { key: 'new', text: '待首次同步' };
    if (cloudFp(state) !== cfg.lastSyncRev) return { key: 'dirty', text: cfg.auto ? '改动待同步' : '有本地改动' };
    if (cfg.auto) return { key: 'auto', text: '已开启自动同步' };
    return { key: 'ok', text: '已同步' };
  }

  function updateCloudEntry() {
    var btn = $('#btn-cloud');
    if (!btn) return;
    var ico = $('#cloud-ico');
    if (ico && !ico.getAttribute('data-ready')) {
      ico.innerHTML = icon('cloud');
      ico.setAttribute('data-ready', '1');
    }
    var useSb = sbLoggedIn();
    var st = useSb ? sbStatusInfo() : cloudStatusInfo();
    btn.setAttribute('data-state', st.key);
    var txt = $('#cloud-state');
    if (txt) txt.textContent = st.text;
    btn.title = '云同步（' + (useSb ? 'Supabase 云端账号' : 'GitHub Gist 备份') + '）· ' + st.text;
    btn.setAttribute('aria-label', '云同步，当前状态：' + st.text);
  }

  /* ---------- 保存后的联动：打点 + 自动同步 ---------- */
  function cloudAfterSave() {
    if (cloudSuppress) return;
    cloudStampPages();
    updateCloudEntry();
    if (!readCloud()) return;
    cloudScheduleAuto();
  }
  function cloudScheduleAuto() {
    var cfg = readCloud();
    if (!cfg || !cfg.auto) return;
    clearTimeout(cloudAutoTimer);
    cloudAutoTimer = setTimeout(function () {
      var c = readCloud();
      if (!c || !c.auto) return;
      cloudPush({ silent: true });
    }, 3000);
  }

  /* ---------- 消息区（全部在面板内展示，不用原生 alert） ---------- */
  var CLOUD_MSG_ACT = { recreate: '重新创建 Gist' };
  function cloudMsg(type, text, action) {
    if (!text) { cloudUi.msg = null; }
    else cloudUi.msg = { type: type || 'info', text: text, action: action || '' };
    paintCloudMsg();
  }
  function paintCloudMsg() {
    var box = $('#cloud-msg');
    if (!box) return;
    var m = cloudUi.msg;
    if (!m) { box.hidden = true; box.className = 'cloud-msg'; box.innerHTML = ''; return; }
    box.hidden = false;
    box.className = 'cloud-msg is-' + m.type;
    box.innerHTML = '<span class="cm-text">' + esc(m.text) + '</span>' +
      (m.action ? '<button class="cm-act" type="button" data-cloud="' + esc(m.action) + '">' +
        esc(CLOUD_MSG_ACT[m.action] || '处理') + '</button>' : '');
  }
  function cloudFail(e) {
    var code = e && e.code;
    var map = {
      TOKEN: ['err', 'Token 无效或已过期。请到 GitHub 重新生成一个 classic token，只勾选 gist 权限，再回到这里重新绑定。'],
      RATE: ['warn', 'GitHub 接口调用过于频繁，已被临时限流。请等 1 小时左右再试，期间不要反复点按钮。'],
      FORBIDDEN: ['err', 'GitHub 拒绝了这次请求（403）。多数情况是 token 没有勾选 gist 权限，请重新生成后绑定。'],
      MISSING: ['err', '云端 Gist 不存在，可能已在 GitHub 上被删除。可以按当前数据重新创建一个。', 'recreate'],
      NOFILE: ['warn', '云端 Gist 里还没有 lifeos-data.json。先点「上传本机」把数据写上去。'],
      NETWORK: ['err', '网络不通，没能连上 GitHub。请检查网络或代理后稍等再试。'],
      PAYLOAD: ['err', '云端文件内容无法解析，可能被其他程序改写过。可以用「上传本机」覆盖它。'],
      BAD: ['err', 'GitHub 拒绝写入（422），请确认 token 具备 gist 权限。']
    };
    var m = map[code] || ['err', (e && e.message) || '同步失败，请稍后重试'];
    cloudMsg(m[0], m[1], m[2]);
  }

  /* ---------- 面板 HTML ---------- */
  function cloudHeadHtml() {
    return '<h3 class="cloud-h3">云同步<span class="cloud-tag">GitHub Gist</span></h3>';
  }

  function cloudBindHtml() {
    return cloudHeadHtml() +
      '<p class="sub">换电脑、换浏览器时从一个私有 Gist 找回数据。浏览器直连 GitHub，token 只存本机，也不会写进导出备份。</p>' +
      '<div class="cloud-field">' +
        '<div class="cloud-field-label">GitHub Token<small>classic token · 只勾 gist 权限</small></div>' +
        '<div class="cloud-input">' +
          '<input id="cloud-token" class="cloud-in" type="' + (cloudDraft.reveal ? 'text' : 'password') + '"' +
            ' placeholder="ghp_xxxxxxxxxxxx" autocomplete="off" spellcheck="false" value="' + esc(cloudDraft.token) + '">' +
          '<button class="cloud-eye" type="button" data-cloud="eye" title="' +
            (cloudDraft.reveal ? '隐藏 token' : '显示 token') + '" aria-label="' +
            (cloudDraft.reveal ? '隐藏 token' : '显示 token') + '">' +
            icon(cloudDraft.reveal ? 'eyeOff' : 'eye') + '</button>' +
        '</div>' +
      '</div>' +
      '<ol class="cloud-steps">' +
        '<li>GitHub → Settings → Developer settings → Personal access tokens → <b>Tokens (classic)</b></li>' +
        '<li>Generate new token，<b>只勾选 gist</b>，生成后复制</li>' +
        '<li>回到这里粘贴并绑定：会自动查找描述含 <code>' + GIST_MARK + '</code> 的私有 Gist，没有就新建一个</li>' +
      '</ol>' +
      '<div class="cloud-msg" id="cloud-msg" hidden></div>' +
      '<p class="cloud-tip">还没准备 token？输入 <code>mock-demo</code> 可走本机模拟，界面与流程一致，数据不出本机。</p>' +
      '<div class="sheet-actions">' +
        '<button class="ghost-btn" type="button" data-close>取消</button>' +
        '<button class="solid-btn" type="button" data-cloud="bind">绑定</button>' +
      '</div>';
  }

  function cloudMainHtml() {
    var cfg = readCloud();
    var st = cloudStatusInfo();
    var snap = cloudSnapRead();
    var gid = String(cfg.gistId || '');
    var shortId = gid.length > 8 ? gid.slice(0, 8) + '…' : gid;
    return cloudHeadHtml() +
      '<p class="sub">数据存在你自己的私有 Gist 里，只有绑定同一个 token 的设备能读到。</p>' +
      '<div class="cloud-card">' +
        '<div class="cc-row"><span>状态</span><b class="cc-state" data-state="' + st.key + '">' + esc(st.text) + '</b></div>' +
        '<div class="cc-row"><span>Gist</span><b class="cc-mono" title="' + esc(gid) + '">' + esc(shortId) + '</b></div>' +
        '<div class="cc-row"><span>最后同步</span><b>' + esc(cloudFmtTime(cfg.lastSyncAt)) + '</b></div>' +
        '<div class="cc-row"><span>账号</span><b class="cc-mono">' + esc(currentEmail() || '本机') + '</b></div>' +
      '</div>' +
      '<div class="cloud-switch">' +
        '<div class="cs-txt"><b>自动同步</b><small>开启后改动 3 秒防抖静默上传；打开页面时若云端更新且本机没动过，会自动拉取</small></div>' +
        '<label class="cs-sw"><input type="checkbox" id="cloud-auto"' + (cfg.auto ? ' checked' : '') + '>' +
          '<span class="cs-track"><span class="cs-dot"></span></span></label>' +
      '</div>' +
      '<div class="cloud-acts">' +
        '<button class="solid-btn" type="button" data-cloud="push">上传本机</button>' +
        '<button class="ghost-btn" type="button" data-cloud="pull">下载云端</button>' +
        '<button class="ghost-btn" type="button" data-cloud="sync">双向同步</button>' +
      '</div>' +
      '<div class="cloud-msg" id="cloud-msg" hidden></div>' +
      (snap ? '<div class="cloud-snap"><span>覆盖前快照 · ' + esc(cloudFmtTime(snap.at)) + '</span>' +
        '<button type="button" class="cm-act" data-cloud="restore">恢复覆盖前数据</button></div>' : '') +
      '<div class="sheet-actions">' +
        '<button class="ghost-btn cloud-unbind" type="button" data-cloud="unbind">解除绑定</button>' +
        '<button class="solid-btn" type="button" data-close>完成</button>' +
      '</div>';
  }

  function cloudConfirmPullHtml() {
    var p = cloudPending;
    var data = p && p.data;
    var pages = data && data.pages ? data.pages.length : 0;
    var mods = 0;
    (data && data.pages ? data.pages : []).forEach(function (pg) { mods += (pg.modules || []).length; });
    var localMods = allModules().length;
    return cloudHeadHtml() +
      '<h4 class="cloud-h4">用云端数据覆盖本机？</h4>' +
      '<p class="sub">云端有 ' + pages + ' 个页签 / ' + mods + ' 个模块，本机现有 ' + state.pages.length +
        ' 个页签 / ' + localMods + ' 个模块。覆盖后本机内容会被替换，覆盖前会自动留一份快照，可一键恢复。</p>' +
      '<div class="cloud-msg" id="cloud-msg" hidden></div>' +
      '<div class="sheet-actions">' +
        '<button class="ghost-btn" type="button" data-cloud="back">取消</button>' +
        '<button class="solid-btn" type="button" data-cloud="pull-do">覆盖本机</button>' +
      '</div>';
  }

  function cloudConflictHtml() {
    var cfg = readCloud();
    return cloudHeadHtml() +
      '<h4 class="cloud-h4">两端都有新改动</h4>' +
      '<p class="sub">本机和云端在上次同步（' + esc(cloudFmtTime(cfg && cfg.lastSyncAt)) +
        '）之后都改过，需要你决定以哪边为准。三个选项都不会删除云端 Gist，只是决定数据版本。</p>' +
      '<div class="cloud-conflict">' +
        '<button type="button" data-cloud="conflict-local">' +
          '<b>用本机覆盖云端</b><small>把当前这台电脑的数据上传，云端旧版本被替换；另一台设备下次打开需手动下载</small></button>' +
        '<button type="button" data-cloud="conflict-remote">' +
          '<b>用云端覆盖本机</b><small>放弃这台电脑上的改动，恢复云端版本；覆盖前会自动留本机快照，可一键恢复</small></button>' +
        '<button type="button" data-cloud="conflict-merge">' +
          '<b>合并（按页面取较新）</b><small>逐页比较修改时间，各自保留较新的一份，然后上传覆盖云端；其余设置以本机为准</small></button>' +
      '</div>' +
      '<div class="cloud-msg" id="cloud-msg" hidden></div>' +
      '<div class="sheet-actions">' +
        '<button class="ghost-btn" type="button" data-cloud="back">返回</button>' +
      '</div>';
  }

  function cloudConfirmUnbindHtml() {
    return cloudHeadHtml() +
      '<h4 class="cloud-h4">解除绑定？</h4>' +
      '<p class="sub">本机保存的 token 与覆盖前快照会被删除；云端 Gist 与本地数据都不动。之后重新绑定同一个 token 就能继续同步。</p>' +
      '<div class="cloud-msg" id="cloud-msg" hidden></div>' +
      '<div class="sheet-actions">' +
        '<button class="ghost-btn" type="button" data-cloud="back">取消</button>' +
        '<button class="solid-btn cloud-danger" type="button" data-cloud="unbind-do">解除绑定</button>' +
      '</div>';
  }

  /* ---------- 面板绘制与事件 ---------- */
  function cloudIsOpen() {
    var ov = $('#overlay');
    return !!(ov && !ov.hidden && ov.classList.contains('cloud-open'));
  }

  /* 后台（静默）同步时只刷新数据，不打扰用户：面板未打开就不重绘 */
  function cloudRepaint() {
    if (cloudIsOpen()) cloudDraw();
    else updateCloudEntry();
  }

  function cloudDraw() {
    var html;
    if (!readCloud()) html = cloudBindHtml();
    else if (cloudUi.view === 'conflict') html = cloudConflictHtml();
    else if (cloudUi.view === 'confirm-pull') html = cloudConfirmPullHtml();
    else if (cloudUi.view === 'confirm-unbind') html = cloudConfirmUnbindHtml();
    else html = cloudMainHtml();
    /* 主视图：云端账号（Supabase）在上，GitHub Gist 折叠为备份通道；子流程仍独占面板 */
    if (cloudUi.view === 'main' || !readCloud()) {
      html = sbPanelHtml() +
        '<details class="sb-backup">' +
        '<summary>备份通道 · GitHub Gist（可选，独立于云端账号）</summary>' +
        '<div class="sb-backup-body">' + html + '</div>' +
        '</details>';
    }
    if (overlay) overlay.classList.add('cloud-open');
    openDialog(html, cloudMount);
    paintCloudMsg();
    sbPaint();
    sbWatch();
  }

  function cloudMount(sheet) {
    var input = $('#cloud-token', sheet);
    if (input) {
      input.addEventListener('input', function () { cloudDraft.token = input.value; });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); cloudBind(); }
      });
    }
    var auto = $('#cloud-auto', sheet);
    if (auto) {
      auto.addEventListener('change', function () {
        var cfg = readCloud();
        if (!cfg) return;
        cfg.auto = !!auto.checked;
        writeCloud(cfg);
        updateCloudEntry();
        if (cfg.auto) {
          cloudMsg('ok', '已开启自动同步：改动 3 秒后自动上传');
          cloudScheduleAuto();
        } else {
          clearTimeout(cloudAutoTimer);
          cloudMsg('ok', '已关闭自动同步，之后请手动点「双向同步」');
        }
        cloudRepaint();
      });
    }
    sheet.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-cloud]') : null;
      if (!b || !sheet.contains(b)) return;
      cloudAction(b.getAttribute('data-cloud'));
    });
    sbMount(sheet);
  }

  function cloudAction(name) {
    switch (name) {
      case 'eye': {
        cloudDraft.reveal = !cloudDraft.reveal;
        var inp = $('#cloud-token');
        var btn = $('[data-cloud="eye"]');
        if (inp) inp.type = cloudDraft.reveal ? 'text' : 'password';
        if (btn) {
          btn.innerHTML = icon(cloudDraft.reveal ? 'eyeOff' : 'eye');
          btn.title = cloudDraft.reveal ? '隐藏 token' : '显示 token';
          btn.setAttribute('aria-label', btn.title);
        }
        break;
      }
      case 'bind': cloudBind(); break;
      case 'push': cloudPush({ silent: false }); break;
      case 'pull': cloudBeginPull(); break;
      case 'sync': cloudSync(); break;
      case 'pull-do':
        if (cloudPending) cloudApplyRemote(cloudPending.data, cloudPending.fp, false);
        else cloudMsg('err', '云端数据已失效，请重新点「双向同步」');
        break;
      case 'conflict-local': cloudResolve('local'); break;
      case 'conflict-remote': cloudResolve('remote'); break;
      case 'conflict-merge': cloudResolve('merge'); break;
      case 'recreate': cloudRecreate(); break;
      case 'restore': cloudRestore(); break;
      case 'unbind': cloudUi.view = 'confirm-unbind'; cloudMsg(null); cloudDraw(); break;
      case 'unbind-do': cloudDoUnbind(); break;
      case 'back': cloudUi.view = 'main'; cloudPending = null; cloudMsg(null); cloudDraw(); break;
    }
  }

  /* ---------- 绑定 ---------- */
  function cloudBind() {
    var input = $('#cloud-token');
    if (input) cloudDraft.token = input.value;
    var token = String(cloudDraft.token || '').trim();
    if (!token) { cloudMsg('err', '请先粘贴 GitHub token'); return; }
    if (!cloudIsMock(token) && !/^(ghp_|github_pat_)/.test(token)) {
      cloudMsg('warn', '经典 token 一般以 ghp_ 开头，请确认已完整复制（首尾缺字符都会失败）');
      return;
    }
    cloudBusy++;
    cloudMsg('info', '正在验证 token 并查找云端 Gist…');
    cloudFindGist(token).then(function (gist) {
      if (gist) return { gist: gist, created: false };
      return cloudCreateGist(token, cloudPayload()).then(function (g) { return { gist: g, created: true }; });
    }).then(function (r) {
      var g = r.gist;
      var cfg = {
        token: token,
        gistId: g.id,
        mock: cloudIsMock(token),
        auto: false,
        createdAt: Date.now(),
        lastSyncAt: null,
        lastSyncRev: null,
        remoteRev: null
      };
      writeCloud(cfg);
      var localFp = cloudFp(state);
      return cloudReadRemote(g).then(function (text) { return text; }, function () { return ''; })
        .then(function (text) {
          cloudBusy--;
          var remoteData = null, rfp = null;
          if (text) { try { remoteData = cloudParse(text); rfp = cloudFp(remoteData); } catch (e) { rfp = null; } }
          cloudUi.view = 'main';
          if (r.created || (rfp && rfp === localFp)) {
            cfg.lastSyncRev = localFp;
            cfg.remoteRev = localFp;
            cfg.lastSyncAt = Date.now();
            cfg.remoteUpdatedAt = g.updated_at || null;
            writeCloud(cfg);
            updateCloudEntry();
            cloudMsg('ok', r.created
              ? '绑定成功，已创建私有 Gist（ID ' + String(g.id).slice(0, 8) + '）并写入当前数据'
              : '绑定成功，云端已经是同一份数据');
          } else if (rfp) {
            cfg.remoteRev = rfp;
            cfg.remoteUpdatedAt = g.updated_at || null;
            writeCloud(cfg);
            updateCloudEntry();
            cloudMsg('warn', '绑定成功。云端已有一份其它设备的数据，请选择方向：点「下载云端」覆盖本机，或「上传本机」覆盖云端。');
          } else {
            writeCloud(cfg);
            updateCloudEntry();
            cloudMsg('warn', '绑定成功，但云端 Gist 里还没有数据文件。点「上传本机」把当前数据写上去。');
          }
          toast('云同步已绑定');
          cloudRepaint();
        });
    }).catch(function (e) {
      cloudBusy--;
      cloudFail(e);
      cloudUi.view = 'main';
      if (!readCloud()) {
        /* 绑定失败：留在令牌输入界面，只更新消息 */
        paintCloudMsg();
      } else {
        cloudRepaint();
      }
    });
  }

  /* ---------- 上传 ---------- */
  function cloudPush(opts) {
    opts = opts || {};
    var cfg = readCloud();
    if (!cfg) { cloudMsg('err', '尚未绑定 token，无法上传'); return Promise.resolve(); }
    var localFp = cloudFp(state);
    cloudBusy++;
    if (!opts.silent) cloudMsg('info', '正在上传到云端…');
    updateCloudEntry();
    return cloudPutGist(cfg.token, cfg.gistId, cloudPayload()).then(function (gist) {
      var c = readCloud() || cfg;
      c.lastSyncRev = localFp;
      c.remoteRev = localFp;
      c.lastSyncAt = Date.now();
      c.remoteUpdatedAt = (gist && gist.updated_at) || null;
      writeCloud(c);
      cloudBusy--;
      updateCloudEntry();
      toast(opts.silent ? '已自动同步到云端' : '已上传到云端 Gist');
      cloudMsg('ok', '已上传 · ' + cloudFmtTime(c.lastSyncAt));
      cloudUi.view = 'main';
      cloudRepaint();
    }).catch(function (e) {
      cloudBusy--;
      cloudFail(e);
      updateCloudEntry();
      if (!opts.silent) cloudRepaint();
    });
  }

  /* ---------- 下载（拉取） ---------- */
  function cloudBeginPull() {
    var cfg = readCloud();
    if (!cfg) { cloudMsg('err', '尚未绑定 token，无法下载'); return; }
    cloudBusy++;
    cloudMsg('info', '正在读取云端数据…');
    updateCloudEntry();
    cloudFetchGist(cfg.token, cfg.gistId).then(function (gist) {
      return cloudReadRemote(gist);
    }).then(function (text) {
      var data = cloudParse(text);
      cloudBusy--;
      cloudPending = { data: data, fp: cloudFp(data) };
      cloudUi.view = 'confirm-pull';
      updateCloudEntry();
      cloudMsg('warn', '下载会覆盖本机数据，请确认');
      cloudRepaint();
    }).catch(function (e) {
      cloudBusy--;
      cloudFail(e);
      updateCloudEntry();
      cloudRepaint();
    });
  }

  function cloudApplyRemote(data, fp, silent) {
    cloudSnapWrite();
    cloudSuppress = true;
    state = normalize(JSON.parse(JSON.stringify(data)));
    save();
    cloudSuppress = false;
    cloudResetStamps(state);
    renderNav();
    renderPage();
    var cfg = readCloud() || {};
    cfg.lastSyncRev = fp;
    cfg.remoteRev = fp;
    cfg.lastSyncAt = Date.now();
    writeCloud(cfg);
    cloudPending = null;
    cloudUi.view = 'main';
    updateCloudEntry();
    toast(silent ? '已自动同步云端数据' : '已用云端数据覆盖本机');
    cloudMsg('ok', silent ? '已自动同步云端数据' : '已用云端数据覆盖本机，必要时可「恢复覆盖前数据」');
    cloudRepaint();
  }

  /* ---------- 双向同步 ---------- */
  function cloudSync() {
    var cfg = readCloud();
    if (!cfg) { cloudMsg('err', '尚未绑定 token'); return; }
    cloudBusy++;
    cloudMsg('info', '正在比较本机与云端…');
    updateCloudEntry();
    cloudFetchGist(cfg.token, cfg.gistId).then(function (gist) {
      return cloudReadRemote(gist).then(function (text) { return { gist: gist, text: text }; });
    }).then(function (r) {
      cloudBusy--;
      var data = null, rfp = null;
      try { data = cloudParse(r.text); rfp = cloudFp(data); } catch (e) { data = null; }
      var localFp = cloudFp(state);
      var c = readCloud() || cfg;
      if (!rfp) { cloudPush({ silent: false }); return; }
      if (rfp === localFp) {
        c.lastSyncRev = localFp;
        c.remoteRev = rfp;
        c.lastSyncAt = Date.now();
        c.remoteUpdatedAt = r.gist.updated_at || null;
        writeCloud(c);
        updateCloudEntry();
        cloudMsg('ok', '两端数据一致，无需同步');
        cloudRepaint();
        return;
      }
      var localDirty = c.lastSyncRev ? localFp !== c.lastSyncRev : true;
      var remoteDirty = c.remoteRev ? rfp !== c.remoteRev : true;
      cloudPending = { data: data, fp: rfp };
      if (localDirty && remoteDirty) {
        cloudUi.view = 'conflict';
        updateCloudEntry();
        cloudMsg('warn', '两端在上次同步后都有改动，请选择保留方式');
        cloudRepaint();
        return;
      }
      if (localDirty) { cloudPush({ silent: false }); return; }
      cloudUi.view = 'confirm-pull';
      updateCloudEntry();
      cloudMsg('warn', '云端有更新，覆盖本机前请确认');
      cloudRepaint();
    }).catch(function (e) {
      cloudBusy--;
      cloudFail(e);
      updateCloudEntry();
      cloudRepaint();
    });
  }

  function cloudResolve(kind) {
    var p = cloudPending;
    if (!readCloud()) { cloudMsg('err', '尚未绑定 token'); return; }
    if (kind === 'local') { cloudUi.view = 'main'; cloudPush({ silent: false }); return; }
    if (!p || !p.data) { cloudMsg('err', '云端数据已失效，请重新点「双向同步」'); return; }
    if (kind === 'remote') { cloudApplyRemote(p.data, p.fp, false); return; }
    cloudSuppress = true;
    state = normalize(cloudMerge(state, p.data));
    save();
    cloudSuppress = false;
    cloudResetStamps(state);
    renderNav();
    renderPage();
    cloudUi.view = 'main';
    cloudMsg('info', '已按页面合并，正在上传合并结果…');
    cloudRepaint();
    cloudPush({ silent: false });
  }

  /* 逐页取较新：本机作骨架，同 id 页面对比 up 时间戳，云端独有页补在后面 */
  function cloudMerge(local, remote) {
    var out = JSON.parse(JSON.stringify(local));
    var rmap = {};
    (remote.pages || []).forEach(function (p) { if (p && p.id) rmap[p.id] = p; });
    var merged = [], seen = {};
    (local.pages || []).forEach(function (lp) {
      var rp = rmap[lp.id];
      seen[lp.id] = true;
      if (!rp) { merged.push(lp); return; }
      if (cloudStable(lp) === cloudStable(rp)) { merged.push(lp); return; }
      var rt = Number(rp.updatedAt) || Number(rp.up) || 0;
      var lt = Number(lp.updatedAt) || Number(lp.up) || 0;
      merged.push(rt > lt ? rp : lp);
    });
    (remote.pages || []).forEach(function (rp) {
      if (rp && rp.id && !seen[rp.id]) merged.push(rp);
    });
    out.pages = merged;
    return out;
  }

  /* ---------- 重新创建 / 恢复 / 解除绑定 ---------- */
  function cloudRecreate() {
    var cfg = readCloud() || {};
    if (!cfg.token) { cloudMsg('err', '尚未绑定 token'); return; }
    cloudBusy++;
    cloudMsg('info', '正在创建新的私有 Gist…');
    cloudCreateGist(cfg.token, cloudPayload()).then(function (gist) {
      cfg.gistId = gist.id;
      var fp = cloudFp(state);
      cfg.lastSyncRev = fp;
      cfg.remoteRev = fp;
      cfg.lastSyncAt = Date.now();
      cfg.remoteUpdatedAt = gist.updated_at || null;
      writeCloud(cfg);
      cloudBusy--;
      updateCloudEntry();
      toast('已重新创建云端 Gist');
      cloudMsg('ok', '已创建新的私有 Gist（ID ' + String(gist.id).slice(0, 8) + '）并写入当前数据');
      cloudUi.view = 'main';
      cloudRepaint();
    }).catch(function (e) {
      cloudBusy--;
      cloudFail(e);
      updateCloudEntry();
      cloudRepaint();
    });
  }

  function cloudRestore() {
    var snap = cloudSnapRead();
    if (!snap) { cloudMsg('err', '没有可用的覆盖前快照'); return; }
    cloudSuppress = true;
    state = normalize(JSON.parse(JSON.stringify(snap.data)));
    save();
    cloudSuppress = false;
    cloudResetStamps(state);
    renderNav();
    renderPage();
    updateCloudEntry();
    toast('已恢复覆盖前的本机数据');
    cloudMsg('ok', '已恢复到覆盖前的本机数据（' + cloudFmtTime(snap.at) + '）');
    cloudUi.view = 'main';
    cloudRepaint();
  }

  function cloudDoUnbind() {
    writeCloud(null);
    cloudSnapClear();
    clearTimeout(cloudAutoTimer);
    cloudAutoTimer = null;
    cloudPending = null;
    cloudDraft = { token: '', reveal: false };
    cloudUi.view = 'main';
    cloudMsg(null);
    updateCloudEntry();
    toast('已解除云同步绑定，本地数据未受影响');
    cloudUi.view = 'main';
    cloudRepaint();
  }

  /* ---------- 打开面板 / 启动时对齐 ---------- */
  function openCloudPanel() {
    cloudUi.view = 'main';
    cloudPending = null;
    cloudDraft.token = '';
    cloudDraft.reveal = false;
    cloudMsg(null);
    cloudDraw();
  }

  /* 首登对齐：已统一由 sbReconcile 静默处理，此处不再询问是否下载 */
  function cloudOfferRemote(data, rfp, localEmpty) {
    var pages = (data && Array.isArray(data.pages)) ? data.pages.length : 0;
    var cfg = readCloud() || {};
    openDialog(
      '<h3>云端有更新的数据</h3>' +
      '<p class="sub">这台电脑已绑定云同步，云端数据与当前本机不一致' +
      (localEmpty ? '（本机这台电脑还没有该邮箱的本地数据）' : '') + '。' +
      '下载会用云端数据覆盖本机，下载前会自动保存一份覆盖前快照，可随时恢复。</p>' +
      '<p class="sub" style="margin-top:8px">云端包含 ' + pages + ' 个页面' +
      (cfg.lastSyncAt ? ' · 上次同步 ' + esc(cloudFmtTime(cfg.lastSyncAt)) : '') + '</p>' +
      '<div class="sheet-actions">' +
      '<button class="ghost-btn" data-later>稍后</button>' +
      '<button class="solid-btn" data-dl>立即下载</button></div>',
      function (sheet, close) {
        $('[data-later]', sheet).addEventListener('click', function () {
          close();
          toast('已跳过，可随时在侧栏「云同步」里下载');
        });
        $('[data-dl]', sheet).addEventListener('click', function () {
          close();
          cloudApplyRemote(data, rfp, false);
        });
      }
    );
  }

  function cloudAfterEnter() {
    var fromLogin = cloudEnterFromLogin;
    var localEmpty = cloudEnterLocalEmpty;
    cloudEnterFromLogin = false;
    cloudEnterLocalEmpty = false;
    updateCloudEntry();
    var cfg = readCloud();
    if (!cfg) return;
    /* 打开页面：云端更新且本机自上次同步后没动过时，自动拉一次 */
    cloudFetchGist(cfg.token, cfg.gistId).then(function (gist) {
      return cloudReadRemote(gist).then(function (text) { return text; }, function () { return ''; });
    }).then(function (text) {
      var c = readCloud();
      if (!c || !text) return;
      var data = null, rfp = null;
      try { data = cloudParse(text); rfp = cloudFp(data); } catch (e) { return; }
      var localFp = cloudFp(state);
      if (rfp === localFp) {
        c.lastSyncRev = localFp;
        c.remoteRev = rfp;
        c.lastSyncAt = c.lastSyncAt || Date.now();
        writeCloud(c);
        updateCloudEntry();
        return;
      }
      var localClean = !!c.lastSyncRev && localFp === c.lastSyncRev;
      var remoteNew = !c.remoteRev || rfp !== c.remoteRev;
      /* 刚登录：不静默覆盖，先问用户要不要把云端数据拉下来 */
      if (fromLogin && remoteNew) { cloudOfferRemote(data, rfp, localEmpty); return; }
      if (localClean && remoteNew) {
        cloudApplyRemote(data, rfp, true);
      } else {
        updateCloudEntry();
      }
    }).catch(function () { /* 启动时静默失败，不打扰 */ });
  }

  /* ---------------------------------------------------------
     交互
     --------------------------------------------------------- */
  function toast(msg, ico, ms) {
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
    }, Number(ms) || 2200);
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
          else {
            state = buildSample();
            (state.pages || []).forEach(function (pg) { migrateDailyTasks(pg, state); });
            normalizeCoach(state);
            save(); renderNav(); renderPage(); toast('示例数据已载入');
          }
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

    var cloudBtn = $('#btn-cloud');
    if (cloudBtn) {
      cloudBtn.addEventListener('click', function () {
        closeSidebar();
        openCloudPanel();
      });
    }

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
  /* 旧版哈希（无盐 djb2）：仅用于校验历史记录，保证老账号仍能登录 */
  function hashPass(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  /* 新版哈希（每账号独立盐，FNV-1a + djb2 双路混合）：rec.v === 2 时使用 */
  function newSalt() {
    try {
      var a = new Uint8Array(8);
      crypto.getRandomValues(a);
      return Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    } catch (e) {
      var s = '';
      for (var i = 0; i < 16; i++) s += Math.floor(Math.random() * 16).toString(16);
      return s;
    }
  }
  function hashPass2(pass, salt) {
    var str = salt + '\u0000' + pass + '\u0000' + salt;
    var h1 = 0x811c9dc5, h2 = 5381;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
      h2 = ((h2 << 5) + h2 + c) >>> 0;
    }
    return 'p2' + ('00000000' + h1.toString(16)).slice(-8) + ('00000000' + h2.toString(16)).slice(-8);
  }
  function makeAuthRecord(pass) {
    var salt = newSalt();
    return { v: 2, s: salt, h: hashPass2(pass, salt), at: Date.now() };
  }
  /* 校验：v2 记录走加盐哈希，无 v 的历史记录走旧哈希，两者都放行 */
  function verifyAuthRecord(rec, pass) {
    if (!rec || typeof rec !== 'object') return false;
    if (rec.v === 2 && typeof rec.s === 'string' && typeof rec.h === 'string') {
      return rec.h === hashPass2(pass, rec.s);
    }
    return typeof rec.h === 'string' && rec.h === hashPass(pass);
  }
  /* 历史记录登录成功后静默升级为 v2，不改密码、不打扰用户 */
  function migrateAuthRecord(email, pass) {
    var acc = readAccounts();
    var rec = acc[email];
    if (!rec || rec.v === 2) return false;
    acc[email] = makeAuthRecord(pass);
    writeAccounts(acc);
    return true;
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

  var authMode = 'login';

  function showAuth(msg, mode) {
    document.documentElement.classList.add('locked');
    document.documentElement.classList.remove('authed');
    state = initialState();
    var auth = $('#auth');
    auth.hidden = false;
    $('#auth-mark').innerHTML = icon('leaf');
    var em = $('#auth-email');
    if (em && !em.value) {
      var last = sbCurrentEmail() || '';
      if (last) em.value = last;
    }
    setAuthMode(mode || (sbLoggedIn() ? 'login' : 'login'));
    authFail(msg || '', false, /确认/.test(msg || ''));
    setTimeout(function () { if (em) em.focus(); }, 60);
  }

  /* 登录页三态 + 本机离线模式 */
  function setAuthMode(mode) {
    authMode = mode || 'login';
    var box = $('#auth');
    if (!box) return;
    box.setAttribute('data-mode', authMode);
    var titles = {
      login: ['登录 Life OS', '用一个邮箱账号登录，换设备也能看到同一份数据。'],
      signup: ['注册 Life OS', '注册一个邮箱账号，数据会跟着账号走。'],
      recover: ['找回密码', '填邮箱，我们会发一封重置密码的邮件给你。'],
      local: ['本机账号登录', '这次只在这台电脑上进入，数据不会上传云端。']
    };
    var t = titles[authMode] || titles.login;
    var h1 = $('#auth-title'), sub = $('#auth-sub');
    if (h1) h1.textContent = t[0];
    if (sub) sub.textContent = t[1];
    $$('#auth-tabs .auth-tab').forEach(function (b) {
      var on = b.getAttribute('data-mode') === authMode;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var pf = $('#auth-pass-field'), pass = $('#auth-pass'), hint = $('#auth-hint');
    var submit = $('#auth-submit'), note = $('#auth-note'), local = $('#auth-local');
    if (pf) pf.hidden = (authMode === 'recover');
    if (pass) {
      pass.required = (authMode !== 'recover');
      pass.setAttribute('autocomplete', authMode === 'signup' ? 'new-password' : 'current-password');
      pass.placeholder = authMode === 'signup' ? '至少 6 位' : (authMode === 'local' ? '这台电脑上的密码' : '至少 6 位');
      if (authMode === 'recover') pass.value = '';
    }
    var lbl = $('#auth-pass-label');
    if (lbl) lbl.textContent = authMode === 'local' ? '本机密码' : '密码';
    if (submit) submit.textContent = { login: '登录', signup: '注册并登录', recover: '发送重置邮件', local: '进入本机数据' }[authMode] || '登录';
    if (hint) {
      hint.textContent = {
        login: '邮箱与密码由云端校验，登录后数据自动同步到所有设备。',
        signup: '注册后需要到邮箱点开确认链接，确认完再回来登录。',
        recover: '邮件里点开链接即可设置新密码，本机已有数据不会被清空。',
        local: '本机模式仅供离线使用：密码只在这台电脑上校验，数据不会同步。'
      }[authMode];
    }
    if (note) note.hidden = (authMode !== 'local');
    if (local) local.hidden = (authMode === 'local');
    authFail('', false, false);
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
    cloudResetStamps(state);
    cloudAfterEnter();
    sbAfterEnter();
    if (inherited) toast('已把原有本机数据继承到 ' + email);
    else if (isNew) toast('已为该邮箱创建本地账号');
    else toast('欢迎回来，' + email);
  }

  /* 登录页错误条：带「重置这台电脑的密码」入口时一并显示 */
  function authFail(msg, showReset, showResend) {
    var box = $('#auth-error-box'), err = $('#auth-error');
    var btn = $('#auth-reset'), resend = $('#auth-resend');
    if (err) err.textContent = msg || '';
    if (box) box.hidden = !msg;
    if (btn) btn.hidden = !(msg && showReset);
    if (resend) resend.hidden = !(msg && showResend);
  }
  function authFailClear() { authFail('', false); }

  /* 登录页交互：登录 / 注册 / 忘记密码（云端） + 本机离线登录 */
  function bindAuth() {
    $$('#auth-tabs .auth-tab').forEach(function (b) {
      b.addEventListener('click', function () { setAuthMode(b.getAttribute('data-mode')); });
    });

    var localToggle = $('#auth-local-toggle');
    if (localToggle) localToggle.addEventListener('click', function () { setAuthMode('local'); });

    $('#auth-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = normalizeEmail($('#auth-email').value);
      var pass = $('#auth-pass').value || '';
      if (!isValidEmail(email)) return authFail('请输入有效的邮箱地址', false, false);
      if (authMode === 'recover') return doRecover(email);
      if (authMode === 'local') return doLocalLogin(email, pass);
      if (pass.length < 6) return authFail('密码至少 6 位', false, false);
      if (authMode === 'signup') return doSignUp(email, pass);
      return doCloudLogin(email, pass);
    });

    $('#auth-resend').addEventListener('click', function () {
      var email = normalizeEmail($('#auth-email').value);
      if (!isValidEmail(email)) return authFail('请先填写要接收确认邮件的邮箱', false, false);
      var btn = $('#auth-resend');
      btn.disabled = true;
      authFail('正在重新发送确认邮件…', false, false);
      sbResendConfirm(email).then(function () {
        btn.disabled = false;
        authFail('确认邮件已重新发送到 ' + email + '，请到邮箱点开确认链接后再登录。', false, false);
      }).catch(function (err) {
        btn.disabled = false;
        var info = sbErrInfo(err);
        if (err && err.code === 'RATE') return authFail('发送太频繁，请过几分钟再试。', false, false);
        authFail('确认邮件发送失败：' + info.text, false, true);
      });
    });

    $('#auth-reset').addEventListener('click', function () {
      var email = normalizeEmail($('#auth-email').value);
      if (!isValidEmail(email)) return authFail('请先填写要重置密码的邮箱地址', false, false);
      openResetPasswordDialog(email);
    });

    $('#auth-clear').addEventListener('click', function () {
      if (!confirm('这会清除本机保存的全部账号、云端会话与数据（云端数据不动），且不可恢复。继续？')) return;
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
      if (sbLoggedIn()) return sbSignOutFlow();
      if (!confirm('退出登录？数据已按邮箱保存在本机，用同一邮箱可再次进入。')) return;
      safeDel(SESSION_KEY);
      location.reload();
    });
  }

  function authBusy(on, text) {
    var btn = $('#auth-submit');
    if (btn) {
      btn.disabled = !!on;
      if (on) {
        btn.dataset.label = btn.textContent;
        btn.textContent = text || '请稍候…';
      } else if (btn.dataset.label) {
        btn.textContent = btn.dataset.label;
        delete btn.dataset.label;
      }
    }
  }

  /* 云端登录成功后进入应用（本机数据按邮箱隔离，云端数据随后对齐） */
  function afterCloudAuth(email, isSignup) {
    var acc = readAccounts();
    var had = !!acc[email];
    if (!had) {
      acc[email] = makeAuthRecord('*cloud*');
      writeAccounts(acc);
    }
    authFailClear();
    $('#auth-pass').value = '';
    safeSet(SESSION_KEY, email);
    cloudEnterFromLogin = true;
    cloudEnterLocalEmpty = !sbLocalHasContent();
    enterApp(email, isSignup && !had);
  }

  function doCloudLogin(email, pass) {
    authFail('正在登录…', false, false);
    authBusy(true, '登录中…');
    sbSignIn(email, pass).then(function () {
      authBusy(false);
      afterCloudAuth(email, false);
    }).catch(function (err) {
      authBusy(false);
      var c = err && err.code;
      if (c === 'EMAIL_UNCONFIRMED') {
        return authFail('邮箱还没确认。请到邮箱点开确认链接，回来就能登录；没收到可以点下面的按钮重新发送。', false, true);
      }
      if (c === 'BAD_PASSWORD') {
        var acc = readAccounts();
        var rec = acc[email];
        if (rec && verifyAuthRecord(rec, pass)) {
          return authFail('云端提示邮箱或密码不正确，但这台电脑上存有该邮箱的本机账号，可以直接离线进入。', true, false);
        }
        return authFail('邮箱或密码不正确，请重新输入。', !!rec, false);
      }
      if (c === 'NETWORK') {
        return authFail('连不上云端（网络或代理问题）。可以先点下面的「用本机账号离线登录」继续使用，网络恢复后再登录云端即可补同步。', false, false);
      }
      if (c === 'NO_TABLE') {
        return authFail('云端数据表还没建好，请联系管理员或稍后重试。登录本身不受影响。', false, false);
      }
      var info = sbErrInfo(err);
      authFail(info.text, false, info.action === 'resend');
    });
  }

  function doSignUp(email, pass) {
    authFail('正在注册…', false, false);
    authBusy(true, '注册中…');
    sbSignUp(email, pass).then(function (r) {
      authBusy(false);
      if (r && r.session) return afterCloudAuth(email, true);
      authFail('注册成功，确认邮件已发到 ' + email + '。请点开邮件里的确认链接，然后回来登录。', false, true);
      setAuthMode('login');
      authFail('注册成功，确认邮件已发到 ' + email + '。请点开邮件里的确认链接，然后回来登录。', false, true);
    }).catch(function (err) {
      authBusy(false);
      var c = err && err.code;
      if (c === 'EMAIL_EXISTS') {
        setAuthMode('login');
        return authFail('这个邮箱已经注册过了，请直接登录；忘记密码可以点「忘记密码」。', false, false);
      }
      if (c === 'WEAK_PASSWORD') return authFail('密码太短了，至少 6 位。', false, false);
      if (c === 'BAD_EMAIL') return authFail('这个邮箱地址云端不接受，请检查是否写错。', false, false);
      if (c === 'RATE') return authFail('注册请求太频繁，请过几分钟再试。', false, false);
      if (c === 'NETWORK') return authFail('连不上云端（网络或代理问题），稍后再试，或用本机账号离线使用。', false, false);
      var info = sbErrInfo(err);
      authFail('注册失败：' + info.text, false, false);
    });
  }

  function doRecover(email) {
    authFail('正在发送重置邮件…', false, false);
    authBusy(true, '发送中…');
    sbRecover(email).then(function () {
      authBusy(false);
      setAuthMode('login');
      authFail('重置邮件已发到 ' + email + '（若该邮箱已注册）。点开邮件里的链接即可设置新密码，本机已有数据不会被清空。', false, false);
    }).catch(function (err) {
      authBusy(false);
      if (err && err.code === 'NETWORK') return authFail('连不上云端（网络或代理问题），请稍后重试。', false, false);
      if (err && err.code === 'RATE') return authFail('发送太频繁，请过几分钟再试。', false, false);
      var info = sbErrInfo(err);
      authFail('重置邮件发送失败：' + info.text, false, false);
    });
  }

  /* 本机离线登录：老机制，仅本机校验密码，不上传云端 */
  function doLocalLogin(email, pass) {
    if (pass.length < 4) return authFail('本机密码至少 4 位', false, false);
    var acc = readAccounts();
    var rec = acc[email];
    if (rec) {
      if (!verifyAuthRecord(rec, pass)) {
        return authFail('这台电脑保存的 ' + email + ' 密码与此不符。密码只保存在本机浏览器，不随云端同步。', true, false);
      }
      migrateAuthRecord(email, pass);
    } else {
      acc[email] = makeAuthRecord(pass);
      writeAccounts(acc);
    }
    authFailClear();
    $('#auth-pass').value = '';
    safeSet(SESSION_KEY, email);
    cloudEnterLocalEmpty = !safeGet(keyFor(email));
    cloudEnterFromLogin = true;
    enterApp(email, !rec);
  }

  /* ---------------------------------------------------------
     重置本机密码：只改这台电脑上该邮箱的登录密码，不动任何数据
     --------------------------------------------------------- */
  function openResetPasswordDialog(email) {
    var target = normalizeEmail(email);
    openDialog(
      '<div id="rp-step1">' +
      '<h3>重置这台电脑的密码</h3>' +
      '<p class="sub">密码保存在本机浏览器，不随云同步。为 <b>' + esc(target) + '</b> 设置一个新密码后可直接登录，' +
      '该邮箱在本机的数据会完整保留。</p>' +
      '<div class="sheet-label">新密码</div>' +
      '<input class="field" id="rp-pass" type="password" autocomplete="new-password" ' +
      'placeholder="至少 4 位" style="width:100%" aria-label="新密码">' +
      '<div class="sheet-label" style="margin-top:12px">确认新密码</div>' +
      '<input class="field" id="rp-pass2" type="password" autocomplete="new-password" ' +
      'placeholder="再输入一次" style="width:100%" aria-label="确认新密码">' +
      '<p class="sub" id="rp-err" style="margin:8px 0 0;color:var(--danger)" hidden></p>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-next>下一步</button></div>' +
      '</div>' +
      '<div id="rp-step2" hidden>' +
      '<h3>确认重置密码？</h3>' +
      '<p class="sub">将把 <b>' + esc(target) + '</b> 在这台电脑上的登录密码改为新密码。' +
      '只改登录密码，不会删除任何数据内容；该邮箱的页面、OKR、打卡、日程都会保持原样并立即可以进入。</p>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-back>返回</button>' +
      '<button class="solid-btn" data-ok>确认重置并登录</button></div>' +
      '</div>',
      function (sheet, close) {
        var s1 = $('#rp-step1', sheet), s2 = $('#rp-step2', sheet);
        var p1 = $('#rp-pass', sheet), p2 = $('#rp-pass2', sheet), err = $('#rp-err', sheet);
        var nextPass = '';
        function showErr(m) { err.textContent = m; err.hidden = false; }
        $('#rp-pass').focus();
        $('[data-next]', sheet).addEventListener('click', function () {
          var a = String(p1.value || ''), b = String(p2.value || '');
          if (a.length < 4) { showErr('新密码至少 4 位'); p1.focus(); return; }
          if (a !== b) { showErr('两次输入的密码不一致'); p2.focus(); return; }
          nextPass = a;
          err.hidden = true;
          s1.hidden = true; s2.hidden = false;
          setTimeout(function () { try { $('[data-ok]', sheet).focus(); } catch (e) { } }, 40);
        });
        $('[data-back]', sheet).addEventListener('click', function () {
          s2.hidden = true; s1.hidden = false;
          setTimeout(function () { try { (p2.value ? p2 : p1).focus(); } catch (e) { } }, 40);
        });
        $('[data-ok]', sheet).addEventListener('click', function () {
          var acc = readAccounts();
          /* 只覆盖该邮箱的密码哈希，其它键（数据、云同步配置）一律不动 */
          acc[target] = makeAuthRecord(nextPass);
          writeAccounts(acc);
          safeSet(SESSION_KEY, target);
          close();
          authFailClear();
          $('#auth-pass').value = '';
          cloudEnterLocalEmpty = !safeGet(keyFor(target));
          cloudEnterFromLogin = true;
          enterApp(target, false);
          toast('已重置这台电脑的密码，原有数据保持不变');
        });
        [p1, p2].forEach(function (inp) {
          inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') $('[data-next]', sheet).click(); });
        });
      }
    );
  }


  /* =========================================================
     V5 · 六项体验补强
     今日聚焦 / 习惯升级 / 人生轮盘 / 周复盘 / 心情与精力 / OKR 汇总
     所有新数据都挂在 state 上，随 Supabase 静默同步与导入导出一起走
     ========================================================= */
  function isPlainObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }

  function normalizeCoach(s) {
    s.settings = s.settings || {};
    s.settings.capacityH = clamp(Number(s.settings.capacityH) || 8, 1, 16);
    if (!isDateStr(s.settings.reviewWeek)) s.settings.reviewWeek = weekStartISO(today());

    /* 今日三件事：{ 'YYYY-MM-DD': [{id,text,done}] } */
    s.mits = isPlainObj(s.mits) ? s.mits : {};
    Object.keys(s.mits).forEach(function (k) {
      if (!isDateStr(k) || !Array.isArray(s.mits[k])) { delete s.mits[k]; return; }
      s.mits[k] = s.mits[k].filter(Boolean).slice(0, 3).map(function (x) {
        return {
          id: x.id || uid('mit'),
          text: typeof x.text === 'string' ? x.text : '',
          done: !!x.done
        };
      });
    });

    /* 心情与精力：{ 'YYYY-MM-DD': { mood:1-5, energy:1-5, note } } */
    s.mood = isPlainObj(s.mood) ? s.mood : {};
    Object.keys(s.mood).forEach(function (k) {
      var r = s.mood[k];
      if (!isDateStr(k) || !isPlainObj(r)) { delete s.mood[k]; return; }
      r.mood = clamp(Number(r.mood) || 0, 0, 5);
      r.energy = clamp(Number(r.energy) || 0, 0, 5);
      r.note = typeof r.note === 'string' ? r.note : '';
    });

    /* 人生轮盘：{ history: [{id, at, quarter, scores:{life8.id:0-10}}] } */
    if (!isPlainObj(s.wheel)) s.wheel = {};
    s.wheel.history = Array.isArray(s.wheel.history) ? s.wheel.history.filter(Boolean).map(function (x) {
      var sc = isPlainObj(x.scores) ? x.scores : {};
      var out = {};
      LIFE8.forEach(function (d) { out[d.id] = clamp(Number(sc[d.id]) || 0, 0, 10); });
      return {
        id: x.id || uid('wh'),
        at: isDateStr(x.at) ? x.at : today(),
        quarter: typeof x.quarter === 'string' ? x.quarter : quarterKey(x.at || today()),
        scores: out
      };
    }) : [];

    /* 周复盘：{ '2026-W47': { fields:{...}, savedAt, okrPct } } */
    s.weekly = isPlainObj(s.weekly) ? s.weekly : {};
    Object.keys(s.weekly).forEach(function (k) {
      var r = s.weekly[k];
      if (!isPlainObj(r)) { delete s.weekly[k]; return; }
      var f = isPlainObj(r.fields) ? r.fields : {};
      r.fields = {
        highlight: typeof f.highlight === 'string' ? f.highlight : '',
        blocker: typeof f.blocker === 'string' ? f.blocker : '',
        learn: typeof f.learn === 'string' ? f.learn : '',
        next: typeof f.next === 'string' ? f.next : ''
      };
      r.savedAt = isDateStr(r.savedAt) ? r.savedAt : '';
      r.okrPct = clamp(Number(r.okrPct) || 0, 0, 100);
    });

    /* OKR 季度归档快照 */
    s.okrArchive = Array.isArray(s.okrArchive) ? s.okrArchive.filter(Boolean).map(function (x) {
      return {
        id: x.id || uid('oa'),
        at: isDateStr(x.at) ? x.at : today(),
        quarter: typeof x.quarter === 'string' ? x.quarter : quarterKey(x.at || today()),
        pct: clamp(Number(x.pct) || 0, 0, 100),
        objs: Array.isArray(x.objs) ? x.objs.map(function (o) {
          return { title: typeof o.title === 'string' ? o.title : '目标', pct: clamp(Number(o.pct) || 0, 0, 100) };
        }) : []
      };
    }) : [];

    /* 连续 7 / 30 天里程碑只提示一次：{ habitId: { d7:'YYYY-MM-DD', d30:'YYYY-MM-DD' } } */
    s.habitNotice = isPlainObj(s.habitNotice) ? s.habitNotice : {};

    /* 习惯结构升级：补 goal（每周目标频次）与 checks 兜底，旧记录原样保留 */
    s.pages.forEach(function (pg) {
      (pg.modules || []).forEach(function (m) {
        if (!m || m.type !== 'habit') return;
        m.data = isPlainObj(m.data) ? m.data : {};
        if (!isMonthStr(m.data.month)) m.data.month = monthKey(new Date());
        m.data.habits = (Array.isArray(m.data.habits) ? m.data.habits : []).filter(Boolean).map(function (h) {
          h.id = h.id || uid('h');
          h.name = typeof h.name === 'string' ? h.name : '习惯';
          h.checks = isPlainObj(h.checks) ? h.checks : {};
          Object.keys(h.checks).forEach(function (k) {
            if (!isDateStr(k)) delete h.checks[k]; else h.checks[k] = true;
          });
          h.goal = isPlainObj(h.goal) ? h.goal : {};
          h.goal.per = 'week';
          h.goal.times = clamp(Number(h.goal.times) || 3, 1, 7);
          return h;
        });
      });
    });
  }

  /* ---------- 日期工具 ---------- */
  function weekStartISO(s) {
    var d = parseISO(isDateStr(s) ? s : today());
    var back = (d.getDay() + 6) % 7;            /* 周一 = 0 */
    return shiftISO(iso(d), -back);
  }

  function isoWeekKey(s) {
    var d = parseISO(isDateStr(s) ? s : today());
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    t.setDate(t.getDate() + 4 - (t.getDay() || 7));
    var jan1 = new Date(t.getFullYear(), 0, 1);
    var week = Math.ceil(((t - jan1) / 86400000 + 1) / 7);
    return t.getFullYear() + '-W' + (week < 10 ? '0' + week : String(week));
  }

  function quarterKey(s) {
    var d = parseISO(isDateStr(s) ? s : today());
    return d.getFullYear() + '-Q' + (Math.floor(d.getMonth() / 3) + 1);
  }

  /* =========================================================
     一、今日聚焦
     ========================================================= */
  function mitsOf(key) {
    if (!isPlainObj(state.mits)) state.mits = {};
    if (!Array.isArray(state.mits[key])) state.mits[key] = [];
    return state.mits[key];
  }

  function overdueList() {
    var t = today(), out = [];
    allModules().forEach(function (m) {
      if (!m || (m.type !== 'todo' && m.type !== 'timeline')) return;
      ((m.data && m.data.items) || []).forEach(function (it) {
        if (!it || it.done || !isDateStr(it.date) || it.date >= t) return;
        out.push({ module: m, item: it });
      });
    });
    out.sort(function (a, b) { return a.item.date < b.item.date ? -1 : (a.item.date > b.item.date ? 1 : 0); });
    return out;
  }

  function todayLoad() {
    var t = today(), min = 0, seg = 0;
    allModules().forEach(function (m) {
      if (!m || m.type !== 'timeline') return;
      ((m.data && m.data.items) || []).forEach(function (it) {
        if (!it || it.done || it.date !== t) return;
        min += tlDur(it);
        seg++;
      });
    });
    return { min: min, seg: seg };
  }

  function focusBlock() {
    if (!isPlainObj(state.mits)) normalizeCoach(state);
    var key = today();
    var cap = clamp(Number(state.settings.capacityH) || 8, 1, 16);
    var load = todayLoad();
    var useH = load.min / 60;
    var pct = cap ? Math.round(useH / cap * 100) : 0;
    var over = pct > 100;
    var od = overdueList();

    var sec = document.createElement('section');
    sec.className = 'focus-card reveal';

    function mitRows() {
      var mits = mitsOf(key);
      return [0, 1, 2].map(function (i) {
        var it = mits[i] || null;
        var has = !!(it && String(it.text || '').trim());
        return '<div class="mit' + (it && it.done ? ' done' : '') + '">' +
          '<button class="mit-check' + (it && it.done ? ' on' : '') + '" type="button" data-mit-check="' + i + '"' +
          (has ? '' : ' disabled') + ' aria-label="完成第 ' + (i + 1) + ' 件事">' + icon('check') + '</button>' +
          '<input class="mit-in" data-mit-in="' + i + '" maxlength="40" aria-label="第 ' + (i + 1) +
          ' 件最重要的事" placeholder="第 ' + (i + 1) + ' 件最重要的事" value="' + esc((it && it.text) || '') + '">' +
          '</div>';
      }).join('');
    }

    function mitMeta() {
      var mits = mitsOf(key);
      var real = mits.filter(function (x) { return String(x.text || '').trim(); }).length;
      var done = mits.filter(function (x) { return x.done && String(x.text || '').trim(); }).length;
      return '三件事 ' + done + '/' + real;
    }

    sec.innerHTML =
      '<div class="fc-head">' +
      '<div class="fc-title"><span class="fc-ico">' + icon('target') + '</span>今日聚焦</div>' +
      '<div class="fc-meta">' + esc(cnDate(parseISO(key))) + ' · 周' + WEEK[parseISO(key).getDay()] +
      ' · <span data-mit-meta>' + mitMeta() + '</span></div>' +
      '</div>' +
      '<div class="fc-grid">' +
      '<div class="fc-mits" data-mits>' + mitRows() + '</div>' +
      '<div class="fc-side">' +
      '<div class="fc-cap' + (over ? ' over' : '') + '">' +
      '<div class="fc-cap-top"><span>今日容量</span><b>' + useH.toFixed(1) + 'h<small> / ' + cap + 'h</small></b></div>' +
      '<span class="fc-bar"><i style="width:' + clamp(pct, 0, 100) + '%"></i></span>' +
      '<p class="fc-cap-note">' + (over
        ? '超载 ' + (useH - cap).toFixed(1) + 'h · 建议压缩或顺延低优先的 ' + load.seg + ' 段安排'
        : '已排 ' + load.seg + ' 段 · 余量 ' + Math.max(0, cap - useH).toFixed(1) + 'h') + '</p>' +
      '</div>' +
      '<div class="fc-od' + (od.length ? ' has' : '') + '">' +
      '<div class="fc-od-top"><span>逾期未完成</span><b>' + od.length + ' 项</b></div>' +
      '<p class="fc-od-list">' + (od.length
        ? od.slice(0, 3).map(function (o) { return esc(o.item.text || '未命名'); }).join(' · ') + (od.length > 3 ? ' 等' : '')
        : '没有逾期，节奏刚好。') + '</p>' +
      '<button class="ghost-btn tiny" type="button" data-od-move' + (od.length ? '' : ' disabled') + '>一键顺延到今天</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    var mitsBox = $('[data-mits]', sec);
    var saveLazy = debounce(function () { save(); }, 320);

    function onMitInput(inp) {
      var i = Number(inp.dataset.mitIn);
      var list = mitsOf(key);
      while (list.length <= i) list.push({ id: uid('mit'), text: '', done: false });
      var rec = list[i] || (list[i] = { id: uid('mit'), text: '', done: false });
      rec.text = inp.value;
      if (!String(rec.text).trim()) rec.done = false;
      saveLazy();
      var meta = $('[data-mit-meta]', sec);
      if (meta) meta.textContent = mitMeta();
      var row = inp.closest('.mit');
      var btn = row ? $('.mit-check', row) : null;
      if (btn) {
        var ready = !!String(rec.text).trim();
        btn.disabled = !ready;
        if (!ready) { btn.classList.remove('on'); row.classList.remove('done'); }
      }
    }

    $$('[data-mit-in]', mitsBox).forEach(function (inp) {
      inp.addEventListener('input', function () { onMitInput(inp); });
      inp.addEventListener('blur', function () { save(); });
    });

    $$('[data-mit-check]', mitsBox).forEach(function (b) {
      b.addEventListener('click', function () {
        var i = Number(b.dataset.mitCheck);
        var list = mitsOf(key);
        var rec = list[i];
        if (!rec || !String(rec.text || '').trim()) return;
        rec.done = !rec.done;
        save();
        var row = b.closest('.mit');
        if (row) row.classList.toggle('done', rec.done);
        b.classList.toggle('on', rec.done);
        var meta = $('[data-mit-meta]', sec);
        if (meta) meta.textContent = mitMeta();
      });
    });

    var mv = $('[data-od-move]', sec);
    if (mv) mv.addEventListener('click', function () {
      var list = overdueList();
      if (!list.length) return;
      var t = today();
      list.forEach(function (o) { o.item.date = t; });
      save();
      toast('已把 ' + list.length + ' 项逾期顺延到今天');
      renderPage();
    });
    return sec;
  }

  /* =========================================================
     二、习惯升级：连续天数 / 周目标 / 补打卡 / 月完成率 / 热力图
     ========================================================= */
  function habitStreak(h) {
    var checks = h.checks || {};
    var d = today(), n = 0;
    if (!checks[d]) d = shiftISO(d, -1);   /* 今天还没打，不算断 */
    while (checks[d]) { n++; d = shiftISO(d, -1); }
    return n;
  }

  function habitLongest(h) {
    var keys = Object.keys(h.checks || {}).filter(isDateStr).sort();
    var best = 0, run = 0, prev = '';
    keys.forEach(function (k) {
      run = (prev && k === shiftISO(prev, 1)) ? run + 1 : 1;
      prev = k;
      if (run > best) best = run;
    });
    return best;
  }

  function habitWeekCount(h, ans) {
    var from = weekStartISO(ans || today()), to = shiftISO(from, 6), n = 0;
    Object.keys(h.checks || {}).forEach(function (k) { if (k >= from && k <= to) n++; });
    return n;
  }

  function habitMonthStats(h, month) {
    var parts = month.split('-'), y = Number(parts[0]), mo = Number(parts[1]);
    var days = new Date(y, mo, 0).getDate();
    var tKey = today();
    var elapsed = 0, done = 0;
    for (var i = 1; i <= days; i++) {
      var k = y + '-' + pad(mo) + '-' + pad(i);
      if (k <= tKey) elapsed++;
      if ((h.checks || {})[k]) done++;
    }
    /* V8：本月目标次数直接与当月天数联动（11 月 = 30，12 月 = 31，2 月 = 28/29） */
    var expect = days;
    var rate = Math.min(100, Math.round(done / expect * 100));
    return { days: days, elapsed: elapsed, done: done, expect: expect, rate: rate };
  }

  /* 网格每行左侧的一行小字：连续天数 · 本月完成 / 当月天数 */
  function habitMetaText(h, month) {
    var st = habitStreak(h);
    var ms = habitMonthStats(h, month);
    return '连续 ' + st + ' 天 · ' + ms.done + '/' + ms.expect;
  }

  function heatLevel(d, month) {
    var habits = d.habits || [];
    if (!habits.length) return [];
    var parts = month.split('-'), y = Number(parts[0]), mo = Number(parts[1]);
    var days = new Date(y, mo, 0).getDate();
    var out = [];
    for (var i = 1; i <= days; i++) {
      var k = y + '-' + pad(mo) + '-' + pad(i);
      var c = habits.filter(function (h) { return h.checks && h.checks[k]; }).length;
      out.push({ key: k, num: i, count: c, level: c ? Math.min(4, Math.ceil(c / habits.length * 4)) : 0 });
    }
    return out;
  }

  function habitExtraHtml(m) {
    var d = m.data || {};
    if (!(d.habits || []).length) return '';
    /* V8：统计与热力图已并入打卡网格，这里只保留补打卡入口 */
    return '<div class="hb-tools" data-hb>' +
      '<button class="ghost-btn tiny" type="button" data-backfill>补打卡（过去 7 天）</button>' +
      '</div>';
  }

  function paintHabitStats(body, m) {
    var d = m.data || {};
    var month = d.month || monthKey(new Date());
    (d.habits || []).forEach(function (h) {
      var el = $('[data-meta="' + h.id + '"]', body);
      if (el) el.textContent = habitMetaText(h, month);
    });
    heatLevel(d, month).forEach(function (c) {
      var el = $('[data-heat="' + c.key + '"]', body);
      if (!el) return;
      el.className = 'heat-bar l' + c.level;
      el.title = c.key + ' · 完成 ' + c.count + ' 个习惯';
    });
    var sum = $('[data-hsum]', body);
    if (sum) {
      var parts = month.split('-'), y = Number(parts[0]), mo = Number(parts[1]);
      var days = new Date(y, mo, 0).getDate();
      var total = 0;
      (d.habits || []).forEach(function (h) {
        Object.keys(h.checks || {}).forEach(function (k) { if (k.indexOf(y + '-' + pad(mo)) === 0) total++; });
      });
      var goalAll = (d.habits || []).length * days;
      sum.textContent = total + '/' + goalAll + ' · ' + (goalAll ? Math.round(total / goalAll * 100) : 0) + '%';
    }
  }

  function openHabitGoal(m, habit, after) {
    openDialog(
      '<h3>每周目标频次</h3>' +
      '<p class="sub">「' + esc(habit.name) + '」每周想完成几次？完成率与热力图都会按这个目标折算。</p>' +
      '<div class="goal-grid">' + [1, 2, 3, 4, 5, 6, 7].map(function (n) {
        return '<button class="goal-opt' + ((Number(habit.goal && habit.goal.times) || 3) === n ? ' active' : '') +
          '" type="button" data-n="' + n + '">' + n + ' 次</button>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>保存</button></div>',
      function (sheet, close) {
        var pick = Number(habit.goal && habit.goal.times) || 3;
        $$('[data-n]', sheet).forEach(function (b) {
          b.addEventListener('click', function () {
            pick = Number(b.dataset.n);
            $$('[data-n]', sheet).forEach(function (x) { x.classList.toggle('active', x === b); });
          });
        });
        $('[data-close]', sheet).addEventListener('click', close);
        $('[data-ok]', sheet).addEventListener('click', function () {
          habit.goal = habit.goal || {};
          habit.goal.per = 'week';
          habit.goal.times = pick;
          save();
          close();
          if (after) after();
          toast('每周目标已更新为 ' + pick + ' 次');
        });
      }
    );
  }

  function openBackfill(m, after) {
    var d = m.data || {};
    var habits = d.habits || [];
    if (!habits.length) { toast('先加一个习惯'); return; }
    var days = [];
    for (var i = 6; i >= 0; i--) days.push(shiftISO(today(), -i));
    openDialog(
      '<h3>补打卡 · 过去 7 天</h3>' +
      '<p class="sub">点一下切换当天状态，保存后计入连续天数、完成率与热力图；不影响其它日期的记录。</p>' +
      '<div class="bf-list">' + days.map(function (k) {
        var dt = parseISO(k);
        return '<div class="bf-day"><span class="bf-date">' + (dt.getMonth() + 1) + '/' + dt.getDate() +
          ' 周' + WEEK[dt.getDay()] + '</span><div class="bf-habits">' +
          habits.map(function (h) {
            var on = !!(h.checks && h.checks[k]);
            return '<button class="bf-chip' + (on ? ' on' : '') + '" type="button" data-bf="' + h.id + '" data-d="' + k + '">' +
              esc(h.name) + '</button>';
          }).join('') + '</div></div>';
      }).join('') + '</div>' +
      '<div class="sheet-actions"><button class="ghost-btn" data-close>取消</button>' +
      '<button class="solid-btn" data-ok>保存补打卡</button></div>',
      function (sheet, close) {
        $$('[data-bf]', sheet).forEach(function (b) {
          b.addEventListener('click', function () { b.classList.toggle('on'); });
        });
        $('[data-close]', sheet).addEventListener('click', close);
        $('[data-ok]', sheet).addEventListener('click', function () {
          var n = 0;
          $$('[data-bf]', sheet).forEach(function (b) {
            var h = habits.filter(function (x) { return x.id === b.dataset.bf; })[0];
            if (!h) return;
            h.checks = h.checks || {};
            var on = b.classList.contains('on');
            if (on && !h.checks[b.dataset.d]) { h.checks[b.dataset.d] = true; n++; }
            else if (!on && h.checks[b.dataset.d]) { delete h.checks[b.dataset.d]; n++; }
          });
          save();
          close();
          if (after) after();
          toast(n ? '已更新 ' + n + ' 条打卡记录' : '没有变化');
        });
      }
    );
  }

  function habitMilestone(m, h) {
    var st = habitStreak(h);
    state.habitNotice = isPlainObj(state.habitNotice) ? state.habitNotice : {};
    var rec = state.habitNotice[h.id] = state.habitNotice[h.id] || {};
    var t = today();
    if (st >= 30 && rec.d30 !== t) { rec.d30 = t; save(); toast('连续 30 天达成 · ' + h.name); return; }
    if (st >= 7 && rec.d7 !== t) { rec.d7 = t; save(); toast('连续 7 天达成 · ' + h.name); return; }
  }

  /* 在既有习惯渲染器上做增量包装：不改原有打卡逻辑，只追加统计区与热力图 */
  (function () {
    var baseHtml = renderers.habit.html;
    var baseBind = renderers.habit.bind;

    renderers.habit.html = function (m) {
      return baseHtml(m) + habitExtraHtml(m);
    };

    renderers.habit.bind = function (body, card, m) {
      baseBind(body, card, m);
      var d = m.data || {};
      var extra = $('[data-hb]', body);
      if (!extra) return;

      $$('[data-goal]', body).forEach(function (b) {
        b.addEventListener('click', function () {
          var h = (d.habits || []).filter(function (x) { return x.id === b.dataset.goal; })[0];
          if (!h) return;
          openHabitGoal(m, h, function () { refreshCard(m); });
        });
      });

      var bf = $('[data-backfill]', body);
      if (bf) bf.addEventListener('click', function () { openBackfill(m, function () { refreshCard(m); }); });

      /* 打卡后即时刷新统计与热力图（保留原打卡弹跳动画，不整卡重绘） */
      $$('.cell', body).forEach(function (c) {
        c.addEventListener('click', function () {
          var h = (d.habits || []).filter(function (x) { return x.id === c.dataset.h; })[0];
          if (!h || !extra.isConnected) return;
          paintHabitStats(body, m);
          if (h.checks && h.checks[c.dataset.d]) habitMilestone(m, h);
        });
      });
    };
  })();

  /* =========================================================
     三、人生轮盘：八大领域雷达图 + 季度快照
     ========================================================= */
  function wheelScores() {
    var out = {};
    state.life8.forEach(function (d) { out[d.id] = clamp(Number(d.score) || 0, 0, 10); });
    return out;
  }

  function radarSVG(cur, prev) {
    var n = LIFE8.length;
    var cx = 170, cy = 148, R = 100;
    function pt(i, v) {
      var a = (-90 + i * (360 / n)) * Math.PI / 180;
      var r = R * clamp(v, 0, 10) / 10;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }
    function poly(get) {
      var p = [];
      for (var i = 0; i < n; i++) { var q = pt(i, get(i)); p.push(q[0].toFixed(1) + ',' + q[1].toFixed(1)); }
      return p.join(' ');
    }
    var rings = [2.5, 5, 7.5, 10].map(function (lv) {
      return '<polygon class="radar-ring' + (lv === 10 ? ' outer' : '') + '" points="' + poly(function () { return lv; }) + '"></polygon>';
    }).join('');

    var axes = '', labels = '';
    for (var i = 0; i < n; i++) {
      var q = pt(i, 10);
      axes += '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '"></line>';
      var a = (-90 + i * (360 / n)) * Math.PI / 180;
      var lx = cx + (R + 17) * Math.cos(a), ly = cy + (R + 17) * Math.sin(a);
      var cos = Math.cos(a);
      var anchor = Math.abs(cos) < 0.28 ? 'middle' : (cos > 0 ? 'start' : 'end');
      labels += '<text class="radar-label" x="' + lx.toFixed(1) + '" y="' + (ly + 3.6).toFixed(1) +
        '" text-anchor="' + anchor + '">' + esc(LIFE8[i].name) + '</text>';
    }

    var prevPoly = prev ? '<polygon class="radar-prev" points="' + poly(function (i) {
      return clamp(Number(prev[LIFE8[i].id]) || 0, 0, 10);
    }) + '"></polygon>' : '';

    var dots = LIFE8.map(function (d, i) {
      var q = pt(i, clamp(Number(cur[d.id]) || 0, 0, 10));
      return '<circle class="radar-dot" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.6"></circle>';
    }).join('');

    return '<svg class="radar" viewBox="0 0 340 300" role="img" aria-label="人生轮盘雷达图">' +
      rings + axes + prevPoly +
      '<polygon class="radar-cur" points="' + poly(function (i) {
        return clamp(Number(cur[LIFE8[i].id]) || 0, 0, 10);
      }) + '"></polygon>' +
      dots + labels + '</svg>';
  }

  function wheelBlock() {
    if (!isPlainObj(state.wheel)) normalizeCoach(state);
    var sec = document.createElement('section');
    sec.className = 'wheel-card reveal';

    function paint() {
      var cur = wheelScores();
      var last = (state.wheel.history || []).slice(-1)[0] || null;
      var diff = LIFE8.map(function (d) {
        var now = cur[d.id];
        var old = last ? clamp(Number(last.scores[d.id]) || 0, 0, 10) : null;
        return { name: d.name, color: d.color, now: now, old: old, delta: old == null ? null : now - old };
      });
      var avgNow = LIFE8.reduce(function (a, d) { return a + cur[d.id]; }, 0) / LIFE8.length;
      var avgOld = last ? LIFE8.reduce(function (a, d) { return a + (Number(last.scores[d.id]) || 0); }, 0) / LIFE8.length : null;

      sec.innerHTML =
        '<div class="section-head"><h2>人生轮盘</h2><p>八个领域 1 – 10 打分，和上一季对比看偏科</p></div>' +
        '<div class="wheel-body">' +
        '<div class="wheel-canvas">' + radarSVG(cur, last ? last.scores : null) + '</div>' +
        '<div class="wheel-side">' +
        '<div class="wheel-sum">' +
        '<span class="wheel-avg">' + avgNow.toFixed(1) + '<small> / 10 均值</small></span>' +
        '<span class="wheel-when">' + (last
          ? '对比 ' + esc(last.quarter) + ' 快照（' + avgOld.toFixed(1) + '，' +
            (avgNow - avgOld >= 0 ? '+' : '') + (avgNow - avgOld).toFixed(1) + '）'
          : '还没有季度快照，先记录一次') + '</span>' +
        '</div>' +
        '<ul class="wheel-diff">' + diff.map(function (x) {
          return '<li><i style="background:' + x.color + '"></i><span>' + esc(x.name) + '</span>' +
            '<b>' + x.now + '</b>' +
            '<em class="' + (x.delta == null ? 'flat' : (x.delta > 0 ? 'up' : (x.delta < 0 ? 'down' : 'flat'))) + '">' +
            (x.delta == null ? '—' : (x.delta > 0 ? '+' + x.delta : String(x.delta))) + '</em></li>';
        }).join('') + '</ul>' +
        '<div class="wheel-actions">' +
        '<button class="solid-btn tiny" type="button" data-wheel-save>记录本季快照</button>' +
        '<button class="ghost-btn tiny" type="button" data-wheel-hist>历史快照 · ' + (state.wheel.history || []).length + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';

      var saveBtn = $('[data-wheel-save]', sec);
      if (saveBtn) saveBtn.addEventListener('click', function () {
        var q = quarterKey(today());
        var scores = wheelScores();
        if (!LIFE8.some(function (d) { return scores[d.id] > 0; })) { toast('先把下方八个抽屉的分数调一调'); return; }
        state.wheel.history = state.wheel.history || [];
        state.wheel.history.push({ id: uid('wh'), at: today(), quarter: q, scores: scores });
        save();
        paint();
        toast('已记录 ' + q + ' 快照');
      });

      var histBtn = $('[data-wheel-hist]', sec);
      if (histBtn) histBtn.addEventListener('click', function () {
        var list = (state.wheel.history || []).slice().reverse();
        openDialog(
          '<h3>季度快照</h3>' +
          '<p class="sub">每次记录都会存下八个领域的分值，用来和本季对比。</p>' +
          (list.length ? '<div class="hist-list">' + list.map(function (h) {
            var avg = LIFE8.reduce(function (a, d) { return a + (Number(h.scores[d.id]) || 0); }, 0) / LIFE8.length;
            return '<div class="hist-row"><span>' + esc(h.quarter) + '<small>' + esc(h.at) + '</small></span>' +
              '<b>' + avg.toFixed(1) + ' 均值</b></div>';
          }).join('') + '</div>' : '<p class="empty-line">还没有快照。</p>') +
          '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button></div>',
          function (sheet, close) {
            $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
          }
        );
      });
    }

    paint();
    document.addEventListener('life8:change', function () { if (sec.isConnected) paint(); });
    return sec;
  }

  /* =========================================================
     四、周复盘：自动汇总 + 四栏手填 + 纯文本周报
     ========================================================= */
  function tasksInRange(from, to) {
    var out = [];
    allModules().forEach(function (m) {
      if (!m || (m.type !== 'todo' && m.type !== 'timeline')) return;
      ((m.data && m.data.items) || []).forEach(function (it) {
        if (!it || !isDateStr(it.date)) return;
        if (it.date < from || it.date > to) return;
        out.push(it);
      });
    });
    return out;
  }

  function okrSummary() {
    var objs = [], pcts = [], krTotal = 0;
    allModules().forEach(function (m) {
      if (!m || m.type !== 'okr') return;
      ((m.data && m.data.objectives) || []).forEach(function (o) {
        var krs = o.krs || [];
        var p = krs.length ? Math.round(krs.reduce(function (a, k) {
          return a + clamp(k.target ? (k.cur / k.target) * 100 : 0, 0, 100);
        }, 0) / krs.length) : 0;
        krTotal += krs.length;
        objs.push({ title: o.title, pct: p, krs: krs.length, module: m.title });
        if (krs.length) pcts.push(p);
      });
    });
    return {
      pct: pcts.length ? Math.round(pcts.reduce(function (a, b) { return a + b; }, 0) / pcts.length) : 0,
      objs: objs,
      krCount: krTotal,
      objCount: objs.length
    };
  }

  function weekStats(anchor) {
    var from = weekStartISO(anchor || today());
    var to = shiftISO(from, 6);
    var tk = tasksInRange(from, to);
    var tDone = tk.filter(function (t) { return t.done; }).length;

    var hGoal = 0, hDone = 0, hRows = [];
    allModules().forEach(function (m) {
      if (!m || m.type !== 'habit') return;
      ((m.data && m.data.habits) || []).forEach(function (h) {
        var goal = clamp(Number(h.goal && h.goal.times) || 3, 1, 7);
        var n = 0;
        Object.keys(h.checks || {}).forEach(function (k) { if (k >= from && k <= to) n++; });
        hGoal += goal;
        hDone += Math.min(n, goal);
        hRows.push({ name: h.name, n: n, goal: goal });
      });
    });

    var mitTotal = 0, mitDone = 0;
    for (var i = 0; i < 7; i++) {
      var k = shiftISO(from, i);
      (state.mits[k] || []).forEach(function (x) {
        if (!String(x.text || '').trim()) return;
        mitTotal++;
        if (x.done) mitDone++;
      });
    }

    var okr = okrSummary();
    return {
      from: from, to: to, weekKey: isoWeekKey(from),
      taskTotal: tk.length, taskDone: tDone,
      taskRate: tk.length ? Math.round(tDone / tk.length * 100) : 0,
      habitGoal: hGoal, habitDone: hDone,
      habitRate: hGoal ? Math.round(hDone / hGoal * 100) : 0,
      habitRows: hRows,
      mitTotal: mitTotal, mitDone: mitDone,
      okrPct: okr.pct
    };
  }

  function weeklyRecord(key) {
    state.weekly = isPlainObj(state.weekly) ? state.weekly : {};
    var r = state.weekly[key];
    if (!isPlainObj(r)) {
      r = state.weekly[key] = { fields: { highlight: '', blocker: '', learn: '', next: '' }, savedAt: '', okrPct: 0 };
    }
    return r;
  }

  function weekReportText(st, rec, prevOkr) {
    var d1 = parseISO(st.from), d2 = parseISO(st.to);
    var lines = [];
    lines.push('【周复盘】' + d1.getFullYear() + ' 年 ' + (d1.getMonth() + 1) + ' 月 ' + d1.getDate() + ' 日 – ' +
      (d2.getMonth() + 1) + ' 月 ' + d2.getDate() + ' 日（' + st.weekKey + '）');
    lines.push('');
    lines.push('一、本周数据');
    lines.push('· 任务：完成 ' + st.taskDone + ' / ' + st.taskTotal + '（' + st.taskRate + '%）');
    lines.push('· 习惯：达成 ' + st.habitDone + ' / ' + st.habitGoal + ' 次目标（' + st.habitRate + '%）');
    lines.push('· 三件事：完成 ' + st.mitDone + ' / ' + st.mitTotal);
    lines.push('· OKR：总进度 ' + st.okrPct + '%' +
      (prevOkr == null ? '（首次记录）' : '（较上次 ' + prevOkr + '%，' + (st.okrPct - prevOkr >= 0 ? '+' : '') + (st.okrPct - prevOkr) + '）'));
    if (st.habitRows.length) {
      lines.push('  - ' + st.habitRows.map(function (h) { return h.name + ' ' + h.n + '/' + h.goal; }).join('；'));
    }
    lines.push('');
    lines.push('二、本周高光');
    lines.push((rec.fields.highlight || '（未填写）').trim());
    lines.push('');
    lines.push('三、卡点');
    lines.push((rec.fields.blocker || '（未填写）').trim());
    lines.push('');
    lines.push('四、学到什么');
    lines.push((rec.fields.learn || '（未填写）').trim());
    lines.push('');
    lines.push('五、下周三件事');
    var nx = (rec.fields.next || '').trim();
    if (nx) {
      nx.split(/\n+/).forEach(function (x, i) { lines.push((i + 1) + '. ' + x.trim()); });
    } else {
      lines.push('1. \n2. \n3. ');
    }
    return lines.join('\n');
  }

  function copyPlain(text) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      toast(ok ? '已复制周报' : '复制失败，请手动选中复制');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('已复制周报'); }, fallback);
    } else fallback();
  }

  function weeklyBlock() {
    if (!isPlainObj(state.weekly)) normalizeCoach(state);
    var anchor = isDateStr(state.settings.reviewWeek) ? state.settings.reviewWeek : weekStartISO(today());
    var st = weekStats(anchor);
    var key = st.weekKey;
    var rec = weeklyRecord(key);
    var isNow = weekStartISO(today()) === st.from;
    var prevKeys = Object.keys(state.weekly || {}).filter(function (k) { return k < key; }).sort();
    var prevOkr = null;
    if (prevKeys.length) prevOkr = clamp(Number(state.weekly[prevKeys[prevKeys.length - 1]].okrPct) || 0, 0, 100);

    var sec = document.createElement('section');
    sec.className = 'wk-card reveal';
    sec.innerHTML =
      '<div class="section-head"><h2>周复盘</h2><p>本周数据自动汇总，四栏手填后一键生成可复制的纯文本周报</p></div>' +
      '<div class="wk-week">' +
      '<button class="icon-btn" type="button" data-wk-nav="-1" aria-label="上一周">' + icon('chevronLeft') + '</button>' +
      '<span>' + esc(st.weekKey) + ' · ' + st.from + ' → ' + st.to + (isNow ? ' · 本周' : '') + '</span>' +
      '<button class="icon-btn" type="button" data-wk-nav="1" aria-label="下一周"' + (isNow ? ' disabled' : '') + '>' + icon('chevronRight') + '</button>' +
      '</div>' +
      '<div class="wk-auto">' +
      '<div class="wk-stat"><span>任务完成</span><b>' + st.taskDone + '<small>/' + st.taskTotal + '</small></b><i><em style="width:' + st.taskRate + '%"></em></i><u>' + st.taskRate + '%</u></div>' +
      '<div class="wk-stat"><span>习惯达成</span><b>' + st.habitDone + '<small>/' + st.habitGoal + '</small></b><i><em style="width:' + st.habitRate + '%"></em></i><u>' + st.habitRate + '%</u></div>' +
      '<div class="wk-stat"><span>三件事</span><b>' + st.mitDone + '<small>/' + st.mitTotal + '</small></b><i><em style="width:' +
      (st.mitTotal ? Math.round(st.mitDone / st.mitTotal * 100) : 0) + '%"></em></i><u>' +
      (st.mitTotal ? Math.round(st.mitDone / st.mitTotal * 100) : 0) + '%</u></div>' +
      '<div class="wk-stat"><span>OKR 进度</span><b>' + st.okrPct + '<small>%</small></b><i><em style="width:' + st.okrPct + '%"></em></i><u>' +
      (prevOkr == null ? '首次' : (st.okrPct - prevOkr >= 0 ? '+' : '') + (st.okrPct - prevOkr) + ' pt') + '</u></div>' +
      '</div>' +
      '<div class="wk-fields">' +
      '<label class="wk-field"><span>本周高光</span>' +
      '<textarea class="field ta" data-wk-f="highlight" rows="3" placeholder="这周最值得记下的一件事">' + esc(rec.fields.highlight) + '</textarea></label>' +
      '<label class="wk-field"><span>卡点</span>' +
      '<textarea class="field ta" data-wk-f="blocker" rows="3" placeholder="哪一步卡住了，为什么">' + esc(rec.fields.blocker) + '</textarea></label>' +
      '<label class="wk-field"><span>学到什么</span>' +
      '<textarea class="field ta" data-wk-f="learn" rows="3" placeholder="一个以后能复用的判断">' + esc(rec.fields.learn) + '</textarea></label>' +
      '<label class="wk-field"><span>下周三件事</span>' +
      '<textarea class="field ta" data-wk-f="next" rows="3" placeholder="一行一件，最多三件">' + esc(rec.fields.next) + '</textarea></label>' +
      '</div>' +
      '<div class="wk-actions">' +
      '<button class="solid-btn tiny" type="button" data-wk-save>保存复盘</button>' +
      '<button class="ghost-btn tiny" type="button" data-wk-report>生成周报</button>' +
      '<button class="ghost-btn tiny" type="button" data-wk-hist>历史复盘 · ' + Object.keys(state.weekly || {}).length + '</button>' +
      '<span class="wk-saved" data-wk-saved>' + (rec.savedAt ? '上次保存 ' + esc(rec.savedAt) : '尚未保存') + '</span>' +
      '</div>';

    var form = {};
    $$('[data-wk-f]', sec).forEach(function (ta) {
      form[ta.dataset.wkF] = ta;
      ta.addEventListener('input', function () {
        rec.fields[ta.dataset.wkF] = ta.value;
        var sv = $('[data-wk-saved]', sec);
        if (sv) sv.textContent = '编辑中…';
      });
      ta.addEventListener('blur', function () {
        rec.fields[ta.dataset.wkF] = ta.value;
        rec.savedAt = today();
        rec.okrPct = st.okrPct;
        save();
        var sv = $('[data-wk-saved]', sec);
        if (sv) sv.textContent = '已自动保存 · ' + today();
      });
    });

    $$('[data-wk-nav]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        var next = shiftISO(st.from, Number(b.dataset.wkNav) * 7);
        if (weekStartISO(next) > weekStartISO(today())) return;
        state.settings.reviewWeek = next;
        save();
        renderPage();
      });
    });

    var sb = $('[data-wk-save]', sec);
    if (sb) sb.addEventListener('click', function () {
      Object.keys(form).forEach(function (k) { rec.fields[k] = form[k].value; });
      rec.savedAt = today();
      rec.okrPct = st.okrPct;
      save();
      var sv = $('[data-wk-saved]', sec);
      if (sv) sv.textContent = '已保存 · ' + today();
      toast('周复盘已保存');
    });

    var rb = $('[data-wk-report]', sec);
    if (rb) rb.addEventListener('click', function () {
      Object.keys(form).forEach(function (k) { rec.fields[k] = form[k].value; });
      rec.savedAt = today();
      rec.okrPct = st.okrPct;
      save();
      var text = weekReportText(st, rec, prevOkr);
      openDialog(
        '<h3>本周周报</h3>' +
        '<p class="sub">纯文本，可直接粘贴到任意笔记或群里。</p>' +
        '<textarea class="field ta wk-pre" data-report readonly rows="14" style="width:100%">' + esc(text) + '</textarea>' +
        '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button>' +
        '<button class="solid-btn" data-copy>复制全文</button></div>',
        function (sheet, close) {
          $('[data-close]', sheet).addEventListener('click', close);
          var ta = $('[data-report]', sheet);
          $('[data-copy]', sheet).addEventListener('click', function () { copyPlain(text); });
          setTimeout(function () { try { ta.focus(); ta.select(); } catch (e) { } }, 80);
        }
      );
    });

    var hb = $('[data-wk-hist]', sec);
    if (hb) hb.addEventListener('click', function () {
      var keys = Object.keys(state.weekly || {}).sort().reverse();
      if (!keys.length) { toast('还没有保存过复盘'); return; }
      openDialog(
        '<h3>历史复盘</h3><p class="sub">点开任意一周，可回看当时的自动数据与手填内容。</p>' +
        '<div class="hist-list">' + keys.map(function (k) {
          var r = state.weekly[k];
          var f = r.fields || {};
          var has = (f.highlight || f.blocker || f.learn || f.next) ? '已填写' : '仅自动数据';
          return '<button class="hist-row hist-btn" type="button" data-hist="' + esc(k) + '">' +
            '<span>' + esc(k) + '<small>' + esc(r.savedAt || '—') + ' · ' + has + '</small></span>' +
            '<b>' + (Number(r.okrPct) || 0) + '%</b></button>';
        }).join('') + '</div>' +
        '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button></div>',
        function (sheet, close) {
          $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
          $$('[data-hist]', sheet).forEach(function (b) {
            b.addEventListener('click', function () {
              var k2 = b.dataset.hist;
              var r2 = state.weekly[k2];
              var anchor2 = weekKeyToDate(k2);
              var st2 = weekStats(anchor2);
              var pKeys = Object.keys(state.weekly || {}).filter(function (x) { return x < k2; }).sort();
              var pOkr2 = pKeys.length ? clamp(Number(state.weekly[pKeys[pKeys.length - 1]].okrPct) || 0, 0, 100) : null;
              openDialog(
                '<h3>' + esc(k2) + ' 复盘</h3>' +
                '<p class="sub">' + st2.from + ' → ' + st2.to + (r2.savedAt ? ' · 保存于 ' + esc(r2.savedAt) : '') + '</p>' +
                '<textarea class="field ta wk-pre" readonly rows="16" style="width:100%">' +
                esc(weekReportText(st2, r2, pOkr2)) + '</textarea>' +
                '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button>' +
                '<button class="solid-btn" data-copy2>复制</button></div>',
                function (sheet2, close2) {
                  $('[data-close]', sheet2).addEventListener('click', close2);
                  var txt = weekReportText(st2, r2, pOkr2);
                  $('[data-copy2]', sheet2).addEventListener('click', function () { copyPlain(txt); });
                }
              );
            });
          });
        }
      );
    });

    return sec;
  }

  /* ISO 周键 → 那一周的周一 */
  function weekKeyToDate(key) {
    var m = /^(\d{4})-W(\d{2})$/.exec(String(key || ''));
    if (!m) return weekStartISO(today());
    var y = Number(m[1]), w = Number(m[2]);
    var jan4 = new Date(y, 0, 4);
    var monday = shiftISO(iso(jan4), -((jan4.getDay() + 6) % 7));
    return shiftISO(monday, (w - 1) * 7);
  }

  /* =========================================================
     五、心情与精力：每日双打分 + 近 30 天双曲线
     ========================================================= */
  var MOOD_SCALE = [
    { v: 1, t: '很低' }, { v: 2, t: '偏低' }, { v: 3, t: '一般' }, { v: 4, t: '不错' }, { v: 5, t: '很好' }
  ];
  var ENERGY_SCALE = [
    { v: 1, t: '耗尽' }, { v: 2, t: '偏低' }, { v: 3, t: '够用' }, { v: 4, t: '充沛' }, { v: 5, t: '满格' }
  ];

  function moodOf(key) {
    if (!isPlainObj(state.mood)) state.mood = {};
    var r = state.mood[key];
    if (!isPlainObj(r)) r = state.mood[key] = { mood: 0, energy: 0, note: '' };
    return r;
  }

  function moodSeries(days) {
    var out = [];
    for (var i = days - 1; i >= 0; i--) {
      var k = shiftISO(today(), -i);
      var r = state.mood[k] || {};
      out.push({ key: k, mood: Number(r.mood) || 0, energy: Number(r.energy) || 0 });
    }
    return out;
  }

  function linePath(data, getV, x0, w, yTop, h) {
    /* 只连有值的相邻点，缺数据自然断开 */
    var seg = [], paths = [];
    data.forEach(function (d, i) {
      var v = getV(d);
      if (!v) { if (seg.length) { paths.push(seg); seg = []; } return; }
      var x = x0 + (data.length > 1 ? i * (w / (data.length - 1)) : w / 2);
      var y = yTop + h - ((v - 1) / 4) * h;
      seg.push([x, y]);
    });
    if (seg.length) paths.push(seg);
    return paths.map(function (p) {
      if (p.length === 1) return 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1) + 'L' + (p[0][0] + 0.1).toFixed(1) + ' ' + p[0][1].toFixed(1);
      return 'M' + p.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('L');
    }).join(' ');
  }

  function moodSVG(days) {
    var data = moodSeries(days);
    var W = 560, H = 150, x0 = 26, w = W - 52, yTop = 14, h = H - 34;
    var grid = [1, 2, 3, 4, 5].map(function (v) {
      var y = yTop + h - ((v - 1) / 4) * h;
      return '<line class="mood-grid' + (v === 3 ? ' mid' : '') + '" x1="' + x0 + '" y1="' + y.toFixed(1) +
        '" x2="' + (x0 + w) + '" y2="' + y.toFixed(1) + '"></line>';
    }).join('');
    var dots = data.map(function (d, i) {
      if (!d.mood && !d.energy) return '';
      var x = x0 + (data.length > 1 ? i * (w / (data.length - 1)) : w / 2);
      var s = '';
      if (d.mood) s += '<circle class="dot-mood" cx="' + x.toFixed(1) + '" cy="' + (yTop + h - ((d.mood - 1) / 4) * h).toFixed(1) + '" r="2.2"></circle>';
      if (d.energy) s += '<circle class="dot-energy" cx="' + x.toFixed(1) + '" cy="' + (yTop + h - ((d.energy - 1) / 4) * h).toFixed(1) + '" r="2.2"></circle>';
      return s;
    }).join('');
    var xs = data.filter(function (d, i) { return i === 0 || i === data.length - 1; });
    var labels = xs.map(function (d, idx) {
      var x = idx === 0 ? x0 : x0 + w;
      var dt = parseISO(d.key);
      return '<text class="mood-axis" x="' + x + '" y="' + (H - 4) + '" text-anchor="' + (idx === 0 ? 'start' : 'end') + '">' +
        (dt.getMonth() + 1) + '/' + dt.getDate() + '</text>';
    }).join('');
    return '<svg class="mood-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="近 ' + days + ' 天心情与精力曲线">' +
      grid +
      '<path class="line-mood" d="' + linePath(data, function (d) { return d.mood; }, x0, w, yTop, h) + '"></path>' +
      '<path class="line-energy" d="' + linePath(data, function (d) { return d.energy; }, x0, w, yTop, h) + '"></path>' +
      dots + labels + '</svg>';
  }

  function moodStats(days) {
    var data = moodSeries(days).filter(function (d) { return d.mood || d.energy; });
    if (!data.length) return { mv: 0, ev: 0, low: null, n: 0 };
    var ms = data.filter(function (d) { return d.mood; });
    var es = data.filter(function (d) { return d.energy; });
    var mv = ms.length ? ms.reduce(function (a, d) { return a + d.mood; }, 0) / ms.length : 0;
    var ev = es.length ? es.reduce(function (a, d) { return a + d.energy; }, 0) / es.length : 0;
    var low = null;
    ms.forEach(function (d) { if (!low || d.mood < low.mood) low = d; });
    return { mv: mv, ev: ev, low: low, n: data.length };
  }

  function moodBlock() {
    var key = today();
    var sec = document.createElement('section');
    sec.className = 'mood-card reveal';

    function chips(field, scale, rec) {
      return scale.map(function (s) {
        return '<button class="md-chip' + (Number(rec[field]) === s.v ? ' active' : '') + '" type="button" data-md="' +
          field + '" data-v="' + s.v + '" aria-label="' + esc(s.t) + ' ' + s.v + ' 分">' +
          '<b>' + s.v + '</b><small>' + s.t + '</small></button>';
      }).join('');
    }

    function paint() {
      var rec = moodOf(key);
      var stt = moodStats(30);
      sec.innerHTML =
        '<div class="section-head"><h2>心情与精力</h2><p>每天两个 1 – 5 打分，一句话备忘；下面看近 30 天的走势</p></div>' +
        '<div class="mood-body">' +
        '<div class="mood-today">' +
        '<div class="mood-row"><span class="mood-label">心情</span><div class="mood-chips">' + chips('mood', MOOD_SCALE, rec) + '</div></div>' +
        '<div class="mood-row"><span class="mood-label">精力</span><div class="mood-chips">' + chips('energy', ENERGY_SCALE, rec) + '</div></div>' +
        '<input class="field mood-note" data-mood-note maxlength="60" placeholder="一句话备忘（例如：会后有点虚，明天先写文档）" value="' + esc(rec.note || '') + '">' +
        '</div>' +
        '<div class="mood-chart">' +
        '<div class="mood-legend"><span class="lg-mood">心情</span><span class="lg-energy">精力</span>' +
        '<span class="mood-when">近 30 天 · 有记录 ' + stt.n + ' 天</span></div>' +
        moodSVG(30) +
        '<div class="mood-figures">' +
        '<div><span>心情均值</span><b>' + (stt.mv ? stt.mv.toFixed(1) : '—') + '</b></div>' +
        '<div><span>精力均值</span><b>' + (stt.ev ? stt.ev.toFixed(1) : '—') + '</b></div>' +
        '<div><span>最低谷</span><b>' + (stt.low ? (parseISO(stt.low.key).getMonth() + 1) + '/' + parseISO(stt.low.key).getDate() + '（' + stt.low.mood + '）' : '—') + '</b></div>' +
        '</div>' +
        '</div>' +
        '</div>';

      $$('[data-md]', sec).forEach(function (b) {
        b.addEventListener('click', function () {
          var r = moodOf(key);
          var f = b.dataset.md, v = Number(b.dataset.v);
          r[f] = Number(r[f]) === v ? 0 : v;
          save();
          paint();
        });
      });
      var note = $('[data-mood-note]', sec);
      if (note) {
        var lazy = debounce(function () { save(); }, 300);
        note.addEventListener('input', function () {
          moodOf(key).note = note.value;
          lazy();
        });
        note.addEventListener('blur', function () { moodOf(key).note = note.value; save(); });
      }
    }

    paint();
    return sec;
  }

  /* =========================================================
     六、OKR 自动汇总与季度归档
     ========================================================= */
  function okrBlock() {
    var sec = document.createElement('section');
    sec.className = 'okr-card reveal';

    function paint() {
      var sum = okrSummary();
      var hist = (state.okrArchive || []).slice().sort(function (a, b) {
        return a.quarter < b.quarter ? 1 : (a.quarter > b.quarter ? -1 : 0);
      });
      var lastQ = hist[0] || null;

      sec.innerHTML =
        '<div class="section-head"><h2>目标汇总</h2><p>每个 KR 按当前值 / 目标值折算，目标内 KR 等权，多个目标再等权平均</p></div>' +
        '<div class="okr-body">' +
        '<div class="okr-total">' +
        '<span class="okr-num">' + sum.pct + '<small>%</small></span>' +
        '<span class="okr-cap">全部目标等权总进度 · ' + sum.objCount + ' 个目标 / ' + sum.krCount + ' 个 KR</span>' +
        '<span class="okr-bar"><i style="width:' + sum.pct + '%"></i></span>' +
        '<div class="okr-acts">' +
        '<button class="ghost-btn tiny" type="button" data-okr-arch>归档本季（' + esc(quarterKey(today())) + '）</button>' +
        '<button class="ghost-btn tiny" type="button" data-okr-hist>历史快照 · ' + hist.length + '</button>' +
        '</div>' +
        '</div>' +
        '<ul class="okr-list">' +
        (sum.objs.length ? sum.objs.map(function (o) {
          return '<li><span class="okr-o-title" title="' + esc(o.module || '') + '">' + esc(o.title) + '</span>' +
            '<span class="okr-o-bar"><i style="width:' + o.pct + '%"></i></span>' +
            '<b>' + o.pct + '%</b></li>';
        }).join('') : '<li class="okr-empty">还没有 OKR 模块，先在页面里加一个「OKR」模块。</li>') +
        '</ul>' +
        (lastQ ? '<p class="okr-lastq">上次归档：' + esc(lastQ.quarter) + ' 总进度 ' + lastQ.pct + '% · 当前较其 ' +
          (sum.pct - lastQ.pct >= 0 ? '+' : '') + (sum.pct - lastQ.pct) + ' pt</p>' : '') +
        '</div>';

      var arch = $('[data-okr-arch]', sec);
      if (arch) arch.addEventListener('click', function () {
        var s2 = okrSummary();
        if (!s2.objs.length) { toast('还没有目标可以归档'); return; }
        state.okrArchive = state.okrArchive || [];
        state.okrArchive.push({
          id: uid('oa'), at: today(), quarter: quarterKey(today()),
          pct: s2.pct,
          objs: s2.objs.map(function (o) { return { title: o.title, pct: o.pct }; })
        });
        save();
        paint();
        toast('已归档 ' + quarterKey(today()) + ' 快照');
      });

      var hb = $('[data-okr-hist]', sec);
      if (hb) hb.addEventListener('click', function () {
        var list = (state.okrArchive || []).slice().sort(function (a, b) { return a.quarter < b.quarter ? 1 : -1; });
        if (!list.length) { toast('还没有归档快照'); return; }
        openDialog(
          '<h3>OKR 历史快照</h3><p class="sub">按季度归档的目标进度，用来对照季度冲刺效果。</p>' +
          '<div class="hist-list">' + list.map(function (x, i) {
            var next = list[i + 1];
            var delta = next ? x.pct - next.pct : null;
            return '<div class="hist-row"><span>' + esc(x.quarter) + '<small>' + esc(x.at) + ' · ' + x.objs.length + ' 个目标</small></span>' +
              '<b>' + x.pct + '%<em class="' + (delta == null ? 'flat' : (delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat'))) + '">' +
              (delta == null ? '—' : (delta > 0 ? '+' + delta : String(delta))) + '</em></b></div>';
          }).join('') + '</div>' +
          '<div class="sheet-actions"><button class="ghost-btn" data-close>关闭</button></div>',
          function (sheet, close) {
            $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
          }
        );
      });
    }

    paint();
    return sec;
  }

  /* 时间轴里的逾期条目不篡改数据，只加轻标记 */
  (function () {
    var baseBind = renderers.timeline.bind;
    renderers.timeline.bind = function (body, card, m) {
      baseBind(body, card, m);
      var items = (m.data && m.data.items) || [];
      var t = today();
      $$('.tl-item[data-tl]', body).forEach(function (row) {
        var it = items.filter(function (x) { return x && x.id === row.dataset.tl; })[0];
        if (!it || it.done || !isDateStr(it.date) || it.date >= t) return;
        row.classList.add('is-overdue');
        var timeBtn = $('.tl-time', row);
        if (!timeBtn || $('.tl-od-tag', row)) return;
        var tag = document.createElement('span');
        tag.className = 'tl-od-tag';
        tag.textContent = '逾期 ' + (Number(it.date.slice(5, 7))) + '/' + (Number(it.date.slice(8, 10)));
        tag.title = '这条安排原定 ' + it.date + '，未完成；需要时可到「今日聚焦」一键顺延';
        row.insertBefore(tag, timeBtn.nextSibling);
      });
    };
  })();

  /* ---------------------------------------------------------
     启动
     --------------------------------------------------------- */
  function boot() {
    bindGlobal();
    bindNavFold();
    bindAuth();
    var sb = sbReadSession();
    var email = currentEmail();
    if (!email && sb && sb.email) {
      /* 只剩云端会话（例如本机登录记录被清）：恢复会话，保持刷新后仍登录 */
      email = normalizeEmail(sb.email);
      safeSet(SESSION_KEY, email);
    }
    if (email) {
      if (!readAccounts()[email]) {
        var acc = readAccounts();
        acc[email] = makeAuthRecord('*cloud*');
        writeAccounts(acc);
      }
      enterApp(email);
    } else {
      if (sb) sbWriteSession(null);
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
