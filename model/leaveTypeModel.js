import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { companyModel } from "./compnayModel.js";

export const leaveTypeModel = sequelize.define('leaveType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leaveType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "company_master", key: "id" },
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

leaveTypeModel.belongsTo(companyModel, { foreignKey: "companyId", as: "company" });
companyModel.hasMany(leaveTypeModel, { foreignKey: "companyId", as: "leaveTypes" });