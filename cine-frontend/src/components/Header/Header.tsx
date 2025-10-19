import { User } from "lucide-react";
import logo_cine_rosario from "/images/logo_cine_rosario.png";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <div className="w-full border-b border-neutral-500 flex items-center justify-center ">
      <header className="h-16 text-white flex items-center max-w-5xl justify-between w-full">
        <Link to={"/"} className="cursor-pointer">
          <img src={logo_cine_rosario} alt="Cine Rosario" className="w-72" />
        </Link>

        <nav className="flex items-center list-none gap-4">
          <li>
            <Link to="/">Películas</Link>
          </li>

          <Link to={"/dashboard"} className="flex items-center gap-2">
            <User />
            <span></span>
          </Link>

          {token && (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          )}

          {!token && (
            <Link to={"/login"} className="hover:text-gray-300">
              Iniciar Sesión / Registrarse
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};
