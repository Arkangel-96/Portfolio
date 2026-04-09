
import engineImg from "../assets/noctyr_engine.png";
import gameImg from "../assets/cover_image.jpg";
import analyticsImg from "../assets/analytics.png";

export default function Projects() {
  return (
    <section id="proyectos" className="border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">

        {/* TITLE */}
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Proyectos</h2>
        </div>

        <div className="mt-10 space-y-16">

          {/* PROYECTO 1 */}
          
            <article className="flex flex-col md:flex-row gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10">

            <div className="md:w-1/2">
              <img
                src={gameImg}
                alt="Pixel Hero Survival"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <a
                  href="https://arkangel-96.itch.io/pixel-hero-survival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:underline"
                >
                  Pixel Hero Survival
                </a>

                <p className="mt-4 text-white/90 text-lg leading-relaxed">
                  A fast-paced 2D action roguelike focused on survival and responsiveness.
     
                </p>

                <p className="mt-4 text-white/70 leading-relaxed">
                 Key features:
                <br />
                *Real-time combat and damage system <br />
                *Enemy behavior and wave spawning  <br />
                *Simple but effective player feedback (health, hits, death)
                </p>
  
            
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-lg border border-white/10 px-2 py-1">Godot</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">GDScript (Python)</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://arkangel-96.itch.io/pixel-hero-survival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition"
                >
                  Ver proyecto →
                </a>
              </div>
            </div>

          </article>

          {/* PROYECTO 2 */}
        

          <article className="flex flex-col md:flex-row gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10">

            <div className="md:w-1/2">
              <img
                src={engineImg}
                alt="2D Systems Demo"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <a
                  href="/Noctyr_Engine/demo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:underline"
                >
                  2D Gameplay System Demo (JavaScript)
                </a>

                <p className="mt-4 text-white/90 text-lg leading-relaxed">
                  A small experimental project focused on building core gameplay systems from scratch.
                 
                </p>

                 <p className="mt-4 text-white/70 leading-relaxed">
                 Includes:
                <br />
                *Entity-based structure <br />
                *Combat and damage handling  <br />
                *Animation and update loop logic
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-lg border border-white/10 px-2 py-1">HTML / CSS</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">JavaScript</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="/Noctyr_Engine/demo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition"
                >
                  Ver proyecto →
                </a>
              </div>
            </div>

          </article>

          {/* PROYECTO 3 */}
          <article className="flex flex-col md:flex-row gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10">

            <div className="md:w-1/2">
              <img
                src={analyticsImg}
                alt="SaaS Intelligence"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <a
                  href="https://trends.google.es/trends/explore?q=%2Fm%2F06_4c_&hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:underline"
                >
                  Noctyr Analytics™
                </a>

                <p className="mt-4 text-white/90 text-lg leading-relaxed">
                  Exploratory project focused on analyzing SaaS business models using data science techniques.
                
                </p>

                <p className="mt-4 text-white/70 leading-relaxed">
                The goal is to identify patterns in pricing, growth and product strategy to better understand scalable digital products.
                </p>
                
                 <p className="mt-4 text-white/70 leading-relaxed">
                Focus areas:
                <br />
                *Pricing models <br />
                *Growth patterns <br />
                *Product positioning
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-lg border border-white/10 px-2 py-1">Python</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">AI</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">Data Science</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">Machine Learning</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">SaaS</span>
                  <span className="rounded-lg border border-white/10 px-2 py-1">Analytics</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://trends.google.es/trends/explore?q=%2Fm%2F06_4c_&hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition"
                >
                  Explorar idea →
                </a>
              </div>
            </div>

          </article>

        </div>
      </div>
    </section>
  );
}