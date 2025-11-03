import {Form, Field, Formik, ErrorMessage, type FormikHelpers} from "formik";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";

interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

export const Register = ({onSuccess}: {onSuccess?: () => void}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const validationSchema = yup.object().shape({
    username: yup.string().required("El nombre de usuario es obligatorio"),
    email: yup
      .string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (
    values: RegisterValues,
    {setSubmitting}: FormikHelpers<RegisterValues>
  ) => {
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/auth/register`, values);
      onSuccess?.();
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-80 mx-auto">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded-md">{error}</div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
      <Formik
        initialValues={{username: "", email: "", password: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {({errors, touched}) => (
          <Form className="flex flex-col gap-4" noValidate>
            <Field
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              aria-invalid={Boolean(touched.username && errors.username)}
              aria-describedby="username-error"
              className={`p-2 border rounded-md ${
                touched.username && errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="username"
              component="div"
              id="username-error"
              aria-live="polite"
              className="text-red-500 text-sm"
            />
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
              className={`p-2 border rounded-md ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              id="email-error"
              aria-live="polite"
              className="text-red-500 text-sm"
            />
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby="password-error"
              className={`p-2 border rounded-md ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="password"
              component="div"
              id="password-error"
              aria-live="polite"
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
        )}
      </Formik>
    </div>
  );
};
