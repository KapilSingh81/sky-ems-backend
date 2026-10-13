import express from 'express';
import { Create, deleteCompany, getById, List, update } from '../controller/companyController.js';

const companyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company master APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: CMP001
 *         name:
 *           type: string
 *           example: Sunrise Hospitality Pvt Ltd
 *         email:
 *           type: string
 *           format: email
 *           example: info@sunrise.com
 *         contact_number:
 *           type: string
 *           example: "9876543210"
 *         website:
 *           type: string
 *           nullable: true
 *           example: https://sunrise.com
 *         address:
 *           type: string
 *           example: 12 Station Road, Jaipur 302001
 *         status:
 *           type: boolean
 *           example: true
 *         is_deleted:
 *           type: boolean
 *           example: false
 *     CompanyInput:
 *       type: object
 *       required: [code, name, email, contact_number, address]
 *       properties:
 *         code:
 *           type: string
 *           example: CMP001
 *         name:
 *           type: string
 *           example: Sunrise Hospitality Pvt Ltd
 *         email:
 *           type: string
 *           format: email
 *           example: info@sunrise.com
 *         contact_number:
 *           type: string
 *           example: "9876543210"
 *         website:
 *           type: string
 *           nullable: true
 *           example: https://sunrise.com
 *         address:
 *           type: string
 *           example: 12 Station Road, Jaipur 302001
 *         status:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/company/create:
 *   post:
 *     summary: Create a company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: A required field is missing, email is invalid, or company code / name already exists
 */
companyRouter.post('/create', Create);

/**
 * @swagger
 * /api/company/list:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of companies (newest first)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 */
companyRouter.get('/list', List);

/**
 * @swagger
 * /api/company/{id}:
 *   get:
 *     summary: Get a company by id
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Company details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 */
companyRouter.get('/:id', getById);

/**
 * @swagger
 * /api/company/update/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: A required field is missing, email is invalid, or company code / name already exists
 *       404:
 *         description: Company not found
 */
companyRouter.put('/update/:id', update);

/**
 * @swagger
 * /api/company/delete/{id}:
 *   delete:
 *     summary: Delete a company (soft delete)
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
companyRouter.delete('/delete/:id', deleteCompany);

export default companyRouter;