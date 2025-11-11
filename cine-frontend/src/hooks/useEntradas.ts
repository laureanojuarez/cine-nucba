import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../store/auth";

export interface Reserva {
  id: number;
  reservationDate: string;
  Sala: {
    id: number;
    Movie: {title: string};
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
        const res = await axios.get(`/reservas/mis-entradas`);
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
