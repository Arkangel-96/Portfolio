
    const svg = document.getElementById("github-graph");

    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

    /* === MOCK DATA (luego API real) === */
    const contributions = Array.from({ length: 52 }, (_, w) => ({
      contributionDays: Array.from({ length: 7 }, (_, d) => ({
        date: new Date(2024, 0, w * 7 + d + 1).toISOString(),
        contributionCount: Math.floor(Math.random() * 10)
      }))
    }));

    function createRect(x, y, level, count, date) {
      return `
        <rect
          x="${x}"
          y="${y}"
          width="12"
          height="12"
          rx="2"
          class="lvl-${level}">
          <title>${count} contributions on ${date}</title>
        </rect>
      `;
    }

    let output = `<g>`;
    let lastMonth = null;

    /* === MESES === */
    contributions.forEach((week, w) => {
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

    /* === CUADRADOS === */
    contributions.forEach((week, w) => {
      week.contributionDays.forEach((day, d) => {
        const c = day.contributionCount;
        const level =
          c === 0 ? 0 :
          c < 3 ? 1 :
          c < 6 ? 2 :
          c < 9 ? 3 : 4;

        output += createRect(
          w * 14,
          d * 14 + 18,
          level,
          c,
          day.contributionCount,
          day.date
        );
      });
    });

    output += `</g>`;
    svg.innerHTML = output;
