/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         reminderTime:
 *           type: string
 *           format: date-time
 *           description: The time for the reminder (ISO 8601 format).
 */

import express, { Request, Response } from 'express';
import reminderService from '../service/Reminder.service';
import { ReminderInput } from '../types';

const reminderRouter = express.Router();

/**
 * @swagger
 * /reminders:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new reminder.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reminder'
 *      responses:
 *         201:
 *            description: The created Reminder.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Reminder'
 */ 
reminderRouter.post('/', async (req: Request, res: Response) => {
        const reminderInput: ReminderInput = req.body;
    try {
        const newTask = await reminderService.createReminder(reminderInput);
        res.status(201).json(newTask);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create Reminder';
        res.status(400).json({ error: errorMessage });
    }
});



/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a Reminder by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Reminder id.
 *     responses:
 *       200:
 *         description: Successfully deleted Reminder.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 
reminderRouter.delete('/:id', async (req: Request, res: Response) => {
    const reminderId = Number(req.params.id);
    try {
        const deleted = await reminderService.deleteReminder(reminderId);
        if (deleted) {
            res.status(200).json({ message: 'Reminder deleted successfully' });
        } else {
            res.status(404).json({ error: 'Reminder not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete reminder' });
    }
});

export {reminderRouter};