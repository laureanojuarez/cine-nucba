import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No posee autorizacion requerida" });
  }

  const secretKey = "laureanojuarez";

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "No posee permisos correctos" });
  }
};
