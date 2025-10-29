import {useNavigate} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {LogOut, Settings, User} from "lucide-react";

interface ProfileTabProps {
  onClose: () => void;
}

export const ProfileTab = ({onClose}: ProfileTabProps) => {
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("hola");
    onClose();
    logout();
    navigate("/", {replace: true});
  };

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-4 w-56 border border-gray-200 text-black">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-sm">{user?.username}</h2>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => handleNavigate("/dashboard")}
          className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-100 transition text-sm"
        >
          <User size={16} />
          Mi perfil
        </button>
        {user?.role === "admin" && (
          <button
            onClick={() => handleNavigate("/admin")}
            className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-gray-100 transition text-sm"
          >
            <Settings size={16} />
            Panel Admin
          </button>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 bg-red-600 text-white py-2 px-2 rounded hover:bg-red-700 transition text-sm font-semibold"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
