import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const PRECIO_POR_ASIENTO = 5000;
const SERVICIO_WEB_PORCENTAJE = 0.05; // 5%

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const [loading, setLoading] = useState(false);

  const { filmId, filmTitle, filmPoster, funcionId, selectedSeats } =
    location.state || {};

  if (!selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">
          No hay asientos seleccionados
        </h1>
        <button
          onClick={() => navigate(`/films/${filmId}`)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
        >
          Volver a la película
        </button>
      </div>
    );
  }

  const subtotal = selectedSeats.length * PRECIO_POR_ASIENTO;
  const servicioWeb = subtotal * SERVICIO_WEB_PORCENTAJE;
  const total = subtotal + servicioWeb;

  async function handleConfirm() {
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    if (!funcionId) {
      toast.error("No se encontro la funcion");
      return;
    }

    console.log("🔍 Validación antes de enviar:");
    console.log("  - Usuario:", user);
    console.log("  - FuncionId:", funcionId);
    console.log("  - SelectedSeats:", selectedSeats);
    console.log("  - Total:", total);

    setLoading(true);

    try {
      const payload = {
        funcionId,
        seatIds: selectedSeats,
        precio: Math.round(total), 
      };

      console.log("📤 Enviando reserva:", payload);

       // Agregar timeout de 30 segundos
    const response = await axios.post("/reservas", payload, {
      timeout: 30000,
    });

     console.log("✅ Respuesta del servidor:", response.data);
    toast.success("¡Reserva confirmada!");

// Limpiar el estado y navegar
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  } catch (error: any) {
    console.error("❌ Error completo:", error);
    console.error("📋 Respuesta del servidor:", error.response?.data);
    console.error("📊 Status:", error.response?.status);
    console.error("🔍 Mensaje:", error.message);

    if (error.code === 'ECONNABORTED') {
      toast.error("La solicitud tardó demasiado. Intenta de nuevo.");
    } else {
      toast.error(
        error?.response?.data?.error ||
        error?.response?.data?.detalle ||
        error?.message ||
        "Error al confirmar la reserva"
      );
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Resumen de compra</h1>

      <div className="bg-neutral-800 rounded-lg p-6 mb-6 flex gap-6">
        <img
          src={filmPoster || "/placeholder.jpg"}
          alt={filmTitle}
          className="w-32 h-48 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{filmTitle}</h2>
          <p className="text-neutral-400">Asientos: {selectedSeats.length}</p>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-lg p-6 mb-6 space-y-3">
        <div className="flex justify-between text-lg">
          <span>Cantidad de asientos:</span>
          <span className="font-semibold">{selectedSeats.length}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Precio por asiento:</span>
          <span className="font-semibold">
            ${PRECIO_POR_ASIENTO.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg text-yellow-400">
          <span>Servicio web (5%):</span>
          <span className="font-semibold">${servicioWeb.toLocaleString()}</span>
        </div>
        <hr className="border-neutral-700" />
        <div className="flex justify-between text-2xl font-bold">
          <span>Total:</span>
          <span className="text-green-400">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/films/${filmId}`)}
          className="flex-1 bg-neutral-700 hover:bg-neutral-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Volver
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </div>
    </div>
  );
}
