import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({message: "No posee autorizacion requerida"});
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({message: "Formato de token invalido"});
  }

  try {
    const payload = jwt.verify(token, "laureanojuarez");
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return res.status(403).json({message: "No posee permisos correctos"});
  }
};
