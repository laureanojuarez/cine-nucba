import { useNavigate, useParams } from "react-router-dom";
import Seats from "../../features/seats/components/Seats";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useUI } from "../../store/useUI";
import { useFilm } from "../../hooks/Films/useFilm";
import { useFunciones } from "../../hooks/useFunciones";
import { useAsientosFuncion } from "../../hooks/useAsientosFuncion";
import { Calendar, MapPin, Ticket } from "lucide-react";

export default function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const { film, loading: filmLoading } = useFilm(id);
  const { funciones, loading: funcionesLoading } = useFunciones(id);
  const [selectedFuncionId, setSelectedFuncionId] = useState<number | undefined>(undefined);
  const { seats, loading: seatsLoading } = useAsientosFuncion(selectedFuncionId || undefined);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const openLogin = useUI((s) => s.openLogin);
  const navigate = useNavigate();

  async function handleCheckout() {
    if (!user) {
      openLogin();
      return;
    }
    if (!selectedFuncionId) return toast.error('Selecciona una funcion')
    if (selectedSeats.length === 0) return toast.error('Selecciona al menos un asiento')

    navigate("/checkout", {
      state: {
        filmId: id,
        filmTitle: film?.titulo,
        filmPoster: film?.poster,
        funcionId: selectedFuncionId,
        selectedSeats,
      },
    });
  }

  if (filmLoading || funcionesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!film) return <div className="text-center text-white py-20">Película no encontrada</div>;

  return (
    <div className="min-h-screen bg-neutral-900 pb-20">
      {/* Hero Section con Backdrop */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/80 to-transparent z-10" />
        <img
          src={film.poster}
          alt={film.titulo}
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-6 sm:p-10 max-w-7xl mx-auto flex flex-col sm:flex-row gap-8 items-end">
          <img
            src={film.poster}
            alt={film.titulo}
            className="w-40 sm:w-52 rounded-xl shadow-2xl border-4 border-neutral-800 hidden sm:block"
          />
          <div className="mb-4">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
              En Cartelera
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{film.titulo}</h1>
            <div className="flex items-center gap-4 text-neutral-300 text-sm">
              <span>{film.genero}</span>
              <span>•</span>
              <span>{film.duracion} min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Principal: Funciones y Asientos */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Selector de Funciones */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="text-blue-500" /> Selecciona tu función
              </h2>
              
              {funciones.length === 0 ? (
                <div className="bg-neutral-800 p-6 rounded-xl text-center text-neutral-400">
                  No hay funciones programadas por el momento.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {funciones.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFuncionId(f.id);
                        setSelectedSeats([]);
                      }}
                      className={`relative p-4 rounded-xl border transition-all text-left group
                        ${selectedFuncionId === f.id
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                          : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-750"
                        }`}
                    >
                      <div className="text-lg font-bold mb-1">{f.horario.slice(0, 5)}</div>
                      <div className="text-xs opacity-80 flex items-center gap-1">
                        <Calendar size={12} /> {f.fecha}
                      </div>
                      <div className="text-xs opacity-80 flex items-center gap-1 mt-1">
                        <MapPin size={12} /> Sala {f.Sala?.nombre}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Selector de Asientos */}
            {selectedFuncionId && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 sm:p-8">
                  {seatsLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <Seats
                      seats={seats}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                    />
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Columna Derecha: Resumen de Compra (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Ticket className="text-blue-500" /> Resumen
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Película</span>
                  <span className="text-white font-medium text-right">{film.titulo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Función</span>
                  <span className="text-white font-medium">
                    {selectedFuncionId 
                      ? funciones.find(f => f.id === selectedFuncionId)?.horario.slice(0, 5) 
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Asientos</span>
                  <span className="text-white font-medium">
                    {selectedSeats.length > 0 ? selectedSeats.length : "-"}
                  </span>
                </div>
                <div className="h-px bg-neutral-700 my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-blue-400">
                    ${(selectedSeats.length * 5000).toLocaleString()}
                  </span>
                </div>
              </div>

              {token ? (
                <button
                  onClick={handleCheckout}
                  disabled={!selectedFuncionId || selectedSeats.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  Confirmar Compra
                </button>
              ) : (
                <button
                  onClick={openLogin}
                  className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3.5 rounded-xl transition-all"
                >
                  Inicia sesión para comprar
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}