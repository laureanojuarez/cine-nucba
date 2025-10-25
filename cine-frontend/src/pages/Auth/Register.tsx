import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikErrors,
  type FormikHelpers,
} from "formik";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (
    values: RegisterValues,
    {setSubmitting}: FormikHelpers<RegisterValues>
  ) => {
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      console.log("Usuario creado exitosamente");
      navigate("/");
    } catch (err) {
      setError("Error al registrar usuario");
      console.error("Error en el registro", err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-96">
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded-md">
            {error}
          </div>
        )}

        <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validate={(values: RegisterValues) => {
            const errors: FormikErrors<RegisterValues> = {};

            if (!values.username) {
              errors.username = "Nombre requerido";
            } else if (values.username.length < 2) {
              errors.username = "Nombre muy corto";
            }

            if (!values.email) {
              errors.email = "Email requerido";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Email inválido";
            }

            if (!values.password) {
              errors.password = "Contraseña requerida";
            } else if (values.password.length < 6) {
              errors.password =
                "La contraseña debe tener al menos 6 caracteres";
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <Field
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              className="p-2 border rounded-md"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border rounded-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              type="password"
              name="password"
              placeholder="Contraseña"
              className="p-2 border rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-md w-full font-medium hover:bg-gray-100 transition disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-300">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
