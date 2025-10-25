import axios from "axios";
import {useState} from "react";
import {useFilms} from "../../hooks/useFilms";
import {useAuth} from "../../store/auth";
import {AdminSectionFilms} from "../../components/Admin/AdminSectionFilms";

export default function Admin() {
  const [message, setMessage] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const {films, loading, error, refetch} = useFilms();

  const token = useAuth((state) => state.token);

  const reloadFilms = async () => {
    await refetch();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta película?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/peliculas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Película eliminada correctamente.");
      reloadFilms();
    } catch (error) {
      setMessage("Error al eliminar la película.");
      console.error(error);
    }
  };

  const handleEditClick = (film: any) => {
    setEditId(film.id);
    setEditData({
      title: film.title,
      genero: film.genero,
      duration: film.duration,
      poster: film.poster,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEditData((prevData: any) => ({...prevData, [name]: value}));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/peliculas/${editId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Película actualizada correctamente.");
      setEditId(null);
      reloadFilms();
    } catch (error) {
      setMessage("Error al actualizar la película.");
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const handleAddMovie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/peliculas",
          {
            title: data.title,
            genero: data.genero,
            duration: data.duration,
            poster: data.poster,
            salaNumber: data.sala,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Película agregada correctamente.");
        form.reset();
        console.log(response.data);
      } catch (error) {
        setMessage("Error al agregar la película.");
        console.error(error);
      }
    };

    handleAddMovie();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-2">
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-tight">
        Panel de Administración
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-5xl border border-gray-700 mb-10"
      >
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Agregar Película
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block font-semibold mb-1 text-gray-200"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
              placeholder="Ej: Matrix"
            />
          </div>
          <div>
            <label
              htmlFor="genero"
              className="block font-semibold mb-1 text-gray-200"
            >
              Género
            </label>
            <input
              type="text"
              id="genero"
              name="genero"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
              placeholder="Ej: Ciencia Ficción"
            />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block font-semibold mb-1 text-gray-200"
            >
              Duración
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
              min={1}
              placeholder="En minutos"
            />
          </div>
          <div>
            <label
              htmlFor="poster"
              className="block font-semibold mb-1 text-gray-200"
            >
              Poster
            </label>
            <input
              type="text"
              name="poster"
              id="poster"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="URL de la imagen"
            />
          </div>
          <div>
            <label
              htmlFor="sala"
              className="block font-semibold mb-1 text-gray-200"
            >
              Sala
            </label>
            <input
              type="number"
              id="sala"
              name="sala"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
              min={1}
              placeholder="Ej: 1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg hover:scale-105 hover:from-green-400 hover:to-green-600 transition font-semibold shadow-lg mt-2"
        >
          Agregar Película
        </button>
        {message && (
          <div
            className={`mt-2 text-center text-sm px-4 py-2 rounded-lg font-semibold transition ${
              message.includes("Error")
                ? "bg-red-600/80 text-white"
                : "bg-green-600/80 text-white"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <AdminSectionFilms
        films={films}
        loading={loading}
        error={error}
        editId={editId}
        editData={editData}
        handleEditSubmit={handleEditSubmit}
        handleEditChange={handleEditChange}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        handleCancelEdit={() => setEditId(null)}
      />
    </div>
  );
}
