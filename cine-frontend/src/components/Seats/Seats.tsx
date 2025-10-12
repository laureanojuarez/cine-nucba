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
      <h2 className="font-bold text-xl mb-2">Mapa de asientos</h2>
      <div className="flex flex-col gap-1">
        {filas.map((fila) => (
          <div key={fila} className="flex items-center gap-2">
            <span className="font-semibold w-6">{fila}</span>
            {seats
              .filter((seat) => seat.fila === fila)
              .sort((a, b) => a.numero - b.numero)
              .map((seat) => (
                <span
                  key={seat.id}
                  className={`px-3 py-1 rounded border text-sm ${
                    seat.disponible
                      ? "bg-green-200 border-green-400"
                      : "bg-red-200 border-red-400 line-through"
                  }`}
                >
                  {seat.numero}
                </span>
              ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-sm">
        <span className="px-2 py-1 bg-green-200 border border-green-400 rounded">
          Disponible
        </span>
        <span className="px-2 py-1 bg-red-200 border border-red-400 rounded line-through">
          Ocupado
        </span>
      </div>
    </div>
  );
}
