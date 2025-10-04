import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Pelicula } from "./Pelicula.js";
import { Sala } from "./Sala.js";

export const Funcion = sequelize.define("funcion", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Pelicula.hasMany(Funcion);
Funcion.belongsTo(Pelicula);

Sala.hasMany(Funcion);
Funcion.belongsTo(Sala);
