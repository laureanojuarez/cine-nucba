import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().required("El título es obligatorio"),
  genero: yup.string().required("El género es obligatorio"),
  duration: yup.string().required("La duración es obligatoria"),
  poster: yup.string().required("El poster es obligatorio"),
  sala: yup.string().required("La sala es obligatoria"),
});
