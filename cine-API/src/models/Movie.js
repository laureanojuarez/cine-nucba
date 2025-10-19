import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Movie = sequelize.define("Movie", {
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  poster: { type: DataTypes.STRING },
});

export default Movie;
