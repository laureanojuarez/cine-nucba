import User from "./User.js";
import Movie from "./Movie.js";
import Sala from "./Sala.js";
import Seat from "./Seat.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";
import ButacaFuncion from "./ButacaFuncion.js";

export function applyAssociations() {
  // Sala -> Seat
  Sala.hasMany(Seat, { foreignKey: "salaId", as: "Seats", onDelete: "CASCADE", hooks: true });
  Seat.belongsTo(Sala, { foreignKey: "salaId" });

  // Funciones
  Movie.hasMany(Funcion, { foreignKey: "movieId", onDelete: "CASCADE", hooks: true });
  Funcion.belongsTo(Movie, { foreignKey: "movieId" });

  Sala.hasMany(Funcion, { foreignKey: "salaId", onDelete: "CASCADE", hooks: true });
  Funcion.belongsTo(Sala, { foreignKey: "salaId" });

    // Asociación ButacaFuncion <-> Seat
  ButacaFuncion.belongsTo(Seat, { foreignKey: "seatId" });
  Seat.hasMany(ButacaFuncion, { foreignKey: "seatId" });

  // Butaca por función
  Funcion.hasMany(ButacaFuncion, { foreignKey: "funcionId", onDelete: "CASCADE", hooks: true });
  ButacaFuncion.belongsTo(Funcion, { foreignKey: "funcionId" });

  ButacaFuncion.belongsTo(Seat, { foreignKey: "seatId" });
  Seat.hasMany(ButacaFuncion, { foreignKey: "seatId", onDelete: "CASCADE", hooks: true });

  // Reservas (si reservas por función, agrega funcionId en Reserva y descomenta)
  User.hasMany(Reserva, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
  Reserva.belongsTo(User, { foreignKey: "userId" });

  // Funcion.hasMany(Reserva, { foreignKey: "funcionId", onDelete: "CASCADE", hooks: true });
  // Reserva.belongsTo(Funcion, { foreignKey: "funcionId" });

  Seat.hasMany(Reserva, { foreignKey: "seatId", as: "Reservas", onDelete: "CASCADE", hooks: true });
  Reserva.belongsTo(Seat, { foreignKey: "seatId" });
}