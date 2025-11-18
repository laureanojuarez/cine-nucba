import {useEffect, useState} from "react";
import axios from "axios";

export interface SeatVM {
  id: number;
  fila: string;
  numero: number;
  disponible: boolean;
  salaId: number;
}

export interface SalaVM {
  id: number;
  nombre: string;
  capacidad: number;
  Seats: SeatVM[];
}

export function useSala(id?: string) {
  const [sala, setSala] = useState<SalaVM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    axios
      .get<SalaVM>(`/salas/${id}`)
      .then((res) => setSala(res.data))
      .catch(() => setError("No se pudo cargar la sala"))
      .finally(() => setLoading(false));
  }, [id]);

  return {sala, loading, error};
}