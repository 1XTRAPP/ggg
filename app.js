/* =====================================================
   MAÇ KUPONLARI - APP.JS (Full Featured v3)
===================================================== */

"use strict";

/* ========== ÇEVİRİLER ========== */
const I18N = {
  tr: {
    title: "MAÇ KUPONLARI", subtitle: "ÜCRETSİZ MAÇ TAHMİNLERİ",
    refresh: "YENİLE", heroBadge: "🔥 GÜNÜN TAHMİNLERİ",
    heroTitle: "Günün Ücretsiz", heroTitleSpan: "Maç Kuponları",
    heroDesc: "Güncel maç tahminlerini, oranları ve güven yüzdelerini tek yerde görüntüle.",
    date: "TARİH", status: "DURUM", prediction: "TAHMİN",
    loadingData: "Veriler yükleniyor...", current: "Güncel", error: "Hata",
    filterAll: "🏆 TÜMÜ", filterBanko: "🔥 BANKO", filterHigh: "⭐ %75+",
    filterValue: "💎 DEĞER", filterRisky: "🎲 RİSKLİ",
    filterToday: "📅 BUGÜN", filterFav: "❤️ FAVORİLER",
    leagueAll: "Tüm Ligler", timeAll: "Tüm Saatler",
    timeMorning: "Sabah (00-12)", timeAfternoon: "Öğleden Sonra (12-18)", timeEvening: "Akşam (18-24)",
    sortDefault: "Sıralama: Varsayılan", sortConfHigh: "Güven ↓", sortConfLow: "Güven ↑",
    sortOddsHigh: "Oran ↓", sortOddsLow: "Oran ↑", sortTime: "Saat (Erken→Geç)",
    searchPlaceholder: "Takım veya lig ara...",
    sectionTitle: "Günün Kuponları",
    noResult: "Tahmin bulunamadı", noResultDesc: "Arama veya filtre kriterlerini değiştirin.",
    info: "Bilgilendirme",
    infoDesc: "Bu sayfa yalnızca maç tahminlerini bilgilendirme amacıyla gösterir. Tahminler kesin sonuç veya kazanç garantisi değildir.",
    footerDesc: "Günlük ücretsiz maç tahminleri", footerCopy: "© 2026 Maç Kuponları",
    statsTitle: "📊 Günün İstatistikleri",
    statTotal: "Toplam Maç", statBanko: "Banko", statHigh: "Yüksek Güven",
    statAvgConf: "Ort. Güven", statAvgOdds: "Ort. Oran", statValue: "Değer Bahis",
    chartTitle: "📈 Güven Dağılımı",
    leagueStatsTitle: "📊 Lig Bazlı İstatistik",
    countdownLabel: "⏱️ KALAN SÜRE", started: "🔴 Başladı",
    share: "Paylaş", copied: "Bağlantı kopyalandı!",
    noShare: "Paylaşım desteklenmiyor.",
    lastUpdate: "Son güncelleme",
    favAdd: "☆ Favorilere Ekle", favRemove: "★ Favorilerden Çıkar",
    loading: "Kuponlar hazırlanıyor...",
    topPicksTitle: "Günün En İyi 3 Kuponu",
    randomMatch: "Şansıma Bir Maç",
    compareTitle: "Maç Karşılaştırma", compareClear: "Temizle",
    compareMax: "En fazla 3 maç karşılaştırabilirsiniz",
    compareAdd: "⚖️ Karşılaştır", compareAdded: "⚖️ Eklendi",
    couponBuilderTitle: "Kupon Oluşturucu", couponClear: "Temizle",
    cbTotalOdds: "Toplam Oran:", cbTotalConf: "Ort. Güven:",
    cbShare: "Kuponu Paylaş", cbEmpty: "Henüz maç eklemedin. Kartlardaki 🎯 butonuna tıkla.",
    couponAdded: "Kupona eklendi!", couponRemoved: "Kupondan çıkarıldı",
    couponMax: "En fazla 10 maç ekleyebilirsiniz",
    couponCopied: "Kupon kopyalandı!",
    notifOn: "Bildirimler açıldı!", notifOff: "Bildirimler kapatıldı",
    notifDenied: "Bildirim izni verilmedi",
    notifBanko: "🔥 Yeni banko maç!",
    likeAdded: "Beğendin!", likeRemoved: "Beğeni kaldırıldı",
    badgesTitle: "Rozetlerin",
    badgeFirst: "İlk Adım", badgeFirstDesc: "Siteyi ziyaret et",
    badgeFav: "Favorici", badgeFavDesc: "5 maç favorile",
    badgeCoupon: "Kuponcu", badgeCouponDesc: "İlk kuponunu oluştur",
    badgeCompare: "Karşılaştırıcı", badgeCompareDesc: "3 maç karşılaştır",
    badgeLike: "Beğenici", badgeLikeDesc: "10 maç beğen",
    badgeRandom: "Şanslı", badgeRandomDesc: "Rastgele maç kullan",
    badgeTheme: "Tema Sever", badgeThemeDesc: "Tema değiştir",
    badgeLang: "Çok Dilli", badgeLangDesc: "Dil değiştir",
    badgeEarly: "Erken Kuş", badgeEarlyDesc: "Sabah 06-09 arası ziyaret",
    newTag: "YENİ", liveTag: "CANLI", valueTag: "DEĞER"
  },
  en: {
    title: "MATCH COUPONS", subtitle: "FREE MATCH PREDICTIONS",
    refresh: "REFRESH", heroBadge: "🔥 TODAY'S PICKS",
    heroTitle: "Today's Free", heroTitleSpan: "Match Coupons",
    heroDesc: "View today's match predictions, odds and confidence ratings.",
    date: "DATE", status: "STATUS", prediction: "PREDICTION",
    loadingData: "Loading data...", current: "Current", error: "Error",
    filterAll: "🏆 ALL", filterBanko: "🔥 BANKER", filterHigh: "⭐ 75%+",
    filterValue: "💎 VALUE", filterRisky: "🎲 RISKY",
    filterToday: "📅 TODAY", filterFav: "❤️ FAVORITES",
    leagueAll: "All Leagues", timeAll: "All Times",
    timeMorning: "Morning (00-12)", timeAfternoon: "Afternoon (12-18)", timeEvening: "Evening (18-24)",
    sortDefault: "Sort: Default", sortConfHigh: "Confidence ↓", sortConfLow: "Confidence ↑",
    sortOddsHigh: "Odds ↓", sortOddsLow: "Odds ↑", sortTime: "Time",
    searchPlaceholder: "Search team or league...",
    sectionTitle: "Today's Coupons",
    noResult: "No prediction found", noResultDesc: "Change search or filter.",
    info: "Information", infoDesc: "For informational purposes only.",
    footerDesc: "Daily free match predictions", footerCopy: "© 2026 Match Coupons",
    statsTitle: "📊 Today's Statistics",
    statTotal: "Total Matches", statBanko: "Banker", statHigh: "High Confidence",
    statAvgConf: "Avg. Confidence", statAvgOdds: "Avg. Odds", statValue: "Value Bets",
    chartTitle: "📈 Confidence Distribution",
    leagueStatsTitle: "📊 League Statistics",
    countdownLabel: "⏱️ TIME LEFT", started: "🔴 Started",
    share: "Share", copied: "Link copied!", noShare: "Sharing not supported.",
    lastUpdate: "Last update",
    favAdd: "☆ Add to Favorites", favRemove: "★ Remove",
    loading: "Coupons loading...",
    topPicksTitle: "Today's Top 3 Picks",
    randomMatch: "Random Match",
    compareTitle: "Match Comparison", compareClear: "Clear",
    compareMax: "You can compare up to 3 matches",
    compareAdd: "⚖️ Compare", compareAdded: "⚖️ Added",
    couponBuilderTitle: "Coupon Builder", couponClear: "Clear",
    cbTotalOdds: "Total Odds:", cbTotalConf: "Avg. Confidence:",
    cbShare: "Share Coupon", cbEmpty: "No matches yet. Click 🎯 on cards.",
    couponAdded: "Added to coupon!", couponRemoved: "Removed from coupon",
    couponMax: "Maximum 10 matches",
    couponCopied: "Coupon copied!",
    notifOn: "Notifications on!", notifOff: "Notifications off",
    notifDenied: "Notification permission denied",
    notifBanko: "🔥 New banker match!",
    likeAdded: "Liked!", likeRemoved: "Like removed",
    badgesTitle: "Your Badges",
    badgeFirst: "First Step", badgeFirstDesc: "Visit the site",
    badgeFav: "Favoriter", badgeFavDesc: "Favorite 5 matches",
    badgeCoupon: "Couponer", badgeCouponDesc: "Create first coupon",
    badgeCompare: "Comparer", badgeCompareDesc: "Compare 3 matches",
    badgeLike: "Liker", badgeLikeDesc: "Like 10 matches",
    badgeRandom: "Lucky", badgeRandomDesc: "Use random match",
    badgeTheme: "Theme Lover", badgeThemeDesc: "Change theme",
    badgeLang: "Polyglot", badgeLangDesc: "Change language",
    badgeEarly: "Early Bird", badgeEarlyDesc: "Visit 06-09 AM",
    newTag: "NEW", liveTag: "LIVE", valueTag: "VALUE"
  }
};

/* ========== DURUM ========== */
let allPicks = [], filteredPicks = [];
let activeFilter = "all", searchText = "";
let leagueFilter = "all", timeFilter = "all", sortMode = "default";
let favorites = new Set(), likes = new Set(), couponList = [], compareList = [];
let countdownTimer = null, currentLang = "tr";
let prevOdds = {}, seenIds = {};
let notifEnabled = false;

const FAV_KEY = "coupon_favorites";
const LIKE_KEY = "coupon_likes";
const THEME_KEY = "coupon_theme";
const LANG_KEY = "coupon_lang";
const ODDS_KEY = "coupon_prev_odds";
const SEEN_KEY = "coupon_seen_ids";
const BADGES_KEY = "coupon_badges";
const MAX_COMPARE = 3;
const MAX_COUPON = 10;

/* ========== ELEMENTLER ========== */
const $ = id => document.getElementById(id);
const couponContainer = $("couponContainer");
const noResults = $("noResults");
const resultCount = $("resultCount");
const searchInput = $("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const refreshButton = $("refreshButton");
const themeToggle = $("themeToggle");
const langToggle = $("langToggle");
const notifBtn = $("notifBtn");
const todayDate = $("todayDate");
const dataStatus = $("dataStatus");
const matchCount = $("matchCount");
const statusIndicator = $("statusIndicator");
const statusMessage = $("statusMessage");
const lastUpdate = $("lastUpdate");
const favCount = $("favCount");
const statTotal = $("statTotal");
const statBanko = $("statBanko");
const statHigh = $("statHigh");
const statAvgConf = $("statAvgConf");
const statAvgOdds = $("statAvgOdds");
const statValue = $("statValue");
const chartBars = $("chartBars");
const leagueStatsGrid = $("leagueStatsGrid");
const leagueSelect = $("leagueSelect");
const timeSelect = $("timeSelect");
const sortSelect = $("sortSelect");
const detailModal = $("detailModal");
const modalBody = $("modalBody");
const topPicksSection = $("topPicksSection");
const topPicksGrid = $("topPicksGrid");
const randomMatchBtn = $("randomMatchBtn");
const comparePanel = $("comparePanel");
const compareGrid = $("compareGrid");
const compareCount = $("compareCount");
const couponBuilder = $("couponBuilder");
const cbList = $("cbList");
const cbTotalOdds = $("cbTotalOdds");
const cbTotalConf = $("cbTotalConf");
const fabCoupon = $("fabCoupon");
const fabCompare = $("fabCompare");
const fabScrollTop = $("fabScrollTop");
const fabCouponCount = $("fabCouponCount");
const fabCompareCount = $("fabCompareCount");
const announcementBar = $("announcementBar");
const announcementClose = $("announcementClose");
const badgesGrid = $("badgesGrid");

/* ========== YARDIMCI ========== */
const normalize = s => String(s || "").toLowerCase()
  .replace(/ı/g,"i").replace(/İ/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g")
  .replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").trim();

const escapeHtml = s => String(s == null ? "" : s)
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;").replace(/'/g,"&#039;");

const getConfidence = p => {
  const r = Number(p.prob || p.confidence || p.guven || 0);
  if (!r) return 0;
  if (r <= 5) return r * 20;
  if (r <= 10) return r * 10;
  return r;
};

const getOddsNum = p => parseFloat(String(p.odds || p.oran || "0").replace(",", ".")) || 0;
const getPickId = p => p.id || `${p.home}-${p.away}-${p.time}`;
const isBanko = p => p.isHero === true || getConfidence(p) >= 85;

// DEĞER BAHİS: güven/100 * oran > 1.05
const isValueBet = p => {
  const conf = getConfidence(p) / 100;
  const odds = getOddsNum(p);
  return conf * odds >= 1.05;
};

// CANLI: kickoff zamanı geçmiş, ama 2 saatten az olmuş
const isLive = p => {
  if (!p.kickoff) return false;
  const t = new Date(p.kickoff).getTime();
  if (isNaN(t)) return false;
  const now = Date.now();
  return t <= now && now - t < 2 * 60 * 60 * 1000;
};

// YENİ: son 1 saatte eklenmiş
const isNew = p => {
  const id = getPickId(p);
  const seenAt = seenIds[id];
  if (!seenAt) return false;
  return Date.now() - seenAt < 60 * 60 * 1000;
};

const statusInfo = s => {
  const n = normalize(s);
  if (n === "won" || n === "kazandi" || n === "1") return { text: "KAZANDI", cls: "won" };
  if (n === "lost" || n === "kaybetti" || n === "0") return { text: "KAYBETTİ", cls: "lost" };
  return { text: "DEVAM EDİYOR", cls: "pending" };
};

const confidenceStars = v => {
  let n = Number(v) || 0;
  if (n > 10) n = Math.round(n / 20);
  else if (n > 5) n = Math.round(n / 2);
  n = Math.max(1, Math.min(5, n));
  return "★".repeat(n) + "☆".repeat(5 - n);
};

const cardConfClass = p => {
  const c = getConfidence(p);
  if (isBanko(p) || c >= 85) return "conf-banko";
  if (c >= 75) return "conf-high";
  if (c >= 60) return "conf-mid";
  return "conf-low";
};

const formatToday = () => {
  const aylar = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  const d = new Date();
  return `${d.getDate()} ${aylar[d.getMonth()]} ${d.getFullYear()}`;
};

/* ========== TEMA ========== */
function loadTheme() {
  let t = "dark";
  try { t = localStorage.getItem(THEME_KEY) || "dark"; } catch (e) {}
  document.documentElement.dataset.theme = t;
  updateThemeIcon(t);
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  updateThemeIcon(t);
  earnBadge("theme");
}
function updateThemeIcon(t) {
  const i = document.querySelector(".theme-icon");
  if (i) i.textContent = t === "light" ? "☀️" : "🌙";
}
function toggleTheme() {
  setTheme((document.documentElement.dataset.theme || "dark") === "dark" ? "light" : "dark");
}

/* ========== DİL ========== */
function loadLang() {
  let l = "tr";
  try { l = localStorage.getItem(LANG_KEY) || "tr"; } catch (e) {}
  setLang(l, true);
}
function setLang(lang, skipBadge) {
  currentLang = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  const lbl = document.querySelector(".lang-label");
  if (lbl) lbl.textContent = lang.toUpperCase();
  applyTranslations();
  render();
  renderStats();
  renderChart();
  renderLeagueStats();
  renderTopPicks();
  renderComparePanel();
  renderCouponBuilder();
  renderBadges();
  if (!skipBadge) earnBadge("lang");
}
function toggleLang() { setLang(currentLang === "tr" ? "en" : "tr"); }
const t = key => (I18N[currentLang] && I18N[currentLang][key]) || key;

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  ["#leagueSelect", "#timeSelect", "#sortSelect"].forEach(sel => {
    document.querySelectorAll(`${sel} option[data-i18n]`).forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
  });
}

/* ========== FAVORİLER & LİKES ========== */
function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (raw) favorites = new Set(JSON.parse(raw));
  } catch (e) { favorites = new Set(); }
}
function saveFavorites() {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...favorites])); } catch (e) {}
}
function toggleFavorite(id) {
  if (!id) return;
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  saveFavorites();
  updateFavCount();
  applyFilters();
  if (favorites.size >= 5) earnBadge("fav");
}
function updateFavCount() {
  if (favCount) favCount.textContent = favorites.size > 0 ? favorites.size : "";
}

function loadLikes() {
  try {
    const raw = localStorage.getItem(LIKE_KEY);
    if (raw) likes = new Set(JSON.parse(raw));
  } catch (e) { likes = new Set(); }
}
function saveLikes() {
  try { localStorage.setItem(LIKE_KEY, JSON.stringify([...likes])); } catch (e) {}
}
function toggleLike(id) {
  if (!id) return;
  if (likes.has(id)) { likes.delete(id); showToast(t("likeRemoved")); }
  else { likes.add(id); showToast(t("likeAdded")); }
  saveLikes();
  applyFilters();
  if (likes.size >= 10) earnBadge("like");
}

/* ========== ODDS TAKİBİ ========== */
function loadPrevOdds() {
  try {
    const raw = localStorage.getItem(ODDS_KEY);
    if (raw) prevOdds = JSON.parse(raw);
  } catch (e) { prevOdds = {}; }
}
function savePrevOdds() {
  try {
    const newOdds = {};
    allPicks.forEach(p => { newOdds[getPickId(p)] = getOddsNum(p); });
    localStorage.setItem(ODDS_KEY, JSON.stringify(newOdds));
  } catch (e) {}
}
function getOddsChange(p) {
  const id = getPickId(p);
  const cur = getOddsNum(p);
  const prev = prevOdds[id];
  if (!prev || prev === cur) return null;
  return { dir: cur > prev ? "up" : "down", diff: (cur - prev).toFixed(2) };
}

/* ========== GÖRÜLEN ID TAKİBİ (YENİ etiketi) ========== */
function loadSeenIds() {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (raw) seenIds = JSON.parse(raw);
  } catch (e) { seenIds = {}; }
}
function saveSeenIds() {
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seenIds)); } catch (e) {}
}
function updateSeenIds() {
  const now = Date.now();
  let changed = false;
  allPicks.forEach(p => {
    const id = getPickId(p);
    if (!seenIds[id]) { seenIds[id] = now; changed = true; }
  });
  if (changed) saveSeenIds();
}

/* ========== ROZETLER ========== */
function loadBadges() {
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function saveBadges(b) {
  try { localStorage.setItem(BADGES_KEY, JSON.stringify(b)); } catch (e) {}
}
function earnBadge(key) {
  const b = loadBadges();
  if (b[key]) return;
  b[key] = Date.now();
  saveBadges(b);
  renderBadges();
}
const BADGES = [
  { key: "first", icon: "👋", name: "badgeFirst", desc: "badgeFirstDesc" },
  { key: "fav", icon: "⭐", name: "badgeFav", desc: "badgeFavDesc" },
  { key: "coupon", icon: "🎯", name: "badgeCoupon", desc: "badgeCouponDesc" },
  { key: "compare", icon: "⚖️", name: "badgeCompare", desc: "badgeCompareDesc" },
  { key: "like", icon: "👍", name: "badgeLike", desc: "badgeLikeDesc" },
  { key: "random", icon: "🎰", name: "badgeRandom", desc: "badgeRandomDesc" },
  { key: "theme", icon: "🌙", name: "badgeTheme", desc: "badgeThemeDesc" },
  { key: "lang", icon: "🌐", name: "badgeLang", desc: "badgeLangDesc" },
  { key: "early", icon: "🐦", name: "badgeEarly", desc: "badgeEarlyDesc" }
];
function renderBadges() {
  if (!badgesGrid) return;
  const earned = loadBadges();
  badgesGrid.innerHTML = BADGES.map(b => `
    <div class="badge-item ${earned[b.key] ? "earned" : ""}" title="${t(b.desc)}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${t(b.name)}</div>
    </div>
  `).join("");
}

/* ========== GERİ SAYIM ========== */
function getCountdown(kickoff) {
  if (!kickoff) return "";
  const tm = new Date(kickoff).getTime();
  if (isNaN(tm)) return "";
  const diff = tm - Date.now();
  if (diff <= 0) return t("started");
  const totalMin = Math.floor(diff / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}g ${hours % 24}s`;
  if (hours > 0) return `${hours}s ${mins}dk`;
  return `${mins} dk`;
}
function updateCountdowns() {
  document.querySelectorAll(".countdown[data-kickoff]").forEach(el => {
    const text = getCountdown(el.dataset.kickoff);
    el.textContent = text;
    const parent = el.closest(".countdown-box");
    if (parent) {
      const isUrgent = /^\d+ dk$/.test(text) && parseInt(text) <= 30;
      parent.classList.toggle("urgent", isUrgent);
      el.classList.toggle("urgent", isUrgent);
    }
  });
}
function startCountdownTimer() {
  if (countdownTimer) clearInterval(countdownTimer);
  updateCountdowns();
  countdownTimer = setInterval(updateCountdowns, 30000);
}

/* ========== TOAST ========== */
let toastEl = null;
function showToast(msg, type) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.className = "toast show" + (type ? " " + type : "");
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ========== BİLDİRİM ========== */
function loadNotif() {
  try { notifEnabled = localStorage.getItem("coupon_notif") === "1"; } catch (e) {}
  updateNotifIcon();
}
function updateNotifIcon() {
  if (!notifBtn) return;
  notifBtn.classList.toggle("active", notifEnabled);
}
async function toggleNotifications() {
  if (notifEnabled) {
    notifEnabled = false;
    try { localStorage.setItem("coupon_notif", "0"); } catch (e) {}
    updateNotifIcon();
    showToast(t("notifOff"), "warn");
    return;
  }
  if (!("Notification" in window)) { showToast(t("notifDenied"), "error"); return; }
  let perm = Notification.permission;
  if (perm === "default") perm = await Notification.requestPermission();
  if (perm !== "granted") { showToast(t("notifDenied"), "error"); return; }
  notifEnabled = true;
  try { localStorage.setItem("coupon_notif", "1"); } catch (e) {}
  updateNotifIcon();
  showToast(t("notifOn"));
  new Notification("⚽ Maç Kuponları", { body: "Bildirimler aktif!" });
}
function checkBankoNotification() {
  if (!notifEnabled) return;
  const bankoCount = allPicks.filter(isBanko).length;
  const lastCount = Number(localStorage.getItem("coupon_last_banko") || 0);
  if (bankoCount > lastCount) {
    new Notification(t("notifBanko"), { body: `${bankoCount - lastCount} yeni banko maç eklendi` });
    try { localStorage.setItem("coupon_last_banko", String(bankoCount)); } catch (e) {}
  }
}

/* ========== PAYLAŞ ========== */
async function sharePick(p) {
  const url = window.location.origin + (p.slug ? `/tr/match/${p.slug}` : "");
  const text = `⚽ ${p.home} - ${p.away}\n🎯 ${t("prediction")}: ${p.tip || p.pick || ""}\n📊 Oran: ${p.odds || ""}\n🏆 Güven: %${getConfidence(p)}`;
  if (navigator.share) {
    try { await navigator.share({ title: "Maç Kuponu", text, url }); } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      showToast(t("copied"));
    } catch (e) { showToast(t("noShare"), "error"); }
  }
}

/* ========== KARŞILAŞTIRMA ========== */
function toggleCompare(p) {
  const id = getPickId(p);
  const idx = compareList.findIndex(x => getPickId(x) === id);
  if (idx > -1) compareList.splice(idx, 1);
  else {
    if (compareList.length >= MAX_COMPARE) {
      showToast(t("compareMax"), "warn");
      return;
    }
    compareList.push(p);
  }
  renderComparePanel();
  updateCompareButtons();
  if (compareList.length >= 3) earnBadge("compare");
}
function updateCompareButtons() {
  document.querySelectorAll(".compare-btn").forEach(btn => {
    const id = btn.dataset.pickId;
    btn.classList.toggle("compared", compareList.some(x => getPickId(x) === id));
  });
}
function renderComparePanel() {
  if (!comparePanel || !compareGrid) return;
  if (compareList.length === 0) {
    comparePanel.classList.remove("open");
    if (fabCompareCount) fabCompareCount.textContent = "0";
    return;
  }
  comparePanel.classList.add("open");
  if (compareCount) compareCount.textContent = compareList.length;
  if (fabCompareCount) fabCompareCount.textContent = compareList.length;

  const best = {
    odds: Math.max(...compareList.map(getOddsNum)),
    conf: Math.max(...compareList.map(getConfidence))
  };

  compareGrid.innerHTML = compareList.map(p => `
    <div class="compare-card">
      <button class="remove-btn" data-id="${escapeHtml(getPickId(p))}" type="button">✕</button>
      <div class="compare-team">${escapeHtml(p.home)} - ${escapeHtml(p.away)}</div>
      <div class="compare-row"><span class="label">Lig</span><span class="value">${escapeHtml(p.league || "-")}</span></div>
      <div class="compare-row"><span class="label">Saat</span><span class="value">${escapeHtml(p.time || "-")}</span></div>
      <div class="compare-row"><span class="label">Tahmin</span><span class="value">${escapeHtml(p.tip || "-")}</span></div>
      <div class="compare-row"><span class="label">Oran</span><span class="value odds-val ${getOddsNum(p) === best.odds ? "highlight" : ""}">${escapeHtml(String(p.odds || "-"))}</span></div>
      <div class="compare-row"><span class="label">Güven</span><span class="value ${getConfidence(p) === best.conf ? "highlight" : ""}">%${getConfidence(p)}</span></div>
    </div>
  `).join("");

  compareGrid.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const idx = compareList.findIndex(x => getPickId(x) === id);
      if (idx > -1) compareList.splice(idx, 1);
      renderComparePanel();
      updateCompareButtons();
    });
  });
}
function clearCompare() {
  compareList = [];
  renderComparePanel();
  updateCompareButtons();
}

/* ========== KUPON OLUŞTURUCU ========== */
function toggleCoupon(p) {
  const id = getPickId(p);
  const idx = couponList.findIndex(x => getPickId(x) === id);
  if (idx > -1) { couponList.splice(idx, 1); showToast(t("couponRemoved"), "warn"); }
  else {
    if (couponList.length >= MAX_COUPON) { showToast(t("couponMax"), "warn"); return; }
    couponList.push(p);
    showToast(t("couponAdded"));
    earnBadge("coupon");
  }
  renderCouponBuilder();
  updateCouponButtons();
}
function updateCouponButtons() {
  document.querySelectorAll(".coupon-btn").forEach(btn => {
    const id = btn.dataset.pickId;
    btn.classList.toggle("active", couponList.some(x => getPickId(x) === id));
  });
}
function renderCouponBuilder() {
  if (!cbList) return;
  if (fabCouponCount) fabCouponCount.textContent = couponList.length;

  if (couponList.length === 0) {
    cbList.innerHTML = `<div class="cb-empty">${t("cbEmpty")}</div>`;
    if (cbTotalOdds) cbTotalOdds.textContent = "0.00";
    if (cbTotalConf) cbTotalConf.textContent = "%0";
    return;
  }
  cbList.innerHTML = couponList.map(p => `
    <div class="cb-item">
      <div class="cb-item-info">
        <div class="cb-item-teams">${escapeHtml(p.home)} - ${escapeHtml(p.away)}</div>
        <div class="cb-item-meta">${escapeHtml(p.tip || "")} · Oran ${escapeHtml(String(p.odds || ""))} · %${getConfidence(p)}</div>
      </div>
      <button class="cb-item-remove" data-id="${escapeHtml(getPickId(p))}" type="button">✕</button>
    </div>
  `).join("");

  cbList.querySelectorAll(".cb-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const idx = couponList.findIndex(x => getPickId(x) === id);
      if (idx > -1) couponList.splice(idx, 1);
      renderCouponBuilder();
      updateCouponButtons();
    });
  });

  const totalOdds = couponList.reduce((s, p) => s * (getOddsNum(p) || 1), 1);
  const avgConf = Math.round(couponList.reduce((s, p) => s + getConfidence(p), 0) / couponList.length);
  if (cbTotalOdds) cbTotalOdds.textContent = totalOdds.toFixed(2);
  if (cbTotalConf) cbTotalConf.textContent = `%${avgConf}`;
}
async function shareCoupon() {
  if (couponList.length === 0) { showToast(t("cbEmpty"), "warn"); return; }
  const totalOdds = couponList.reduce((s, p) => s * (getOddsNum(p) || 1), 1).toFixed(2);
  const lines = couponList.map(p => `• ${p.home} - ${p.away}\n  ${p.tip || ""} @ ${p.odds || ""} (${getConfidence(p)}%)`);
  const text = `🎯 KUPONUM (${couponList.length} maç)\n💰 Toplam Oran: ${totalOdds}\n\n${lines.join("\n")}`;
  if (navigator.share) {
    try { await navigator.share({ title: "Kuponum", text }); } catch (e) {}
  } else {
    try { await navigator.clipboard.writeText(text); showToast(t("couponCopied")); }
    catch (e) { showToast(t("noShare"), "error"); }
  }
}
function clearCoupon() {
  couponList = [];
  renderCouponBuilder();
  updateCouponButtons();
}

/* ========== KART ========== */
function createCard(p, index) {
  const card = document.createElement("article");
  const id = getPickId(p);
  const isFav = favorites.has(id);
  const isLiked = likes.has(id);
  const isCompared = compareList.some(x => getPickId(x) === id);
  const isInCoupon = couponList.some(x => getPickId(x) === id);
  const status = statusInfo(p.status);
  const stars = confidenceStars(getConfidence(p));
  const oran = p.odds || p.oran || "-";
  const tahmin = p.tip || p.pick || p.prediction || p.tahmin || "";
  const lig = p.league || p.lig || "";
  const ev = p.home || p.evSahibi || "";
  const dep = p.away || p.deplasman || "";
  const homeLogo = p.homeLogo || "";
  const awayLogo = p.awayLogo || "";
  const kickoff = p.kickoff || "";
  const macSaati = p.time || p.date || "";
  const analiz = p.analysis || p.analiz || "";
  const conf = getConfidence(p);
  const oddsChange = getOddsChange(p);

  card.className = `coupon-card ${cardConfClass(p)}`;
  card.dataset.pickId = id;
  card.style.animationDelay = `${Math.min(index * 40, 600)}ms`;

  // Tags
  const tags = [];
  if (isNew(p)) tags.push(`<span class="tag tag-new">🆕 ${t("newTag")}</span>`);
  if (isLive(p)) tags.push(`<span class="tag tag-live">🔴 ${t("liveTag")}</span>`);
  if (isValueBet(p)) tags.push(`<span class="tag tag-value">💎 ${t("valueTag")}</span>`);
  const tagsHtml = tags.length ? `<div class="card-tags">${tags.join("")}</div>` : "";

  const bankoBadge = isBanko(p) ? `<span class="banko-badge">BANKO</span>` : "";
  const homeLogoHtml = homeLogo ? `<img src="${escapeHtml(homeLogo)}" class="team-logo" alt="" loading="lazy" onerror="this.style.display='none'">` : "";
  const awayLogoHtml = awayLogo ? `<img src="${escapeHtml(awayLogo)}" class="team-logo" alt="" loading="lazy" onerror="this.style.display='none'">` : "";
  const countdownHtml = kickoff ? `
    <div class="countdown-box">
      <span class="countdown-label">${t("countdownLabel")}</span>
      <span class="countdown" data-kickoff="${escapeHtml(kickoff)}">${getCountdown(kickoff)}</span>
    </div>` : "";
  const oddsChangeHtml = oddsChange
    ? `<span class="odds-change ${oddsChange.dir}">${oddsChange.dir === "up" ? "▲" : "▼"} ${oddsChange.diff}</span>`
    : "";

  card.innerHTML = `
    ${tagsHtml}
    <div class="card-actions">
      <button class="card-action-btn fav-btn ${isFav ? "active" : ""}" type="button" title="Favori">${isFav ? "★" : "☆"}</button>
      <button class="card-action-btn like-btn ${isLiked ? "liked" : ""}" type="button" title="Beğen">👍</button>
      <button class="card-action-btn coupon-btn ${isInCoupon ? "active" : ""}" data-pick-id="${escapeHtml(id)}" type="button" title="Kupona ekle">🎯</button>
      <button class="card-action-btn compare-btn ${isCompared ? "compared" : ""}" data-pick-id="${escapeHtml(id)}" type="button" title="Karşılaştır">⚖️</button>
      <button class="card-action-btn share-btn" type="button" title="Paylaş">📤</button>
    </div>

    <div class="card-top">
      <span class="league">${escapeHtml(lig)}</span>
      ${bankoBadge}
      <span class="status ${status.cls}">${status.text}</span>
    </div>

    <div class="teams">
      <div class="team">${homeLogoHtml}<span class="team-name">${escapeHtml(ev)}</span></div>
      <span class="vs">-</span>
      <div class="team">${awayLogoHtml}<span class="team-name">${escapeHtml(dep)}</span></div>
    </div>

    <div class="card-mid">
      <div class="info-box">
        <span class="info-label">${t("prediction")}</span>
        <span class="info-value">${escapeHtml(tahmin)}</span>
      </div>
      <div class="info-box">
        <span class="info-label">ORAN</span>
        <span class="info-value odds">${escapeHtml(String(oran))}${oddsChangeHtml}</span>
      </div>
    </div>

    ${countdownHtml}
    ${analiz ? `<p class="analysis">${escapeHtml(analiz)}</p>` : ""}

    <div class="card-bottom">
      <span class="date">${escapeHtml(macSaati)}</span>
      <span class="stars" title="%${conf}">${stars}</span>
    </div>
  `;

  card.querySelector(".fav-btn").addEventListener("click", e => { e.stopPropagation(); toggleFavorite(id); });
  card.querySelector(".like-btn").addEventListener("click", e => { e.stopPropagation(); toggleLike(id); });
  card.querySelector(".coupon-btn").addEventListener("click", e => { e.stopPropagation(); toggleCoupon(p); });
  card.querySelector(".compare-btn").addEventListener("click", e => { e.stopPropagation(); toggleCompare(p); });
  card.querySelector(".share-btn").addEventListener("click", e => { e.stopPropagation(); sharePick(p); });
  card.addEventListener("click", () => openDetail(p));

  return card;
}

/* ========== MODAL ========== */
function openDetail(p) {
  const conf = getConfidence(p);
  const homeLogo = p.homeLogo ? `<img src="${escapeHtml(p.homeLogo)}" class="modal-team-logo" onerror="this.style.display='none'">` : "";
  const awayLogo = p.awayLogo ? `<img src="${escapeHtml(p.awayLogo)}" class="modal-team-logo" onerror="this.style.display='none'">` : "";
  const id = getPickId(p);
  const isFav = favorites.has(id);
  const isLiked = likes.has(id);

  // Form / H2H / İstatistik verisi varsa göster
  const dc = p.detailsContent || {};
  const stats = dc.statistics || null;
  const h2h = p.h2h || (dc.h2h && dc.h2h.length ? dc.h2h : null) || null;

  let formHtml = "";
  if (h2h && h2h.length) {
    formHtml = `
      <div class="modal-section">
        <div class="modal-section-title">🤝 SON KARŞILAŞMALAR (H2H)</div>
        <div class="form-list">
          ${h2h.map(m => `
            <div class="form-match">
              <div class="team-h">${escapeHtml(m.home)}</div>
              <div class="score">${escapeHtml(m.score)}</div>
              <div class="team-a">${escapeHtml(m.away)}</div>
              <div class="date">${escapeHtml(m.date || "")}</div>
            </div>
          `).join("")}
        </div>
      </div>`;
  }

  let statsHtml = "";
  if (p.statistics || stats) {
    const s = p.statistics || {};
    const poss = s.possession || null;
    const shots = s.shots || null;
    const sot = s.shotsOnTarget || null;
    const cards = s.yellowCards || null;
    const corners = s.corners || null;
    if (poss || shots || sot || cards || corners) {
      const row = (label, h, a) => (h == null || a == null) ? "" : `
        <div class="compare-row">
          <span class="label">${label}</span>
          <span class="value">${h} - ${a}</span>
        </div>`;
      statsHtml = `
        <div class="modal-section">
          <div class="modal-section-title">📊 İSTATİSTİKLER</div>
          ${row("Topla Oynama %", poss && poss.home, poss && poss.away)}
          ${row("Şut", shots && shots.home, shots && shots.away)}
          ${row("İsabetli Şut", sot && sot.home, sot && sot.away)}
          ${row("Korner", corners && corners.home, corners && corners.away)}
          ${row("Sarı Kart", cards && cards.home, cards && cards.away)}
        </div>`;
    }
  }

  modalBody.innerHTML = `
    <div class="modal-league">${escapeHtml(p.league || "")}</div>
    <div class="modal-teams">
      <div class="modal-team">${homeLogo}<span class="modal-team-name">${escapeHtml(p.home || "")}</span></div>
      <span class="modal-vs">-</span>
      <div class="modal-team">${awayLogo}<span class="modal-team-name">${escapeHtml(p.away || "")}</span></div>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-box">
        <div class="modal-info-label">${t("prediction")}</div>
        <div class="modal-info-value">${escapeHtml(p.tip || p.pick || "")}</div>
      </div>
      <div class="modal-info-box">
        <div class="modal-info-label">ORAN</div>
        <div class="modal-info-value odds">${escapeHtml(String(p.odds || ""))}</div>
      </div>
      <div class="modal-info-box">
        <div class="modal-info-label">GÜVEN</div>
        <div class="modal-info-value conf">%${conf}</div>
      </div>
    </div>
    ${statsHtml}
    ${formHtml}
    ${p.analysis ? `<div class="modal-analysis">${escapeHtml(p.analysis)}</div>` : ""}
    <div class="modal-actions">
      <button class="modal-action-btn ${isFav ? "active" : ""}" id="modalFavBtn">
        ${isFav ? t("favRemove") : t("favAdd")}
      </button>
      <button class="modal-action-btn ${isLiked ? "active" : ""}" id="modalLikeBtn">
        👍 ${isLiked ? "Beğenildi" : "Beğen"}
      </button>
      <button class="modal-action-btn" id="modalCouponBtn">🎯 Kupona Ekle</button>
      <button class="modal-action-btn" id="modalShareBtn">📤 ${t("share")}</button>
    </div>
  `;

  $("modalFavBtn").addEventListener("click", () => { toggleFavorite(id); openDetail(p); });
  $("modalLikeBtn").addEventListener("click", () => { toggleLike(id); openDetail(p); });
  $("modalCouponBtn").addEventListener("click", () => { toggleCoupon(p); });
  $("modalShareBtn").addEventListener("click", () => sharePick(p));

  detailModal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDetail() {
  detailModal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ========== FİLTRELEME ========== */
function applyFilters() {
  const q = normalize(searchText);
  filteredPicks = allPicks.filter(p => {
    const id = getPickId(p);
    if (activeFilter === "banko" && !isBanko(p)) return false;
    if (activeFilter === "high" && getConfidence(p) < 75) return false;
    if (activeFilter === "value" && !isValueBet(p)) return false;
    if (activeFilter === "risky" && getOddsNum(p) < 1.8) return false;
    if (activeFilter === "today" && p.today === false) return false;
    if (activeFilter === "favorites" && !favorites.has(id)) return false;
    if (leagueFilter !== "all" && normalize(p.league) !== normalize(leagueFilter)) return false;
    if (timeFilter !== "all") {
      const h = parseInt(String(p.time || "").split(":")[0], 10);
      if (isNaN(h)) return false;
      if (timeFilter === "morning" && h >= 12) return false;
      if (timeFilter === "afternoon" && (h < 12 || h >= 18)) return false;
      if (timeFilter === "evening" && h < 18) return false;
    }
    if (q) {
      const havuz = normalize([p.league, p.lig, p.home, p.away, p.tip, p.pick, p.prediction, p.tahmin, p.analysis, p.analiz].join(" "));
      if (!havuz.includes(q)) return false;
    }
    return true;
  });

  if (sortMode === "confHigh") filteredPicks.sort((a, b) => getConfidence(b) - getConfidence(a));
  else if (sortMode === "confLow") filteredPicks.sort((a, b) => getConfidence(a) - getConfidence(b));
  else if (sortMode === "oddsHigh") filteredPicks.sort((a, b) => getOddsNum(b) - getOddsNum(a));
  else if (sortMode === "oddsLow") filteredPicks.sort((a, b) => getOddsNum(a) - getOddsNum(b));
  else if (sortMode === "time") filteredPicks.sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")));

  render();
}

/* ========== EKRANA ÇİZİM ========== */
function render() {
  if (!couponContainer) return;
  couponContainer.innerHTML = "";
  if (resultCount) resultCount.textContent = `${filteredPicks.length} MAÇ`;
  if (matchCount) matchCount.textContent = String(filteredPicks.length);
  if (filteredPicks.length === 0) {
    if (noResults) noResults.style.display = "block";
    return;
  }
  if (noResults) noResults.style.display = "none";
  const frag = document.createDocumentFragment();
  filteredPicks.forEach((p, i) => frag.appendChild(createCard(p, i)));
  couponContainer.appendChild(frag);
  startCountdownTimer();
}

/* ========== İSTATİSTİK ========== */
function renderStats() {
  const src = filteredPicks.length > 0 ? filteredPicks : allPicks;
  if (!src.length) {
    [statTotal, statBanko, statHigh].forEach(el => el && (el.textContent = "0"));
    if (statAvgConf) statAvgConf.textContent = "%0";
    if (statAvgOdds) statAvgOdds.textContent = "0.00";
    if (statValue) statValue.textContent = "0";
    return;
  }
  const total = src.length;
  const banko = src.filter(isBanko).length;
  const high = src.filter(p => getConfidence(p) >= 75).length;
  const value = src.filter(isValueBet).length;
  const avgConf = Math.round(src.reduce((s, p) => s + getConfidence(p), 0) / total);
  const oddsArr = src.map(getOddsNum).filter(n => n > 0);
  const avgOdds = oddsArr.length ? (oddsArr.reduce((a, b) => a + b, 0) / oddsArr.length).toFixed(2) : "0.00";
  if (statTotal) statTotal.textContent = total;
  if (statBanko) statBanko.textContent = banko;
  if (statHigh) statHigh.textContent = high;
  if (statValue) statValue.textContent = value;
  if (statAvgConf) statAvgConf.textContent = `%${avgConf}`;
  if (statAvgOdds) statAvgOdds.textContent = avgOdds;
}

/* ========== GRAFİK ========== */
function renderChart() {
  if (!chartBars) return;
  if (!allPicks.length) { chartBars.innerHTML = ""; return; }
  const buckets = [
    { label: "0-50", min: 0, max: 50, count: 0 },
    { label: "50-70", min: 50, max: 70, count: 0 },
    { label: "70-80", min: 70, max: 80, count: 0 },
    { label: "80-90", min: 80, max: 90, count: 0 },
    { label: "90-100", min: 90, max: 101, count: 0 }
  ];
  allPicks.forEach(p => {
    const c = getConfidence(p);
    for (const b of buckets) if (c >= b.min && c < b.max) { b.count++; break; }
  });
  const maxCount = Math.max(...buckets.map(b => b.count), 1);
  chartBars.innerHTML = buckets.map(b => {
    const h = Math.round((b.count / maxCount) * 100);
    return `<div class="chart-bar-wrap"><div class="chart-bar-value">${b.count}</div><div class="chart-bar" style="height:${h}%"></div><div class="chart-bar-label">${b.label}%</div></div>`;
  }).join("");
}

/* ========== LİG İSTATİSTİK ========== */
function renderLeagueStats() {
  if (!leagueStatsGrid) return;
  const map = {};
  allPicks.forEach(p => {
    const l = p.league || "Diğer";
    if (!map[l]) map[l] = { count: 0, confTotal: 0, banko: 0 };
    map[l].count++;
    map[l].confTotal += getConfidence(p);
    if (isBanko(p)) map[l].banko++;
  });
  const arr = Object.entries(map).map(([name, s]) => ({
    name, count: s.count, avgConf: Math.round(s.confTotal / s.count), banko: s.banko
  })).sort((a, b) => b.avgConf - a.avgConf);

  if (!arr.length) { leagueStatsGrid.innerHTML = ""; return; }

  leagueStatsGrid.innerHTML = arr.map(l => `
    <div class="league-stat-row">
      <div class="ls-name">${escapeHtml(l.name)}</div>
      <div class="ls-count">${l.count} maç${l.banko > 0 ? ` · 🔥${l.banko}` : ""}</div>
      <div class="ls-conf">%${l.avgConf}</div>
    </div>
  `).join("");
}

/* ========== TOP 3 ========== */
function renderTopPicks() {
  if (!topPicksSection || !topPicksGrid) return;
  if (!allPicks.length) { topPicksSection.style.display = "none"; return; }
  const top3 = [...allPicks].sort((a, b) => getConfidence(b) - getConfidence(a)).slice(0, 3);
  topPicksGrid.innerHTML = top3.map((p, i) => `
    <div class="top-pick-card" data-pick-id="${escapeHtml(getPickId(p))}">
      <div class="top-pick-rank">${i + 1}</div>
      <div class="top-pick-info">
        <div class="top-pick-teams">${escapeHtml(p.home)} - ${escapeHtml(p.away)}</div>
        <div class="top-pick-meta">${escapeHtml(p.time || "")} · ${escapeHtml(p.tip || "")} · Oran ${escapeHtml(String(p.odds || ""))}</div>
      </div>
      <div class="top-pick-conf">%${getConfidence(p)}</div>
    </div>
  `).join("");
  topPicksGrid.querySelectorAll(".top-pick-card").forEach(card => {
    card.addEventListener("click", () => {
      const pick = allPicks.find(p => getPickId(p) === card.dataset.pickId);
      if (pick) openDetail(pick);
    });
  });
  topPicksSection.style.display = "block";
}

/* ========== LİG DROPDOWN ========== */
function populateLeagues() {
  if (!leagueSelect) return;
  const leagues = [...new Set(allPicks.map(p => p.league).filter(Boolean))].sort();
  const current = leagueSelect.value;
  leagueSelect.innerHTML = `<option value="all">${t("leagueAll")}</option>` +
    leagues.map(l => `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`).join("");
  if (leagues.includes(current)) leagueSelect.value = current;
}

/* ========== DURUM ========== */
function setStatus(type, msg) {
  if (statusIndicator) statusIndicator.className = "status-indicator " + type;
  if (statusMessage) statusMessage.textContent = msg;
  if (dataStatus) dataStatus.textContent = type === "success" ? t("current") : type === "error" ? t("error") : "...";
}
function setLastUpdate() {
  if (!lastUpdate) return;
  const d = new Date();
  const sa = String(d.getHours()).padStart(2, "0");
  const dk = String(d.getMinutes()).padStart(2, "0");
  lastUpdate.textContent = `${t("lastUpdate")}: ${sa}:${dk}`;
}

/* ========== VERİ YÜKLE ========== */
async function loadPicks() {
  setStatus("loading", t("loadingData"));
  if (couponContainer) couponContainer.innerHTML = `<div class="loading-card"><div class="loading-spinner">⚽</div><h3>${t("loading")}</h3></div>`;
  try {
    const res = await fetch("/api/picks", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data && data.success === false) throw new Error(data.error || "API error");
    allPicks = Array.isArray(data) ? data : (data.picks || []);
    updateSeenIds();
    populateLeagues();
    applyFilters();
    renderStats();
    renderChart();
    renderLeagueStats();
    renderTopPicks();
    updateFavCount();
    checkBankoNotification();
    savePrevOdds();
    setStatus("success", `${allPicks.length} maç yüklendi`);
    setLastUpdate();
  } catch (err) {
    console.error("Veri yükleme hatası:", err);
    allPicks = [];
    filteredPicks = [];
    render();
    renderStats();
    setStatus("error", t("error"));
    if (noResults) {
      noResults.style.display = "block";
      noResults.innerHTML = `<div class="no-results-icon">⚠️</div><h3>${t("error")}</h3><p>API bağlantı hatası</p>`;
    }
  }
}

/* ========== RASTGELE MAÇ ========== */
function randomMatch() {
  if (!allPicks.length) { showToast(t("noResult"), "warn"); return; }
  const pick = allPicks[Math.floor(Math.random() * allPicks.length)];
  openDetail(pick);
  earnBadge("random");
}

/* ========== OLAYLAR ========== */
function bindEvents() {
  if (todayDate) todayDate.textContent = formatToday();
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (langToggle) langToggle.addEventListener("click", toggleLang);
  if (notifBtn) notifBtn.addEventListener("click", toggleNotifications);
  if (randomMatchBtn) randomMatchBtn.addEventListener("click", randomMatch);

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchText = e.target.value;
      applyFilters();
      renderStats();
    });
  }
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = normalize(btn.dataset.filter || "all");
      applyFilters();
      renderStats();
    });
  });
  if (leagueSelect) leagueSelect.addEventListener("change", e => { leagueFilter = e.target.value; applyFilters(); renderStats(); });
  if (timeSelect) timeSelect.addEventListener("change", e => { timeFilter = e.target.value; applyFilters(); renderStats(); });
  if (sortSelect) sortSelect.addEventListener("change", e => { sortMode = e.target.value; applyFilters(); });

  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      refreshButton.disabled = true;
      loadPicks().finally(() => { refreshButton.disabled = false; });
    });
  }

  // Modal
  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeDetail));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeDetail(); couponBuilder.classList.remove("open"); comparePanel.classList.remove("open"); } });

  // Karşılaştırma paneli
  if ($("compareClearBtn")) $("compareClearBtn").addEventListener("click", clearCompare);
  if ($("compareCloseBtn")) $("compareCloseBtn").addEventListener("click", () => comparePanel.classList.remove("open"));

  // Kupon builder
  if (fabCoupon) fabCoupon.addEventListener("click", () => couponBuilder.classList.toggle("open"));
  if ($("cbClose")) $("cbClose").addEventListener("click", () => couponBuilder.classList.remove("open"));
  if ($("cbClear")) $("cbClear").addEventListener("click", clearCoupon);
  if ($("cbShare")) $("cbShare").addEventListener("click", shareCoupon);

  // Karşılaştır FAB
  if (fabCompare) fabCompare.addEventListener("click", () => {
    if (compareList.length === 0) { showToast(t("compareTitle") + ": " + t("compareMax"), "warn"); return; }
    comparePanel.classList.toggle("open");
  });

  // Scroll top
  if (fabScrollTop) {
    fabScrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      fabScrollTop.classList.toggle("show", window.scrollY > 500);
    });
  }

  // Duyuru bar
  if (announcementClose) {
    announcementClose.addEventListener("click", () => {
      announcementBar.style.display = "none";
      try { localStorage.setItem("coupon_ann_closed", "1"); } catch (e) {}
    });
    try { if (localStorage.getItem("coupon_ann_closed") === "1") announcementBar.style.display = "none"; } catch (e) {}
  }
}

/* ========== BAŞLAT ========== */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadFavorites();
  loadLikes();
  loadLang();
  loadPrevOdds();
  loadSeenIds();
  loadNotif();
  updateFavCount();
  renderBadges();
  renderComparePanel();
  renderCouponBuilder();
  bindEvents();
  loadPicks();
  earnBadge("first");
  const h = new Date().getHours();
  if (h >= 6 && h < 9) earnBadge("early");
});
