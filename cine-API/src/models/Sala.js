import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Sala = sequelize.define("sala", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  columnas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 12,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
