import {Field, Form, Formik, ErrorMessage} from "formik";
import {MoveLeft, X} from "lucide-react";
import {validateSchema} from "./validateschema-profile";
import {useEffect} from "react";
import axios from "axios";

interface InfoProps {
  setView: (view: "main" | "info" | "password") => void;
  user: {
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
    genero: string;
  };
}

const emptyValues = {
  nombre: "",
  apellido: "",
  email: "",
  fechaNacimiento: "",
  telefono: "",
  genero: "",
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dateString.length > 10 ? dateString.slice(0, 10) : dateString;
};

export const Info = ({setView, user}: InfoProps) => {
  const initialValues = user
    ? {
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        fechaNacimiento: formatDate(user.fechaNacimiento) || "",
        telefono: user.telefono || "",
        genero: user.genero || "",
      }
    : emptyValues;

  const handleSubmit = async (
    values: typeof emptyValues,
    {setSubmitting, resetForm}: any
  ) => {
    try {
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        fecha_nacimiento: values.fechaNacimiento,
        telefono: values.telefono,
        genero: values.genero,
      };

      await axios.put("/profile", payload);

      alert("Perfil actualizado con éxito");
      setView("main");
    } catch (error) {
      alert(error?.response?.data?.message || "Error al actualizar el perfil");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center p-1">
        <button
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer mb-4"
          onClick={() => setView("main")}
        >
          <MoveLeft className="text-gray-400" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">
          Información personal
        </h2>
        <button
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer mb-4"
          onClick={() => setView("main")}
        >
          <X className="text-gray-400" />
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        <Form className="flex flex-col gap-3 flex-1">
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Nombre
            </label>
            <Field
              name="nombre"
              type="text"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Apellido
            </label>
            <Field
              name="apellido"
              type="text"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
            />
            <ErrorMessage
              name="apellido"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Correo electrónico
            </label>
            <Field
              name="email"
              type="email"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Fecha de nacimiento
            </label>
            <Field
              name="fechaNacimiento"
              type="date"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
            />
            <ErrorMessage
              name="fechaNacimiento"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Número de teléfono
            </label>
            <Field
              name="telefono"
              type="tel"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              placeholder=" +54..."
            />
            <ErrorMessage
              name="telefono"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-neutral-300">
              Género
            </label>
            <Field
              name="genero"
              type="text"
              className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
            />
            <ErrorMessage
              name="genero"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mt-auto w-full bg-white py-10 flex items-center justify-center">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded font-bold"
            >
              ACTUALIZAR DATOS
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
