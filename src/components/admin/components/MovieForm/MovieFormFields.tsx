import {Form, Field, ErrorMessage} from "formik";

interface MovieFormFieldsProps {
  isSubmitting: boolean;
}

export const MovieFormFields = ({isSubmitting}: MovieFormFieldsProps) => {
  return (
    <Form className="bg-gray-900/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-5xl border border-gray-700 mb-10">
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
          <Field
            type="text"
            id="titulo"
            name="titulo"
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Ej: Matrix"
          />
          <ErrorMessage
            name="titulo"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="genero"
            className="block font-semibold mb-1 text-gray-200"
          >
            Género
          </label>
          <Field
            type="text"
            id="genero"
            name="genero"
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Ej: Ciencia Ficción"
          />
          <ErrorMessage
            name="genero"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="duracion"
            className="block font-semibold mb-1 text-gray-200"
          >
            Duración
          </label>
          <Field
            type="number"
            id="duracion"
            name="duracion"
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            min={1}
            placeholder="En minutos"
          />
          <ErrorMessage
            name="duration"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="poster"
            className="block font-semibold mb-1 text-gray-200"
          >
            Poster
          </label>
          <Field
            type="text"
            name="poster"
            id="poster"
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="URL de la imagen"
          />
          <ErrorMessage
            name="poster"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="sala"
            className="block font-semibold mb-1 text-gray-200"
          >
            Sala
          </label>
          <Field
            type="number"
            id="sala"
            name="sala"
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            min={1}
            placeholder="Ej: 1"
          />
          <ErrorMessage
            name="sala"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-linear-to-r from-green-500 to-green-700 text-white py-2 rounded-lg hover:scale-105 hover:from-green-400 hover:to-green-600 transition font-semibold shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Agregando..." : "Agregar Película"}
      </button>
    </Form>
  );
};
