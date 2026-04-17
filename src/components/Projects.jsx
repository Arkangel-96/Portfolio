

import { useEffect, useState } from "react";
const BASE_URL = "http://127.0.0.1:8000";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/projects/")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error(err));
    }, []);
    return (

    <section id="proyectos" className="border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">

        {/* TITLE */}
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Proyectos</h2>
        </div>

      <div className="mt-10 space-y-16">

  {projects.length === 0 ? (
    <p>Cargando proyectos...</p>
  ) : (
    projects.map((project) => (
      <article
        key={project.id}
        className="flex flex-col md:flex-row gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10"
      >
        <div className="md:w-1/2">
          <img
            src={`${BASE_URL}${project.image}`} 
            alt={project.title}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold hover:underline"
            >
              {project.title}
            </a>

            <p className="mt-4 text-white/90 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition"
            >
              Ver proyecto →
            </a>
          </div>
        </div>
      </article>
    ))
  )}

</div>
       
        
      </div>
    </section>
  );
}