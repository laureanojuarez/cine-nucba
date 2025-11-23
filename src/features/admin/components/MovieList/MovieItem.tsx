import type { Film } from "../../../../types";

interface MovieItemProps {
  film: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: number) => void;
}

export const MovieItem = ({ film, onEdit, onDelete }: MovieItemProps) => {
  return (
    <li className="bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200">
      <div className="flex items-center gap-4">
        {film.poster && (
          <img
            src={film.poster}
            alt={film.titulo}
            className="w-16 h-24 object-cover rounded shadow"
          />
        )}
        <div>
          <p className="font-semibold text-gray-800 text-lg">{film.titulo}</p>
          <p className="text-sm text-gray-600">Género: {film.genero}</p>
          <p className="text-sm text-gray-600">Duración: {film.duracion} min</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={() => onEdit(film)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(film.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};
