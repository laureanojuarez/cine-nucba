import {Link} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {useEntradas} from "../../hooks/useEntradas";
import { Calendar, Clock, MapPin, QrCode, ShieldCheck, Ticket } from "lucide-react";

export default function Dashboard() {
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const {entradas, loading} = useEntradas();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-400 animate-pulse">Cargando tus entradas...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 p-4">
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 text-center max-w-md w-full">
          <ShieldCheck className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h1>
          <p className="text-neutral-400 mb-6">Necesitas iniciar sesión para ver tus entradas.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all w-full"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header del Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Hola, <span className="text-blue-400">{user.nombre}</span> 👋
            </h1>
            <p className="text-neutral-400">Aquí están tus próximas funciones.</p>
          </div>

          {user.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-3 rounded-xl border border-neutral-700 transition-all font-medium"
            >
              <ShieldCheck size={18} />
              Panel de Admin
            </Link>
          )}
        </div>

        {/* Lista de Entradas */}
        {entradas.length === 0 ? (
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-12 text-center">
            <div className="bg-neutral-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-10 h-10 text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tienes entradas activas</h3>
            <p className="text-neutral-400 mb-6">¡Es un buen momento para ver una película!</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium hover:underline"
            >
              Ver cartelera &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {entradas.map((reserva) => (
              <div
                key={reserva.id}
                className="group relative bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col sm:flex-row"
              >
                {/* Decoración: Borde izquierdo de color */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-blue-500 to-purple-600" />

                {/* Sección Principal */}
                <div className="flex-1 p-6 pl-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {reserva.funcion?.movie?.titulo || "Película Desconocida"}
                      </h3>
                      <span className="text-xs font-medium bg-blue-500/10 text-blue-400 px-2 py-1 rounded mt-2 inline-block border border-blue-500/20">
                        ENTRADA DIGITAL
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-neutral-300">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>
                        Sala: <strong className="text-white">{reserva.funcion?.sala?.nombre}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span>{reserva.funcion?.fecha}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-neutral-500" />
                      <span>{reserva.funcion?.horario} hs</span>
                    </div>
                  </div>
                </div>

                {/* Línea divisoria punteada (efecto ticket) */}
                <div className="relative w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-dashed border-neutral-600 my-4 sm:my-0 flex items-center justify-center">
                  <div className="absolute -left-3 sm:left-auto sm:-top-3 w-6 h-6 bg-neutral-900 rounded-full" />
                  <div className="absolute -right-3 sm:right-auto sm:-bottom-3 w-6 h-6 bg-neutral-900 rounded-full" />
                </div>

                {/* Sección Derecha (Asiento y QR) */}
                <div className="p-6 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 bg-neutral-800/50 min-w-[140px]">
                  <div className="text-center">
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider">Asiento</span>
                    <span className="text-2xl font-bold text-white">
                      {reserva.seat?.fila}{reserva.seat?.numero}
                    </span>
                  </div>
                  
                  <div className="bg-white p-2 rounded-lg">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}