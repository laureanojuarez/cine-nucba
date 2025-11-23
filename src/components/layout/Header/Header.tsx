import {LifeBuoy, LogIn, Menu, Ticket, User, X} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuth} from "../../../store/auth";
import logo_cine from "/images/cinerio.svg";
import { useState } from "react";

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenProfile: () => void;
}

export const Header = ({onOpenLogin, onOpenProfile}: HeaderProps) => {
  const token = useAuth((s) => s.token);
  const user = useAuth((s) => s.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div className="w-full sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5 shadow-lg">
        <header className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer z-50">
            <img src={logo_cine} alt="Cine Río" className="w-28 sm:w-32 hover:opacity-90 transition-opacity" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-neutral-300 hover:text-white font-medium transition-colors text-sm"
            >
              Películas
            </Link>
            <Link
              to="/support"
              className="text-neutral-300 hover:text-white font-medium transition-colors text-sm"
            >
              Soporte
            </Link>

            <div className="h-4 w-px bg-white/10 mx-2" />

            {token ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-neutral-300 hover:text-blue-400 transition-colors text-sm font-medium"
                >
                  <Ticket size={16} />
                  Mis entradas
                </Link>

                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-full border border-white/10 transition-all text-sm font-medium"
                >
                  <User size={14} />
                  <span>{user?.nombre || "Perfil"}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20 text-sm"
              >
                <LogIn size={16} />
                Iniciar sesión
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-xl md:hidden pt-20 px-6 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-lg font-medium text-white py-3 border-b border-white/5"
            >
              🎬 Películas
            </Link>
            <Link
              to="/support"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-lg font-medium text-white py-3 border-b border-white/5"
            >
              <LifeBuoy size={20} /> Soporte
            </Link>
            
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 text-lg font-medium text-white py-3 border-b border-white/5"
                >
                  <Ticket size={20} /> Mis entradas
                </Link>
                <button
                  onClick={() => {
                    toggleMenu();
                    onOpenProfile();
                  }}
                  className="flex items-center gap-3 text-lg font-medium text-blue-400 py-3"
                >
                  <User size={20} /> Mi Perfil
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  toggleMenu();
                  onOpenLogin();
                }}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20"
              >
                Iniciar Sesión
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
};