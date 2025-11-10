import {Menu, User, UserCog} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuth} from "../../store/auth";
import logo_cine from "/images/cinerio.svg";

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenProfile: () => void;
}

export const Header = ({onOpenLogin, onOpenProfile}: HeaderProps) => {
  const token = useAuth((s) => s.token);

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur border-b border-neutral-900/80 shadow-sm">
      <header className="h-16 flex items-center justify-between max-w-6xl mx-auto px-4">
        <Menu className="md:hidden text-white" />
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src={logo_cine} alt="Cine Río" className="w-32" />
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="text-white hover:text-green-400 font-semibold transition"
          >
            Películas
          </Link>
          <Link
            to="/support"
            className="text-white hover:text-green-400 font-semibold transition"
          >
            Soporte
          </Link>
          {token ? (
            <>
              <Link to="/dashboard" className="text-white">
                Mis entradas
              </Link>

              <button
                className="text-white hover:text-green-400"
                onClick={onOpenProfile}
              >
                <UserCog />
              </button>
            </>
          ) : (
            <button
              className="text-white hover:text-green-400"
              onClick={onOpenLogin}
              title="Iniciar sesión"
            >
              <User size={18} cursor={"pointer"} />
            </button>
          )}
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden text-white"
          onClick={token ? onOpenProfile : onOpenLogin}
          aria-label="Abrir panel"
        >
          <User />
        </button>
      </header>
    </div>
  );
};
