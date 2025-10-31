import {Form, Field, Formik, ErrorMessage, type FormikHelpers} from "formik";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
      >
        <Form className="flex flex-col gap-4">
          <Field
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
    </div>
  );
};
