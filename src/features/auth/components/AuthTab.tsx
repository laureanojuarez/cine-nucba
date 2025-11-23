import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

interface AuthTabProps {
  onClose: () => void;
}

export const AuthTab = ({ onClose }: AuthTabProps) => {
  const [view, setView] = useState<"login" | "register">("login");

  const handleSuccess = () => {
    onClose();
    // Opcional: resetear vista a login
    setTimeout(() => setView("login"), 300); 
  };

  return (
    <div className="px-6 py-4">
      {view === "login" ? (
        <>
          <Login onSuccess={handleSuccess} />
          <div className="mt-6 text-center text-neutral-400 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
              onClick={() => setView("register")}
            >
              Regístrate aquí
            </button>
          </div>
        </>
      ) : (
        <>
          <Register onSuccess={handleSuccess} />
          <div className="mt-6 text-center text-neutral-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
              onClick={() => setView("login")}
            >
              Inicia sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};