import {Link, useParams} from "react-router-dom";
import Seats from "../../components/Seats/Seats";
import {useFilm} from "../../hooks/useFilms";
import {useSalas} from "../../hooks/useSalas";
import {useAuth} from "../../store/auth";
import {useState} from "react";
import axios from "axios";

export default function FilmDetail() {
  const {id} = useParams<{id: string}>();
  const {film} = useFilm(id);
  const {salas} = useSalas(id);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleCheckout() {
    if (!user) return alert("Debes iniciar sesion");
    if (selectedSeats.length === 0)
      return alert("Debes seleccionar al menos un asiento");

    const salaId = salas[0]?.id;
    if (!salaId) return alert("No hay sala disponible para esta película");

    try {
      await axios.post(
        `${API_URL}/reservas`,
        {
          userId: user.id,
          salaId,
          seatIds: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reserva realizada con éxito");
    } catch (error) {
      alert("Error al realizar la reserva");
    }
  }

  if (!film) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-lg text-white">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">{film.title}</h1>
          <div className=" relative top-8">
            {film.duration && (
              <span className=" text-white text-xs px-2 py-1 rounded">
                {Math.floor(film.duration / 60)}h {film.duration % 60}m
              </span>
            )}
          </div>
          <img
            src={film.poster || "/placeholder.jpg"}
            alt={film.title}
            className="rounded-lg shadow-lg w-96  object-cover mb-4"
          />
          <span className="border text-white text-xl px-2 py-1 rounded">
            {film.genero}
          </span>
        </div>
        <div className="md:w-2/3 w-full flex flex-col gap-4">
          <div className="mb-4">
            <span className="font-semibold">Género:</span>{" "}
            {film.genero || "N/A"}
          </div>
          {salas.length === 0 ? (
            <div className="text-yellow-400">
              No hay salas disponibles para esta película.
            </div>
          ) : (
            salas.map((sala: any) => (
              <div
                key={sala.id}
                className="mb-6 bg-gray-800 rounded-lg p-4 shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">
                    Sala {sala.salaNumber}
                  </span>
                  <span className="text-sm text-green-400">
                    Asientos disponibles:{" "}
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
            <div className="mt-4 flex flex-col gap-2">
              <button
                className="bg-green-600 px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
                onClick={handleCheckout}
              >
                Comprar
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-yellow-300 underline mt-4">
              Inicia sesión para comprar entradas
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
