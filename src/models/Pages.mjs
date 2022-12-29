import { DataTypes, Model } from "sequelize";
import { connection } from "../database/index.mjs";

export class Pages extends Model{}

Pages.init({
    page_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    page_title: {
        type:DataTypes.STRING(250),
        allowNull: false,
    },
    language_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'tb_languages', key: 'language_id'},
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }
    
}, {
    sequelize: connection,
    timestamps: true,
    modelName: 'tb_pages'
});