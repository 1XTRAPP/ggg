/* =====================================================
   API - FOOTEO + BZZOIRO (CatBoost ML Tahminleri)
===================================================== */

const FOOTEO_URL = "https://footeoplay.com/tr/picks";
const BZZOIRO_BASE = "https://sports.bzzoiro.com/api/v2";
const BZZOIRO_TOKEN = process.env.BZZOIRO_TOKEN;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const allPicks = [];
  const debug = {
    footeo: { status: "pending", count: 0, error: null },
    bzzoiro: { status: "pending", count: 0, error: null }
  };

  // 1. Footeo
  try {
    const footeoPicks = await fetchFooteo();
    allPicks.push(...footeoPicks);
    debug.footeo = { status: "success", count: footeoPicks.length, error: null };
  } catch (e) {
    debug.footeo = { status: "error", count: 0, error: e.message };
  }

  // 2. Bzzoiro
  try {
    const bzzoiroPicks = await fetchBzzoiro();
    allPicks.push(...bzzoiroPicks);
    debug.bzzoiro = { status: "success", count: bzzoiroPicks.length, error: null };
  } catch (e) {
    debug.bzzoiro = { status: "error", count: 0, error: e.message };
  }

  const unique = removeDuplicates(allPicks);

  return res.status(200).json({
    success: true,
    updated_at: new Date().toISOString(),
    count: unique.length,
    debug: debug,
    picks: unique
  });
}


/* =====================================================
   FOOTEO PARSER
===================================================== */

async function fetchFooteo() {
  const res = await fetch(FOOTEO_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8"
    },
    cache: "no-store"
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  return parseFooteo(html);
}

function parseFooteo(html) {
  const picks = [];
  const regex = /self\.__next_f\.push\s*\(\s*\[\s*\d+\s*,\s*("(?:[^"\\]|\\.)*")\s*\]\s*\)/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    let str;
    try { str = JSON.parse(match[1]); } catch (e) { continue; }
    const idx = str.indexOf('"initialPicks":');
    if (idx === -1) continue;

    const arrayStart = str.indexOf('[', idx);
    if (arrayStart === -1) continue;

    let depth = 0, inString = false, escaped = false, end = -1;
    for (let i = arrayStart; i < str.length; i++) {
      const ch = str[i];
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;

    try {
      const arr = JSON.parse(str.substring(arrayStart, end + 1));
      arr.forEach(item => {
        picks.push({
          id: `footeo_${item.id}`,
          source: "footeo",
          league: item.league || "",
          home: item.home || "",
          away: item.away || "",
          homeLogo: item.homeLogo || "",
          awayLogo: item.awayLogo || "",
          time: item.time || "",
          kickoff: item.kickoff || "",
          tip: item.tip || "",
          odds: String(item.odds || ""),
          prob: item.prob || 0,
          confidence: item.prob || 0,
          analysis: item.analysis || "",
          isHero: item.isHero || false,
          today: true
        });
      });
      break;
    } catch (e) { continue; }
  }
  return picks;
}


/* =====================================================
   BZZOIRO SPORTS DATA (CatBoost ML Tahminleri)
===================================================== */

async function fetchBzzoiro() {
  if (!BZZOIRO_TOKEN) {
    console.warn("BZZOIRO_TOKEN tanımlı değil, atlanıyor");
    return [];
  }

  const res = await fetch(`${BZZOIRO_BASE}/predictions/?upcoming=true`, {
    headers: {
      "Authorization": `Token ${BZZOIRO_TOKEN}`,
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; MacKuponlari/1.0)"
    },
    cache: "no-store"
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const predictions = data.results || [];

  return predictions.map(p => {
    const event = p.event || {};
    const home = event.home_team || "";
    const away = event.away_team || "";
    if (!home || !away) return null;

    const probs = {
      "Home": p.prob_home_win || 0,
      "Draw": p.prob_draw || 0,
      "Away": p.prob_away_win || 0
    };
    let tip = "Home", maxProb = probs.Home;
    if (probs.Draw > maxProb) { tip = "Draw"; maxProb = probs.Draw; }
    if (probs.Away > maxProb) { tip = "Away"; maxProb = probs.Away; }

    const fairOdds = maxProb > 0 ? (100 / maxProb).toFixed(2) : "";
    const confidence = Math.round(maxProb);

    return {
      id: `bzzoiro_${p.id}`,
      source: "bzzoiro",
      league: event.league?.name || "Bzzoiro",
      home: home,
      away: away,
      homeLogo: event.home_team_obj?.logo || "",
      awayLogo: event.away_team_obj?.logo || "",
      time: event.event_date ? new Date(event.event_date).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "",
      kickoff: event.event_date || "",
      tip: tip,
      odds: fairOdds,
      prob: confidence,
      confidence: confidence,
      analysis: `CatBoost ML: ${tip} (${confidence}%) - Skor: ${p.most_likely_score || "-"}`,
      isHero: confidence >= 80,
      today: true
    };
  }).filter(Boolean);
}


/* =====================================================
   YARDIMCI
===================================================== */

function removeDuplicates(picks) {
  const seen = new Set();
  return picks.filter(p => {
    const key = `${normalize(p.home)}|${normalize(p.away)}|${p.tip}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalize(s) {
  return String(s || "").toLowerCase()
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "");
}
