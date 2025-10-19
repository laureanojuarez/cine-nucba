import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Seat = sequelize.define("Seat", {
  fila: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
  salaId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Seat;
