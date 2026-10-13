
import express from 'express';
import { Create, deleteRole, List, update } from '../controller/roleController.js';

const roleRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role master APIs
 */

/**
 * @swagger
 * /api/role/create:
 *   post:
 *     summary: Create a role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - companyId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               companyId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the company
 *               status:
 *                 type: boolean
 *                 example: true
 *                 default: true
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid input or role already exists
 *       500:
 *         description: Internal server error
 */
roleRouter.post('/create', Create);

/**
 * @swagger
 * /api/role/list:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles (newest first)
 *       500:
 *         description: Internal server error
 */
roleRouter.get('/list', List);

/**
 * @swagger
 * /api/role/update/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Role]
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
 *             type: object
 *             required:
 *               - name
 *               - companyId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Super Admin
 *               companyId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the company
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid input or role already exists
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.put('/update/:id', update);

/**
 * @swagger
 * /api/role/delete/{id}:
 *   delete:
 *     summary: Soft delete a role
 *     tags: [Role]
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
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.delete('/delete/:id', deleteRole);

export default roleRouter;
