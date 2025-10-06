import { useLocation } from "react-router-dom";
import { Seats } from "../../components/Seats/Seats";

export default function Checkout() {
  const { state } = useLocation() as any;
  const { film, funcionId, day, time, seats } = state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Resumen de la compra
        </h1>

        {funcionId && <Seats funcionId={funcionId} />}

        <div className="bg-neutral-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Resumen</h2>

          <div>
            <h3 className="font-medium">
              {film?.title || "Título de la película"}
            </h3>
          </div>

          <hr className="border-neutral-700" />

          <div>
            <span className="text-sm text-neutral-400">
              Cine, día y horario
            </span>
            <div className="mt-2">
              <span>Cine Rosario</span>
              <p>Sala 3</p>
              <p>
                {day || "Día"}, {time || "Hora"}
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-700 pt-4">
            <div className="flex justify-between items-center">
              <span>Total:</span>
              <span className="text-xl font-bold">
                ${seats ? seats.length * 1500 : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
