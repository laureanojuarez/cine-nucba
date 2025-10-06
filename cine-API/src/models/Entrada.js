import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Funcion } from "./Funcion.js";
import { Asiento } from "./Asiento.js";
import { DataTypes } from "sequelize";

export const Entrada = sequelize.define(
  "entrada",
  {
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["funcionId", "asientoId"],
        name: "unique_funcion_asiento",
      },
    ],
  }
);

User.hasMany(Entrada);
Entrada.belongsTo(User);

Funcion.hasMany(Entrada);
Entrada.belongsTo(Funcion);

Asiento.hasMany(Entrada);
Entrada.belongsTo(Asiento);
