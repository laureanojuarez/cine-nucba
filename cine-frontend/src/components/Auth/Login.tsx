import {useNavigate} from "react-router-dom";
import {Form, Field, Formik, ErrorMessage} from "formik";
import axios from "axios";
import {useState} from "react";
import {useAuth} from "../../store/auth";

export const Login = ({onSuccess}: {onSuccess: () => void}) => {
  const setToken = useAuth((s) => s.setToken);
  const setUser = useAuth((s) => s.setUser);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (values: {email: string; password: string}) => {
    setLoading(true);
    setError("");
    try {
      const {data} = await axios.post(`${API_URL}/auth/login`, values);
      setToken(data.token);

      const userRes = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setUser(userRes.data);

      onSuccess();

      navigate("/");
    } catch (err: any) {
      setError(err.response.data.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 mx-auto">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-2 rounded-md">{error}</div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-center">¡Bienvenido!</h1>
      <Formik
        initialValues={{email: "", password: ""}}
        validate={({email, password}) => {
          const errors: any = {};
          if (!email) errors.email = "Requerido";
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
            errors.email = "Email inválido";
          if (!password) errors.password = "Requerido";
          else if (password.length < 6)
            errors.password = "La contraseña debe tener al menos 6 caracteres";
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4 w-full" noValidate>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded-md w-full font-medium hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar Sesion"}
          </button>
        </Form>
      </Formik>
      <span className="block mt-2 text-center text-blue-500 cursor-pointer">
        Olvide mi contraseña
      </span>
    </div>
  );
};
