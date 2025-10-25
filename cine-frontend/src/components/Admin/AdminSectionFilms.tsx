interface Film {
  id: number;
  title: string;
  genero: string;
  duration: number;
  poster?: string;
}

interface AdminSectionFilmsProps {
  films: Film[];
  loading: boolean;
  error: string | null;
  editId: string | null;
  editData: any;
  handleEditSubmit: (e: React.FormEvent) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditClick: (film: Film) => void;
  handleDelete: (id: number) => void;
  handleCancelEdit: () => void;
}

export const AdminSectionFilms: React.FC<AdminSectionFilmsProps> = ({
  films,
  loading,
  error,
  editId,
  editData,
  handleEditSubmit,
  handleEditChange,
  handleEditClick,
  handleDelete,
  handleCancelEdit,
}) => {
  return (
    <section className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Gestión de películas
      </h2>
      {loading ? (
        <p className="text-white text-center">Cargando películas...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <ul className="space-y-4">
          {films.length === 0 && (
            <li className="text-gray-300 text-center">
              No hay películas registradas.
            </li>
          )}
          {films.map((film) =>
            Number(editId) === film.id ? (
              <li
                key={film.id}
                className="flex flex-col md:flex-row items-center gap-4 bg-gray-800/90 p-4 rounded-xl shadow border border-gray-700"
              >
                <form
                  onSubmit={handleEditSubmit}
                  className="flex flex-col md:flex-row items-center gap-2 w-full"
                >
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 transition w-32"
                    required
                    placeholder="Título"
                  />
                  <input
                    type="text"
                    name="genero"
                    value={editData.genero}
                    onChange={handleEditChange}
                    className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 transition w-32"
                    required
                    placeholder="Género"
                  />
                  <input
                    type="number"
                    name="duration"
                    value={editData.duration}
                    onChange={handleEditChange}
                    className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 transition w-24"
                    required
                    placeholder="Duración"
                  />
                  <input
                    type="text"
                    name="poster"
                    value={editData.poster}
                    onChange={handleEditChange}
                    className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 transition w-40"
                    placeholder="Poster URL"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded hover:scale-105 transition font-semibold shadow"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:scale-105 transition font-semibold shadow"
                  >
                    Cancelar
                  </button>
                </form>
              </li>
            ) : (
              <li
                key={film.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/90 p-4 rounded-xl shadow border border-gray-700 hover:scale-[1.01] transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  {film.poster ? (
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-16 h-24 object-cover rounded shadow border border-gray-700 bg-gray-800"
                    />
                  ) : (
                    <div className="w-16 h-24 flex items-center justify-center bg-gray-700 rounded text-gray-400 text-xs border border-gray-600">
                      Sin poster
                    </div>
                  )}
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {film.title}
                    </div>
                    <div className="text-gray-300">{film.genero}</div>
                    <div className="text-gray-400 text-sm">
                      {film.duration} min
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEditClick(film)}
                    className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700 hover:scale-105 transition font-semibold shadow"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(film.id)}
                    className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 hover:scale-105 transition font-semibold shadow"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};
