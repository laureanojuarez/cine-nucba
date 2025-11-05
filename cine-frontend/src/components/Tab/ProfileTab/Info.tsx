import {MoveLeft} from "lucide-react";

interface InfoProps {
  setView: (view: "main" | "info" | "password") => void;
  user: {
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
    genero: string;
  };
}

export const Info = ({setView, user}: InfoProps) => {
  return (
    <div className="w-80 mx-auto">
      <button
        className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer mb-4"
        onClick={() => setView("main")}
      >
        <MoveLeft className="text-gray-400" />
      </button>
      <h2 className="text-xl font-bold mb-4">Información personal</h2>
      <form className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-semibold mb-1 text-neutral-300">
            Nombre
          </label>
          <input
            type="text"
            value={user?.nombre || ""}
            disabled
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
  );
};
