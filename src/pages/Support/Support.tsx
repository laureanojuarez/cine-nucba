import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import { Button } from "../../components/ui/Button";
import { Mail, MessageSquare } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  asunto: yup.string().required("El asunto es obligatorio"),
  message: yup
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .required("El mensaje es obligatorio"),
});
export default function Support() {
  const INITIAL_VALUES = {
    email: "",
    asunto: "",
    message: "",
  };

   const handleSubmit = async (
    values: typeof INITIAL_VALUES,
    {resetForm}: any
  ) => {
    // Simular petición al backend
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    toast.success("Mensaje enviado correctamente. Te responderemos pronto.");
    resetForm();
  };

   return (
    <div className="min-h-screen bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2 text-white">
            Centro de Soporte
          </h1>
          <p className="text-neutral-400">
            Déjanos tu mensaje y te responderemos a la brevedad.
          </p>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <Mail className="text-blue-500" size={20} /> Envíanos un mensaje
          </h2>

          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({isSubmitting, errors, touched}) => (
              <Form className="space-y-5">
                <Input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  label="Correo electrónico"
                />

                <Input
                  name="asunto"
                  type="text"
                  placeholder="Ej: Problema con pago"
                  label="Asunto"
                />

                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-300 ml-1"
                  >
                    Mensaje
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Describe tu problema detalladamente..."
                    className={`w-full bg-neutral-900 border rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all resize-none
                        ${
                          touched.message && errors.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        }`}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-400 text-xs ml-1 font-medium"
                  />
                </div>

                <Button type="submit" loading={isSubmitting} className="mt-4">
                  <MessageSquare size={18} />
                  Enviar Mensaje
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}