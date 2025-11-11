import {Link} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {useEntradas} from "../../hooks/useEntradas";

export default function Dashboard() {
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const {entradas, loading} = useEntradas();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-2">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            No estás logueado
          </h1>
          <Link
            to={"/"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-2">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center border border-gray-200">
        {user.role === "admin" && (
          <Link
            to={"/admin"}
            className="mb-4 bg-linear-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition font-semibold shadow"
          >
            Panel de control
          </Link>
        )}
        <div className="w-full text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">🎬</span>
            <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow mb-1">
              ¡Hola, {user.nombre}!
            </h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
          </div>
          <span className="block font-semibold text-gray-700 mb-4 text-lg">
            Tus entradas reservadas
          </span>
        </div>
        {entradas.length === 0 ? (
          <div className="text-gray-500 text-center">
            <span className="text-2xl block mb-2">🍿</span>
            No tienes entradas reservadas.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {entradas.map((reserva) => (
              <li
                key={reserva.id}
                className="bg-linear-to-br from-green-100 via-white to-blue-100 border border-green-200 rounded-xl p-4 flex flex-col gap-2 shadow hover:scale-[1.02] transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🎟️</span>
                  <span className="font-bold text-green-700 text-lg">
                    {reserva.Sala.Movie.title}
                  </span>
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold">Sala:</span> #
                  {reserva.Sala.id}
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold">Asiento:</span>{" "}
                  {reserva.Seat.fila}
                  {reserva.Seat.numero}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(reserva.reservationDate).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
