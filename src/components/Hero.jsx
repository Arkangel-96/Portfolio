
import yoImg from "../assets/yo.png";

export default function Hero() {
  return (
    <section
        style={{
            background: `
            radial-gradient(1200px 600px at 10% -10%, rgba(139,92,246,.25), transparent 60%),
            radial-gradient(1000px 500px at 110% 10%, rgba(97,246,92,.25), transparent 60%),
            linear-gradient(180deg,#0a0a0a 0%,#0b0b0b 100%)
            `
        }}
        >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
        
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          
          {/* TEXTO */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Hola, soy{" "}
              <span className="bg-gradient-to-br from-green-500 via-violet-600 to-orange-500 bg-clip-text text-transparent">
                Matías
              </span>.
            </h1>
            <br />
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              <strong>Fullstack JavaScript Developer | Product-Focused</strong>
              <br /><br />
              Creo experiencias interactivas y productos donde diseño, UX y lógica trabajan en conjunto. 
              Me enfoco en construir sistemas que no solo funcionen, sino que se sientan bien al usarse.
            </p>
            
            {/* ICONOS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
              
              {/* GitHub */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-gray-400 hover:scale-110 hover:shadow-lg hover:shadow-gray-400/40">
                <a href="https://github.com/Arkangel-96" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>

              {/* Steam */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:scale-110 hover:shadow-lg hover:shadow-indigo-400/40">
                <a href="https://steamcommunity.com/id/troyano207" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-green-400 hover:scale-110 hover:shadow-lg hover:shadow-green-400/40">
                <a href="https://whatsapp.com/channel/0029Vb6X4Oc4NVifA4IroN2S" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>

              {/* YouTube */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-red-400 hover:scale-110 hover:shadow-lg hover:shadow-red-400/40">
                <a href="https://www.youtube.com/@game-dev-96" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>

              {/* LinkedIn */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>

          {/* FOTO */}
          <div className="justify-self-center">
            <div className="relative">
              
              <img
                src={yoImg}
                alt="Foto de perfil"
                className="h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-3xl object-cover ring-1 ring-white/10"
              />

              <div className="absolute -left-8 -top-8 h-20 w-20 rounded-2xl bg-orange-500/20"></div>
              <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-2xl bg-indigo-500/20"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}