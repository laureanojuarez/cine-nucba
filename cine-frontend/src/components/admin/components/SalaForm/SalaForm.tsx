import {useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import { useAuth } from "../../../../store/auth";

interface SalaFormProps {
  onSuccess?: () => void;
}

export const SalaForm = ({onSuccess}: SalaFormProps) => {
  const token = useAuth((s) => s.token);
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState<number>(50);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "/salas",
        { nombre, capacidad: Number(capacidad) },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      toast.success("Sala creada");
      setNombre("");
      setCapacidad(50);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error al crear sala");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/90 p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-5xl mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Crear Sala</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre de la sala"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          min={1}
          placeholder="Capacidad"
          value={capacidad}
          onChange={(e) => setCapacidad(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-linear-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear Sala"}
        </button>
      </div>
    </form>
  );
};