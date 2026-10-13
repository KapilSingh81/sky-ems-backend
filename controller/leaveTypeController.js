import { companyModel } from "../model/compnayModel.js";
import { leaveTypeModel } from "../model/leaveTypeModel.js";
import ResponseService from "../utils/httpService.js";

const include = [
    { model: companyModel, as: "company", attributes: ["id", "name"] },
];

export const create = async (req, res) => {
    try {
        const { code, name, leaveType, companyId } = req.body;
        if (!code || !code.trim()) {
            return ResponseService.badRequest(res, 'Leave type code is required');
        }
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Leave type name is required');
        }
        if (!leaveType || !leaveType.trim()) {
            return ResponseService.badRequest(res, 'Leave type is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company ID is required');
        }

        const checkLeaveType = await leaveTypeModel.findOne({
            where: { code: code.trim(), companyId, is_deleted: false },
        });
        if (checkLeaveType) {
            return ResponseService.badRequest(res, 'Leave type  already exists for this company');
        }
        const newTLaveType = await leaveTypeModel.create({
            code: code.trim(),
            name: name.trim(),
            leaveType: leaveType.trim(),
            companyId,
        });
        return ResponseService.created(res, newTLaveType, 'Leave type created successfully');
        
    } catch (error) {  
        return ResponseService.error(res, error.message);
    }
};

export const list = async (req, res) => {
    try {
        const leaveTypes = await leaveTypeModel.findAll({
            where: { is_deleted: false },
            order: [['id', 'DESC']],
            include,
        });
        return ResponseService.success(res, 'Success', leaveTypes);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Leave type id is required');

        const leaveType = await leaveTypeModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!leaveType) return ResponseService.notFound(res, 'Leave type not found');

        const { code, name, leaveType: newLeaveType, companyId } = req.body;
        if (!code || !code.trim()) {
            return ResponseService.badRequest(res, 'Leave type code is required');
        }
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Leave type name is required');
        }
        if (!newLeaveType || !newLeaveType.trim()) {
            return ResponseService.badRequest(res, 'Leave type is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company ID is required');
        }

        const duplicate = await leaveTypeModel.findOne({
            where: { code: code.trim(), companyId, is_deleted: false, id: { [Op.ne]: id } },
        });
        if (duplicate) {
            return ResponseService.badRequest(res, 'Leave type code already exists for this company');
        }

        await leaveType.update({
            code: code.trim(),
            name: name.trim(),
            leaveType: newLeaveType.trim(),
            companyId,
        });
        return ResponseService.success(res, 'Leave type updated successfully', leaveType);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const deleteLeaveType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Leave type id is required');

        const leaveType = await leaveTypeModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!leaveType) return ResponseService.notFound(res, 'Leave type not found');

        await leaveType.update({ is_deleted: true });
        return ResponseService.success(res, 'Leave type deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const getLeaveTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Leave type id is required');

        const leaveType = await leaveTypeModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!leaveType) return ResponseService.notFound(res, 'Leave type not found');

        return ResponseService.success(res, 'Success', leaveType);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
}
