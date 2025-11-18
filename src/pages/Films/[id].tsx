import { useNavigate, useParams } from "react-router-dom";
import Seats from "../../components/Seats/Seats";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useUI } from "../../store/useUI";
import { useFilm } from "../../hooks/Films/useFilm";
import { useFunciones } from "../../hooks/useFunciones";
import { useAsientosFuncion } from "../../hooks/useAsientosFuncion";

export default function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const { film, loading: filmLoading } = useFilm(id);
  const { funciones, loading: funcionesLoading } = useFunciones(id);
  const [selectedFuncionId, setSelectedFuncionId] = useState<
    number | undefined
  >(undefined);
  const { seats, loading: seatsLoading } = useAsientosFuncion(
    selectedFuncionId || undefined
  );

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const openLogin = useUI((s) => s.openLogin);
  const navigate = useNavigate();

  const totalDisponible = seats.filter((s) => s.disponible).length;

  async function handleCheckout() {
    if (!user) {
      openLogin();
      return;
    }
    if (!selectedFuncionId) {
      toast.error("Selecciona una función");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Selecciona al menos un asiento");
      return;
    }

   navigate("/checkout", {
    state: {
      filmId: id,
      filmTitle: film?.titulo,
      filmPoster: film?.poster,
      funcionId: selectedFuncionId, // <- Asegúrate de que esto esté aquí
      selectedSeats,
    },
  });
}

  if (filmLoading || funcionesLoading || seatsLoading) {
    return <div className="text-white p-6">Cargando…</div>;
  }

  if (!film) {
    return (
      <div className="text-center text-white py-20">Película no encontrada</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 flex flex-col gap-4">
          <img
            src={film.poster || "/placeholder.jpg"}
            alt={film.titulo}
            className="rounded-xl shadow-lg w-full aspect-2/3 object-cover"
          />
          <div className="bg-neutral-800 rounded-lg p-4 space-y-2 text-sm">
            <h1 className="text-xl font-bold">{film.titulo}</h1>
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
          {funciones.length === 0 ? (
            <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-lg border border-yellow-500/40">
              No hay funciones disponibles para esta película.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-3">
                {funciones.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFuncionId(f.id);
                      setSelectedSeats([]);
                    }}
                    className={`px-3 py-2 rounded border ${selectedFuncionId === f.id
                        ? "bg-blue-600 border-blue-500"
                        : "bg-neutral-800 border-neutral-700"
                      }`}
                    title={f.Sala ? `Sala ${f.Sala.nombre}` : ""}
                  >
                    {f.fecha} {f.horario.slice(0, 5)}{" "}
                    {f.Sala ? `- ${f.Sala.nombre}` : ""}
                  </button>
                ))}
              </div>

              {selectedFuncionId ? (
                <div className="bg-neutral-800 rounded-xl p-5 shadow border border-neutral-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Asientos</span>
                    <span className="text-sm text-green-400">
                      Libres: {seats.filter((s) => s.disponible).length}
                    </span>
                  </div>
                  {seatsLoading ? (
                    <div className="text-center py-4">Cargando asientos...</div>
                  ) : seats.length === 0 ? (
                    <div className="text-yellow-300">
                      No hay asientos disponibles
                    </div>
                  ) : (
                    <Seats
                      seats={seats}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                    />
                  )}
                </div>
              ) : (
                <div className="text-neutral-300">
                  Selecciona una función para ver los asientos
                </div>
              )}
            </>
          )}

          {token ? (
            <div className="flex flex-col gap-3">
              <button
                className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!selectedFuncionId || selectedSeats.length === 0}
                onClick={handleCheckout}
              >
                {!selectedFuncionId
                  ? "Selecciona una función"
                  : selectedSeats.length === 0
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
            <button
              onClick={openLogin}
              className="inline-block bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg font-semibold text-white text-center transition"
            >
              Inicia sesión para comprar entradas
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
