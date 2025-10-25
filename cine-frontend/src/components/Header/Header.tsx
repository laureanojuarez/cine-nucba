import {User} from "lucide-react";
import logo_cine_rosario from "/images/logo_cine_rosario.png";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../store/auth";

export const Header = () => {
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-neutral-900/80 backdrop-blur border-b border-neutral-700 shadow-sm">
      <header className="h-16 flex items-center justify-between max-w-6xl mx-auto px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo_cine_rosario}
            alt="Cine Rosario"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-white hover:text-green-400 font-semibold transition"
          >
            Películas
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-white hover:text-green-400 transition"
          >
            <User size={20} />
            {token && user && (
              <span className="hidden sm:inline text-sm font-medium">
                {user.username}
              </span>
            )}
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};
