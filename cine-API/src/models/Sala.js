import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Sala = sequelize.define("Sala", {
  salaNumber: { type: DataTypes.INTEGER, allowNull: false },
});

export default Sala;
