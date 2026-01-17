

const GITHUB_USERNAME = "Arkangel-96";

const svg = document.getElementById("github-graph");

const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

/* ===============================
   CACHE CONFIG
================================ */
const CACHE_KEY = "github_contributions_cache";
const CACHE_TIME_KEY = "github_contributions_cache_time";
const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 horas

function getCachedWeeks() {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);

  if (!data || !time) return null;
  if (Date.now() - Number(time) > CACHE_TTL) return null;

  return JSON.parse(data);
}

function setCachedWeeks(weeks) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(weeks));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
}

/* ===============================
   FETCH + CACHE
================================ */
async function loadGithubActivity() {

  // 🧠 1️⃣ intentar cache
  const cachedWeeks = getCachedWeeks();
  if (cachedWeeks) {
    console.log("🟢 GitHub data desde cache");
    renderSVG(cachedWeeks);
    return;
  }

  console.log("🔵 GitHub data desde API (backend)");

  // 🔥 NUEVO FETCH → TU BACKEND
  const res = await fetch("/api/github-activity");

  if (!res.ok) {
    console.error("Error cargando GitHub activity");
    return;
  }

  const events = await res.json();

  /*
    Convertimos eventos públicos en formato compatible
    con contributionCalendar.weeks
  */
  const daysMap = {};

  events.forEach(event => {
    if (event.type !== "PushEvent") return;

    const date = event.created_at.split("T")[0];

    if (!daysMap[date]) {
      daysMap[date] = {
        date,
        contributionCount: 0,
      };
    }

    daysMap[date].contributionCount += 1;
  });

  const days = Object.values(daysMap);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      contributionDays: days.slice(i, i + 7),
    });
  }

  // 🧠 2️⃣ guardar cache
  setCachedWeeks(weeks);

  renderSVG(weeks);
}

/* ===============================
   SVG RENDER
================================ */
function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}

function renderSVG(weeks) {
  let output = `<g class="contrib-grid">`;

  // 🗓️ meses
  let lastMonth = null;
  weeks.forEach((week, w) => {
    if (!week.contributionDays[0]) return;

    const date = new Date(week.contributionDays[0].date);
    const month = date.getMonth();
    if (month !== lastMonth) {
      output += `
        <text x="${w * 14}" y="10" class="month-label">
          ${months[month]}
        </text>
      `;
      lastMonth = month;
    }
  });

  // 🟩 cuadrados
  weeks.forEach((week, w) => {
    week.contributionDays.forEach((day, d) => {
      const level = getLevel(day.contributionCount);
      output += `
        <rect
          x="${w * 14}"
          y="${d * 14 + 14}"
          width="12"
          height="12"
          rx="2"
          class="lvl-${level}">
          <title>${day.contributionCount} contributions on ${day.date}</title>
        </rect>
      `;
    });
  });

  output += `</g>`;
  svg.innerHTML = output;
}

/* ===============================
   BOOT
================================ */
loadGithubActivity();
