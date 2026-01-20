
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
   DATA SHAPE
================================ */
function buildWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      contributionDays: days.slice(i, i + 7).map(d => ({
        date: d.date,
        contributionCount: d.count
      }))
    });
  }
  return weeks;
}

/* ===============================
   SVG
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

  // meses
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

  // cuadrados
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
