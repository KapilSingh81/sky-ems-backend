import { Op } from "sequelize";
import ResponseService from "../utils/httpService.js";
import { companyModel } from "../model/compnayModel.js";
import validator from "validator";

const isBlank = (v) => !v || !String(v).trim();

const Create = async (req, res) => {
    try {
        const { code, name, email, contact_number, website, address, status } = req.body;

        if (isBlank(code)) return ResponseService.badRequest(res, 'Company code is required');
        if (isBlank(name)) return ResponseService.badRequest(res, 'Company name is required');
        if (isBlank(email)) return ResponseService.badRequest(res, 'Company email is required');
        if (isBlank(contact_number)) return ResponseService.badRequest(res, 'Contact number is required');
        if (isBlank(address)) return ResponseService.badRequest(res, 'Address is required');

        if (!validator.isEmail(email.trim())) {
            return ResponseService.badRequest(res, "Please enter a valid email address");
        }

        const codeExists = await companyModel.findOne({
            where: { code: code.trim(), is_deleted: false },
        });
        if (codeExists) {
            return ResponseService.badRequest(res, 'Company code already exist');
        }

        const nameExists = await companyModel.findOne({
            where: { name: name.trim(), is_deleted: false },
        });
        if (nameExists) {
            return ResponseService.badRequest(res, 'Company name already exist');
        }

        const company = await companyModel.create({
            code: code.trim(),
            name: name.trim(),
            email: email.trim(),
            contact_number: contact_number.trim(),
            website: isBlank(website) ? null : website.trim(),
            address: address.trim(),
            status: status ?? true,
        });
        return ResponseService.created(res, company, 'Company created successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const List = async (req, res) => {
    try {
        const companies = await companyModel.findAll({
            where: { is_deleted: false },
            order: [['id', 'DESC']],
        });
        return ResponseService.success(res, 'Success', companies);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Company id is required');

        const company = await companyModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!company) return ResponseService.notFound(res, 'Company not found');

        return ResponseService.success(res, 'Success', company);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Company id is required');

        const company = await companyModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!company) return ResponseService.notFound(res, 'Company not found');

        const { code, name, email, contact_number, website, address, status } = req.body;

        if (isBlank(code)) return ResponseService.badRequest(res, 'Company code is required');
        if (isBlank(name)) return ResponseService.badRequest(res, 'Company name is required');
        if (isBlank(email)) return ResponseService.badRequest(res, 'Company email is required');
        if (isBlank(contact_number)) return ResponseService.badRequest(res, 'Contact number is required');
        if (isBlank(address)) return ResponseService.badRequest(res, 'Address is required');
        if (!validator.isEmail(email.trim())) {
            return ResponseService.badRequest(res, "Please enter a valid email address");
        }
        const codeDuplicate = await companyModel.findOne({
            where: { code: code.trim(), is_deleted: false, id: { [Op.ne]: id } },
        });
        if (codeDuplicate) {
            return ResponseService.badRequest(res, 'Company code already exist');
        }

        const nameDuplicate = await companyModel.findOne({
            where: { name: name.trim(), is_deleted: false, id: { [Op.ne]: id } },
        });
        if (nameDuplicate) {
            return ResponseService.badRequest(res, 'Company name already exist');
        }

        await company.update({
            code: code.trim(),
            name: name.trim(),
            email: email.trim(),
            contact_number: contact_number.trim(),
            website: isBlank(website) ? null : website.trim(),
            address: address.trim(),
            status: status ?? company.status,
        });
        return ResponseService.success(res, 'Company updated successfully', company);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Company id is required');

        const company = await companyModel.findOne({
            where: { id, is_deleted: false },
        });
        if (!company) return ResponseService.notFound(res, 'Company not found');

        await company.update({ is_deleted: true });
        return ResponseService.success(res, 'Company deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export { Create, List, getById, update, deleteCompany };