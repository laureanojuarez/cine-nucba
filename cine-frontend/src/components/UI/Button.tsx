export const Button = ({
  bg,
  hv,
  children,
  px = "px-5",
  py = "py-2.5",
  txt = "text-white",
  className = "",
  ...props
}) => {
  const base =
    "rounded-md shadow-md transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-neutral-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none";
  const hover = props.disabled ? "" : `hover:${hv} hover:scale-[1.03]`;
  return (
    <button
      className={`${bg} ${txt} ${px} ${py} ${base} ${hover} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
