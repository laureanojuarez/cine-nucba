import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function ProfilePage() {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");

  axios
    .get("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUsername(response.data.username);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!token && (
        <div>
          <h1 className="text-2xl mb-4">No estás logueado</h1>
          <Link to={"/login"}>Inicia Sesion</Link>
        </div>
      )}

      {token && (
        <div>
          <h1>Bienvenido {username}</h1>
          Tus entradas:
        </div>
      )}
    </div>
  );
}
