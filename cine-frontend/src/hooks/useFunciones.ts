import {useEffect, useState} from "react";
import axios from "axios";

export interface FuncionVM {
  id: number;
  fecha: string;   // YYYY-MM-DD
  horario: string; // HH:mm:ss
  salaId: number;
  Sala?: { id: number; nombre: string; capacidad: number };
}

export function useFunciones(movieId?: string) {
  const [funciones, setFunciones] = useState<FuncionVM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    setError(null);
    axios
      .get<FuncionVM[]>(`/funciones/movie/${movieId}`)
      .then(r => setFunciones(r.data))
      .catch(() => setError("No se pudieron cargar las funciones"))
      .finally(() => setLoading(false));
  }, [movieId]);

  return {funciones, loading, error};
}