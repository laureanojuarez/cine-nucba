import {useCallback, useEffect, useState} from "react";
import axios from "axios";

interface Film {
  id: number;
  title: string;
  genero: string;
  duration: number;
  poster?: string;
}

export function useFilm(id?: string) {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${API_URL}/peliculas/${id}`)
      .then((res) => setFilm(res.data))
      .catch(() => setError("No se pudo cargar la película"))
      .finally(() => setLoading(false));
  }, [id]);

  return {film, loading, error};
}

export const useFilms = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3000/peliculas");
      setFilms(res.data);
    } catch {
      setError("No se pudieron cargar las películas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return {films, loading, error, refetch: fetchFilms};
};
