import { useEffect, useState } from "react";
import axios from "axios";

interface ReservaVM {
  id: number;
  userId: number;
  funcionId: number;
  seatId: number;
  precio: number;
  createdAt: string;
  funcion?: {
    id: number;
    fecha: string;
    horario: string;
    sala?: {
      id: number;
      nombre: string;
    };
    movie?: {
      id: number;
      titulo: string;
    };
  };
  seat?: {
    id: number;
    fila: string;
    numero: number;
  };
}

export function useEntradas() {
  const [entradas, setEntradas] = useState<ReservaVM[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ReservaVM[]>("/reservas/mis-entradas")
      .then((r) => setEntradas(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { entradas, loading };
}