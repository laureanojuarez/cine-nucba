interface MovieEditFormProps {
  editData: {
    title: string;
    genero: string;
    duration: number;
    poster?: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

export const MovieEditForm = ({
  editData,
  onSubmit,
  onChange,
  onCancel,
}: MovieEditFormProps) => {
  return (
    <li className="bg-gray-800/90 p-4 rounded-xl shadow border border-gray-700">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1 font-semibold">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={onChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1 font-semibold">
              Género
            </label>
            <input
              type="text"
              name="genero"
              value={editData.genero}
              onChange={onChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1 font-semibold">
              Duración (min)
            </label>
            <input
              type="number"
              name="duration"
              value={editData.duration}
              onChange={onChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
              required
              min={1}
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1 font-semibold">
              Poster URL
            </label>
            <input
              type="text"
              name="poster"
              value={editData.poster || ""}
              onChange={onChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-linear-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded hover:scale-105 transition font-semibold shadow"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:scale-105 transition font-semibold shadow"
          >
            Cancelar
          </button>
        </div>
      </form>
    </li>
  );
};
