import {useNavigate} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {KeyRound, LogOut, MoveLeft, Settings, User} from "lucide-react";
import {useState} from "react";

interface ProfileTabProps {
  onClose: () => void;
}

export const ProfileTab = ({onClose}: ProfileTabProps) => {
  const user = useAuth((s) => s.user);
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
          HOLA, {user?.nombre.toUpperCase()}
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
    return (
      <div className="flex flex-col justify-between h-full">
        <div className="w-80 mx-auto">
          <button
            className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer mb-4"
            onClick={() => setView("main")}
          >
            <MoveLeft className="text-gray-400" />
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">
            Información personal
          </h2>
          <form className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Nombre
              </label>
              <input
                type="text"
                value={user?.nombre || ""}
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Apellido
              </label>
              <input
                type="text"
                value={user?.apellido || ""}
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Correo electrónico
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={user?.fechaNacimiento || ""}
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Número de teléfono
              </label>
              <input
                type="tel"
                value={user?.telefono || ""}
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-neutral-300">
                Género
              </label>
              <input
                type="text"
                value={user?.genero || ""}
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              />
            </div>
          </form>
        </div>
        <div className="w-full bg-white py-8 text-center">
          <button type="subit">ACTUALIZAR MIS DATOS</button>
        </div>
      </div>
    );
  }

  // Sub-tab: Cambiar contraseña
  if (view === "password") {
    return (
      <div className="w-80 mx-auto">
        <button
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer mb-4"
          onClick={() => setView("main")}
        >
          <MoveLeft className="text-gray-400" />
        </button>
        <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>
        {/* Acá poné tu formulario de cambio de contraseña */}
        <div className="text-gray-400 text-sm">
          Funcionalidad próximamente...
        </div>
      </div>
    );
  }

  return null;
};
