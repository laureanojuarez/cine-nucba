import {useNavigate} from "react-router-dom";
import {Form, Field, Formik, ErrorMessage} from "formik";
import axios from "axios";
import {useState} from "react";
import {useAuth} from "../../store/auth";
import * as yup from "yup";

export const Login = ({onSuccess}: {onSuccess?: () => void}) => {
  const setToken = useAuth((s) => s.setToken);
  const setUser = useAuth((s) => s.setUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values: {email: string; password: string}) => {
    setLoading(true);
    setError("");
    try {
      const {data} = await axios.post(`${API_URL}/auth/login`, values);
      setToken(data.token);

      const me = await axios.get(`${API_URL}/auth/me`, {
        headers: {Authorization: `Bearer ${data.token}`},
      });
      setUser(me.data);

      onSuccess?.();
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 mx-auto text-white">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded-md">{error}</div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-center">¡Bienvenido!</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {({errors, touched}) => (
          <Form className="flex flex-col gap-4" noValidate>
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
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
