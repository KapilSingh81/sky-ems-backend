import express from "express";
import {
    companyDDL,
	departmentDDL,
	departmentDDLByCompany,
	designationDDL,
	designationDDLByCompany,
    roleDDLByCompany,
} from "../controller/commonController.js";

const commonRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Common Lookups
 *   description: Lookup lists for departments and designations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommonLookupItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Operations
 *     CommonLookupResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CommonLookupItem'
 */

/**
 * @swagger
 * /api/common/departments:
 *   get:
 *     summary: Get department lookup items
 *     tags: [Common Lookups]
 *     responses:
 *       200:
 *         description: Department IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 */
commonRouter.get("/departments", departmentDDL);

/**
 * @swagger
 * /api/common/designations:
 *   get:
 *     summary: Get designation lookup items
 *     tags: [Common Lookups]
 *     responses:
 *       200:
 *         description: Designation IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 */
commonRouter.get("/designations", designationDDL);

/**
 * @swagger
 * /api/common/companies/{companyId}/departments:
 *   get:
 *     summary: Get department lookup items for a company
 *     tags: [Common Lookups]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Company department IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 *       400:
 *         description: Company ID is required
 */
commonRouter.get("/companies/:companyId/departments", departmentDDLByCompany);

/**
 * @swagger
 * /api/common/companies/{companyId}/designations:
 *   get:
 *     summary: Get designation lookup items for a company
 *     tags: [Common Lookups]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Company designation IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 *       400:
 *         description: Company ID is required
 */
commonRouter.get("/companies/:companyId/designations", designationDDLByCompany);

/**
 * @swagger
 * /api/common/companies:
 *   get:
 *     summary: Get company lookup items
 *     tags: [Common Lookups]
 *     responses:
 *       200:
 *         description: Company IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 */
commonRouter.get("/companies", companyDDL);

/**
 * @swagger
 * /api/common/companies/{companyId}/roles:
 *   get:
 *     summary: Get role lookup items for a company
 *     tags: [Common Lookups]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Company role IDs and names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonLookupResponse'
 *       400:
 *         description: Company ID is required
 */
commonRouter.get("/companies/:companyId/roles", roleDDLByCompany);

export default commonRouter;
