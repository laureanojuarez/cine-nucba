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
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg text-white">Mapa de asientos</h2>
      <div className="flex flex-col gap-2">
        {filas.map((fila) => {
          const filaSeats = seats
            .filter((seat) => seat.fila === fila)
            .sort((a, b) => a.numero - b.numero);
          return (
            <div key={fila} className="flex items-center gap-2">
              <span className="font-semibold w-6 text-center text-gray-300">
                {fila}
              </span>
              <div className="flex gap-1 flex-wrap">
                {filaSeats.map((seat) => {
                  const selected = selectedSeats.includes(seat.id);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSelect(seat.id, seat.disponible)}
                      aria-label={`Asiento ${seat.fila}${seat.numero} ${
                        seat.disponible
                          ? selected
                            ? "seleccionado"
                            : "disponible"
                          : "ocupado"
                      }`}
                      className={`h-8 w-8 flex items-center justify-center rounded text-xs font-semibold border transition 
                      ${
                        !seat.disponible
                          ? "bg-neutral-700 border-neutral-600 text-neutral-500 line-through cursor-not-allowed"
                          : selected
                          ? "bg-blue-500 border-blue-600 text-white shadow"
                          : "bg-neutral-200 border-neutral-300 text-neutral-900 hover:bg-neutral-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      disabled={!seat.disponible}
                    >
                      {seat.numero}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-200 text-neutral-900 border border-neutral-300">
          <span className="h-3 w-3 rounded bg-neutral-400 inline-block" />
          Disponible
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-700 text-neutral-400 border border-neutral-600 line-through">
          <span className="h-3 w-3 rounded bg-neutral-600 inline-block" />
          Ocupado
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500 text-white border border-blue-600">
          <span className="h-3 w-3 rounded bg-blue-400 inline-block" />
          Seleccionado
        </span>
      </div>
    </div>
  );
}
