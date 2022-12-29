import { DataTypes, Model } from "sequelize";
import { connection } from "../database/index.mjs";


export class Users extends Model {}


Users.init( {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: connection,
    timestamps: true,
    modelName: 'tb_users'
});
