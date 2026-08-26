
import { useState } from "react";

const availableGames = [
  {
    appid: 238960,
    name: "Path of Exile",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg",
  },
  {
    appid: 730,
    name: "Counter-Strike 2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    appid: 825730,
    name: "Tzar: The Burden of the Crown",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/825730/header.jpg",
  },
  {
    appid: 620,
    name: "Portal 2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg",
  },
  {
    appid: 105600,
    name: "Terraria",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
  },
  {
    appid: 292030,
    name: "The Witcher 3: Wild Hunt",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
  },
  {
    appid: 413150,
    name: "Stardew Valley",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
  },
  {
    appid: 427520,
    name: "Factorio",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
  },
  {
    appid: 892970,
    name: "Valheim",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg",
  },
  {
    appid: 1145360,
    name: "Hades",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
  },
  {
    appid: 489830,
    name: "The Elder Scrolls V: Skyrim Special Edition",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg",
  },
  {
    appid: 220,
    name: "Half-Life 2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg",
  },
];

function Profile() {
  const [games, setGames] = useState(availableGames.slice(0, 3));

  function handleAddGame() {
    if (games.length >= 12) return;

    const nextGame = availableGames[games.length];

    setGames((currentGames) => [...currentGames, nextGame]);
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Profile header */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-400">
            Your favorite games
          </p>
        </section>

        {/* Favorite games */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Favorite Games
            </h2>

            <span className="text-sm text-gray-400">
              {games.length} / 12
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {games.map((game) => (
              <article
                key={game.appid}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full"
                />

                <div className="p-4">
                  <h3 className="font-semibold">
                    {game.name}
                  </h3>
                </div>
              </article>
            ))}

            {/* Add game */}
            {games.length < 12 && (
              <button
                type="button"
                onClick={handleAddGame}
                className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                + Add Game
              </button>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}

export default Profile;