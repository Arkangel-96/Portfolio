

export async function onRequest() {
  const res = await fetch(
    "https://api.github.com/users/Arkangel-96/events/public",
    {
      headers: {
        "User-Agent": "portfolio",
        "Accept": "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "GitHub API error" }),
      { status: 500 }
    );
  }

  const data = await res.json();

  return new Response(
    JSON.stringify(data.slice(0, 20)),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=21600", // 6 horas
      },
    }
  );
}

