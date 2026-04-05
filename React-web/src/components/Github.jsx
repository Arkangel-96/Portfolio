
import { useEffect, useRef } from "react";

export default function Github() {
  const svgRef = useRef(null);

  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  /* ===============================
     CACHE
  ============================== */
  const CACHE_KEY = "github_contributions_cache";
  const CACHE_TIME_KEY = "github_contributions_cache_time";
  const CACHE_TTL = 1000 * 60 * 60 * 12;

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
     DATA
  ============================== */

  function getLevel(count) {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  }

  function buildWeeks(days) {
    const result = [];
    const map = {};

    days.forEach(d => {
      map[d.date] = d.count;
    });

    const start = new Date(days[0].date);
    const end   = new Date(days[days.length - 1].date);

    while (start.getDay() !== 0) {
      start.setDate(start.getDate() - 1);
    }

    let currentWeek = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10);

      currentWeek.push({
        date: iso,
        contributionCount: map[iso] ?? 0
      });

      if (d.getDay() === 6) {
        result.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length) {
      result.push({ contributionDays: currentWeek });
    }

    return result;
  }

  function renderSVG(weeks) {
    const svg = svgRef.current;
    if (!svg) return;

    const OFFSET_X = 28;
    const OFFSET_Y = 14;

    let output = `<g class="contrib-grid">`;

    let lastMonth = null;

    weeks.forEach((week, w) => {
      const firstDay = week.contributionDays.find(d => d?.date);
      if (!firstDay) return;

      const date = new Date(firstDay.date);
      const month = date.getMonth();

      if (month !== lastMonth) {
        output += `
          <text x="${OFFSET_X + w * 14}" y="10" class="month-label">
            ${months[month]}
          </text>
        `;
        lastMonth = month;
      }
    });

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
     BOOT
  ============================== */
  useEffect(() => {
    loadGithubActivity();
  }, []);

  return (
    <section id="github" className="border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">

        <h2 className="text-2xl font-bold">Actividad en GitHub</h2>

        <p className="mt-2 text-white/70">
          Constancia y práctica real en proyectos personales.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-4">
          <svg
            ref={svgRef}
            viewBox="0 0 900 130"
            className="w-full"
            style={{ height: "180px" }}
          />
        </div>

        <div className="mt-6">
          <a
            href="https://github.com/Arkangel-96"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/90 px-4 py-2 text-sm font-semibold hover:bg-indigo-400 transition"
          >
            Ver mi perfil en GitHub
          </a>
        </div>

      </div>
    </section>
  );
}