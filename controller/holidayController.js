import { companyModel } from "../model/compnayModel.js";
import { holidayModel } from "../model/holidayModel.js";
import ResponseService from "../utils/httpService.js";

const include = [
    { model: companyModel, as: "company", attributes: ["id", "name"] },
];

export const create = async (req, res) => {
    try {
        const { name, date, companyId } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Holiday name is required');
        }
        if (!date) {
            return ResponseService.badRequest(res, 'Holiday date is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company ID is required');
        }

        const newHoliday = await holidayModel.create({
            name: name.trim(),
            date,
            companyId
        });

        return ResponseService.created(res, newHoliday, 'Holiday created successfully');

    } catch (error) {
        ResponseService.error(res, error.message);
    }
}

export const list = async (req, res) => {
    try {
        const holidays = await holidayModel.findAll({
            where: { isDeleted: false },
            order: [['id', 'DESC']],
            include,
        });
        return ResponseService.success(res, 'Success', holidays);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Holiday id is required');
        const { name, date, companyId } = req.body;
        if (!name || !name.trim()) {
            return ResponseService.badRequest(res, 'Holiday name is required');
        }
        if (!date) {
            return ResponseService.badRequest(res, 'Holiday date is required');
        }
        if (!companyId) {
            return ResponseService.badRequest(res, 'Company ID is required');
        }

        const holiday = await holidayModel.findOne({ where: { id, isDeleted: false } });
        if (!holiday) {
            return ResponseService.notFound(res, 'Holiday not found');
        }

        holiday.name = name.trim();
        holiday.date = date;
        holiday.companyId = companyId;
        await holiday.save();

        return ResponseService.success(res, 'Holiday updated successfully', holiday);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Holiday id is required');

        const holiday = await holidayModel.findOne({ where: { id, isDeleted: false } });
        if (!holiday) {
            return ResponseService.notFound(res, 'Holiday not found');
        }

        holiday.isDeleted = true;
        await holiday.save();
        return ResponseService.success(res, 'Holiday deleted successfully');
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return ResponseService.badRequest(res, 'Holiday id is required');

        const holiday = await holidayModel.findOne({
            where: { id, isDeleted: false },
            include,
        });
        if (!holiday) {
            return ResponseService.notFound(res, 'Holiday not found');
        }

        return ResponseService.success(res, 'Success', holiday);
    } catch (error) {
        return ResponseService.error(res, error.message);
    }
}