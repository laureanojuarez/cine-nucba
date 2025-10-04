import { X } from "lucide-react";

export const CartTab = ({
  filmTitle,
  day,
  time,
  seats = [],
  onClose,
  onConfirm,
  open = true,
}) => {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-80 bg-black text-white flex flex-col border-l border-neutral-700 shadow-xl z-50">
        <div className="w-full flex justify-between items-center p-4 border-b border-neutral-700">
          <h3 className="font-semibold">Confirmar compra</h3>
          <button onClick={onClose} aria-label="Cerrar">
            <X />
          </button>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-auto">
          <div>
            <p className="text-sm text-neutral-400">Película</p>
            <p className="text-base font-medium">{filmTitle}</p>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-sm text-neutral-400">Día</p>
              <p>{day}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Horario</p>
              <p>{time}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-neutral-400">Asientos</p>
            {seats.length === 0 ? (
              <p className="text-neutral-400">Ninguno seleccionado</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {seats.map((s, i) => (
                  <li key={`${s.fila}-${s.columna}-${i}`}>
                    Fila {s.fila} · Asiento {s.columna}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-neutral-700">
          <button
            className="w-full bg-red-500 hover:bg-red-600 transition rounded-md py-2 font-medium disabled:bg-gray-600"
            onClick={onConfirm}
            disabled={seats.length === 0}
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </>
  );
};
