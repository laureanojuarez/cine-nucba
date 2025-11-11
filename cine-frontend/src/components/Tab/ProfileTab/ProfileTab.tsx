import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../store/auth";
import {KeyRound, LogOut, Settings, User} from "lucide-react";
import {useState} from "react";
import {Info} from "./Info";
import {Password} from "./Password";

interface ProfileTabProps {
  onClose: () => void;
}

export const ProfileTab = ({onClose}: ProfileTabProps) => {
  const user = useAuth((s) => s.user);
  console.log("User in ProfileTab:", user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const [view, setView] = useState<"main" | "info" | "password">("main");

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/", {replace: true});
  };

  if (view === "main") {
    return (
      <div className="w-80 mx-auto">
        <h1 className="text-3xl text-white font-medium">
          {user?.nombre === null
            ? `${user.email}`
            : `HOLA, ${user?.nombre.toUpperCase()}`}
        </h1>
        <div className="text-center mb-6 mt-6 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold  mb-3">
            <User size={75} color="black" />
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-neutral-800">
          <button
            onClick={() => setView("info")}
            className="flex items-center gap-3 px-4 py-6 hover:bg-neutral-600 transition text-left text-neutral-200 border-b border-b-black rounded-t-xl"
          >
            <User size={20} />
            <span className="font-medium">MI CUENTA</span>
          </button>
          <button
            onClick={() => setView("password")}
            className="flex items-center gap-3 px-4 py-6 hover:bg-neutral-600 transition text-left text-neutral-200 border-b border-b-black"
          >
            <KeyRound size={20} />
            <span className="font-medium">Cambiar contraseña</span>
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => {
                onClose();
                navigate("/admin");
              }}
              className="flex items-center gap-3 px-4 py-6 hover:bg-neutral-600 transition text-left text-neutral-200"
            >
              <Settings size={20} />
              <span className="font-medium">Panel Admin</span>
            </button>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-start gap-3 px-4 py-3 font-semibold text-neutral-500"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    );
  }

  if (view === "info") {
    if (!user) return <div className="text-white p-4">Cargando usuario...</div>;
    return <Info setView={setView} user={user} />;
  }

  // Sub-tab: Cambiar contraseña
  if (view === "password") {
    if (!user) return <div className="text-white p-4">Cargando usuario...</div>;
    return <Password setView={setView} />;
  }

  return null;
};
