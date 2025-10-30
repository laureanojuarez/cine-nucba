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
    logout();
    onClose();
    navigate("/", {replace: true});
  };

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="w-80 mx-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-3xl mb-3">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold">{user?.username}</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleNavigate("/dashboard")}
          className="flex items-center gap-3 px-4 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition text-left"
        >
          <User size={20} />
          <span className="font-medium">Mi perfil</span>
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => handleNavigate("/admin")}
            className="flex items-center gap-3 px-4 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition text-left"
          >
            <Settings size={20} />
            <span className="font-medium">Panel Admin</span>
          </button>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 px-4 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold mt-2"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
