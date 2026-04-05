
export default function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-14">
      
      <h2 className="text-2xl font-bold">Contacto</h2>

      <p className="mt-2 text-white/70">
        ¿Tienes una idea o propuesta? Conversemos.
      </p>

      <form
        className="mt-6 grid gap-4 md:max-w-xl"
        action="https://formspree.io/f/mkozrdlr"
        method="POST"
      >
        
        {/* NOMBRE */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          />
        </div>

        {/* EMAIL */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          />
        </div>

        {/* MENSAJE */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="msg">Mensaje</label>
          <textarea
            id="msg"
            name="msg"
            rows="5"
            required
            placeholder="Cuéntame sobre tu proyecto"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          ></textarea>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
        >
          Enviar
        </button>

      </form>
    </section>
  );
}