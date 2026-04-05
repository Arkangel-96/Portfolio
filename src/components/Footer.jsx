export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-700 py-6 text-center text-white/80">
      
      <p className="flex items-center justify-center gap-1 text-sm md:text-base">
        
        <span className="font-bold transition-transform hover:scale-110">
          ©
        </span>

        Noctyr Studio {year}. 

        <span className="italic">
          Made by Matías Baltieri
        </span>. 

        <span className="uppercase tracking-wide">
          All rights reserved
        </span>

      </p>

    </footer>
  );
}