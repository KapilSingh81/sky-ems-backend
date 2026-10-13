import express from "express";
import { create, getById, list, remove, update } from "../controller/holidayController.js";

const holidayRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Holiday
 *   description: Holiday management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Holiday:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: New Year's Day
 *         date:
 *           type: string
 *           format: date
 *           example: '2026-01-01'
 *         companyId:
 *           type: integer
 *           example: 1
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         company:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Sunrise Hospitality Pvt Ltd
 *     HolidayInput:
 *       type: object
 *       required: [name, date, companyId]
 *       properties:
 *         name:
 *           type: string
 *           example: New Year's Day
 *         date:
 *           type: string
 *           format: date
 *           example: '2026-01-01'
 *         companyId:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/holiday/list:
 *   get:
 *     summary: Get all active holidays
 *     tags: [Holiday]
 *     responses:
 *       200:
 *         description: Holidays, newest first, including company details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Holiday'
 */
holidayRouter.get("/list", list);

/**
 * @swagger
 * /api/holiday/create:
 *   post:
 *     summary: Create a holiday
 *     tags: [Holiday]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HolidayInput'
 *     responses:
 *       201:
 *         description: Holiday created successfully
 *       400:
 *         description: Holiday name, date, or company ID is missing
 */
holidayRouter.post("/create", create);

/**
 * @swagger
 * /api/holiday/update/{id}:
 *   put:
 *     summary: Update a holiday
 *     tags: [Holiday]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HolidayInput'
 *     responses:
 *       200:
 *         description: Holiday updated successfully
 *       400:
 *         description: Holiday name, date, or company ID is missing
 *       404:
 *         description: Holiday not found
 */
holidayRouter.put("/update/:id", update);

/**
 * @swagger
 * /api/holiday/delete/{id}:
 *   delete:
 *     summary: Delete a holiday (soft delete)
 *     tags: [Holiday]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Holiday deleted successfully
 *       404:
 *         description: Holiday not found
 */
holidayRouter.delete("/delete/:id", remove);

/**
 * @swagger
 * /api/holiday/getById/{id}:
 *   get:
 *     summary: Get a holiday by ID
 *     tags: [Holiday]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Holiday details, including company details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/Holiday'
 *       404:
 *         description: Holiday not found
 */
holidayRouter.get("/getById/:id", getById);

export default holidayRouter;
