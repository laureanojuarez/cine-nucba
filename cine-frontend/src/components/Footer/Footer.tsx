export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-neutral-700/50  backdrop-blur pb-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-10">
        {/* Información principal */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Cine Rosario</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            El cine de Rosario para disfrutar de los mejores estrenos y clásicos
            en la ciudad. ¡Viví la experiencia Cine Rosario!
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-300">Enlaces</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Inicio
              </a>
            </li>
            <li>
              <a href="/cartelera" className="hover:text-white transition">
                Cartelera
              </a>
            </li>
            <li>
              <a href="/promociones" className="hover:text-white transition">
                Promociones
              </a>
            </li>
            <li>
              <a href="/sobre-nosotros" className="hover:text-white transition">
                Sobre Nosotros
              </a>
            </li>
          </ul>
        </div>

        {/* Ayuda */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-300">Ayuda</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>
              <a href="/faq" className="hover:text-white transition">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="/contacto" className="hover:text-white transition">
                Contacto
              </a>
            </li>
            <li>
              <a href="/terminos" className="hover:text-white transition">
                Términos de Uso
              </a>
            </li>
            <li>
              <a href="/privacidad" className="hover:text-white transition">
                Privacidad
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-300">Contacto</h4>
          <div className="space-y-2 text-xs text-neutral-400">
            <p>📧 info@cinerosario.com.ar</p>
            <p>📞 +54 341 555-1234</p>
            <p>📍 Bv. Oroño 1234, Rosario, Santa Fe</p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
                aria-label="Twitter"
              >
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisoria y copyright */}
      <div className="mt-8 border-t border-neutral-700/50 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © 2025 Cine Rosario. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-neutral-500">
            <span>Aceptamos:</span>
            <span>💳 💵 🏦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
