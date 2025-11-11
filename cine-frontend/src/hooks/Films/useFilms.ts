import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export interface Film {
  id: number;
  title: string;
  genero: string;
  duration: number;
  poster: string;
}

export const useFilms = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Film[]>("/peliculas");
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
