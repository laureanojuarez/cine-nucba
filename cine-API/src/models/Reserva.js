import {DataTypes} from "sequelize";
import sequelize from "../db.js";

const Reserva = sequelize.define("Reserva", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER, allowNull: false},
  salaId: {type: DataTypes.INTEGER, allowNull: false},
  seatId: {type: DataTypes.INTEGER, allowNull: false},
  reservationDate: {type: DataTypes.DATE, allowNull: false},
});

export default Reserva;
