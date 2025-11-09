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

export const passwordValidateSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  newPassword: Yup.string()
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
    .required("La nueva contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
    .required("Repetir contraseña es obligatorio"),
});
