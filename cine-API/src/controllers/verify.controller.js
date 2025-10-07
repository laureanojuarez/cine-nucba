import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({message: "No posee autorizacion requerida"});
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({message: "Formato de token inválido"});
  }

  const token = parts[1];

  const secretKey = "laureanojuarez";
  if (!secretKey) {
    console.error("Falta JWT_SECRET_KEY en variables de entorno");
    return res.status(500).json({message: "Error en el servidor"});
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error verificando token:", error?.message);

    try {
      const decoded = jwt.decode(token);
      console.error("Token decode:", decoded);
    } catch (decErr) {
      console.error("Error decoding token:", decErr?.message);
    }
    return res.status(403).json({message: "No posee permisos correctos"});
  }
};
