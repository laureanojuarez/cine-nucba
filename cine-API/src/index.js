import express from "express";
import authRoutes from "./routes/auth.routes.js";
import peliculasRoutes from "./routes/peliculas.routes.js";
import salaRoutes from "./routes/sala.routes.js";
import cors from "cors";

// Models
import User from "./models/User.js";
import Reserva from "./models/Reserva.js";
import Movie from "./models/Movie.js";
import Sala from "./models/Sala.js";
import Seat from "./models/Seat.js";
import sequelize from "./db.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Relations
User.hasMany(Reserva, { foreignKey: "userId" });
Reserva.belongsTo(User, { foreignKey: "userId" });

Movie.hasMany(Sala, { foreignKey: "movieId" });
Sala.belongsTo(Movie, { foreignKey: "movieId" });

Sala.hasMany(Seat, { foreignKey: "salaId" });
Seat.belongsTo(Sala, { foreignKey: "salaId" });

Sala.hasMany(Reserva, { foreignKey: "salaId" });
Reserva.belongsTo(Sala, { foreignKey: "salaId" });

Seat.hasMany(Reserva, { foreignKey: "seatId" });
Reserva.belongsTo(Seat, { foreignKey: "seatId" });

// Routes
app.use("/auth", authRoutes);
app.use("/peliculas", peliculasRoutes);
app.use("/salas", salaRoutes);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
