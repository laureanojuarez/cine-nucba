import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Reserva = sequelize.define("Reserva", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  seatNumber: { type: DataTypes.STRING, allowNull: false },
  reservationDate: { type: DataTypes.DATE, allowNull: false },
});

export default Reserva;
