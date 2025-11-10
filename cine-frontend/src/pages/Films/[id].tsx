import {Link, useParams} from "react-router-dom";
import Seats from "../../components/Seats/Seats";
import {useFilm} from "../../hooks/useFilms";
import {useSalas} from "../../hooks/useSalas";
import {useAuth} from "../../store/auth";
import {useState} from "react";
import axios from "axios";
import {toast} from "sonner";

export default function FilmDetail() {
  const {id} = useParams<{id: string}>();
  const {film, loading: filmLoading} = useFilm(id);
  const {salas, loading: salasLoading} = useSalas(id);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);

  async function handleCheckout() {
    if (!user) {
      toast.error("Debes iniciar sesión para realizar una reserva");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Debes seleccionar al menos un asiento");
      return;
    }

    const salaId = salas[0]?.id;
    if (!salaId) {
      toast.error("No hay sala disponible para esta película");
      return;
    }

    try {
      await axios.post("/reservas", {
        userId: user.id,
        salaId,
        seatIds: selectedSeats,
      });
      toast.success("Reserva realizada con éxito");
      setSelectedSeats([]);
    } catch (error) {
      toast.error("Error al realizar la reserva");
    }
  }

  if (filmLoading || salasLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-white">
        <div className="animate-pulse flex gap-8">
          <div className="w-64 h-96 bg-neutral-800 rounded" />
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-neutral-800 rounded w-1/2" />
            <div className="h-6 bg-neutral-800 rounded w-1/3" />
            <div className="h-64 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="text-center text-white py-20">Película no encontrada</div>
    );
  }

  const totalDisponible = salas
    ?.flatMap((s: any) => s.Seats)
    .filter((seat: any) => seat.disponible).length;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 flex flex-col gap-4">
          <div className="relative">
            <img
              src={film.poster || "/placeholder.jpg"}
              alt={film.title}
              className="rounded-xl shadow-lg w-full aspect-2/3 object-cover"
            />
            {film.duration && (
              <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                {Math.floor(film.duration / 60)}h {film.duration % 60}m
              </span>
            )}
            <span className="border text-white text-xl px-2 py-1 rounded">
              {film.genero}
            </span>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 space-y-2 text-sm">
            <h1 className="text-xl font-bold">{film.title}</h1>
            <p>
              <span className="font-semibold">Género:</span>{" "}
              {film.genero || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Disponibles:</span>{" "}
              {totalDisponible ?? 0}
            </p>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-6">
          {salas.length === 0 ? (
            <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-lg border border-yellow-500/40">
              No hay salas disponibles para esta película.
            </div>
          ) : (
            salas.map((sala: any) => (
              <div
                key={sala.id}
                className="bg-neutral-800 rounded-xl p-5 shadow border border-neutral-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">
                    Sala {sala.salaNumber}
                  </span>
                  <span className="text-sm text-green-400">
                    Libres:{" "}
                    {sala.Seats.filter((seat: any) => seat.disponible).length}
                  </span>
                </div>
                <Seats
                  seats={sala.Seats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                />
              </div>
            ))
          )}

          {token ? (
            <div className="flex flex-col gap-3">
              <button
                className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={selectedSeats.length === 0}
                onClick={handleCheckout}
              >
                {selectedSeats.length === 0
                  ? "Selecciona asientos"
                  : `Comprar ${selectedSeats.length}`}
              </button>
              <button
                className="text-sm text-gray-300 hover:text-white transition underline decoration-dotted"
                onClick={() => setSelectedSeats([])}
                disabled={!selectedSeats.length}
              >
                Limpiar selección
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg font-semibold text-white text-center transition"
            >
              Inicia sesión para comprar entradas
            </Link>
          )}
        </main>
      </div>
    </div>
  );
}
