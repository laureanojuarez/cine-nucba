import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Sala = sequelize.define("sala", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
