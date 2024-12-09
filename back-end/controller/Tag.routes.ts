/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the tag.
 */

import express, { Request, Response } from 'express';
import tagService from '../service/Tag.service';
import { TagInput } from '../types';

const tagRouter = express.Router();

/**
 * @swagger
 * /tags:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new tag.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tag'
 *      responses:
 *         201:
 *            description: The created tag.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Tag'
 */ 
tagRouter.post('/', async (req: Request, res: Response) => {
        const tagInput: TagInput = req.body;
    try {
        const newTask = await tagService.createTag(tagInput);
        res.status(201).json(newTask);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create Tag';
        res.status(400).json({ error: errorMessage });
    }
});

/**
 * @swagger
 * /tags:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get all tags.
 *      responses:
 *          200:
 *              description: An array of Tag objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tag'
 *          404:
 *              description: Tag not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            error:
 *                              type: string
 */
tagRouter.get('/', async (req: Request, res: Response) => {
    const users = await tagService.getAllTags();
    res.status(200).json(users);
});



/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a tag by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The tag id.
 *     responses:
 *       200:
 *         description: Successfully deleted tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 
tagRouter.delete('/:id', async (req: Request, res: Response) => {
    const tagId = Number(req.params.id);
    try {
        const deleted = await tagService.deleteTag(tagId);
        if (deleted) {
            res.status(200).json({ message: 'Tag deleted successfully' });
        } else {
            res.status(404).json({ error: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete tag' });
    }
});

export {tagRouter};