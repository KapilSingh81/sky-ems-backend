import { Op } from "sequelize";
import { roleModel } from "../model/roleModel.js";
import ResponseService from "../utils/httpService.js";
import { companyModel } from "../model/compnayModel.js";

const include = [
    { model: companyModel, as: "company", attributes: ["id", "name"] },
];

const Create = async (req, res) => {
    try {
        const { name, status , companyId } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Role name is required');
        }
        if(!companyId) {
            return ResponseService.badRequest(res, 'Company id is required')
        }

        const checkRole = await roleModel.findOne({
            where: { name: name.trim(), is_deleted: false },
        });
        if (checkRole) {
            return ResponseService.badRequest(res, 'Role already exist');
        }

        const role = await roleModel.create({
            name: name.trim(),
            status: status ?? true,
            companyId : companyId
        });
        return ResponseService.created(res, role, 'Role created successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const List = async (req, res) => {
    try {
        const roles = await roleModel.findAll({
            where: { is_deleted: false },
            order: [['id', 'DESC']],
            include
        });
        return ResponseService.success(res, 'Success', roles);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Role id is required');

        const role = await roleModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!role) return ResponseService.notFound(res, 'Role not found');

        const { name, status, companyId } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Role name is required');
        }
        if(!companyId) {
            return ResponseService.badRequest(res,"Company id is required")
        }

        const duplicate = await roleModel.findOne({
            where: { name: name.trim(), is_deleted: false, id: { [Op.ne]: id } },
        });
        if (duplicate) {
            return ResponseService.badRequest(res, 'Role name already exist');
        }

        await role.update({
            name: name.trim(),
            status: status ?? role.status,
            companyId : companyId
        });
        return ResponseService.success(res, 'Role updated successfully', role);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Role id is required');

        const role = await roleModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!role) return ResponseService.notFound(res, 'Role not found');

        await role.update({ is_deleted: true });
        return ResponseService.success(res, 'Role deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export { Create, List, update, deleteRole };