import { Op } from "sequelize";
import { designationModel } from "../model/designationModel.js";
import ResponseService from "../utils/httpService.js";
import { companyModel } from "../model/compnayModel.js";

const include  = [
    {model : companyModel, as :"company", attributes : ["id", "name"]}
]
const Create = async (req, res) => {
    try {
        const { name, companyId,  status } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Designation name is required');
        }
        if(!companyId) {
            return ResponseService.badRequest(res, 'Company id is required');
        }

        const checkDesignation = await designationModel.findOne({
            where: { name: name.trim(), is_deleted: false },
        });
        if (checkDesignation) {
            return ResponseService.badRequest(res, 'Designation already exist');
        }
        
        const designation = await designationModel.create({
            name: name.trim(),
            status: status ?? true,
            companyId : companyId
        });
        return ResponseService.created(res, designation, 'Designation created successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const List = async (req, res) => {
    try {
        const designations = await designationModel.findAll({
            where: { is_deleted: false },
            order: [['id', 'DESC']],
            include
        });
        return ResponseService.success(res, 'Success', designations);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Designation id is required');

        const designation = await designationModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!designation) return ResponseService.notFound(res, 'Designation not found');

        const { name, status , companyId } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Designation name is required');
        }
        if(!companyId) { 
            return ResponseService.badRequest(res, "Company id is required");
        }
        const duplicate = await designationModel.findOne({
            where: { name: name.trim(), is_deleted: false, id: { [Op.ne]: id } },
        });
        if (duplicate) {
            return ResponseService.badRequest(res, 'Designation name already exist');
        }

        await designation.update({
            name: name.trim(),
            status: status ?? designation.status,
            companyId : companyId
        });
        return ResponseService.success(res, 'Designation updated successfully', designation);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Designation id is required');

        const designation = await designationModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!designation) return ResponseService.notFound(res, 'Designation not found');

        await designation.update({ is_deleted: true });
        return ResponseService.success(res, 'Designation deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export { Create, List, update, deleteDesignation };