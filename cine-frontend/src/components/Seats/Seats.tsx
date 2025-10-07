import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

type BackendSeat = {
  id: number;
  fila: string;
  numero: number;
  etiqueta: string;
  status: "free" | "taken";
};

type FetchResponse = {
  funcionId: number;
  sala: {id: number; nombre: string; filas: number; columnas: number};
  asientos: BackendSeat[];
};

interface SeatsProps {
  funcionId: number;
  onConfirm?(asientosSeleccionados: BackendSeat[]): void;
}

const API_BASE = "http://localhost:3000";

export const Seats: React.FC<SeatsProps> = ({funcionId, onConfirm}) => {
  const [data, setData] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API_BASE}/funciones/${funcionId}/asientos`);
      if (!r.ok) {
        if (r.status === 404) throw new Error("Función no encontrada");
        throw new Error(`Error (${r.status}) cargando asientos`);
      }
      const json: FetchResponse = await r.json();
      setData(json);
      setSelected(new Set());
    } catch (e: any) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (funcionId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funcionId]);

  const toggle = (seat: BackendSeat) => {
    if (seat.status === "taken") return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(seat.id) ? next.delete(seat.id) : next.add(seat.id);
      return next;
    });
  };

  const seatsByRows = useMemo(() => {
    if (!data) return [];
    const grouped: Record<string, BackendSeat[]> = {};
    data.asientos.forEach((s) => {
      if (!grouped[s.fila]) grouped[s.fila] = [];
      grouped[s.fila].push(s);
    });
    return Object.keys(grouped)
      .sort()
      .map((k) => grouped[k].sort((a, b) => a.numero - b.numero));
  }, [data]);

  const seleccionadosArray = useMemo(
    () => (data ? data.asientos.filter((s) => selected.has(s.id)) : []),
    [selected, data]
  );

  const reservar = async () => {
    if (!data || seleccionadosArray.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      console.debug("Reserva: token raw:", token);

      if (!token) {
        console.warn("No hay token en localStorage. Redirigiendo a login.");
        setError("No autenticado — por favor inicia sesión.");
        setSaving(false);
        navigate("/login");
        return;
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const resp = await fetch(`${API_BASE}/reservas`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          funcionId: data.funcionId,
          asientos: seleccionadosArray.map((s) => s.etiqueta),
          precio: 1500,
        }),
      });

      const contentType = resp.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await resp.json().catch(() => null)
        : await resp.text().catch(() => null);

      if (!resp.ok) {
        console.error("Reserva fallida:", resp.status, body);
        const msg =
          (body && (body.error || body.message || JSON.stringify(body))) ||
          `Error (${resp.status}) reservando`;
        throw new Error(msg);
      }

      console.debug("Reserva OK:", body);
      await load();
      if (onConfirm) onConfirm(seleccionadosArray);
    } catch (e: any) {
      console.error("Error en reservar:", e);
      setError(e.message || "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando asientos...</div>;
  if (error) return <div style={{color: "red"}}>{error}</div>;
  if (!data) return null;

  const columnas = data.sala.columnas;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Sala {data.sala.nombre} (Función #{data.funcionId})
      </h2>
      <div className="text-xs mb-1">Pantalla</div>
      <div className="h-1.5 bg-gradient-to-r from-neutral-500 to-neutral-300 rounded mb-4" />
      <div className="flex flex-col gap-2">
        {seatsByRows.map((rowSeats) => (
          <div
            key={rowSeats[0].fila}
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${columnas}, 34px)`,
            }}
          >
            {rowSeats.map((seat) => {
              const isSel = selected.has(seat.id);
              const taken = seat.status === "taken";
              const base = taken
                ? "bg-neutral-600 cursor-not-allowed"
                : isSel
                ? "bg-blue-600 text-white"
                : "bg-neutral-300 hover:bg-neutral-200";
              return (
                <button
                  key={seat.id}
                  onClick={() => toggle(seat)}
                  disabled={taken}
                  className={`text-[10px] h-8 w-8 rounded border border-neutral-500 transition ${base}`}
                  title={`${seat.etiqueta} (${taken ? "Ocupado" : "Libre"})`}
                >
                  {seat.etiqueta}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm">
        Seleccionados:{" "}
        {seleccionadosArray.length
          ? seleccionadosArray.map((s) => s.etiqueta).join(", ")
          : "Ninguno"}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={reservar}
          disabled={!seleccionadosArray.length || saving}
          className="bg-green-600 px-3 py-1 rounded disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Reservar"}
        </button>
        <button
          onClick={() => setSelected(new Set())}
          disabled={!selected.size}
          className="bg-neutral-600 px-3 py-1 rounded disabled:opacity-50"
        >
          Limpiar
        </button>
        <button onClick={load} className="bg-neutral-700 px-3 py-1 rounded">
          Refrescar
        </button>
      </div>
      <div className="mt-2 text-xs text-neutral-400">
        Azul: seleccionado · Gris oscuro: ocupado · Gris claro: libre
      </div>
    </div>
  );
};
