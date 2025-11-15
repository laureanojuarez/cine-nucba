import { useEffect, useState } from "react";
import axios from "axios";

export interface SeatVM {
  id: number;
  fila: string;
  numero: number;
  salaId: number;
  disponible: boolean;
}

export function useAsientosFuncion(funcionId?: number) {
  const [seats, setSeats] = useState<SeatVM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!funcionId) {
      setSeats([]);
      setError(null);
      setLoading(false); // <- no hay función, no cargamos
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get<{ funcionId: number; Seats: SeatVM[] }>(`/funciones/${funcionId}/seats`)
      .then(r => {
        console.log('Respuesta del servidor:', r.data);
        console.log('Cantidad de asientos:', r.data.Seats?.length);
        setSeats(r.data.Seats || []);
      })
      .catch((err) => {
        console.error('Error al cargar asientos:', err.response?.data || err.message);
        setError("No se pudieron cargar los asientos");
      })
      .finally(() => setLoading(false));
  }, [funcionId]);

  return { seats, loading, error };
}