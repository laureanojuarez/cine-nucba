import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),

  message: yup.string().required("El mensaje es obligatorio"),
});

export default function Support() {
  const INITIAL_VALUES = {
    email: "",
    message: "",
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={(values, {resetForm}) => {
          console.log(values);
          setSubmitted(true);
          resetForm();
          setTimeout(() => setSubmitted(false), 3000);
        }}
      >
        {({isSubmitting}) => (
          <Form className="space-y-4 bg-neutral-800 p-8 rounded shadow-lg w-full max-w-md">
            <div>
              <h1 className="text-2xl font-bold mb-4">Soporte</h1>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <Field
                name="email"
                id="email"
                type="email"
                placeholder="Tu correo electrónico"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-semibold">
                Mensaje:
              </label>
              <Field
                name="message"
                as="textarea"
                id="message"
                placeholder="Tu mensaje"
                className="p-2 rounded text-white"
                aria-required="true"
                aria-label="Mensaje"
                rows={4}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
            {submitted && (
              <div className="text-green-400 text-center mt-2">
                Mensaje enviado con exito!
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
