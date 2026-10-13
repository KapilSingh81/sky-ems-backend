import express from "express";
import { create, deleteLeaveType, getLeaveTypeById, list, update } from "../controller/leaveTypeController.js";

const leaveTypeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leave Type
 *   description: Leave type management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LeaveType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: ANNUAL
 *         name:
 *           type: string
 *           example: Annual Leave
 *         leaveType:
 *           type: string
 *           example: Paid
 *         companyId:
 *           type: integer
 *           example: 1
 *         isDeleted:
 *           type: boolean
 *           example: false
 *     LeaveTypeInput:
 *       type: object
 *       required: [code, name, leaveType, companyId]
 *       properties:
 *         code:
 *           type: string
 *           example: ANNUAL
 *         name:
 *           type: string
 *           example: Annual Leave
 *         leaveType:
 *           type: string
 *           example: Paid
 *         companyId:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/leaveType/list:
 *   get:
 *     summary: Get all active leave types
 *     tags: [Leave Type]
 *     responses:
 *       200:
 *         description: Leave types, newest first
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
 *                     $ref: '#/components/schemas/LeaveType'
 */
leaveTypeRouter.get("/list", list);

/**
 * @swagger
 * /api/leaveType/create:
 *   post:
 *     summary: Create a leave type
 *     tags: [Leave Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeaveTypeInput'
 *     responses:
 *       201:
 *         description: Leave type created successfully
 *       400:
 *         description: A required field is missing or the leave type code already exists for the company
 */
leaveTypeRouter.post("/create", create);

/**
 * @swagger
 * /api/leaveType/update/{id}:
 *   put:
 *     summary: Update a leave type
 *     tags: [Leave Type]
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
 *             $ref: '#/components/schemas/LeaveTypeInput'
 *     responses:
 *       200:
 *         description: Leave type updated successfully
 *       400:
 *         description: A required field is missing or the leave type code already exists for the company
 *       404:
 *         description: Leave type not found
 */
leaveTypeRouter.put("/update/:id", update);

/**
 * @swagger
 * /api/leaveType/delete/{id}:
 *   delete:
 *     summary: Delete a leave type (soft delete)
 *     tags: [Leave Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Leave type deleted successfully
 *       404:
 *         description: Leave type not found
 */
leaveTypeRouter.delete("/delete/:id", deleteLeaveType);

/**
 * @swagger
 * /api/leaveType/getById/{id}:
 *   get:
 *     summary: Get a leave type by id
 *     tags: [Leave Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Leave type details
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
 *                   $ref: '#/components/schemas/LeaveType'
 *       404:
 *         description: Leave type not found
 */
leaveTypeRouter.get("/getById/:id", getLeaveTypeById);

export default leaveTypeRouter;