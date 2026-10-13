import { companyModel } from "../model/compnayModel.js";
import { departmentModel } from "../model/departmentModel.js";
import { designationModel } from "../model/designationModel.js";
import { employeeModel } from "../model/employeeModel.js";
import { roleModel } from "../model/roleModel.js";
import ResponseService from "../utils/httpService.js";
import validator from "validator";

const include = [
    { model: companyModel, as: "company", attributes: ["id", "name"] },
    { model: departmentModel, as: "department", attributes: ["id", "name"] },
    { model: designationModel, as: "designation", attributes: ["id", "name"] },
    { model: roleModel, as: "role", attributes: ["id", "name"] },
];
export const create = async (req, res) => {
    try {
        const {code , name , email , phone , gender , dob , doj , departmentId , designationId , companyId , roleId , address} = req.body;
        if (!code || !code.trim()) {
            return ResponseService.badRequest(res, 'Employee code is required');
        }
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Employee name is required');
        }
        if (!email || !email.trim()) {
            return ResponseService.badRequest(res, 'Employee email is required');
        }
        if (!phone || !phone.trim()) {
            return ResponseService.badRequest(res, 'Employee phone is required');
        }
        if (!gender || !gender.trim()) {
            return ResponseService.badRequest(res, 'Employee gender is required');
        }
        if (!dob) {
            return ResponseService.badRequest(res, 'Employee date of birth is required');
        }
        if (!doj) {
            return ResponseService.badRequest(res, 'Employee date of joining is required');
        }
        if (!departmentId) {
            return ResponseService.badRequest(res, 'Department id is required');
        }
        if (!designationId) {
            return ResponseService.badRequest(res, 'Designation id is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company id is required');
        }
        if (!roleId) {
            return ResponseService.badRequest(res, 'Role id is required');
        }
        if (!address || !address.trim()) {
            return ResponseService.badRequest(res, 'Employee address is required');
        }
        if(!validator.isEmail(email.trim())) {
            return ResponseService.badRequest(res, 'Invalid email format');
        }
        
        const checkEmployee = await employeeModel.findOne({
            where: { emp_code: code.trim(), companyId, is_deleted: false },
        });
        if (checkEmployee) {
            return ResponseService.badRequest(res, 'Employee code already exists for this company');
        }
        const newEmployee = await employeeModel.create({
            emp_code: code.trim(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            gender: gender.trim(),
            dob,
            doj,
            departmentId,
            designationId,
            companyId,
            roleId,
            address: address.trim(),
        });
        return ResponseService.created(res, newEmployee, 'Employee created successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const list = async (req, res) => {
    try {
        const employees = await employeeModel.findAll({
            where: { is_deleted: false },
            order: [['id', 'DESC']],
            include: include
        });
        return ResponseService.success(res, 'Success', employees);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Employee id is required');

        const employee = await employeeModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!employee) return ResponseService.notFound(res, 'Employee not found');

        const {code , name , email , phone , gender , dob , doj , departmentId , designationId , companyId , roleId , address} = req.body;
        if (!code || !code.trim()) {
            return ResponseService.badRequest(res, 'Employee code is required');
        }
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Employee name is required');
        }
        if (!email || !email.trim()) {
            return ResponseService.badRequest(res, 'Employee email is required');
        }
        if (!phone || !phone.trim()) {
            return ResponseService.badRequest(res, 'Employee phone is required');
        }
        if (!gender || !gender.trim()) {
            return ResponseService.badRequest(res, 'Employee gender is required');
        }
        if (!dob) {
            return ResponseService.badRequest(res, 'Employee date of birth is required');
        }
        if (!doj) {
            return ResponseService.badRequest(res, 'Employee date of joining is required');
        }
        if (!departmentId) {
            return ResponseService.badRequest(res, 'Department id is required');
        }
        if (!designationId) {
            return ResponseService.badRequest(res, 'Designation id is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company id is required');
        }
        if (!roleId) {
            return ResponseService.badRequest(res, 'Role id is required');
        }
        if (!address || !address.trim()) {
            return ResponseService.badRequest(res, 'Employee address is required');
        }
        if(!validator.isEmail(email.trim())) {
            return ResponseService.badRequest(res, 'Invalid email format');
        }

        const duplicate = await employeeModel.findOne({
            where: { emp_code: code.trim(), companyId, is_deleted: false, id: { [Op.ne]: id } },
        });
        if (duplicate) {
            return ResponseService.badRequest(res, 'Employee code already exists for this company');
        }

        await employee.update({
            emp_code: code.trim(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            gender: gender.trim(),
            dob,
            doj,
            departmentId,
            designationId,
            companyId,
            roleId,
            address: address.trim(),
        });
        return ResponseService.success(res, 'Employee updated successfully', employee);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Employee id is required');

        const employee = await employeeModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!employee) return ResponseService.notFound(res, 'Employee not found');

        await employee.update({ is_deleted: true });
        return ResponseService.success(res, 'Employee deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Employee id is required');

        const employee = await employeeModel.findOne({
            where: { id, is_deleted: false },
            include: include
        });
        if (!employee) return ResponseService.notFound(res, 'Employee not found');

        return ResponseService.success(res, 'Success', employee);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};