import {Formik} from "formik";
import {MovieFormFields} from "./MovieFormFields.tsx";
import {toast} from "sonner";
import axios from "axios";
import {validationSchema} from "./validation";

interface MovieFormProps {
  onSuccess: () => void;
}

export const MovieForm = ({onSuccess}: MovieFormProps) => {
  const INITIAL_VALUES = {
    title: "",
    genero: "",
    duration: "",
    poster: "",
    sala: "",
  };

  const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
    try {
      await axios.post("/peliculas", {
        title: values.title,
        genero: values.genero,
        duration: Number(values.duration),
        poster: values.poster,
        salaNumber: Number(values.sala),
      });

      toast.success("Película agregada correctamente");
      resetForm();
      onSuccess();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al agregar la película"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({isSubmitting}) => <MovieFormFields isSubmitting={isSubmitting} />}
    </Formik>
  );
};
