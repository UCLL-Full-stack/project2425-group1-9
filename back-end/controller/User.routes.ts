/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: The title of the task.
 *         description:
 *           type: string
 *           description: The description of the task.
 *         priority:
 *           type: string
 *           description: The priority of the task.
 *         deadline:
 *           type: date
 *           description: The deadline of the task.
 *         status:
 *            type: string  
 *            description: The status of the task.
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'  
 *         reminders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Reminder'  
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the tag.
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
 *         taskId:
 *           type: number
 *           format: int64
 *           description: The ID of the task associated with the reminder.
 */



import express, { Router, Request, Response } from 'express';
import userService from '../service/User.service';
import { UserInput } from '../types';

const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ScheduleInput'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const userInput: UserInput = req.body;
        const newUser = await userService.createUser(userInput);
        res.status(201).json(newUser);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });
    }
});


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});


/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The user id.
 *      responses:
 *          200:
 *              description: A User object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    try {
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });
    }
});

export {userRouter};
