import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Sala } from "./Sala.js";

export const Asiento = sequelize.define("asiento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fila: { type: DataTypes.STRING, allowNull: false }, // Ej: 'A'
  numero: { type: DataTypes.INTEGER, allowNull: false }, // Ej: 5
  etiqueta: {
    // 'A5'
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Sala.hasMany(Asiento, { onDelete: "CASCADE" });
Asiento.belongsTo(Sala);

Asiento.addHook("beforeValidate", (a) => {
  if (!a.etiqueta && a.fila && a.numero) {
    a.etiqueta = `${a.fila}${a.numero}`;
  }
});
