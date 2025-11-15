import {useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import { useFilms } from "../../../hooks/Films/useFilms";
import { useAuth } from "../../../store/auth";

interface FuncionFormProps {
  onSuccess?: () => void;
}

export const FuncionForm = ({onSuccess}: FuncionFormProps) => {
  const token = useAuth((s) => s.token);
  const {films} = useFilms();

  const [movieId, setMovieId] = useState<number | "">("");
  const [salaId, setSalaId] = useState<number | "">("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState(""); // "HH:mm"

  function toHHMMSS(v: string) {
    // "20:00" -> "20:00:00"
    return v?.length === 5 ? `${v}:00` : v;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!movieId || !salaId || !fecha || !horario) {
      toast.error("Completa todos los campos");
      return;
    }
    try {
      await axios.post(
        "/funciones",
        {
          movieId: Number(movieId),
          salaId: Number(salaId),
          fecha,                  // YYYY-MM-DD
          horario: toHHMMSS(horario), // HH:mm:ss
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      toast.success("Función creada");
      setMovieId("");
      setSalaId("");
      setFecha("");
      setHorario("");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error al crear función");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/90 p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-5xl mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Crear Función</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select
          value={movieId}
          onChange={(e) => setMovieId(Number(e.target.value) || "")}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Película</option>
          {films.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titulo}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          placeholder="Sala ID"
          value={salaId}
          onChange={(e) => setSalaId(Number(e.target.value) || "")}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Crear
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Nota: Debe existir la sala (POST /salas) para que se creen las butacas de la función.
      </p>
    </form>
  );
};