import {useEffect, useState} from "react";
import axios from "axios";

export function useSalas(movieId?: string) {
  const [salas, setSalas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    axios
      .get(`${API_URL}/salas/movie/${movieId}`)
      .then((res) => setSalas(res.data))
      .catch(() => setError("No se pudieron cargar las salas"))
      .finally(() => setLoading(false));
  }, [movieId]);

  return {salas, loading, error};
}
