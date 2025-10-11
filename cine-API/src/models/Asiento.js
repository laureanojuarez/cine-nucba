import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Asiento = sequelize.define("asiento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fila: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  etiqueta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
