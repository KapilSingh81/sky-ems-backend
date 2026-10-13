import { companyModel } from "../model/compnayModel.js";
import { departmentModel } from "../model/departmentModel.js";
import { designationModel } from "../model/designationModel.js";
import ResponseService from "../utils/httpService.js";

export const departmentDDL = async (req, res) => {
    try {
        const departments = await departmentModel.findAll({
            where: { is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', departments);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const designationDDL = async (req, res) => {
    try {
        const designations = await designationModel.findAll({
            where: { is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', designations);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
}


export const departmentDDLByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) return ResponseService.badRequest(res, 'Company id is required');

        const departments = await departmentModel.findAll({
            where: { companyId, is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', departments);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
}; 

export const designationDDLByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) return ResponseService.badRequest(res, 'Company id is required');

        const designations = await designationModel.findAll({
            where: { companyId, is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', designations);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const companyDDL = async (req, res) => {
    try {
        const companies = await companyModel.findAll({
            where: { is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', companies);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const roleDDLByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) return ResponseService.badRequest(res, 'Company id is required');

        const roles = await roleModel.findAll({
            where: { companyId, is_deleted: false },
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
        return ResponseService.success(res, 'Success', roles);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};