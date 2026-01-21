
const svg = document.getElementById("github-graph");

const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];



/* ===============================
   CACHE
================================ */
const CACHE_KEY = "github_contributions_cache";
const CACHE_TIME_KEY = "github_contributions_cache_time";
const CACHE_TTL = 1000 * 60 * 60 * 12; // 12h

function getCachedData() {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);
  if (!data || !time) return null;
  if (Date.now() - Number(time) > CACHE_TTL) return null;
  return JSON.parse(data);
}

function setCachedData(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
}

/* ===============================
   FETCH
================================ */
async function loadGithubActivity() {
  const cached = getCachedData();
  if (cached) {
    renderSVG(buildWeeks(cached));
    return;
  }

  const res = await fetch("/api/github-activity");
  const days = await res.json();

  setCachedData(days);
  renderSVG(buildWeeks(days));
}

/* ===============================
   DATA SHAPE (FIX DOMINGO)
================================ */
function getWeekday(dateStr) {
  return new Date(dateStr + "T00:00:00").getDay(); // 0 = domingo
}

function buildWeeks(days) {
  const result = [];

  if (!days.length) return result;

  const firstDate = new Date(days[0].date);
  const startDay = firstDate.getDay(); // 0 = domingo

  // 1️⃣ rellenar días vacíos ANTES del primer día real
  for (let i = 0; i < startDay; i++) {
    result.push({
      date: null,
      contributionCount: 0
    });
  }

  // 2️⃣ agregar días reales
  days.forEach(d => {
    result.push({
      date: d.date,
      contributionCount: d.count
    });
  });

  // 3️⃣ agrupar en semanas de 7
  const weeks = [];
  for (let i = 0; i < result.length; i += 7) {
    weeks.push({
      contributionDays: result.slice(i, i + 7)
    });
  }

  return weeks;
}


/* ===============================
   SVG
================================ */

function getLevel(count) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function renderSVG(weeks) {
  const OFFSET_X = 42;
  const OFFSET_Y = 14;

  let output = `<g class="contrib-grid">`;

  // meses
  let lastMonth = null;
  weeks.forEach((week, w) => {
    const firstDay = week.contributionDays.find(d => d?.date);
    if (!firstDay) return;

    const date = new Date(firstDay.date);
    const month = date.getMonth();

    if (month !== lastMonth) {
      output += `
        <text
          x="${OFFSET_X + w * 14}"
          y="10"
          class="month-label"
        >
          ${months[month]}
        </text>
      `;
      lastMonth = month;
    }
  });

  // cuadrados
  weeks.forEach((week, w) => {
    week.contributionDays.forEach((day, d) => {
      const level = getLevel(day.contributionCount);
      output += `
        <rect
          x="${OFFSET_X + w * 14}"
          y="${OFFSET_Y + d * 14}"
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
