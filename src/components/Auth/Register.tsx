import {Form , Formik,  type FormikHelpers} from "formik";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

interface RegisterValues {
  email: string;
  password: string;
}

export const Register = ({onSuccess}: {onSuccess?: () => void}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const validationSchema = yup.object().shape({
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
    <div className="w-full max-w-sm mx-auto py-2">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 mb-6 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Crear cuenta
      </h1>

      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {() => (
          <Form className="flex flex-col gap-5" noValidate>
           <Input name="email" type="email" placeholder="Correo Electronico" />
           <Input name="password" type="password" placeholder="Contraseña" />
           <Button type="submit" loading={loading} className="mt-2">
             Registrarse
           </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};