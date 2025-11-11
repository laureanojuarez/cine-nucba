import {Sequelize} from "sequelize";

const sequelize = new Sequelize("cine_rio", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
