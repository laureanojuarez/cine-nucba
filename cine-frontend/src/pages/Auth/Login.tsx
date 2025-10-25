import {Link, useNavigate} from "react-router-dom";
import {Form, Field, Formik, ErrorMessage} from "formik";
import axios from "axios";
import {useState} from "react";
import {useAuth} from "../../store/auth";

export default function LoginPage() {
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

      navigate("/");
    } catch (err: any) {
      setError(err.response.data.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div>
        {error && (
          <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
            {error}
          </div>
        )}
      </div>
      <h1>Buenas!, que bueno verte por aca</h1>
      <div className="w-96">
        <Formik
          initialValues={{email: "", password: ""}}
          validate={({email, password}) => {
            const errors: any = {};
            if (!email) errors.email = "Requerido";
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
              errors.email = "Email inválido";
            if (!password) errors.password = "Requerido";
            else if (password.length < 6)
              errors.password =
                "La contraseña debe tener al menos 6 caracteres";
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4" noValidate>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-md w-full font-medium hover:bg-gray-100 transition"
            >
              {loading ? "Ingresando..." : "Iniciar Sesion"}
            </button>
          </Form>
        </Formik>
        <span>Olvide mi contraseña</span>
        <div className="w-full justify-between flex">
          <span>No tienes cuenta?</span>
          <Link to={"/register"}>
            <span className="text-blue-300">Registrate</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
