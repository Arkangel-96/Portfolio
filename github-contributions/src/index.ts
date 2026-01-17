import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});



// Register OpenAPI endpoints
openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);

app.get("/api/github-activity", async (c) => {
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
    return c.json({ error: "GitHub API error" }, 500);
  }

  const data = (await res.json()) as Array<Record<string, unknown>>;

  
  return c.json(data.slice(0, 20), {
  headers: {
    "Cache-Control": "public, max-age=21600",
  },
});

});



// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
