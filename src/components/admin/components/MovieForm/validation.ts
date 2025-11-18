import * as yup from "yup";

export const validationSchema = yup.object({
  titulo: yup.string().required("El título es obligatorio"),
  genero: yup.string().required("El género es obligatorio"),
  duracion: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("La duración es obligatoria"),
  poster: yup.string().url("Debe ser una URL válida").required("El poster es obligatorio"),
});