import express from "express";
import { sequelize } from "./db.js";
import cors from "cors";

import "./models/Entrada.js";
import "./models/Funcion.js";
import "./models/Pelicula.js";
import "./models/Sala.js";
import "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Rutas
import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
