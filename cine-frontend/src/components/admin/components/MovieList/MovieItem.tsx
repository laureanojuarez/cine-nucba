interface Film {
  id: number;
  titulo: string;
  genero: string;
  duracion: number;
  poster?: string;
}

interface MovieItemProps {
  film: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: number) => void;
}

export const MovieItem = ({film, onEdit, onDelete}: MovieItemProps) => {
  return (
    <li className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/90 p-4 rounded-xl shadow border border-gray-700 hover:scale-[1.01] transition">
      <div className="flex items-center gap-4 flex-1">
        {film.poster ? (
          <img
            src={film.poster}
            alt={film.titulo}
            className="w-16 h-24 object-cover rounded shadow border border-gray-700"
          />
        ) : (
          <div className="w-16 h-24 flex items-center justify-center bg-gray-700 rounded text-gray-400 text-xs border border-gray-600">
            Sin poster
          </div>
        )}
        <div>
          <div className="text-lg font-bold text-green-400">{film.titulo}</div>
          <div className="text-gray-300">{film.genero}</div>
          <div className="text-gray-400 text-sm">{film.duracion} min</div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={() => onEdit(film)}
          className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700 hover:scale-105 transition font-semibold shadow"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(film.id)}
          className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 hover:scale-105 transition font-semibold shadow"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};
