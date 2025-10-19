type Seat = {
  id: number;
  fila: string;
  numero: number;
  disponible: boolean;
};

type Props = {
  seats: Seat[];
};

export default function Seats({ seats }: Props) {
  // Agrupar asientos por fila
  const filas = Array.from(new Set(seats.map((seat) => seat.fila))).sort();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg mb-2 text-white">Mapa de asientos</h2>
      <div className="flex flex-col gap-1">
        {filas.map((fila) => (
          <div key={fila} className="flex items-center gap-2">
            <span className="font-semibold w-6 text-white">{fila}</span>
            {seats
              .filter((seat) => seat.fila === fila)
              .sort((a, b) => a.numero - b.numero)
              .map((seat) => (
                <span
                  key={seat.id}
                  className={`px-3 py-1 rounded border text-sm font-semibold transition-colors duration-200 ${
                    seat.disponible
                      ? "bg-teal-100 border-teal-300 text-teal-900 hover:bg-teal-200"
                      : "bg-gray-300 border-gray-400 text-gray-500 line-through opacity-70"
                  }`}
                >
                  {seat.numero}
                </span>
              ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-sm">
        <span className="px-2 py-1 bg-teal-100 border border-teal-300 rounded text-teal-900">
          Disponible
        </span>
        <span className="px-2 py-1 bg-gray-300 border border-gray-400 rounded text-gray-500 line-through opacity-70">
          Ocupado
        </span>
      </div>
    </div>
  );
}
