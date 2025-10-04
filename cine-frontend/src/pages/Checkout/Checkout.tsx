import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const { film, day, time, seats } = location.state || {};

  console.log("=== DATOS RECIBIDOS EN CHECKOUT ===");
  console.log("Film:", film);
  console.log("Day:", day);
  console.log("Time:", time);
  console.log("Seats:", seats);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          ¡Compra Confirmada!
        </h1>

        <div className="bg-neutral-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Resumen</h2>

          <div>
            <h3 className="font-medium">{film || "Título de la película"}</h3>
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

          {seats && seats.length > 0 && (
            <div>
              <h4 className="text-sm text-neutral-400 mb-1">Asientos</h4>
              <div className="flex flex-wrap gap-2">
                {seats.map((seat, index) => (
                  <span
                    key={index}
                    className="bg-red-600 px-2 py-1 rounded text-sm"
                  >
                    Fila {seat.fila} - Asiento {seat.columna}
                  </span>
                ))}
              </div>
            </div>
          )}

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
