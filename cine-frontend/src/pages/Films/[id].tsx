import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seats from "../../components/Seats/Seats";

type Film = {
  id: number;
  title: string;
  genero: string;
};

export default function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film>({} as Film);
  const [salas, setSalas] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/peliculas/${id}`
        );
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };
    if (id) fetchFilm();
  }, [id]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/salas/movie/${id}`);
        setSalas(res.data);
      } catch (error) {
        console.error("Error fetching salas:", error);
      }
    };
    if (id) fetchSalas();
  }, [id]);

  async function handleCheckout() {
    console.log("Iniciando proceso de compra...");
  }

  if (!film) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex-1">
        <div>
          <img src={film.poster || " "} alt={film.title} />
        </div>
        <h1 className="text-3xl font-bold mb-4">{film.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <p>
            <strong>Géneros:</strong> {film.genero || "N/A"}
          </p>
        </div>

        {salas.map((sala: any) => (
          <>
            <li key={sala.id}>
              Sala ID: {sala.id} - Asientos Disponibles:{" "}
              {sala.Seat.filter((seat: any) => seat.disponible).length}
            </li>

            <Seats seats={sala.Seat} />
          </>
        ))}

        {token ? (
          <div className="mt-6 flex flex-col gap-2">
            <button
              className="bg-blue-500 px-6 py-2 rounded-md"
              onClick={handleCheckout}
            >
              Comprar
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-yellow-300">
            Inicia sesión para comprar entradas
          </Link>
        )}
      </div>
    </div>
  );
}
