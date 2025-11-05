import * as Yup from "yup";

export const validateSchema = Yup.object().shape({
  nombre: Yup.string(),
  apellido: Yup.string(),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  fechaNacimiento: Yup.date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
    .nullable()
    .transform((curr, origin) => (origin === "" ? null : curr)),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, "El número de teléfono solo debe contener dígitos")
    .min(7, "El número de teléfono es demasiado corto")
    .max(15, "El número de teléfono es demasiado largo"),
  genero: Yup.string(),
});
