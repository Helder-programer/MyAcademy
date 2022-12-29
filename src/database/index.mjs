import { Sequelize } from "sequelize";
import dbConfig from '../config/config.mjs';
export const connection = new Sequelize(dbConfig);
