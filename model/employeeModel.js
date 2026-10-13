import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { departmentModel } from "./departmentModel.js";
import { designationModel } from "./designationModel.js";
import { companyModel } from "./compnayModel.js";
import { roleModel } from "./roleModel.js";

export const employeeModel = sequelize.define('employee_master', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emp_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    doj: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "department_master", key: "id" },
    },
    designationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "designation_master", key: "id" },
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "company_master", key: "id" },
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "role_master", key: "id" },
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'employee_master',
    freezeTableName: true,
    timestamps: false
})

employeeModel.belongsTo(departmentModel, { foreignKey: "departmentId", as: "department" });
departmentModel.hasMany(employeeModel, { foreignKey: "departmentId", as: "employees" });
employeeModel.belongsTo(designationModel, { foreignKey: "designationId", as: "designation" });
designationModel.hasMany(employeeModel, { foreignKey: "designationId", as : "employees"});
employeeModel.belongsTo(companyModel, { foreignKey: "companyId", as: "company" });
companyModel.hasMany(employeeModel, { foreignKey: "companyId", as: "employees" });
employeeModel.belongsTo(roleModel, { foreignKey: "roleId", as: "role" });
roleModel.hasMany(employeeModel, { foreignKey: "roleId", as: "employees" });
