import {Menu, User, UserCog} from "lucide-react";
import logo_cine from "/images/cinerio.svg";
import {Link} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {ProfileTab} from "../Tab/ProfileTab";
import {useEffect, useState} from "react";

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenProfile: () => void;
}

export const Header = ({onOpenLogin, onOpenProfile}: HeaderProps) => {
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleProfile = () => {
    setIsProfileOpen((v) => !v);
  };

  useEffect(() => {
    if (!token) setIsProfileOpen(false);
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
            <UserCog onClick={onOpenProfile} className="cursor-pointer" />
          ) : (
            <User size={18} onClick={onOpenLogin} className="cursor-pointer" />
          )}
        </nav>

        {/* Mobile */}
        {token ? (
          <User
            onClick={onOpenProfile}
            className="md:hidden cursor-pointer text-white"
          />
        ) : (
          <User
            onClick={onOpenLogin}
            className="md:hidden cursor-pointer text-white"
          />
        )}
      </header>
    </div>
  );
};
