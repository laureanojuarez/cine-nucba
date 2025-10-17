import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {!token && (
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            No estás logueado
          </h1>
          <Link
            to={"/login"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Inicia Sesión
          </Link>
        </div>
      )}

      {token && (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          {user?.role === "admin" && (
            <Link
              to={"/admin"}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Panel de control
            </Link>
          )}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Bienvenido {user?.username}
            </h1>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            <span className="block font-semibold text-gray-700 mb-2">
              Tus entradas:
            </span>
            {/* Aquí podrías agregar una lista de entradas si tienes esa info */}
          </div>
        </div>
      )}
    </div>
  );
}
