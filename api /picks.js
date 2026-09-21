/* =====================================================
   ÇOKLU KAYNAKLI API - FOOTEO + BETBETTER + FOOTBALLCHARTS
===================================================== */

const FOOTEO_URL = "https://footeoplay.com/tr/picks";
const BETBETTER_BASE = "https://betbetter.world";
const FOOTBALLCHARTS_BASE = "https://footballcharts-backend.onrender.com/api/v1";

// BetBetter futbol ligleri
const BETBETTER_SOCCER_LEAGUES = [
  "soccer/epl",
  "soccer/la-liga",
  "soccer/serie-a",
  "soccer/bundesliga",
  "soccer/ligue-1",
  "soccer/world-cup"
];

// FootballCharts lig anahtarları (list_leagues'ten alınan doğrulanmış slug'lar)
const FOOTBALLCHARTS_LEAGUES = ["premier", "spain1", "italy1", "germany1", "france1"];

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const allPicks = [];

  const results = await Promise.allSettled([
    fetchFooteo(),
    fetchBetBetter(),
    fetchFootballCharts()
  ]);

  results.forEach((result, i) => {
    const sourceName = ["footeo", "betbetter", "footballcharts"][i];
    if (result.status === "fulfilled") {
      allPicks.push(...result.value);
      console.log(`✅ ${sourceName}: ${result.value.length} maç`);
    } else {
      console.error(`❌ ${sourceName} hatası:`, result.reason?.message);
    }
  });

  const unique = removeDuplicates(allPicks);

  return res.status(200).json({
    success: true,
    updated_at: new Date().toISOString(),
    count: unique.length,
    sources: {
      footeo: allPicks.filter(p => p.source === "footeo").length,
      betbetter: allPicks.filter(p => p.source === "betbetter").length,
      footballcharts: allPicks.filter(p => p.source === "footballcharts").length
    },
    picks: unique
  });
}


/* =====================================================
   1. FOOTEO PARSER
===================================================== */

async function fetchFooteo() {
  try {
    const res = await fetch(FOOTEO_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8"
      },
      cache: "no-store"
    });

    if (!res.ok) return [];
    const html = await res.text();
    return parseFooteo(html);
  } catch (e) {
    console.error("Footeo hatası:", e.message);
    return [];
  }
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
   2. BETBETTER (Doğrulanmış API - Kayıt gerekmez)
   Kaynak: https://betbetter.world/api/
===================================================== */

async function fetchBetBetter() {
  const allPicks = [];

  for (const league of BETBETTER_SOCCER_LEAGUES) {
    try {
      // Doğru format: https://betbetter.world/{lig}/picks?format=json
      const res = await fetch(`${BETBETTER_BASE}/${league}/picks?format=json`, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; MacKuponlari/1.0)"
        },
        cache: "no-store"
      });

      if (!res.ok) {
        console.warn(`BetBetter ${league}: HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const picks = data.picks || [];

      picks.forEach(pick => {
        // "game" alanı "Away @ Home" formatındadır
        const game = pick.game || "";
        let home = "", away = "";

        if (game.includes("@")) {
          const parts = game.split("@").map(s => s.trim());
          away = parts[0] || "";
          home = parts[1] || "";
        }

        if (!home || !away) return;

        // Sadece "Head to Head" marketini al (1X2)
        if (pick.market && pick.market !== "Head to Head") return;

        // Güven derecesini yüzdeye çevir
        const confMap = { "HIGH": 85, "LEAN": 70, "LONG-SHOT": 55 };
        const confidence = pick.modelProbabilityPct ||
                          confMap[pick.confidence] || 55;

        allPicks.push({
          id: `betbetter_${league}_${home}_${away}`.replace(/[\s/]+/g, "_"),
          source: "betbetter",
          league: league.replace("soccer/", "").toUpperCase().replace("-", " "),
          home: home,
          away: away,
          homeLogo: "",
          awayLogo: "",
          time: pick.gameTimeUtc ? new Date(pick.gameTimeUtc).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "",
          kickoff: pick.gameTimeUtc || "",
          tip: pick.selection || "",
          odds: String(pick.fairOdds || ""),
          prob: Math.round(confidence),
          confidence: Math.round(confidence),
          analysis: pick.verdict || `BetBetter model: ${pick.selection} (${pick.confidence})`,
          isHero: pick.confidence === "HIGH",
          today: true
        });
      });

    } catch (e) {
      console.error(`BetBetter ${league} hatası:`, e.message);
    }
  }

  return allPicks;
}


/* =====================================================
   3. FOOTBALLCHARTS (Doğrulanmış API - Kayıt gerekmez)
   Kaynak: https://footballcharts-backend.onrender.com/api/v1/
===================================================== */

async function fetchFootballCharts() {
  const allPicks = [];

  for (const league of FOOTBALLCHARTS_LEAGUES) {
    try {
      // Doğru endpoint: /api/v1/leagues/{league}/fixtures/
      const res = await fetch(`${FOOTBALLCHARTS_BASE}/leagues/${league}/fixtures/`, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; MacKuponlari/1.0)"
        },
        cache: "no-store"
      });

      if (!res.ok) {
        console.warn(`FootballCharts ${league}: HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const fixtures = data.matches || [];

      fixtures.forEach(fx => {
        const home = fx.home_team || fx.homeTeam || "";
        const away = fx.away_team || fx.awayTeam || "";
        if (!home || !away) return;

        const probs = fx.probabilities || fx.model_probabilities || {};
        const homeWin = probs.home_win || probs.home || 0;
        const draw = probs.draw || 0;
        const awayWin = probs.away_win || probs.away || 0;

        let tip = "Home", maxProb = homeWin;
        if (draw > maxProb) { tip = "Draw"; maxProb = draw; }
        if (awayWin > maxProb) { tip = "Away"; maxProb = awayWin; }

        const fairOdds = maxProb > 0 ? (100 / maxProb).toFixed(2) : "";

        allPicks.push({
          id: `footballcharts_${league}_${home}_${away}`.replace(/[\s/]+/g, "_"),
          source: "footballcharts",
          league: league.toUpperCase(),
          home: home,
          away: away,
          homeLogo: "",
          awayLogo: "",
          time: fx.kickoff_time || fx.time || "",
          kickoff: fx.kickoff_utc || fx.date || "",
          tip: tip,
          odds: fairOdds,
          prob: Math.round(maxProb),
          confidence: Math.round(maxProb),
          analysis: `FootballCharts model: ${tip} (${Math.round(maxProb)}%)`,
          isHero: maxProb >= 80,
          today: true
        });
      });

    } catch (e) {
      console.error(`FootballCharts ${league} hatası:`, e.message);
    }
  }

  return allPicks;
}


/* =====================================================
   YARDIMCI: Tekrarları temizle
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
