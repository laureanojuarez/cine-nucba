import express from "express";
import authRoutes from "./routes/auth.routes.js";
import peliculasRoutes from "./routes/peliculas.routes.js";
import salaRoutes from "./routes/sala.routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/peliculas", peliculasRoutes);
app.use("/salas", salaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
