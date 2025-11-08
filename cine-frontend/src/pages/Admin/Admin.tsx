import axios from "axios";
import {useState} from "react";
import {useFilms} from "../../hooks/useFilms";
import {AdminSectionFilms} from "../../components/Admin/AdminSectionFilms";
import {Form, ErrorMessage, Field, Formik, type FormikHelpers} from "formik";
import {validationSchema} from "../../components/Admin/validation-schema";
import {toast} from "sonner";

interface FormValues {
  title: string;
  genero: string;
  duration: string;
  poster: string;
  sala: string;
}

interface EditData {
  title: string;
  genero: string;
  duration: string;
  poster?: string;
}

export default function Admin() {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData>({
    title: "",
    genero: "",
    duration: "",
    poster: "",
  });

  const {films, loading, error, refetch} = useFilms();

  const INITIAL_VALUES = {
    title: "",
    genero: "",
    duration: "",
    poster: "",
    sala: "",
  };

  const handleSubmit = async (
    values: FormValues,
    {setSubmitting, resetForm}: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post("/peliculas", {
        title: values.title,
        genero: values.genero,
        duration: Number(values.duration),
        poster: values.poster,
        salaNumber: Number(values.sala),
      });

      toast.success("Película agregada correctamente");
      resetForm();
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al agregar la película"
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta película?"))
      return;

    try {
      await axios.delete(`/peliculas/${id}`);
      toast.success("Película eliminada correctamente.");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al eliminar la película"
      );
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
    setEditData((prevData) => ({...prevData, [name]: value}));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/peliculas/${editId}`, editData);
      toast.success("Película actualizada correctamente.");
      setEditId(null);
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al actualizar la película"
      );
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-2">
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-tight">
        Panel de Administración
      </h1>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {({isSubmitting}) => (
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
                  id="title"
                  name="title"
                  className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="Ej: Matrix"
                />
                <ErrorMessage
                  name="title"
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
                  htmlFor="duration"
                  className="block font-semibold mb-1 text-gray-200"
                >
                  Duración
                </label>
                <Field
                  type="number"
                  id="duration"
                  name="duration"
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
        )}
      </Formik>
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
