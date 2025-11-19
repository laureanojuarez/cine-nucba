import { Link } from "react-router-dom";
import { CreditCard, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Marca y Descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Cine<span className="text-blue-500">Río</span>
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              La mejor experiencia cinematográfica de la ciudad. Disfruta de los últimos estrenos con la mejor tecnología de imagen y sonido.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>

          {/* 2. Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Cartelera</Link></li>
              <li><Link to="/support" className="hover:text-blue-400 transition-colors">Soporte</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Mis Entradas</Link></li>
              <li><Link to="/admin" className="hover:text-blue-400 transition-colors">Acceso Admin</Link></li>
            </ul>
          </div>

          {/* 3. Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Bv. Oroño 1234,<br />Rosario, Santa Fe</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+54 341 555-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@cinerio.com.ar</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter (Nuevo) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Novedades</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Suscríbete para recibir estrenos y promociones exclusivas.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Cine Río. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span className="flex items-center gap-2">
              <CreditCard size={16} /> Pagos seguros
            </span>
            <div className="flex gap-2 opacity-50">
              {/* Simulación de tarjetas */}
              <div className="w-8 h-5 bg-white rounded-sm" />
              <div className="w-8 h-5 bg-white rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);