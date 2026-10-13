import express from "express";
import { create, getById, list, remove, update } from "../controller/employeeController.js";

const employeeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         emp_code:
 *           type: string
 *           example: EMP001
 *         name:
 *           type: string
 *           example: Alex Morgan
 *         email:
 *           type: string
 *           format: email
 *           example: alex@example.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           example: Other
 *         dob:
 *           type: string
 *           format: date
 *           example: '1990-04-15'
 *         doj:
 *           type: string
 *           format: date
 *           example: '2024-01-08'
 *         departmentId:
 *           type: integer
 *           example: 1
 *         designationId:
 *           type: integer
 *           example: 1
 *         companyId:
 *           type: integer
 *           example: 1
 *         roleId:
 *           type: integer
 *           example: 1
 *         address:
 *           type: string
 *           example: 42 Market Street
 *         status:
 *           type: boolean
 *           example: true
 *         is_deleted:
 *           type: boolean
 *           example: false
 *         company:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         department:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         designation:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *     EmployeeInput:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - email
 *         - phone
 *         - gender
 *         - dob
 *         - doj
 *         - departmentId
 *         - designationId
 *         - companyId
 *         - roleId
 *         - address
 *       properties:
 *         code:
 *           type: string
 *           example: EMP001
 *         name:
 *           type: string
 *           example: Alex Morgan
 *         email:
 *           type: string
 *           format: email
 *           example: alex@example.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           example: Other
 *         dob:
 *           type: string
 *           format: date
 *           example: '1990-04-15'
 *         doj:
 *           type: string
 *           format: date
 *           example: '2024-01-08'
 *         departmentId:
 *           type: integer
 *           example: 1
 *         designationId:
 *           type: integer
 *           example: 1
 *         companyId:
 *           type: integer
 *           example: 1
 *         roleId:
 *           type: integer
 *           example: 1
 *         address:
 *           type: string
 *           example: 42 Market Street
 */

/**
 * @swagger
 * /api/employee/create:
 *   post:
 *     summary: Create an employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Required data is missing, email is invalid, or employee code already exists for the company
 */
employeeRouter.post("/create", create);

/**
 * @swagger
 * /api/employee/list:
 *   get:
 *     summary: Get all active employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Employees, newest first, including company, department, designation, and role details
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
 *                     $ref: '#/components/schemas/Employee'
 */
employeeRouter.get("/list", list);

/**
 * @swagger
 * /api/employee/update/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
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
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Required data is missing, email is invalid, or employee code already exists
 *       404:
 *         description: Employee not found
 */
employeeRouter.put("/update/:id", update);

/**
 * @swagger
 * /api/employee/delete/{id}:
 *   delete:
 *     summary: Delete an employee (soft delete)
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
employeeRouter.delete("/delete/:id", remove);

/**
 * @swagger
 * /api/employee/getById/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee details including company, department, designation, and role
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
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
employeeRouter.get("/getById/:id", getById);

export default employeeRouter;
