import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

const host = process.env.DB_HOST as string,
  database = process.env.DB_DATABASE as string,
  username = process.env.DB_USERNAME as string,
  password = process.env.DB_PASSWORD as string,
  dialect = process.env.DIALECT as Dialect;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

export default sequelize;
