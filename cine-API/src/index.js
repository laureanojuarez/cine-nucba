import express from "express";
import {sequelize} from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./models/Entrada.js";
import "./models/Funcion.js";
import "./models/Pelicula.js";
import "./models/Sala.js";
import "./models/User.js";
import "./models/Asiento.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Rutas
import authRoutes from "./routes/auth.routes.js";
import {funcionesRouter} from "./routes/asientos.routes.js";
import {reservasRouter} from "./routes/reservas.routes.js";
import {peliculasRouter} from "./routes/peliculas.routes.js";
import {verifyToken} from "./controllers/verify.controller.js";

app.use("/auth", authRoutes);
app.use("/funciones", funcionesRouter);
app.use("/reservas", verifyToken, reservasRouter);
app.use("/peliculas", peliculasRouter);

try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
