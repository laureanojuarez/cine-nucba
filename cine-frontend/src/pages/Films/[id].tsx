import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFilmById } from "../../api/films";
import axios from "axios";

type Film = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  vote_average?: number;
  runtime?: number;
};

export default function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compraLoading, setCompraLoading] = useState(false);
  const [compraError, setCompraError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilm() {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const data = await fetchFilmById(id);
          setFilm(data);
        }
      } catch (err: any) {
        setError("No se encontró la película");
      } finally {
        setLoading(false);
      }
    }
    fetchFilm();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Cargando...</div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!film)
    return <div className="text-center">No se encontró la película.</div>;

  async function handleCheckout() {
    if (!film) return;
    setCompraLoading(true);
    setCompraError(null);
    try {
      const resp = await axios.post("http://localhost:3000/peliculas/ensure", {
        externalId: film.id, // TMDB id
        titulo: film.title,
        duracion: film.runtime || 100,
        genero: film.genres?.[0]?.name || "General",
      });

      const { funcionId, peliculaId } = resp.data;
      navigate("/checkout", {
        state: {
          film: { ...film, dbId: peliculaId },
          funcionId,
          // Puedes pasar day/time si quieres algo fijo:
          day: new Date().toLocaleDateString("es-ES"),
          time: "20:00",
        },
      });
    } catch (e: any) {
      setCompraError(e.message);
    } finally {
      setCompraLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {film.poster_path && (
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              className="w-full md:w-80 rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{film.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Fecha de estreno:</strong>{" "}
              {film.release_date
                ? new Date(film.release_date).toLocaleDateString("es-ES")
                : "N/A"}
            </p>
            <p>
              <strong>Puntuación:</strong> ⭐{" "}
              {film.vote_average?.toFixed(1) ?? "N/A"}
            </p>
            <p>
              <strong>Duración:</strong>{" "}
              {film.runtime ? `${film.runtime} min` : "N/A"}
            </p>
            <p>
              <strong>Géneros:</strong>{" "}
              {film.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-300 leading-relaxed">
              {film.overview || "Sin descripción disponible."}
            </p>
          </div>

          {token ? (
            <div className="mt-6 flex flex-col gap-2">
              <button
                className="bg-blue-500 px-6 py-2 rounded-md"
                onClick={handleCheckout}
                disabled={compraLoading}
              >
                {compraLoading ? "Cargando..." : "Comprar"}
              </button>
              {compraError && (
                <span className="text-red-400 text-sm">{compraError}</span>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-yellow-300">
              Inicia sesión para comprar entradas
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
