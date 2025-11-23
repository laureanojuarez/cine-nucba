import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {passwordValidateSchema} from "./validateschema-profile";
import {toast} from "sonner";
import {MoveLeft} from "lucide-react";

interface InfoProps {
  setView: (view: "main" | "info" | "password") => void;
}

export const Password = ({setView}: InfoProps) => {
  const INITIAL_VALUES = {
    password: "",
    newPassword: "",
    repeatPassword: "",
  };

  const handleSubmit = async (
    values: typeof INITIAL_VALUES,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    try {
      await axios.put("/profile/password", {
        password: values.password,
        repeatPassword: values.repeatPassword,
        newPassword: values.newPassword,
      });

      toast.success("Contraseña cambiada correctamente");
      setView("main");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al cambiar la contraseña"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto h-full flex flex-col">
      {/* Header correlacionado con Info */}
      <div className="flex justify-between items-center p-1 mb-4">
        <button
          type="button"
          className="bg-stone-700 px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => setView("main")}
          aria-label="Volver"
        >
          <MoveLeft className="text-gray-400" />
        </button>
        <h2 className="text-xl font-bold text-white">Cambiar contraseña</h2>
      </div>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={passwordValidateSchema}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-3 flex-1 ">
            <section className="p-2">
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-1 text-neutral-300"
                >
                  Contraseña actual
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
                  placeholder="Ingresa tu contraseña actual"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold mb-1 text-neutral-300"
                >
                  Nueva contraseña
                </label>
                <Field
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
                  placeholder="Nueva contraseña"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-semibold mb-1 text-neutral-300"
                >
                  Repetir nueva contraseña
                </label>
                <Field
                  id="repeatPassword"
                  type="password"
                  name="repeatPassword"
                  className="w-full p-2 rounded-md bg-neutral-700 text-neutral-200 border border-neutral-600"
                  placeholder="Repite la nueva contraseña"
                />
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </section>

            {/* Footer correlacionado con Info */}
            <div className="mt-auto w-full bg-white h-30 flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-neutral-800 text-white w-full h-full px-6 py-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "CAMBIANDO..." : "CAMBIAR CONTRASEÑA"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
