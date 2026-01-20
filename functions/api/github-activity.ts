

export async function onRequest(context: {
  env: { GITHUB_TOKEN: string };
}) {
  const GITHUB_USERNAME = "Arkangel-96";

  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 365);

  const query = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
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
      "Authorization": `Bearer ${context.env.GITHUB_TOKEN}`,
      "User-Agent": "portfolio",
    },
    body: JSON.stringify({
      query,
      variables: {
        userName: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const json = await res.json();

  if (!res.ok || json.errors) {
    return new Response(
      JSON.stringify({
        error: "GitHub GraphQL error",
        details: json.errors ?? null,
      }),
      { status: 500 }
    );
  }

  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

  if (!weeks) {
    return new Response(
      JSON.stringify({ error: "No contribution data" }),
      { status: 500 }
    );
  }

  // 🔥 flatten → [{ date, count }]
  const days = weeks.flatMap((w: any) =>
    w.contributionDays.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
    }))
  );

  return new Response(JSON.stringify(days), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=21600",
    },
  });
}
