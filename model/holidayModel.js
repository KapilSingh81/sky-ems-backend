import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { companyModel } from "./compnayModel.js";

export const holidayModel = sequelize.define('holiday_master', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "company_master", key: "id" },
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});
holidayModel.belongsTo(companyModel, { foreignKey: "companyId", as: "company" });
companyModel.hasMany(holidayModel, { foreignKey: "companyId", as: "holidays" });