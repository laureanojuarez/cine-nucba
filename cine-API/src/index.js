import { sequelize } from "./db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Modelos

import "./models/Pelicula.js";
import "./models/Sala.js";
import "./models/User.js";
import "./models/Asiento.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

// Rutas

import authRoutes from "./routes/auth.routes.js";
import peliculasRoutes from "./routes/peliculas.routes.js";

app.use("/auth", authRoutes);
app.use("/peliculas", peliculasRoutes);

try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
