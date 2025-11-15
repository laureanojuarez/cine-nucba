import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../store/auth";

export interface Reserva {
  id: number;
  fecha_compra: string;
  Sala: {
    id: number;
    nombre: string;
  };
  Seat: {
    fila: string;
    numero: number;
  };
}

export function useEntradas() {
  const token = useAuth((state) => state.token);
  const [entradas, setEntradas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setEntradas([]);
      setLoading(false);
      return;
    }

    const fetchEntradas = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/reservas/mis-entradas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntradas(res.data);
      } catch (error) {
        setEntradas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntradas();
  }, [token]);

  return {entradas, loading};
}
