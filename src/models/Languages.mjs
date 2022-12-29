import { DataTypes, DATE, Model } from "sequelize";
import { connection } from "../database/index.mjs";

export class Languages extends Model { }

Languages.init({
    language_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    language_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },

}, {
    timestamps: true,
    sequelize: connection,
    modelName: 'tb_languages'
});