import {useNavigate} from "react-router-dom";
import {Form,  Formik} from "formik";
import axios from "axios";
import {useState} from "react";
import {useAuth} from "../../../store/auth";
import * as yup from "yup";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

export const Login = ({onSuccess}: {onSuccess?: () => void}) => {
  const setToken = useAuth((s) => s.setToken);
  const setUser = useAuth((s) => s.setUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

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
        {() => (
          <Form className="flex flex-col gap-5" noValidate>
            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
            />
            
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
            />

            <Button type="submit" loading={loading} className="mt-2">
              Iniciar Sesión
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
