import {Field, Form, Formik, ErrorMessage, type FormikHelpers} from "formik";
import {MoveLeft, X} from "lucide-react";
import {validateSchema} from "./validateschema-profile";
import axios from "axios";
import {toast} from "sonner";
import {useAuth} from "../../../store/auth";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono: string;
  genero: string;
  role: string;
}

interface InfoProps {
  setView: (view: "main" | "info" | "password") => void;
  user: User;
}

type FormValues = {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono: string;
  genero: string;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dateString.length > 10 ? dateString.slice(0, 10) : dateString;
};

export const Info = ({setView, user}: InfoProps) => {
  const setUser = useAuth((state) => state.setUser);

  const initialValues: FormValues = {
    nombre: user.nombre || "",
    apellido: user.apellido || "",
    email: user.email || "",
    fechaNacimiento: formatDate(user.fechaNacimiento) || "",
    telefono: user.telefono || "",
    genero: user.genero || "",
  };

  const handleSubmit = async (
    values: FormValues,
    {setSubmitting}: FormikHelpers<FormValues>
  ) => {
    try {
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        fecha_nacimiento: values.fechaNacimiento,
        telefono: values.telefono,
        genero: values.genero,
      };

      await axios.put("/profile", payload);

      // Actualizar el usuario en el store
      setUser({
        ...user,
        nombre: values.nombre,
        apellido: values.apellido,
        fechaNacimiento: values.fechaNacimiento,
        telefono: values.telefono,
        genero: values.genero,
      });

      toast.success("Perfil actualizado con éxito");
      setView("main");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al actualizar el perfil"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center p-1 mb-4">
        <button
          type="button"
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => setView("main")}
          aria-label="Volver"
        >
          <MoveLeft className="text-gray-400" />
        </button>
        <h2 className="text-xl font-bold text-white">Información personal</h2>
        <button
          type="button"
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => setView("main")}
          aria-label="Cerrar"
        >
          <X className="text-gray-400" />
        </button>
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-3 flex-1">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Nombre
              </label>
              <Field
                id="nombre"
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

            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Apellido
              </label>
              <Field
                id="apellido"
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

            {/* Email (disabled) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Correo electrónico
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                disabled
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600 cursor-not-allowed opacity-60"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Fecha de nacimiento
              </label>
              <Field
                id="fechaNacimiento"
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

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Número de teléfono
              </label>
              <Field
                id="telefono"
                name="telefono"
                type="tel"
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
                placeholder="+54..."
              />
              <ErrorMessage
                name="telefono"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Género */}
            <div>
              <label
                htmlFor="genero"
                className="block text-sm font-semibold mb-1 text-neutral-300"
              >
                Género
              </label>
              <Field
                id="genero"
                name="genero"
                as="select"
                className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
              >
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </Field>
              <ErrorMessage
                name="genero"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit button */}
            <div className="mt-auto w-full bg-white py-10 flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "ACTUALIZANDO..." : "ACTUALIZAR DATOS"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
