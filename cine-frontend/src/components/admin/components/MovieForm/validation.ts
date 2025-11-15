import * as yup from "yup";

export const validationSchema = yup.object().shape({
  titulo: yup.string().required("El título es obligatorio"),
  genero: yup.string().required("El género es obligatorio"),
  duracion: yup.number().typeError("Debe ser un número").required("La duración es obligatoria"),
  poster: yup.string().required("El poster es obligatorio"),
});