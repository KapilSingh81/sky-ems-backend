import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { companyModel } from "./compnayModel.js";

export const roleModel = sequelize.define(
  "role_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "company_master", key: "id" },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "role_master",
    freezeTableName: true,
    timestamps: false,
  }
);

roleModel.belongsTo(companyModel, { foreignKey: "companyId", as: "company" });
companyModel.hasMany(roleModel, { foreignKey: "companyId", as: "roles" });