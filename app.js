const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const money = (value) => `$${Number(value || 0).toFixed(2)}`;
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let inventorySeq = 1000;

function makeInventoryItem(base, source = 'inventory') {
  inventorySeq += 1;
  return {
    id: `${source}-${inventorySeq}`,
    name: base.name,
    value: Number(base.value),
    rarity: base.rarity || '#54d8ff',
    collection: base.collection || 'Jungle Drop',
    type: base.type || 'skin',
    source,
    locked: false,
  };
}

const cases = [
  {
    id: 'banana-blitz',
    name: 'Banana Blitz Case',
    short: 'BB',
    price: 2.49,
    rtp: 92,
    risk: 'low',
    valueScore: 8.7,
    volatility: 'Низкая',
    description: 'Быстрый кейс для частых открытий: много дешевых скинов, редкий шанс на яркий топ-дроп и понятный RTP.',
    audience: 'Новичкам и пользователям, которые хотят собрать пул для Banana Upgrade без большого риска.',
    bestDrop: 'AK-47 Neon Growl',
    bestPrice: 89,
    category: 'cheap',
    tags: ['Hot', 'Starter'],
    palette: ['#ffe063', '#41df74', '#54d8ff'],
    contents: [
      { name: 'P250 Jungle Mist', value: 1.2, rarity: '#55e880', collection: 'Banana Blitz' },
      { name: 'MAC-10 Lime Bite', value: 2.6, rarity: '#55e880', collection: 'Banana Blitz' },
      { name: 'M4A1 Banana Leaf', value: 8.4, rarity: '#54d8ff', collection: 'Banana Blitz' },
      { name: 'USP Coconut Fade', value: 12.7, rarity: '#bd8cff', collection: 'Banana Blitz' },
      { name: 'AK-47 Neon Growl', value: 89, rarity: '#ffdf52', collection: 'Banana Blitz' },
    ],
  },
  {
    id: 'coconut-crown',
    name: 'Coconut Crown Case',
    short: 'CC',
    price: 7.9,
    rtp: 94,
    risk: 'medium',
    valueScore: 9.1,
    volatility: 'Средняя',
    description: 'Премиальный состав с хорошей средней ценностью, сильными редкими предметами и мягкой просадкой.',
    audience: 'Для игроков, которые хотят баланс между стабильностью и шансом на дорогой предмет.',
    bestDrop: 'AWP Royal Coconut',
    bestPrice: 214,
    category: 'premium',
    tags: ['Premium', 'RTP 94'],
    palette: ['#e8c896', '#40df76', '#54d8ff'],
    contents: [
      { name: 'Glock Shell Stone', value: 3.8, rarity: '#55e880', collection: 'Coconut Crown' },
      { name: 'MP9 Coconut Milk', value: 6.2, rarity: '#54d8ff', collection: 'Coconut Crown' },
      { name: 'AK Crown Moss', value: 41, rarity: '#bd8cff', collection: 'Coconut Crown' },
      { name: 'M4 Palm Circuit', value: 68, rarity: '#ff9b3e', collection: 'Coconut Crown' },
      { name: 'AWP Royal Coconut', value: 214, rarity: '#ffdf52', collection: 'Coconut Crown' },
    ],
  },
  {
    id: 'mango-rush',
    name: 'Mango Rush Case',
    short: 'MR',
    price: 4.2,
    rtp: 91,
    risk: 'high',
    valueScore: 8.1,
    volatility: 'Высокая',
    description: 'Более рискованный кейс с большим разбросом: часто дает апгрейд-материал и иногда выбивает дорогой нож.',
    audience: 'Для охоты за редким дропом и хайролл-сценариев.',
    bestDrop: 'Karambit Mango Pulse',
    bestPrice: 355,
    category: 'risk',
    tags: ['High risk', 'Knife chance'],
    palette: ['#ff9b3e', '#ffd84f', '#ff6b7f'],
    contents: [
      { name: 'Five-Seven Mango Pop', value: 1.8, rarity: '#55e880', collection: 'Mango Rush' },
      { name: 'Famas Ripe Shot', value: 5.6, rarity: '#54d8ff', collection: 'Mango Rush' },
      { name: 'Desert Eagle Amber', value: 28, rarity: '#bd8cff', collection: 'Mango Rush' },
      { name: 'M4 Mango Circuit', value: 48, rarity: '#ff9b3e', collection: 'Mango Rush' },
      { name: 'Karambit Mango Pulse', value: 355, rarity: '#ffdf52', collection: 'Mango Rush' },
    ],
  },
  {
    id: 'monkey-moon',
    name: 'Monkey Moon Case',
    short: 'MM',
    price: 1.25,
    rtp: 88,
    risk: 'low',
    valueScore: 7.6,
    volatility: 'Низкая',
    description: 'Самый дешевый вход в джунгли: удобен для daily rewards, промокодов и быстрого наполнения инвентаря.',
    audience: 'Для бонусов, теста UX и мягкого старта.',
    bestDrop: 'USP Moon Banana',
    bestPrice: 48,
    category: 'cheap',
    tags: ['Daily', 'Low entry'],
    palette: ['#54d8ff', '#bd8cff', '#ffe063'],
    contents: [
      { name: 'Nova Lunar Leaf', value: 0.6, rarity: '#55e880', collection: 'Monkey Moon' },
      { name: 'P90 Blue Vine', value: 1.1, rarity: '#54d8ff', collection: 'Monkey Moon' },
      { name: 'Coins Pack', value: 2.5, rarity: '#55e880', collection: 'Monkey Moon' },
      { name: 'M4 Night Palm', value: 16, rarity: '#bd8cff', collection: 'Monkey Moon' },
      { name: 'USP Moon Banana', value: 48, rarity: '#ffdf52', collection: 'Monkey Moon' },
    ],
  },
  {
    id: 'jungle-myth',
    name: 'Jungle Myth Case',
    short: 'JM',
    price: 14.5,
    rtp: 93,
    risk: 'high',
    valueScore: 8.9,
    volatility: 'Очень высокая',
    description: 'Дорогой кейс с легендарным top drop. Высокий риск, зато самый сильный потенциал роста стоимости.',
    audience: 'Для хайроллеров, турниров и охоты за лидербордом.',
    bestDrop: 'Butterfly Jungle Fang',
    bestPrice: 780,
    category: 'premium',
    tags: ['Legend', 'High risk'],
    palette: ['#17382a', '#40df76', '#ff6b7f'],
    contents: [
      { name: 'Tec-9 Vine Rune', value: 4.4, rarity: '#55e880', collection: 'Jungle Myth' },
      { name: 'Galil Mythic Moss', value: 13, rarity: '#54d8ff', collection: 'Jungle Myth' },
      { name: 'AWP Ancient Grove', value: 92, rarity: '#bd8cff', collection: 'Jungle Myth' },
      { name: 'M4 Golden Root', value: 146, rarity: '#ff9b3e', collection: 'Jungle Myth' },
      { name: 'Butterfly Jungle Fang', value: 780, rarity: '#ffdf52', collection: 'Jungle Myth' },
    ],
  },
  {
    id: 'starter-vine',
    name: 'Starter Vine Case',
    short: 'SV',
    price: 0.75,
    rtp: 87,
    risk: 'low',
    valueScore: 7.3,
    volatility: 'Низкая',
    description: 'Welcome-кейс для промокодов и обучения: маленькая цена, быстрый результат, понятный состав.',
    audience: 'Для первого открытия, free open и daily бонуса.',
    bestDrop: 'Glock Green Hello',
    bestPrice: 24,
    category: 'cheap',
    tags: ['Welcome', 'Free open'],
    palette: ['#b7ff5a', '#40df76', '#e8c896'],
    contents: [
      { name: 'Dualies First Leaf', value: 0.3, rarity: '#55e880', collection: 'Starter Vine' },
      { name: 'MP7 Soft Moss', value: 0.8, rarity: '#55e880', collection: 'Starter Vine' },
      { name: 'Pearls Pack', value: 2, rarity: '#54d8ff', collection: 'Starter Vine' },
      { name: 'P250 Little Banana', value: 3.4, rarity: '#bd8cff', collection: 'Starter Vine' },
      { name: 'Glock Green Hello', value: 24, rarity: '#ffdf52', collection: 'Starter Vine' },
    ],
  },
];

const targetItems = [
  { id: 'target-m4-leaf', name: 'M4A1 Banana Leaf', value: 8.4, rarity: '#54d8ff', collection: 'Upgrade Targets' },
  { id: 'target-usp-coconut', name: 'USP Coconut Fade', value: 12.7, rarity: '#bd8cff', collection: 'Upgrade Targets' },
  { id: 'target-deagle-amber', name: 'Desert Eagle Amber', value: 28, rarity: '#bd8cff', collection: 'Upgrade Targets' },
  { id: 'target-ak-crown', name: 'AK Crown Moss', value: 41, rarity: '#bd8cff', collection: 'Upgrade Targets' },
  { id: 'target-m4-golden', name: 'M4 Golden Root', value: 146, rarity: '#ff9b3e', collection: 'Upgrade Targets' },
  { id: 'target-awp-coconut', name: 'AWP Royal Coconut', value: 214, rarity: '#ffdf52', collection: 'Upgrade Targets' },
  { id: 'target-karambit-mango', name: 'Karambit Mango Pulse', value: 355, rarity: '#ffdf52', collection: 'Upgrade Targets' },
  { id: 'target-butterfly-fang', name: 'Butterfly Jungle Fang', value: 780, rarity: '#ffdf52', collection: 'Upgrade Targets' },
];

const tournaments = [
  {
    id: 'daily-hunt',
    name: 'Ежедневная охота',
    subtitle: 'Открывай турнирные кейсы и набирай очки за ценность дропа.',
    prize: '$1 250',
    timer: '04:18:45',
    key: '$3',
    accent: '#ffe063',
    prizes: ['$450', '$250', '$150', '$75', '5 bonus keys'],
  },
  {
    id: 'ape-clash',
    name: 'Битва стаи',
    subtitle: 'Недельный турнир с командной динамикой и большим баннером победителей.',
    prize: '$8 900',
    timer: '2д 11ч',
    key: '$7',
    accent: '#54d8ff',
    prizes: ['$3 000', '$1 500', '$900', '$500', '10 upgrade tickets'],
  },
  {
    id: 'jungle-cup',
    name: 'Jungle Cup',
    subtitle: 'Главный турнир месяца с отдельным фоном, призами и leaderboard.',
    prize: '$25 000',
    timer: '18д 06ч',
    key: '$15',
    accent: '#ff6b7f',
    prizes: ['$10 000', '$5 000', '$2 500', '$1 000', 'Legend case pack'],
  },
];

const events = [
  {
    id: 'major',
    name: 'Major Jungle Event',
    date: '03.06–17.06',
    title: 'Major cases с усиленным leaderboard',
    description: 'Особые кейсы, временный RTP-display, боевой фон и награды за серию открытий.',
    cases: ['banana-blitz', 'mango-rush', 'jungle-myth'],
    accent: '#ff6b7f',
  },
  {
    id: 'banana-week',
    name: 'Banana Week',
    date: 'каждую пятницу',
    title: 'Бонусное колесо и free open streak',
    description: 'Заходи каждый день, собирай бананы, открывай daily case и получай промокоды.',
    cases: ['starter-vine', 'monkey-moon'],
    accent: '#ffd84f',
  },
];

const liveNames = ['MangoJack', 'LeafRider', 'CocoMax', 'SteamApe', 'VineKid', 'MoonDrop', 'PalmRex'];

const state = {
  isAuthed: true,
  user: {
    id: 'GJ-042-771',
    name: 'MangoJack',
    avatar: 'MJ',
    level: 17,
    profileUrl: 'https://gorilla-jungle.example/u/GJ-042-771',
    referralUrl: 'https://gorilla-jungle.example/r/MY-APES-771',
  },
  balance: 126.4,
  activeFilter: 'all',
  activeSort: 'popular',
  caseSearch: '',
  selectedQty: Object.fromEntries(cases.map(item => [item.id, 1])),
  favorites: new Set(['banana-blitz', 'coconut-crown']),
  inventory: [
    makeInventoryItem({ name: 'P250 Jungle Mist', value: 1.2, rarity: '#55e880', collection: 'Banana Blitz' }, 'seed'),
    makeInventoryItem({ name: 'MAC-10 Lime Bite', value: 2.6, rarity: '#55e880', collection: 'Banana Blitz' }, 'seed'),
    makeInventoryItem({ name: 'M4A1 Banana Leaf', value: 8.4, rarity: '#54d8ff', collection: 'Banana Blitz' }, 'seed'),
    makeInventoryItem({ name: 'USP Coconut Fade', value: 12.7, rarity: '#bd8cff', collection: 'Banana Blitz' }, 'seed'),
    makeInventoryItem({ name: 'Desert Eagle Amber', value: 28, rarity: '#bd8cff', collection: 'Mango Rush' }, 'seed'),
    makeInventoryItem({ name: 'AK Crown Moss', value: 41, rarity: '#bd8cff', collection: 'Coconut Crown' }, 'seed'),
    makeInventoryItem({ name: 'M4 Golden Root', value: 146, rarity: '#ff9b3e', collection: 'Jungle Myth' }, 'seed'),
  ],
  upgrade: {
    selectedIds: [],
    preset: 2,
    targetId: null,
    locked: false,
    result: null,
  },
  notifications: [
    { id: 'n-case', type: 'case', title: 'Доступен кейс', message: 'Banana Blitz Case открыт для quick open и multi-open.', unread: true, action: '#case:banana-blitz', cta: 'Открыть' },
    { id: 'n-prize', type: 'prize', title: 'Приз начислен', message: 'В инвентарь добавлен M4A1 Banana Leaf после последнего открытия.', unread: true, action: '#inventory', cta: 'Инвентарь' },
    { id: 'n-wheel', type: 'wheel', title: 'Бонусное колесо доступно', message: 'У тебя есть 2 попытки Fruit Wheel.', unread: true, action: 'wheel', cta: 'Крутить' },
    { id: 'n-promo', type: 'promo', title: 'Выдан промокод', message: 'Промокод BANANA-25 закреплен в Reward Hub.', unread: true, action: '#rewards', cta: 'Забрать' },
  ],
  rewards: [
    { id: 'welcome-case', title: 'Welcome Case', subtitle: 'Starter Vine free open', status: 'available', type: 'case', value: '$0.75', action: 'open-starter' },
    { id: 'fruit-wheel', title: 'Fruit Wheel', subtitle: '2 попытки бонусного колеса', status: 'available', type: 'wheel', value: '2 spins', action: 'wheel' },
    { id: 'promo-banana', title: 'Promo BANANA-25', subtitle: '+25% к следующему депозиту', status: 'available', type: 'promo', value: '+25%', action: 'promo' },
    { id: 'daily-case', title: 'Daily Case', subtitle: 'Monkey Moon через streak', status: 'available', type: 'case', value: '$1.25', action: 'open-moon' },
  ],
  fruitAttempts: 2,
  fruitSpinning: false,
  stats: {
    caseOpens: 31,
    caseValue: 388.75,
    upgradeRuns: 9,
    upgradeWins: 4,
    upgradeLosses: 5,
    upgradeValue: 226.4,
    wheelSpins: 6,
    tournamentPoints: 12450,
    referrals: 8,
  },
  lastOpenedItems: [],
};

const api = {
  upgrade(snapshot) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roll = Math.random() * 100;
        resolve({
          success: roll <= snapshot.chance,
          roll,
          snapshot,
          serverTime: new Date().toISOString(),
        });
      }, 1450);
    });
  },
  grantReward(reward) {
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true, reward }), 420));
  },
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  renderHeader();
  renderLiveFeed();
  bindGlobalEvents();
  if (!location.hash) {
    history.replaceState(null, '', '#dashboard');
  }
  renderApp();
  setInterval(addLiveItem, 4200);
}

function bindGlobalEvents() {
  window.addEventListener('hashchange', renderApp);

  document.addEventListener('click', (event) => {
    const actionEl = event.target.closest('[data-action]');
    if (actionEl) {
      event.preventDefault();
      handleAction(actionEl.dataset.action, actionEl);
      return;
    }

    const panel = $('#notificationPanel');
    const button = $('#notificationBtn');
    if (panel && button && !panel.contains(event.target) && !button.contains(event.target)) {
      panel.classList.add('is-hidden');
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'caseSearch') {
      state.caseSearch = event.target.value.trim().toLowerCase();
      renderApp(false);
    }
    if (event.target.id === 'depositAmount') {
      renderDepositCalc();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  $('#notificationBtn').addEventListener('click', () => {
    $('#notificationPanel').classList.toggle('is-hidden');
    renderNotifications();
  });
  $('#markAllReadBtn').addEventListener('click', () => {
    state.notifications.forEach(item => { item.unread = false; });
    renderHeader();
    renderNotifications();
  });
  $('#rewardHubBtn').addEventListener('click', () => navigate('#rewards'));
  $('#topupBtn').addEventListener('click', () => openDepositModal());
  $('#profileBtn').addEventListener('click', () => navigate('#profile'));
}

function parseRoute() {
  const raw = decodeURIComponent(location.hash.replace(/^#/, '') || 'dashboard');
  const [name, param] = raw.split(':');
  return { name, param, raw };
}

function navigate(hash) {
  if (location.hash === hash) {
    renderApp();
    return;
  }
  location.hash = hash;
}

function renderApp(shouldScroll = true) {
  const route = parseRoute();
  const view = $('#appView');
  const pages = {
    dashboard: renderDashboardPage,
    cases: renderCasesPage,
    case: () => renderCaseDetailPage(route.param),
    upgrade: renderUpgradePage,
    inventory: renderInventoryPage,
    rewards: renderRewardsPage,
    profile: renderProfilePage,
    referrals: renderReferralsPage,
    tournaments: renderTournamentsPage,
    events: renderEventsPage,
    event: () => renderEventDetailPage(route.param),
  };
  view.innerHTML = (pages[route.name] || renderDashboardPage)();
  updateActiveNav(route.name);
  renderHeader();
  if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNav(routeName) {
  const active = routeName === 'case' ? 'cases' : routeName === 'event' ? 'events' : routeName;
  $$('[data-route-link]').forEach(link => {
    link.classList.toggle('active', link.dataset.routeLink === active);
  });
}

function renderHeader() {
  $('#balanceValue').textContent = money(state.balance);
  $('#profileBtn').textContent = state.user.avatar;
  const unread = state.notifications.filter(item => item.unread).length;
  $('#notifyBadge').textContent = unread;
  $('#notifyBadge').classList.toggle('is-empty', unread === 0);
  renderNotifications();
}

function renderNotifications() {
  const root = $('#notificationList');
  if (!root) return;
  root.innerHTML = state.notifications.length
    ? state.notifications.map(item => `
      <button class="notification-item ${item.unread ? 'unread' : ''}" data-action="notification-open" data-id="${item.id}" type="button">
        <span class="notification-icon ${item.type}">${notificationIcon(item.type)}</span>
        <span>
          <b>${item.title}</b>
          <small>${item.message}</small>
        </span>
        <em>${item.cta}</em>
      </button>
    `).join('')
    : '<div class="empty-state small">Новых уведомлений нет.</div>';
}

function notificationIcon(type) {
  return ({ case: 'C', prize: 'P', wheel: 'W', promo: '%', upgrade: 'U', tournament: 'T' }[type] || '!');
}

function notify(type, title, message, action = '#rewards', cta = 'Открыть') {
  const id = `n-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  state.notifications.unshift({ id, type, title, message, unread: true, action, cta });
  renderHeader();
  toast(title, message);
}

function renderLiveFeed() {
  $('#liveFeed').innerHTML = Array.from({ length: 8 }, () => liveItemTemplate()).join('');
}

function addLiveItem() {
  const feed = $('#liveFeed');
  if (!feed) return;
  feed.insertAdjacentHTML('afterbegin', liveItemTemplate());
  if (feed.children.length > 12) feed.lastElementChild.remove();
}

function liveItemTemplate() {
  const caseItem = randomFrom(cases);
  const drop = randomFrom(caseItem.contents);
  return `
    <button class="live-item" data-action="case-detail" data-case-id="${caseItem.id}" type="button" style="--case-a:${caseItem.palette[0]};--case-b:${caseItem.palette[1]};--rarity:${drop.rarity}">
      <span class="case-shot"><span>${caseItem.short}</span></span>
      <span class="live-copy">
        <b>${randomFrom(liveNames)} получил ${drop.name}</b>
        <small>${caseItem.name} · ${money(drop.value)} · перейти к кейсу</small>
      </span>
    </button>
  `;
}

function handleAction(action, el) {
  const caseId = el.dataset.caseId;
  const itemId = el.dataset.itemId;
  const rewardId = el.dataset.rewardId;
  const targetId = el.dataset.targetId;
  const fromModal = Boolean(el.closest('.modal'));

  if (action === 'navigate') {
    if (fromModal) closeModal();
    navigate(el.dataset.to);
    return;
  }
  if (action === 'case-detail') {
    if (fromModal) closeModal();
    navigate(`#case:${caseId}`);
    return;
  }
  if (action === 'case-open') openCase(caseId, { quick: false });
  if (action === 'case-quick') openCase(caseId, { quick: true });
  if (action === 'case-free') openCase(caseId, { free: true, quick: true });
  if (action === 'favorite-case') toggleFavorite(caseId);
  if (action === 'set-qty') {
    state.selectedQty[caseId] = Number(el.dataset.qty);
    renderApp(false);
  }
  if (action === 'set-filter') {
    state.activeFilter = el.dataset.filter;
    renderApp(false);
  }
  if (action === 'set-sort') {
    state.activeSort = el.dataset.sort;
    renderApp(false);
  }
  if (action === 'quick-upgrade') quickUpgrade(itemId);
  if (action === 'item-detail') openItemDetail(itemId);
  if (action === 'toggle-upgrade-item') toggleUpgradeItem(itemId);
  if (action === 'remove-upgrade-item') removeUpgradeItem(itemId);
  if (action === 'set-preset') setUpgradePreset(Number(el.dataset.preset));
  if (action === 'select-target') selectUpgradeTarget(targetId);
  if (action === 'start-upgrade') startUpgrade();
  if (action === 'reset-upgrade') resetUpgrade();
  if (action === 'upgrade-how') openUpgradeInfoModal();
  if (action === 'notification-open') openNotification(el.dataset.id);
  if (action === 'claim-reward') claimReward(rewardId);
  if (action === 'open-wheel') openFruitWheelModal();
  if (action === 'deposit') openDepositModal();
  if (action === 'deposit-submit') submitDeposit();
  if (action === 'copy-ref') copyReferral();
  if (action === 'tournament-detail') openTournamentModal(el.dataset.tournamentId);
  if (action === 'event-detail') navigate(`#event:${el.dataset.eventId}`);
  if (action === 'close-modal') closeModal();
  if (action === 'repeat-open') openCase(caseId, { quick: true });
}

function renderDashboardPage() {
  const bestCase = cases.find(item => item.id === 'banana-blitz');
  return `
    <section class="page-section dashboard-hero">
      <div class="hero-copy">
        <span class="eyebrow">Jungle control room</span>
        <h1>Кейсы, апгрейд, бонусы и турниры в одном игровом кабинете.</h1>
        <p>Главный экран сразу ведет в рабочие сценарии: открыть кейс, улучшить дроп, забрать reward, проверить турниры и перейти в ЛК.</p>
        <div class="hero-actions">
          <button class="button primary xl" data-action="case-detail" data-case-id="${bestCase.id}" type="button">Открыть Banana Blitz</button>
          <button class="button secondary xl" data-action="navigate" data-to="#upgrade" type="button">Banana Upgrade</button>
          <button class="button ghost xl" data-action="navigate" data-to="#rewards" type="button">Reward Hub</button>
        </div>
      </div>
      <div class="hero-stage">
        <div class="ape-hero">
          <span class="ape-ear left"></span>
          <span class="ape-ear right"></span>
          <span class="ape-face"></span>
          <span class="ape-eye left"></span>
          <span class="ape-eye right"></span>
          <span class="ape-mouth"></span>
        </div>
        <div class="banana-stack">
          ${Array.from({ length: 8 }, (_, index) => `<span class="banana-token" style="--i:${index}"></span>`).join('')}
        </div>
        <div class="floating-case-card">
          <span>${bestCase.short}</span>
          <b>${money(bestCase.price)}</b>
        </div>
      </div>
    </section>

    <section class="page-section action-grid">
      ${dashboardAction('cases', 'Кейсы', 'RTP, риски, ценность и состав каждого кейса.', '#cases')}
      ${dashboardAction('upgrade', 'Banana Upgrade', '1–10 предметов, пресеты x1.2–x10 и целевой дроп.', '#upgrade')}
      ${dashboardAction('rewards', 'Reward Hub', 'Кейсы, колесо, призы и промокоды доступны в одном центре.', '#rewards')}
      ${dashboardAction('profile', 'Личный кабинет', 'ID, URL профиля, статистика и реферальная система.', '#profile')}
    </section>

    <section class="page-section split">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">available now</span>
            <h2>Уведомления пользователя</h2>
          </div>
          <button class="button ghost" data-action="navigate" data-to="#rewards" type="button">Все бонусы</button>
        </div>
        <div class="notice-grid">
          ${state.notifications.slice(0, 4).map(item => `
            <button class="notice-card ${item.unread ? 'unread' : ''}" data-action="notification-open" data-id="${item.id}" type="button">
              <span class="notification-icon ${item.type}">${notificationIcon(item.type)}</span>
              <b>${item.title}</b>
              <small>${item.message}</small>
            </button>
          `).join('')}
        </div>
      </article>

      <article class="panel event-panel">
        <span class="eyebrow">event major</span>
        <h2>Major Jungle Event</h2>
        <p>Особые кейсы, отдельный фон, лидерборд и призы за серию открытий.</p>
        <div class="event-metrics">
          <span><b>$25K</b> призов</span>
          <span><b>3</b> event cases</span>
          <span><b>17.06</b> финал</span>
        </div>
        <button class="button primary" data-action="event-detail" data-event-id="major" type="button">Смотреть ивент</button>
      </article>
    </section>
  `;
}

function dashboardAction(icon, title, text, to) {
  return `
    <button class="action-card" data-action="navigate" data-to="${to}" type="button">
      <span class="action-icon ${icon}"></span>
      <b>${title}</b>
      <small>${text}</small>
    </button>
  `;
}

function renderCasesPage() {
  const list = filteredCases();
  return `
    <section class="page-section page-title">
      <div>
        <span class="eyebrow">case catalog</span>
        <h1>Кейсы с RTP, ценностью и риском</h1>
        <p>Каждая карточка показывает цену, RTP, волатильность, лучший дроп и быстрые действия. Клик по live-ленте ведет сюда же, на конкретный кейс.</p>
      </div>
      <button class="button primary" data-action="deposit" type="button">Пополнить баланс</button>
    </section>

    <section class="page-section toolbar">
      <div class="segmented" role="group" aria-label="Фильтр кейсов">
        ${filterButton('all', 'Все')}
        ${filterButton('cheap', 'Дешевые')}
        ${filterButton('premium', 'Премиум')}
        ${filterButton('risk', 'High risk')}
        ${filterButton('favorite', 'Избранное')}
      </div>
      <div class="segmented" role="group" aria-label="Сортировка кейсов">
        ${sortButton('popular', 'Популярные')}
        ${sortButton('rtp', 'RTP')}
        ${sortButton('price', 'Цена')}
      </div>
      <label class="search-box">
        <span>⌕</span>
        <input id="caseSearch" value="${state.caseSearch}" placeholder="Найти кейс" autocomplete="off" />
      </label>
    </section>

    <section class="page-section case-grid">
      ${list.length ? list.map(renderCaseCard).join('') : '<div class="empty-state">Кейсы не найдены. Сбрось фильтр или измени поиск.</div>'}
    </section>
  `;
}

function filteredCases() {
  let list = [...cases];
  if (state.activeFilter !== 'all') {
    if (state.activeFilter === 'favorite') {
      list = list.filter(item => state.favorites.has(item.id));
    } else if (state.activeFilter === 'risk') {
      list = list.filter(item => item.risk === 'high');
    } else {
      list = list.filter(item => item.category === state.activeFilter);
    }
  }
  if (state.caseSearch) list = list.filter(item => item.name.toLowerCase().includes(state.caseSearch));
  if (state.activeSort === 'popular') list.sort((a, b) => b.bestPrice - a.bestPrice);
  if (state.activeSort === 'rtp') list.sort((a, b) => b.rtp - a.rtp);
  if (state.activeSort === 'price') list.sort((a, b) => a.price - b.price);
  return list;
}

function filterButton(filter, label) {
  return `<button class="${state.activeFilter === filter ? 'active' : ''}" data-action="set-filter" data-filter="${filter}" type="button">${label}</button>`;
}

function sortButton(sort, label) {
  return `<button class="${state.activeSort === sort ? 'active' : ''}" data-action="set-sort" data-sort="${sort}" type="button">${label}</button>`;
}

function renderCaseCard(caseItem) {
  const qty = state.selectedQty[caseItem.id] || 1;
  const isFavorite = state.favorites.has(caseItem.id);
  return `
    <article class="case-card" style="--case-a:${caseItem.palette[0]};--case-b:${caseItem.palette[1]};--case-c:${caseItem.palette[2]}">
      <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-action="favorite-case" data-case-id="${caseItem.id}" type="button" aria-label="Избранное">♥</button>
      <button class="case-visual" data-action="case-detail" data-case-id="${caseItem.id}" type="button">
        <span class="case-box"><span>${caseItem.short}</span></span>
      </button>
      <div class="case-tags">${caseItem.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <h3>${caseItem.name}</h3>
      <p>${caseItem.description}</p>
      <div class="metric-grid">
        <span><small>Цена</small><b>${money(caseItem.price)}</b></span>
        <span><small>RTP</small><b>${caseItem.rtp}%</b></span>
        <span><small>Ценность</small><b>${caseItem.valueScore}/10</b></span>
        <span><small>Риск</small><b>${riskLabel(caseItem.risk)}</b></span>
      </div>
      <div class="best-line">Best drop: <b>${caseItem.bestDrop}</b> · ${money(caseItem.bestPrice)}</div>
      <div class="multi-row">
        <span>Multi</span>
        ${[1, 3, 5, 10].map(num => `<button class="${qty === num ? 'active' : ''}" data-action="set-qty" data-case-id="${caseItem.id}" data-qty="${num}" type="button">${num}x</button>`).join('')}
      </div>
      <div class="card-actions">
        <button class="button primary" data-action="case-open" data-case-id="${caseItem.id}" type="button">Открыть · ${money(caseItem.price * qty)}</button>
        <button class="icon-button" data-action="case-quick" data-case-id="${caseItem.id}" type="button" aria-label="Quick open">⚡</button>
        <button class="text-button" data-action="case-detail" data-case-id="${caseItem.id}" type="button">Описание, RTP и риски</button>
      </div>
    </article>
  `;
}

function riskLabel(risk) {
  return ({ low: 'Низкий', medium: 'Средний', high: 'Высокий' }[risk] || 'Средний');
}

function renderCaseDetailPage(caseId) {
  const caseItem = getCase(caseId);
  return `
    <section class="page-section case-detail-hero" style="--case-a:${caseItem.palette[0]};--case-b:${caseItem.palette[1]};--case-c:${caseItem.palette[2]}">
      <div>
        <span class="eyebrow">case detail</span>
        <h1>${caseItem.name}</h1>
        <p>${caseItem.description}</p>
        <div class="hero-actions">
          <button class="button primary xl" data-action="case-open" data-case-id="${caseItem.id}" type="button">Открыть кейс</button>
          <button class="button secondary xl" data-action="case-quick" data-case-id="${caseItem.id}" type="button">Quick open</button>
          <button class="button ghost xl" data-action="favorite-case" data-case-id="${caseItem.id}" type="button">${state.favorites.has(caseItem.id) ? 'В избранном' : 'В избранное'}</button>
        </div>
      </div>
      <div class="case-detail-art">
        <span class="case-box large"><span>${caseItem.short}</span></span>
        <div class="risk-meter ${caseItem.risk}">
          <b>${riskLabel(caseItem.risk)} риск</b>
          <small>${caseItem.volatility} волатильность</small>
        </div>
      </div>
    </section>

    <section class="page-section split">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">case economics</span>
            <h2>RTP, ценность и условия</h2>
          </div>
        </div>
        <div class="detail-metrics">
          <span><small>Цена открытия</small><b>${money(caseItem.price)}</b></span>
          <span><small>RTP</small><b>${caseItem.rtp}%</b></span>
          <span><small>Value score</small><b>${caseItem.valueScore}/10</b></span>
          <span><small>Best drop</small><b>${money(caseItem.bestPrice)}</b></span>
        </div>
        <p class="muted">${caseItem.audience}</p>
      </article>

      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">recent openings</span>
            <h2>Последние открытия</h2>
          </div>
        </div>
        <div class="top-list">
          ${Array.from({ length: 5 }, () => {
            const drop = randomFrom(caseItem.contents);
            return `<div class="top-item"><span class="rank">${caseItem.short}</span><span><b>${randomFrom(liveNames)} · ${drop.name}</b><small>${money(drop.value)} · только что</small></span><strong>${money(drop.value)}</strong></div>`;
          }).join('')}
        </div>
      </article>
    </section>

    <section class="page-section">
      <div class="section-head">
        <div>
          <span class="eyebrow">case content</span>
          <h2>Состав кейса</h2>
        </div>
      </div>
      <div class="item-grid">
        ${caseItem.contents.map(renderCatalogItem).join('')}
      </div>
    </section>
  `;
}

function renderCatalogItem(item) {
  return `
    <article class="item-card compact" style="--rarity:${item.rarity}">
      <span class="skin-thumb"></span>
      <b>${item.name}</b>
      <small>${item.collection}</small>
      <strong>${money(item.value)}</strong>
    </article>
  `;
}

function openCase(caseId, options = {}) {
  const caseItem = getCase(caseId);
  const qty = options.qty || state.selectedQty[caseId] || 1;
  const total = caseItem.price * qty;

  if (!options.free && state.balance < total) {
    openDepositModal({ caseId, total });
    return;
  }
  if (!options.free) {
    state.balance = Math.max(0, state.balance - total);
    renderHeader();
  }

  openModal(`
    <section class="modal wide opening-modal">
      ${modalHeader(`Открываем ${caseItem.name}`, `${qty}x · ${options.quick ? 'quick open' : 'normal roll'} · ${options.free ? 'free open' : `списано ${money(total)}`}`)}
      <div class="opening-stage" style="--case-a:${caseItem.palette[0]};--case-b:${caseItem.palette[1]}">
        <div class="reel-window">
          <span class="reel-pointer"></span>
          <div class="reel-track ${options.quick ? 'quick' : ''}">
            ${Array.from({ length: 20 }, () => {
              const item = randomFrom(caseItem.contents);
              return `<span class="reel-card" style="--rarity:${item.rarity}">${item.name}</span>`;
            }).join('')}
          </div>
        </div>
        <div class="loading-line"><span></span></div>
      </div>
      <div id="caseResultMount"></div>
    </section>
  `);

  setTimeout(() => finishCaseOpening(caseItem, qty), options.quick ? 780 : 1450);
}

function finishCaseOpening(caseItem, qty) {
  const mount = $('#caseResultMount');
  if (!mount || mount.dataset.ready) return;
  mount.dataset.ready = '1';
  const drops = Array.from({ length: qty }, () => makeInventoryItem(chooseDrop(caseItem), 'drop'));
  drops.forEach(item => state.inventory.unshift(item));
  state.lastOpenedItems = drops.map(item => item.id);
  const totalValue = drops.reduce((sum, item) => sum + item.value, 0);
  state.stats.caseOpens += qty;
  state.stats.caseValue += totalValue;
  notify('prize', 'Приз добавлен в инвентарь', `${drops[0].name}${drops.length > 1 ? ` и еще ${drops.length - 1}` : ''} · ${money(totalValue)}`, '#inventory', 'Инвентарь');
  mount.innerHTML = `
    <div class="result-summary">
      <b>${drops.length > 1 ? 'Открытие завершено' : `Выпал ${drops[0].name}`}</b>
      <span>Суммарная ценность: ${money(totalValue)}. Предметы уже доступны в инвентаре и Banana Upgrade.</span>
    </div>
    <div class="result-grid">
      ${drops.map(item => `
        <article class="item-card result" style="--rarity:${item.rarity}">
          <span class="skin-thumb"></span>
          <b>${item.name}</b>
          <small>${item.collection}</small>
          <strong>${money(item.value)}</strong>
          <button class="button secondary" data-action="quick-upgrade" data-item-id="${item.id}" type="button">Upgrade</button>
        </article>
      `).join('')}
    </div>
    <div class="modal-actions">
      <button class="button primary" data-action="repeat-open" data-case-id="${caseItem.id}" type="button">Открыть еще</button>
      <button class="button secondary" data-action="navigate" data-to="#inventory" type="button">Открыть инвентарь</button>
      <button class="button ghost" data-action="navigate" data-to="#upgrade" type="button">Banana Upgrade</button>
    </div>
  `;
}

function chooseDrop(caseItem) {
  const roll = Math.random();
  const pool = caseItem.contents;
  if (roll > 0.965) return pool.reduce((best, item) => item.value > best.value ? item : best, pool[0]);
  if (roll > 0.76) return randomFrom(pool.filter(item => item.value >= caseItem.price * 2));
  return randomFrom(pool.filter(item => item.value <= caseItem.price * 4));
}

function toggleFavorite(caseId) {
  const caseItem = getCase(caseId);
  if (state.favorites.has(caseId)) {
    state.favorites.delete(caseId);
    toast('Избранное обновлено', `${caseItem.name} убран из списка.`);
  } else {
    state.favorites.add(caseId);
    notify('case', 'Кейс сохранен', `${caseItem.name} добавлен в избранное.`, `#case:${caseId}`, 'Кейс');
  }
  renderApp(false);
}

function renderUpgradePage() {
  const calc = calculateUpgrade();
  const selected = selectedUpgradeItems();
  const targets = filteredUpgradeTargets(calc.inputValue);
  return `
    <section class="page-section upgrade-page">
      <div class="section-head">
        <div>
          <span class="eyebrow">banana upgrade</span>
          <h1>Апгрейд предметов через банановые слоты</h1>
          <p>Выбери от 1 до 10 предметов из инвентаря, зафиксируй цель через пресет или конкретный предмет, проверь шанс и запусти апгрейд.</p>
        </div>
        <button class="button ghost" data-action="upgrade-how" type="button">Как это работает?</button>
      </div>

      <div class="upgrade-presets">
        ${[1.2, 1.5, 2, 3, 5, 10].map(num => `<button class="${state.upgrade.preset === num ? 'active' : ''}" data-action="set-preset" data-preset="${num}" type="button">x${num}</button>`).join('')}
      </div>

      <div class="upgrade-layout">
        <aside class="upgrade-side">
          <div class="side-head">
            <b>Выбрано</b>
            <span>${selected.length}/10</span>
          </div>
          <div class="selected-list">
            ${selected.length ? selected.map(item => `
              <button class="selected-item" data-action="remove-upgrade-item" data-item-id="${item.id}" type="button" ${state.upgrade.locked ? 'disabled' : ''}>
                <span class="skin-dot" style="--rarity:${item.rarity}"></span>
                <span><b>${item.name}</b><small>${money(item.value)}</small></span>
                <em>×</em>
              </button>
            `).join('') : '<div class="empty-state small">Выбери предметы ниже или нажми Upgrade в инвентаре.</div>'}
          </div>
          <div class="upgrade-total">
            <span>Стоимость входа</span>
            <b>${money(calc.inputValue)}</b>
          </div>
        </aside>

        <section class="banana-stage ${calc.riskClass} ${state.upgrade.locked ? 'running' : ''}">
          <div class="banana-grid">
            ${renderBananaSlots(selected.length, calc.riskClass)}
          </div>
          <div class="chance-ring" style="--chance:${calc.chance}">
            <b>${calc.ready ? `${calc.chance.toFixed(1)}%` : '--'}</b>
            <span>шанс успеха</span>
          </div>
          ${state.upgrade.result ? renderUpgradeResult(state.upgrade.result) : ''}
        </section>

        <aside class="upgrade-side conditions">
          <div class="side-head">
            <b>Цель и условия</b>
            <span>${calc.multiplier ? `x${calc.multiplier.toFixed(2)}` : 'цель не выбрана'}</span>
          </div>
          ${calc.target ? `
            <article class="target-preview" style="--rarity:${calc.target.rarity}">
              <span class="skin-thumb"></span>
              <b>${calc.target.name}</b>
              <small>${calc.target.collection}</small>
              <strong>${money(calc.target.value)}</strong>
            </article>
          ` : '<div class="empty-state small">Выбери целевой предмет справа в каталоге ниже.</div>'}
          <div class="condition-list">
            <span><b>${selected.length}</b><small>предметов выбрано</small></span>
            <span><b>${money(calc.inputValue)}</b><small>общая сумма входа</small></span>
            <span><b>${calc.target ? money(calc.target.value) : '--'}</b><small>цена цели</small></span>
            <span><b>${calc.ready ? `${calc.chance.toFixed(1)}%` : '--'}</b><small>шанс успеха</small></span>
          </div>
          <p class="muted">В случае успеха ты получаешь целевой предмет. В случае неудачи выбранные предметы списываются.</p>
          <button class="button primary wide-btn" data-action="start-upgrade" type="button" ${calc.canStart ? '' : 'disabled'}>${state.upgrade.locked ? 'Апгрейд идет...' : 'Upgrade'}</button>
        </aside>
      </div>
    </section>

    <section class="page-section split upgrade-lists">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">inventory pool</span>
            <h2>Предметы для входа</h2>
          </div>
        </div>
        <div class="inventory-grid compact-grid">
          ${state.inventory.map(item => renderInventoryCard(item, { selectable: true })).join('')}
        </div>
      </article>

      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">target catalog</span>
            <h2>Целевые предметы</h2>
          </div>
        </div>
        <div class="target-grid">
          ${targets.map(item => renderTargetCard(item, calc.inputValue)).join('')}
        </div>
      </article>
    </section>
  `;
}

function selectedUpgradeItems() {
  return state.upgrade.selectedIds
    .map(id => state.inventory.find(item => item.id === id))
    .filter(Boolean);
}

function calculateUpgrade() {
  const selected = selectedUpgradeItems();
  const inputValue = selected.reduce((sum, item) => sum + item.value, 0);
  const target = targetItems.find(item => item.id === state.upgrade.targetId) || null;
  const multiplier = target && inputValue ? target.value / inputValue : 0;
  const chance = target && inputValue ? clamp((inputValue / target.value) * 92, 3, 88) : 0;
  const riskClass = !target ? 'idle' : chance > 55 ? 'low-risk' : chance > 25 ? 'mid-risk' : 'high-risk';
  const validTarget = target && target.value > inputValue && multiplier >= 1.1 && multiplier <= 10.5;
  const canStart = Boolean(selected.length >= 1 && validTarget && chance >= 3 && chance <= 88 && !state.upgrade.locked && selected.every(item => !item.locked));
  return { selected, inputValue, target, multiplier, chance, riskClass, validTarget, ready: Boolean(selected.length && target), canStart };
}

function filteredUpgradeTargets(inputValue) {
  if (!inputValue) return targetItems;
  const desired = inputValue * state.upgrade.preset;
  const band = targetItems.filter(item => item.value > inputValue && item.value >= desired * 0.72 && item.value <= desired * 1.65);
  return (band.length ? band : targetItems.filter(item => item.value > inputValue)).sort((a, b) => a.value - b.value);
}

function renderBananaSlots(count, riskClass) {
  return Array.from({ length: 10 }, (_, index) => `
    <span class="banana-slot ${index < count ? 'filled' : ''} ${riskClass}">
      <i></i>
    </span>
  `).join('');
}

function renderUpgradeResult(result) {
  if (result.success) {
    return `
      <div class="upgrade-result success">
        <b>Апгрейд успешен</b>
        <span>Ты получил ${result.target.name}</span>
        <div class="modal-actions center">
          <button class="button primary" data-action="navigate" data-to="#inventory" type="button">Забрать в инвентарь</button>
          <button class="button secondary" data-action="reset-upgrade" type="button">Повторить с новым набором</button>
        </div>
      </div>
    `;
  }
  return `
    <div class="upgrade-result fail">
      <b>Апгрейд не удался</b>
      <span>Выбранные предметы были использованы</span>
      <div class="modal-actions center">
        <button class="button primary" data-action="reset-upgrade" type="button">Попробовать снова</button>
        <button class="button ghost" data-action="navigate" data-to="#inventory" type="button">Перейти в инвентарь</button>
      </div>
    </div>
  `;
}

function renderTargetCard(item, inputValue) {
  const multiplier = inputValue ? item.value / inputValue : 0;
  const available = inputValue > 0 && item.value > inputValue && multiplier <= 10.5;
  const active = state.upgrade.targetId === item.id;
  return `
    <button class="target-card ${active ? 'active' : ''} ${available ? '' : 'disabled'}" data-action="select-target" data-target-id="${item.id}" type="button" ${available && !state.upgrade.locked ? '' : 'disabled'} style="--rarity:${item.rarity}">
      <span class="skin-thumb"></span>
      <b>${item.name}</b>
      <small>${money(item.value)}${inputValue ? ` · x${multiplier.toFixed(2)}` : ''}</small>
    </button>
  `;
}

function renderInventoryPage() {
  const total = state.inventory.reduce((sum, item) => sum + item.value, 0);
  return `
    <section class="page-section page-title">
      <div>
        <span class="eyebrow">inventory</span>
        <h1>Инвентарь пользователя</h1>
        <p>Предметы из кейсов и успешных апгрейдов доступны для быстрого Banana Upgrade прямо с карточки.</p>
      </div>
      <div class="title-metrics">
        <span><b>${state.inventory.length}</b><small>предметов</small></span>
        <span><b>${money(total)}</b><small>общая ценность</small></span>
      </div>
    </section>

    <section class="page-section inventory-grid">
      ${state.inventory.map(item => renderInventoryCard(item)).join('')}
    </section>
  `;
}

function renderInventoryCard(item, options = {}) {
  const selected = state.upgrade.selectedIds.includes(item.id);
  const selectable = Boolean(options.selectable);
  const disabled = state.upgrade.locked || item.locked || (!selected && state.upgrade.selectedIds.length >= 10);
  return `
    <article class="item-card ${selected ? 'selected' : ''} ${item.locked ? 'locked' : ''}" style="--rarity:${item.rarity}">
      <span class="skin-thumb"></span>
      <b>${item.name}</b>
      <small>${item.collection}</small>
      <strong>${money(item.value)}</strong>
      <div class="item-actions">
        ${selectable
          ? `<button class="button ${selected ? 'secondary' : 'ghost'}" data-action="toggle-upgrade-item" data-item-id="${item.id}" type="button" ${disabled ? 'disabled' : ''}>${selected ? 'Выбрано' : 'Выбрать'}</button>`
          : `<button class="button secondary" data-action="quick-upgrade" data-item-id="${item.id}" type="button">Upgrade</button>`}
        <button class="icon-button" data-action="item-detail" data-item-id="${item.id}" type="button" aria-label="Детали">i</button>
      </div>
    </article>
  `;
}

function toggleUpgradeItem(itemId) {
  if (state.upgrade.locked) return;
  const ids = state.upgrade.selectedIds;
  if (ids.includes(itemId)) {
    state.upgrade.selectedIds = ids.filter(id => id !== itemId);
  } else if (ids.length < 10) {
    const item = state.inventory.find(entry => entry.id === itemId);
    if (item && !item.locked) state.upgrade.selectedIds = [...ids, itemId];
  }
  state.upgrade.result = null;
  ensureTargetAfterSelection();
  renderApp(false);
}

function removeUpgradeItem(itemId) {
  if (state.upgrade.locked) return;
  state.upgrade.selectedIds = state.upgrade.selectedIds.filter(id => id !== itemId);
  state.upgrade.result = null;
  ensureTargetAfterSelection();
  renderApp(false);
}

function quickUpgrade(itemId) {
  const item = state.inventory.find(entry => entry.id === itemId);
  if (!item || item.locked) return;
  state.upgrade.selectedIds = [itemId];
  state.upgrade.targetId = null;
  state.upgrade.preset = 2;
  state.upgrade.result = null;
  ensureTargetAfterSelection();
  closeModal();
  navigate('#upgrade');
}

function setUpgradePreset(preset) {
  if (state.upgrade.locked) return;
  state.upgrade.preset = preset;
  state.upgrade.targetId = null;
  state.upgrade.result = null;
  ensureTargetAfterSelection();
  renderApp(false);
}

function selectUpgradeTarget(targetId) {
  if (state.upgrade.locked) return;
  state.upgrade.targetId = targetId;
  state.upgrade.result = null;
  renderApp(false);
}

function ensureTargetAfterSelection() {
  const calc = calculateUpgrade();
  if (!calc.inputValue) {
    state.upgrade.targetId = null;
    return;
  }
  const current = targetItems.find(item => item.id === state.upgrade.targetId);
  if (current && current.value > calc.inputValue) return;
  const next = filteredUpgradeTargets(calc.inputValue)[0];
  state.upgrade.targetId = next ? next.id : null;
}

function startUpgrade() {
  const calc = calculateUpgrade();
  if (!calc.canStart) return;

  const selectedIds = [...state.upgrade.selectedIds];
  const selected = selectedUpgradeItems();
  selected.forEach(item => { item.locked = true; });
  state.upgrade.locked = true;
  state.upgrade.result = null;
  renderApp(false);

  const snapshot = {
    inputIds: selectedIds,
    inputValue: calc.inputValue,
    target: calc.target,
    multiplier: calc.multiplier,
    chance: calc.chance,
    createdAt: new Date().toISOString(),
  };

  api.upgrade(snapshot).then((result) => {
    const selectedNow = snapshot.inputIds
      .map(id => state.inventory.find(item => item.id === id))
      .filter(Boolean);
    state.inventory = state.inventory.filter(item => !snapshot.inputIds.includes(item.id));
    selectedNow.forEach(item => { item.locked = false; });
    state.stats.upgradeRuns += 1;

    if (result.success) {
      const targetItem = makeInventoryItem(snapshot.target, 'upgrade');
      state.inventory.unshift(targetItem);
      state.stats.upgradeWins += 1;
      state.stats.upgradeValue += targetItem.value;
      notify('upgrade', 'Апгрейд успешен', `Ты получил ${targetItem.name} · ${money(targetItem.value)}`, '#inventory', 'Инвентарь');
      state.upgrade.result = { success: true, target: targetItem, chance: snapshot.chance };
    } else {
      state.stats.upgradeLosses += 1;
      notify('upgrade', 'Апгрейд не удался', `Списано ${selectedNow.length} предметов · шанс был ${snapshot.chance.toFixed(1)}%`, '#upgrade', 'Повторить');
      state.upgrade.result = { success: false, target: snapshot.target, chance: snapshot.chance };
    }

    state.upgrade.locked = false;
    state.upgrade.selectedIds = [];
    state.upgrade.targetId = null;
    renderApp(false);
  });
}

function resetUpgrade() {
  state.upgrade.selectedIds = [];
  state.upgrade.targetId = null;
  state.upgrade.locked = false;
  state.upgrade.result = null;
  renderApp(false);
}

function openUpgradeInfoModal() {
  openModal(`
    <section class="modal">
      ${modalHeader('Как работает Banana Upgrade', 'Механика фиксирует входной пул, цель, шанс и результат на серверной стороне.')}
      <div class="info-grid">
        <div class="info-card"><b>1. Выбор входа</b><span>От 1 до 10 предметов из инвентаря формируют общую стоимость.</span></div>
        <div class="info-card"><b>2. Цель</b><span>Выбирается через пресет x1.2–x10 или вручную из каталога.</span></div>
        <div class="info-card"><b>3. Шанс</b><span>Чем дороже цель относительно входа, тем ниже шанс успеха и тем опаснее бананы.</span></div>
        <div class="info-card"><b>4. Запуск</b><span>Предметы блокируются, snapshot сохраняется, повторный запуск невозможен.</span></div>
      </div>
    </section>
  `);
}

function openItemDetail(itemId) {
  const item = state.inventory.find(entry => entry.id === itemId);
  if (!item) return;
  openModal(`
    <section class="modal small">
      ${modalHeader(item.name, `${item.collection} · ${money(item.value)}`)}
      <article class="item-card result big" style="--rarity:${item.rarity}">
        <span class="skin-thumb"></span>
        <b>${item.name}</b>
        <small>Источник: ${item.source}</small>
        <strong>${money(item.value)}</strong>
      </article>
      <div class="modal-actions">
        <button class="button primary" data-action="quick-upgrade" data-item-id="${item.id}" type="button">Upgrade</button>
        <button class="button ghost" data-action="close-modal" type="button">Закрыть</button>
      </div>
    </section>
  `);
}

function renderRewardsPage() {
  return `
    <section class="page-section reward-hero">
      <div>
        <span class="eyebrow">reward hub</span>
        <h1>Все доступные бонусы пользователя</h1>
        <p>Здесь собраны кейсы, колесо, призы, промокоды и статусы выдачи. Уведомления ведут пользователя прямо к нужному действию.</p>
      </div>
      <div class="reward-orbit">
        <span class="reward-banana"></span>
        <span class="reward-case">SV</span>
      </div>
    </section>

    <section class="page-section reward-grid">
      ${state.rewards.map(renderRewardCard).join('')}
    </section>

    <section class="page-section split">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">notification center</span>
            <h2>История уведомлений</h2>
          </div>
        </div>
        <div class="notification-list inline">
          ${state.notifications.map(item => `
            <button class="notification-item ${item.unread ? 'unread' : ''}" data-action="notification-open" data-id="${item.id}" type="button">
              <span class="notification-icon ${item.type}">${notificationIcon(item.type)}</span>
              <span><b>${item.title}</b><small>${item.message}</small></span>
              <em>${item.cta}</em>
            </button>
          `).join('')}
        </div>
      </article>

      <article class="panel promo-panel">
        <span class="eyebrow">promo issued</span>
        <h2>BANANA-25</h2>
        <p>Промокод выдан пользователю и закреплен в Reward Hub. После активации можно сразу открыть депозитный модуль.</p>
        <button class="button primary" data-action="claim-reward" data-reward-id="promo-banana" type="button">Активировать промокод</button>
      </article>
    </section>
  `;
}

function renderRewardCard(reward) {
  return `
    <article class="reward-card ${reward.status}">
      <span class="reward-type ${reward.type}">${notificationIcon(reward.type)}</span>
      <b>${reward.title}</b>
      <small>${reward.subtitle}</small>
      <strong>${reward.value}</strong>
      <button class="button ${reward.status === 'available' ? 'primary' : 'ghost'}" data-action="claim-reward" data-reward-id="${reward.id}" type="button" ${reward.status === 'claimed' ? 'disabled' : ''}>${reward.status === 'available' ? 'Забрать' : 'Получено'}</button>
    </article>
  `;
}

function claimReward(rewardId) {
  const reward = state.rewards.find(item => item.id === rewardId);
  if (!reward || reward.status === 'claimed') return;
  api.grantReward(reward).then(() => {
    reward.status = 'claimed';
    if (reward.action === 'open-starter') openCase('starter-vine', { free: true, quick: true });
    if (reward.action === 'open-moon') openCase('monkey-moon', { free: true, quick: true });
    if (reward.action === 'wheel') openFruitWheelModal();
    if (reward.action === 'promo') openPromoModal();
    notify(reward.type, 'Бонус обработан', `${reward.title}: статус обновлен.`, '#rewards', 'Reward Hub');
    renderApp(false);
  });
}

function openPromoModal() {
  openModal(`
    <section class="modal small">
      ${modalHeader('Промокод активирован', 'BANANA-25 применится к следующему депозиту.')}
      <div class="promo-code">BANANA-25</div>
      <div class="modal-actions">
        <button class="button primary" data-action="deposit" type="button">Пополнить с бонусом</button>
        <button class="button ghost" data-action="close-modal" type="button">Закрыть</button>
      </div>
    </section>
  `);
}

function renderProfilePage() {
  const winRate = state.stats.upgradeRuns ? (state.stats.upgradeWins / state.stats.upgradeRuns) * 100 : 0;
  return `
    <section class="page-section profile-hero">
      <div class="profile-card-main">
        <span class="avatar-large">${state.user.avatar}</span>
        <div>
          <span class="eyebrow">personal cabinet</span>
          <h1>${state.user.name}</h1>
          <p>ID: ${state.user.id}</p>
          <div class="profile-links">
            <span>${state.user.profileUrl}</span>
            <button class="button ghost" data-action="copy-ref" type="button">Скопировать referral</button>
          </div>
        </div>
      </div>
      <div class="level-card">
        <b>Level ${state.user.level}</b>
        <span class="level-line"><i style="width:68%"></i></span>
        <small>До следующего уровня: 1 240 XP</small>
      </div>
    </section>

    <section class="page-section stats-grid">
      ${statCard('Кейсы', state.stats.caseOpens, `${money(state.stats.caseValue)} value`)}
      ${statCard('Upgrade', state.stats.upgradeRuns, `${winRate.toFixed(1)}% win rate`)}
      ${statCard('Колесо', state.stats.wheelSpins, `${state.fruitAttempts} попытки сейчас`)}
      ${statCard('Турниры', state.stats.tournamentPoints.toLocaleString('ru-RU'), 'лучший счет')}
    </section>

    <section class="page-section split">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">reward hub</span>
            <h2>Бонусы в ЛК</h2>
          </div>
          <button class="button secondary" data-action="navigate" data-to="#rewards" type="button">Перейти</button>
        </div>
        <div class="reward-mini-list">
          ${state.rewards.slice(0, 3).map(item => `<span><b>${item.title}</b><small>${item.status === 'available' ? 'доступен' : 'получен'}</small></span>`).join('')}
        </div>
      </article>

      <article class="panel referral-preview">
        <div>
          <span class="eyebrow">referral system</span>
          <h2>Мои макаки</h2>
          <p>Реферальная стая, банановые уровни и красивый прогресс по приглашениям.</p>
          <button class="button primary" data-action="navigate" data-to="#referrals" type="button">Открыть рефералку</button>
        </div>
        <div class="ape-row">
          ${renderMiniApes(4)}
        </div>
      </article>
    </section>
  `;
}

function statCard(title, value, hint) {
  return `<article class="stat-card"><span>${title}</span><b>${value}</b><small>${hint}</small></article>`;
}

function renderReferralsPage() {
  const apes = [
    ['CocoMax', '$42.10', '8 открытий'],
    ['PalmRex', '$18.45', '3 апгрейда'],
    ['MoonDrop', '$9.80', '1 депозит'],
    ['LeafRider', '$7.25', 'daily streak'],
    ['VineKid', '$4.10', 'новый'],
  ];
  return `
    <section class="page-section referral-hero">
      <div>
        <span class="eyebrow">my apes</span>
        <h1>Мои макаки и банановая рефералка</h1>
        <p>Пользователь видит стаю приглашенных, вклад каждого, уровни наград и простую ссылку для шаринга.</p>
        <div class="ref-link">
          <span>${state.user.referralUrl}</span>
          <button class="button primary" data-action="copy-ref" type="button">Скопировать</button>
        </div>
      </div>
      <div class="ref-illustration">
        ${renderMiniApes(6)}
        <div class="banana-path">${Array.from({ length: 7 }, () => '<span class="banana-token small"></span>').join('')}</div>
      </div>
    </section>

    <section class="page-section referral-grid">
      ${apes.map((ape, index) => `
        <article class="ape-card">
          <span class="mini-ape-card color-${index % 4}">${renderApeFace()}</span>
          <b>${ape[0]}</b>
          <small>${ape[2]}</small>
          <strong>${ape[1]}</strong>
        </article>
      `).join('')}
    </section>

    <section class="page-section tier-line">
      ${['5 макак · Free Case', '10 макак · +$25', '25 макак · VIP Banana', '50 макак · Legend Case'].map((tier, index) => `
        <article class="tier-card ${state.stats.referrals > index * 8 ? 'done' : ''}">
          <span>${index + 1}</span>
          <b>${tier}</b>
        </article>
      `).join('')}
    </section>
  `;
}

function renderMiniApes(count) {
  return Array.from({ length: count }, (_, index) => `<span class="mini-ape-card color-${index % 4}">${renderApeFace()}</span>`).join('');
}

function renderApeFace() {
  return '<i class="ear left"></i><i class="ear right"></i><i class="eye left"></i><i class="eye right"></i><i class="muzzle"></i>';
}

function renderTournamentsPage() {
  const leaderboard = ['MangoJack', 'SteamApe', 'CocoMax', 'LeafRider', 'MoonDrop', 'PalmRex'];
  return `
    <section class="page-section tournament-banner">
      <div>
        <span class="eyebrow">tournament arena</span>
        <h1>Jungle Cup Tournament</h1>
        <p>Особый фон, баннер, призы, лидерборд и быстрый вход в турнирные кейсы.</p>
        <button class="button primary xl" data-action="tournament-detail" data-tournament-id="jungle-cup" type="button">Участвовать</button>
      </div>
      <div class="trophy-stack">
        <span class="trophy">1</span>
        <span class="banana-token"></span>
        <span class="trophy small">2</span>
      </div>
    </section>

    <section class="page-section tournament-grid">
      ${tournaments.map(tour => `
        <article class="tournament-card" style="--accent:${tour.accent}">
          <span class="eyebrow">${tour.timer}</span>
          <h2>${tour.name}</h2>
          <p>${tour.subtitle}</p>
          <div class="tour-metrics">
            <span><small>Призовой фонд</small><b>${tour.prize}</b></span>
            <span><small>Ключ</small><b>${tour.key}</b></span>
          </div>
          <button class="button secondary" data-action="tournament-detail" data-tournament-id="${tour.id}" type="button">Подробнее</button>
        </article>
      `).join('')}
    </section>

    <section class="page-section split">
      <article class="panel">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">leaderboard</span>
            <h2>Таблица лидеров</h2>
          </div>
        </div>
        <div class="top-list">
          ${leaderboard.map((name, index) => `<div class="top-item"><span class="rank">#${index + 1}</span><span><b>${name}</b><small>${Math.floor(24000 / (index + 1)).toLocaleString('ru-RU')} очков</small></span><strong>${money(600 / (index + 1))}</strong></div>`).join('')}
        </div>
      </article>
      <article class="panel prize-panel">
        <span class="eyebrow">prizes</span>
        <h2>Призы турнира</h2>
        <div class="prize-list">
          ${tournaments[2].prizes.map((prize, index) => `<span><b>#${index + 1}</b><small>${prize}</small></span>`).join('')}
        </div>
      </article>
    </section>
  `;
}

function openTournamentModal(tournamentId) {
  const tour = tournaments.find(item => item.id === tournamentId) || tournaments[0];
  openModal(`
    <section class="modal wide">
      ${modalHeader(tour.name, `${tour.subtitle} Призовой фонд: ${tour.prize}.`)}
      <div class="tournament-modal-grid">
        <article class="prize-panel modal-panel">
          <span class="eyebrow">prizes</span>
          <h2>${tour.prize}</h2>
          <div class="prize-list">${tour.prizes.map((prize, index) => `<span><b>#${index + 1}</b><small>${prize}</small></span>`).join('')}</div>
        </article>
        <article class="modal-panel">
          <span class="eyebrow">leaderboard</span>
          <div class="top-list">
            ${Array.from({ length: 5 }, (_, index) => `<div class="top-item"><span class="rank">#${index + 1}</span><span><b>${randomFrom(liveNames)}</b><small>${Math.floor(18000 / (index + 1)).toLocaleString('ru-RU')} очков</small></span><strong>${money(400 / (index + 1))}</strong></div>`).join('')}
          </div>
        </article>
      </div>
      <div class="modal-actions">
        <button class="button primary" data-action="case-detail" data-case-id="jungle-myth" type="button">Открыть турнирный кейс</button>
        <button class="button ghost" data-action="close-modal" type="button">Закрыть</button>
      </div>
    </section>
  `);
}

function renderEventsPage() {
  return `
    <section class="page-section page-title">
      <div>
        <span class="eyebrow">events</span>
        <h1>Особые события и event cases</h1>
        <p>Ивенты живут отдельными страницами: свой фон, баннер, кейсы, правила и награды.</p>
      </div>
    </section>

    <section class="page-section event-grid">
      ${events.map(event => `
        <article class="event-card" style="--accent:${event.accent}">
          <span class="eyebrow">${event.date}</span>
          <h2>${event.name}</h2>
          <p>${event.description}</p>
          <div class="event-case-row">
            ${event.cases.map(id => `<span>${getCase(id).short}</span>`).join('')}
          </div>
          <button class="button primary" data-action="event-detail" data-event-id="${event.id}" type="button">Открыть ивент</button>
        </article>
      `).join('')}
    </section>
  `;
}

function renderEventDetailPage(eventId) {
  const event = events.find(item => item.id === eventId) || events[0];
  return `
    <section class="page-section event-detail" style="--accent:${event.accent}">
      <div>
        <span class="eyebrow">${event.date}</span>
        <h1>${event.title}</h1>
        <p>${event.description}</p>
        <div class="hero-actions">
          <button class="button primary xl" data-action="case-detail" data-case-id="${event.cases[0]}" type="button">Открыть event case</button>
          <button class="button ghost xl" data-action="navigate" data-to="#tournaments" type="button">Лидерборд</button>
        </div>
      </div>
      <div class="event-emblem">
        <span>${event.name.split(' ')[0]}</span>
      </div>
    </section>
    <section class="page-section case-grid">
      ${event.cases.map(id => renderCaseCard(getCase(id))).join('')}
    </section>
  `;
}

function openNotification(id) {
  const item = state.notifications.find(entry => entry.id === id);
  if (!item) return;
  item.unread = false;
  renderHeader();
  $('#notificationPanel')?.classList.add('is-hidden');
  if (item.action === 'wheel') openFruitWheelModal();
  else navigate(item.action);
}

function openFruitWheelModal() {
  if (state.fruitAttempts <= 0) {
    openModal(`
      <section class="modal small">
        ${modalHeader('Колесо пока недоступно', 'Пополнение баланса выдаст новую попытку Fruit Wheel.')}
        <div class="modal-actions">
          <button class="button primary" data-action="deposit" type="button">Пополнить</button>
          <button class="button ghost" data-action="close-modal" type="button">Закрыть</button>
        </div>
      </section>
    `);
    return;
  }
  state.fruitSpinning = false;
  openModal(`
    <section class="modal">
      ${modalHeader('Fruit Wheel', `Доступно попыток: ${state.fruitAttempts}. Колесо выбирает фрукт, затем фрукт выдает награду.`)}
      <div class="wheel-layout">
        <div class="wheel-pin"></div>
        <div class="fruit-wheel" id="fruitWheel">
          ${['Banana', 'Mango', 'Coconut', 'Kiwi', 'Lime', 'Papaya'].map((label, index) => `<span style="--i:${index}">${label}</span>`).join('')}
        </div>
        <div class="wheel-result" id="wheelResult">
          <button class="button primary xl" id="spinWheelBtn" type="button">Крутить</button>
        </div>
      </div>
    </section>
  `);
  $('#spinWheelBtn').addEventListener('click', spinFruitWheel);
}

function spinFruitWheel() {
  if (state.fruitSpinning) return;
  state.fruitSpinning = true;
  const wheel = $('#fruitWheel');
  const resultRoot = $('#wheelResult');
  const rewards = [
    { fruit: 'Banana', reward: 'Free Open: Starter Vine', caseId: 'starter-vine', color: '#ffd84f' },
    { fruit: 'Mango', reward: '+$5 bonus balance', balance: 5, color: '#ff9b3e' },
    { fruit: 'Coconut', reward: 'Upgrade ticket', color: '#e8c896' },
    { fruit: 'Kiwi', reward: '+25% promo', color: '#40df76' },
  ];
  const result = randomFrom(rewards);
  wheel.style.transform = `rotate(${360 * 5 + Math.floor(Math.random() * 260)}deg)`;
  resultRoot.innerHTML = '<span class="loading-copy">Колесо крутится...</span>';
  setTimeout(() => {
    resultRoot.innerHTML = `
      <div class="fruit-reveal" style="--fruit:${result.color}">
        <b>${result.fruit}</b>
        <span>${result.reward}</span>
      </div>
      <button class="button primary" id="claimWheelReward" type="button">Забрать</button>
    `;
    $('#claimWheelReward').addEventListener('click', () => {
      state.fruitAttempts = Math.max(0, state.fruitAttempts - 1);
      state.stats.wheelSpins += 1;
      if (result.balance) state.balance += result.balance;
      if (result.caseId) {
        closeModal();
        openCase(result.caseId, { free: true, quick: true });
      } else {
        closeModal();
      }
      notify('wheel', 'Награда колеса получена', result.reward, '#rewards', 'Reward Hub');
      renderHeader();
    });
  }, 1700);
}

function openDepositModal(context = {}) {
  openModal(`
    <section class="modal small">
      ${modalHeader('Пополнение баланса', context.total ? `Для действия нужно ${money(context.total)}. Баланс сейчас ${money(state.balance)}.` : 'Пополнение выдает попытку Fruit Wheel и обновляет Reward Hub.')}
      <label class="field">
        <span>Сумма</span>
        <input id="depositAmount" type="number" min="5" max="1000" value="50" />
      </label>
      <div class="deposit-calc" id="depositCalc"></div>
      <div class="modal-actions">
        <button class="button primary" data-action="deposit-submit" type="button">Пополнить</button>
        <button class="button ghost" data-action="close-modal" type="button">Закрыть</button>
      </div>
    </section>
  `);
  renderDepositCalc();
}

function renderDepositCalc() {
  const amount = Number($('#depositAmount')?.value || 0);
  const root = $('#depositCalc');
  if (!root) return;
  const bonus = amount >= 50 ? Math.min(amount * 0.25, 25) : 0;
  root.innerHTML = `
    <span><b>${money(amount)}</b><small>на баланс</small></span>
    <span><b>${money(bonus)}</b><small>promo value</small></span>
    <span><b>+1</b><small>Fruit Wheel</small></span>
  `;
}

function submitDeposit() {
  const amount = clamp(Number($('#depositAmount')?.value || 0), 5, 1000);
  state.balance += amount;
  state.fruitAttempts += 1;
  notify('wheel', 'Бонусное колесо доступно', `После депозита добавлена 1 попытка. Баланс: ${money(state.balance)}.`, 'wheel', 'Крутить');
  closeModal();
  renderApp(false);
}

function copyReferral() {
  const text = state.user.referralUrl;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => toast('Ссылка скопирована', text)).catch(() => toast('Referral link', text));
  } else {
    toast('Referral link', text);
  }
}

function openModal(markup) {
  const root = $('#modalRoot');
  root.classList.add('has-modal');
  root.innerHTML = `<div class="modal-backdrop" data-action="close-modal"></div>${markup}`;
}

function closeModal() {
  const root = $('#modalRoot');
  root.classList.remove('has-modal');
  root.innerHTML = '';
}

function modalHeader(title, subtitle) {
  return `
    <header class="modal-header">
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <button class="modal-close" data-action="close-modal" type="button" aria-label="Закрыть">×</button>
    </header>
  `;
}

function toast(title, message) {
  const root = $('#toastRoot');
  const item = document.createElement('div');
  item.className = 'toast';
  item.innerHTML = `<b>${title}</b><span>${message}</span>`;
  root.appendChild(item);
  setTimeout(() => item.remove(), 4200);
}

function getCase(caseId) {
  return cases.find(item => item.id === caseId) || cases[0];
}
