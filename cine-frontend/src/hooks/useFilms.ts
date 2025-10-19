import { useEffect, useState } from "react";
import axios from "axios";

interface Film {
  id: string;
  title: string;
  genero: string;
  duration: number;
  poster?: string;
}

export function useFilm(id?: string) {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/peliculas/${id}`)
      .then((res) => setFilm(res.data))
      .catch(() => setError("No se pudo cargar la película"))
      .finally(() => setLoading(false));
  }, [id]);

  return { film, loading, error };
}
