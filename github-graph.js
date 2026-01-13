

const GITHUB_USERNAME = "Arkangel-96";
const GITHUB_TOKEN = ""; // 

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

  console.log("🔵 GitHub data desde API");

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + GITHUB_TOKEN
    },
    body: JSON.stringify({ query })
  });

  const json = await res.json();

  const weeks =
    json.data.user.contributionsCollection.contributionCalendar.weeks;

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
