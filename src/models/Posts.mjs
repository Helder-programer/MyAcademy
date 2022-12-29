import { DataTypes, Model } from "sequelize";
import { connection } from "../database/index.mjs";

export class Posts extends Model {}

Posts.init({
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_title: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    post_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    page_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'tb_pages', key: 'page_id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }

}, {
    timestamps: true,
    sequelize: connection,
    modelName: 'tb_posts'
});