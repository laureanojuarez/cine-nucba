import {Menu, User, UserCog} from "lucide-react";
import logo_cine from "/images/cinerio.svg";
import {Link} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {ProfileTab} from "../Tab/ProfileTab";
import {useEffect, useRef, useState} from "react";

export const Header = () => {
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleProfile = () => {
    setIsProfileOpen((v) => !v);
  };

  useEffect(() => {
    if (!token) {
      setIsProfileOpen(false);
    }
  }, [token]);

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur border-b border-neutral-900/80 shadow-sm">
      <header className="h-16 flex items-center justify-between max-w-6xl mx-auto px-4">
        <Menu className="md:hidden text-white" />
        <Link to="/" className="flex items-center gap-2">
          <img src={logo_cine} alt="Cine Rosario" className="w-32" />
        </Link>

        <nav className="hidden md:flex items-center gap-4">
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
            {token && user && (
              <span className="hidden sm:inline text-sm font-medium">
                {user.username}
              </span>
            )}
          </Link>
          {token ? (
            <div className="relative">
              <UserCog onClick={handleToggleProfile} cursor={"pointer"} />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 z-50">
                  <ProfileTab onClose={() => setIsProfileOpen(false)} />
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition flex items-center gap-1"
            >
              <User size={18} />
              Iniciar sesión
            </Link>
          )}
        </nav>

        {/* Mobile */}
        {token ? (
          <div className="md:hidden relative">
            <User
              onClick={handleToggleProfile}
              className="cursor-pointer text-white"
            />
            {isProfileOpen && (
              <div className="absolute right-0 top-8 z-50">
                <ProfileTab onClose={() => setIsProfileOpen(false)} />
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="md:hidden text-white">
            <User />
          </Link>
        )}
      </header>
    </div>
  );
};
