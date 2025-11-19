import { Armchair } from "lucide-react";

type Seat = {
  id: number;
  fila: string;
  numero: number;
  disponible: boolean;
};

type Props = {
  seats: Seat[];
  selectedSeats: number[];
  setSelectedSeats: (seats: number[]) => void;
};

export default function Seats({seats, selectedSeats, setSelectedSeats}: Props) {
  const filas = Array.from(new Set(seats.map((seat) => seat.fila))).sort();

  const handleSelect = (id: number, disponible: boolean) => {
    if (!disponible) return;
    setSelectedSeats(
      selectedSeats.includes(id)
        ? selectedSeats.filter((sid) => sid !== id)
        : [...selectedSeats, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
      {/* Pantalla de Cine */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-3/4 h-2 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full shadow-[0_10px_20px_-2px_rgba(59,130,246,0.5)]" />
        <span className="text-xs text-neutral-500 uppercase tracking-widest">Pantalla</span>
      </div>

      {/* Grilla de Asientos */}
      <div className="flex flex-col gap-3">
        {filas.map((fila) => {
          const filaSeats = seats
            .filter((seat) => seat.fila === fila)
            .sort((a, b) => a.numero - b.numero);
          return (
            <div key={fila} className="flex items-center justify-center gap-4">
              <span className="font-bold text-neutral-500 w-4 text-center text-sm">
                {fila}
              </span>
              <div className="flex gap-2">
                {filaSeats.map((seat) => {
                  const selected = selectedSeats.includes(seat.id);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSelect(seat.id, seat.disponible)}
                      disabled={!seat.disponible}
                      className={`group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-t-lg rounded-b-md transition-all duration-200
                        ${
                          !seat.disponible
                            ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                            : selected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-y-0.5"
                            : "bg-neutral-700 text-neutral-300 hover:bg-blue-500/50 hover:text-white"
                        }
                      `}
                      title={`Fila ${seat.fila} - Asiento ${seat.numero}`}
                    >
                      <Armchair size={18} strokeWidth={2.5} className={selected ? "fill-current" : ""} />
                      
                      {/* Tooltip simple */}
                      <span className="absolute -top-8 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {seat.fila}{seat.numero}
                      </span>
                    </button>
                  );
                })}
              </div>
              <span className="font-bold text-neutral-500 w-4 text-center text-sm">
                {fila}
              </span>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex gap-6 text-sm text-neutral-400 bg-neutral-800/50 px-6 py-3 rounded-full border border-neutral-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neutral-700 rounded-t-md rounded-b-sm" />
          <span>Libre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-t-md rounded-b-sm shadow-blue-600/30" />
          <span className="text-white">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neutral-800 rounded-t-md rounded-b-sm opacity-50" />
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
}