

const techs = [
  { name: "HTML/CSS/JS", link: "https://developer.mozilla.org/" },
  { name: "Tailwind", link: "https://tailwindcss.com/" },
  { name: "React", link: "https://react.dev/" },
  { name: "Python", link: "https://www.python.org/" },
  { name: "Godot", link: "https://godotengine.org/es/" },
  { name: "Cloudflare", link: "https://www.cloudflare.com/" },
  { name: "PostgreSQL", link: "https://www.postgresql.org/" },
];

export default function Tech() {
  return (
    <section id="tecnologias" className="border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        
        <h2 className="text-2xl font-bold">Tecnologías</h2>

        <p className="mt-2 text-white/70">
          Herramientas que uso para crear experiencias interactivas y productos digitales.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          
          {techs.map((tech, i) => (
            <a
              key={i}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 p-4 text-center transition-all duration-300 hover:bg-white/5 hover:scale-105"
            >
              {tech.name}
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}