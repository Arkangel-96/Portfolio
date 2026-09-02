
import yoImg from "../assets/yo.jpeg";

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
      <div id="Home" className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
        
        <div className="grid items-center gap-10 md:gap-16 md:grid-cols-[1.2fr_.8fr]">
          
          {/* TEXTO */}
          <div className="md:ml-12 lg:ml-16">
            <h1 className="text-3xl  text-white/90  sm:text-4xl md:text-5xl font-black leading-tight">
              Hi, I'm {" "}
              <span className="bg-gradient-to-br from-green-500 via-violet-600 to-orange-500 bg-clip-text text-transparent">
                Matías
              </span>
            </h1>
            <br />
        <h1 className="text-2xl font-bold leading-tight text-white/90 sm:text-4xl md:text-5xl">
          Full Stack & Game Developer
        </h1>

       <p className="mt-4 text-xl font-bold tracking-wide text-white/60 sm:text-2xl md:text-2xl">
          React · Express · Django · Godot · Unity <br /> REST APIs · Serverless 
        </p>
            {/* ICONOS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              
              {/* Ko-fi*/}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/40">
                <a href="https://ko-fi.com/noctyrstudio" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white">
                 <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                 <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 
                 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
                 </svg>
                </a>
              </div>

             

              {/* itch.io */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-fuchsia-700 hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-400/40">
                <a href="https://noctyr-studio.itch.io/" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 245.371 220.736">
                    <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"/></svg>
                </a>
              </div>

               {/* GitHub */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:scale-110 hover:shadow-lg hover:shadow-green-600/40">
                <a href="https://github.com/Noctyr-studio" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>
              
               {/* LinkedIn */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/40">
                <a href="https://www.linkedin.com/in/mat%C3%ADas-baltieri-6b09662a6/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> 
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="currentColor">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#161]">

</path>
            </g>
        </g>
    </g>
</svg>
                </a>
              </div>

              {/* YouTube */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-red-400 hover:scale-110 hover:shadow-lg hover:shadow-red-400/40">
                <a href="https://www.youtube.com/@noctyr-studio" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>

              {/* Instagram*/}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-orange-400 hover:scale-110 hover:shadow-lg hover:shadow-orange-400/40">
                <a href="https://www.instagram.com/maty.baltieri/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-white">
                 <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32" id="Camada_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z 
                  M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z 
                  M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"/>
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