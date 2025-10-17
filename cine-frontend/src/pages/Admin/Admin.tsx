import axios from "axios";
import { useState } from "react";

export default function Admin() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const addMovie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/peliculas",
          data
        );

        await axios.post("http://localhost:3000/salas", {
          movieId: response.data.id,
          salaNumber: parseInt(data.sala as string),
        });

        setMessage("Película agregada correctamente.");
        form.reset();
        console.log(response.data);
      } catch (error) {
        setMessage("Error al agregar la película.");
        console.error(error);
      }
    };

    addMovie();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow">
        Panel de Admin
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-md border border-gray-700"
      >
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
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min={1}
            placeholder="En minutos"
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
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min={1}
            placeholder="Ej: 1"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
        >
          Agregar Película
        </button>
        {message && (
          <div className="mt-2 text-center text-sm text-white">{message}</div>
        )}
      </form>
    </div>
  );
}
