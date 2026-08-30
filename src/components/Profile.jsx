

import { useEffect, useState } from "react";
import { Trash2, GripVertical } from "lucide-react";


const API_URL = import.meta.env.VITE_GAMES_API_URL;

function Profile({ user }) {
  const [games, setGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const [addingGame, setAddingGame] = useState(false);

  // Juego que estamos arrastrando
  const [draggedGame, setDraggedGame] = useState(null);

  const [wakingBackend, setWakingBackend] = useState(false);

  // --------------------------------------------------
  // GET FAVORITES
  // --------------------------------------------------

 async function loadFavorites() {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  let wakeTimer;

  try {
    setLoading(true);
    setError(null);

    wakeTimer = setTimeout(() => {
      setWakingBackend(true);
    }, 3000);

    const response = await fetch(
      `${API_URL}/api/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load favorite games");
    }

    const data = await response.json();

    setGames(data);

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    setError("Could not load favorite games.");
  } finally {
    clearTimeout(wakeTimer);
    setWakingBackend(false);
    setLoading(false);
  }
}

  useEffect(() => {
    loadFavorites();
  }, []);

  // --------------------------------------------------
  // SEARCH STEAM
  // --------------------------------------------------

  useEffect(() => {
    if (!showSearch) return;

    const query = search.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);

        const response = await fetch(
          `${API_URL}/api/steam/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Steam search failed");
        }

        const data = await response.json();

        setSearchResults(data);
      } catch (error) {
        console.error("STEAM SEARCH ERROR:", error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, showSearch]);

  // --------------------------------------------------
  // ADD FAVORITE
  // --------------------------------------------------

  async function handleAddGame(game) {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      setAddingGame(true);

      const response = await fetch(
        `${API_URL}/api/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appid: game.appid,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add game");
      }

      await loadFavorites();

      setShowSearch(false);
      setSearch("");
      setSearchResults([]);
    } catch (error) {
      console.error("ADD GAME ERROR:", error);
      alert(error.message);
    } finally {
      setAddingGame(false);
    }
  }

  // --------------------------------------------------
  // DELETE FAVORITE
  // --------------------------------------------------

  async function handleDeleteGame(appid) {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/favorites/${appid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete game"
        );
      }

      // Eliminar inmediatamente de la UI
      setGames((currentGames) =>
        currentGames
          .filter((game) => game.appid !== appid)
          .map((game, index) => ({
            ...game,
            position: index + 1,
          }))
      );
    } catch (error) {
      console.error("DELETE GAME ERROR:", error);
      alert(error.message);
    }
  }

  // --------------------------------------------------
  // DRAG & DROP
  // --------------------------------------------------

  function handleDragStart(game) {
    setDraggedGame(game);
  }

  function handleDragEnd() {
    setDraggedGame(null);
  }

 async function handleDrop(targetGame) {
  if (!draggedGame) {
    return;
  }

  if (draggedGame.id === targetGame.id) {
    setDraggedGame(null);
    return;
  }

  const updatedGames = [...games];

  const draggedIndex = updatedGames.findIndex(
    (game) => game.id === draggedGame.id
  );

  const targetIndex = updatedGames.findIndex(
    (game) => game.id === targetGame.id
  );

  if (draggedIndex === -1 || targetIndex === -1) {
    setDraggedGame(null);
    return;
  }

  const [removedGame] = updatedGames.splice(
    draggedIndex,
    1
  );

  updatedGames.splice(
    targetIndex,
    0,
    removedGame
  );

  const reorderedGames = updatedGames.map(
    (game, index) => ({
      ...game,
      position: index + 1,
    })
  );

  // Actualización visual inmediata
  setGames(reorderedGames);
  setDraggedGame(null);

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_URL}/api/favorites/reorder`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          games: reorderedGames.map((game) => ({
            appid: game.appid,
          })),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to save new order"
      );
    }

  } catch (error) {
    console.error("REORDER ERROR:", error);

    // Si falla el backend, recuperamos el orden real
    await loadFavorites();

    alert(error.message);
  }
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
            {user?.email}
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

          {loading && (
          <div className="space-y-2">
            <p className="text-gray-400">
              Loading favorite games...
            </p>

            {wakingBackend && (
              <p className="text-sm text-yellow-400/70">
                Connecting to API... This may take a moment.
              </p>
            )}
          </div>
        )}

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Games */}
              {games.map((game) => (
                <article
                  key={game.id}
                  draggable
                  onDragStart={() => handleDragStart(game)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={() => handleDrop(game)}
                  className={`group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition ${
                    draggedGame?.id === game.id
                      ? "opacity-40"
                      : "hover:border-white/20"
                  }`}
                >

                  {/* Game image */}
                  <div className="relative">

                    {game.image && (
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full"
                      />
                    )}

                    {/* Drag handle */}
                    <div className="absolute left-3 top-3 rounded-lg bg-black/70 p-2 text-white/60 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                      <GripVertical size={18} />
                    </div>

                  </div>

                  {/* Game information */}
                  <div className="flex items-center justify-between p-4">

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {game.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        #{game.position}
                      </p>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteGame(game.appid)
                      }
                      className="ml-3 rounded-lg p-2 text-white/40 transition hover:bg-red-500/10 hover:text-red-400"
                      title="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </article>
              ))}

              {/* Add game */}
              {games.length < 12 && (
                <button
                  type="button"
                  onClick={() => setShowSearch(true)}
                  className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  + Add Game
                </button>
              )}

            </div>
          )}

        </section>

        {/* Search modal */}
        {showSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">

            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">

              {/* Header */}
              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                  Add Favorite Game
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                    setSearchResults([]);
                  }}
                  className="text-white/50 hover:text-white"
                >
                  ✕
                </button>

              </div>

              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search Steam games..."
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/30 focus:border-white/30"
              />

              {/* Results */}
              <div className="mt-4 max-h-[400px] overflow-y-auto">

                {searching && (
                  <p className="py-6 text-center text-gray-400">
                    Searching Steam...
                  </p>
                )}

                {!searching &&
                  search.trim() &&
                  searchResults.length === 0 && (
                    <p className="py-6 text-center text-gray-400">
                      No games found.
                    </p>
                  )}

                <div className="space-y-2">

                  {searchResults.map((game) => {

                    const alreadyAdded = games.some(
                      (favorite) =>
                        favorite.appid === game.appid
                    );

                    return (
                      <button
                        key={game.appid}
                        type="button"
                        disabled={
                          alreadyAdded || addingGame
                        }
                        onClick={() =>
                          handleAddGame(game)
                        }
                        className={`flex w-full items-center gap-4 rounded-xl border border-white/10 p-3 text-left transition ${
                          alreadyAdded
                            ? "cursor-default opacity-40"
                            : "hover:bg-white/10"
                        }`}
                      >

                        {game.image && (
                          <img
                            src={game.image}
                            alt=""
                            className="h-12 w-32 rounded object-cover"
                          />
                        )}

                        <div className="min-w-0 flex-1">

                          <p className="truncate font-medium">
                            {game.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            AppID: {game.appid}
                          </p>

                        </div>

                        {alreadyAdded && (
                          <span className="text-xs text-gray-500">
                            Added
                          </span>
                        )}

                      </button>
                    );
                  })}

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Profile;