
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

  // 1️⃣ mapa rápido por fecha
  const map = {};
  days.forEach(d => {
    map[d.date] = d.count;
  });

  // 2️⃣ rango completo
  const start = new Date(days[0].date);
  const end   = new Date(days[days.length - 1].date);

  // 3️⃣ retroceder hasta domingo
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }

  let currentWeek = [];

  // 4️⃣ recorrer día por día
  for (
    let d = new Date(start);
    d <= end;
    d.setDate(d.getDate() + 1)
  ) {
    
    const iso = d.toISOString().slice(0, 10);

    currentWeek.push({
      date: iso,
      contributionCount: map[iso] ?? 0
    });

    // 5️⃣ domingo → sábado = semana completa
    if (d.getDay() === 6) {
      result.push({ contributionDays: currentWeek });
      currentWeek = [];
    }
  }

  // 6️⃣ cola incompleta
  if (currentWeek.length) {
    result.push({ contributionDays: currentWeek });
  }

  return result;

  
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
  const OFFSET_X = 28;
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
