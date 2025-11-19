import { Field, ErrorMessage, useField } from "formik";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  as?: string; // Para selects
  children?: React.ReactNode; // Para opciones de select
}

export const Input = ({ label, ...props }: InputProps) => {
  // useField nos da acceso a si el campo fue tocado o tiene error
  const [field, meta] = useField(props.name);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.name} className="block text-sm font-medium text-neutral-300 ml-1">
          {label}
        </label>
      )}
      <Field
        {...field}
        {...props}
        className={`w-full bg-neutral-800 border rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed
          ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-400 text-xs ml-1 font-medium"
      />
    </div>
  );
};