import dotenv from "dotenv";
import "reflect-metadata"
import { DataSource } from "typeorm";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  logging: true,
  entities: [`${__dirname}/entity/*{.js,.ts}`],
  subscribers: [],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
})

export default AppDataSource
