import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Reserva = sequelize.define("Reserva", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  reservationDate: { type: DataTypes.DATE, allowNull: false },
});

export default Reserva;
