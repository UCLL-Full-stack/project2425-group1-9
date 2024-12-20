/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
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
 *           type: string
 *           format: date-time
 *           description: The deadline of the task.
 *         status:
 *            type: string  
 *            description: The status of the task.
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'  
 *         reminder:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Reminder' 
 *         user:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User' 
 * 
 *     TaskInput:
 *       type: object
 *       properties:
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
 *           type: string
 *           format: date-time
 *           description: The deadline of the task.
 *         status:
 *            type: string  
 *            description: The status of the task.
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TagInput'  
 *         user:
 *     
 *             $ref: '#/components/schemas/UserInput2' 
 *     
 * 
 *     TaskInput2:
 *       type: object
 *       properties:
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
 *           type: string
 *           format: date-time
 *           description: The deadline of the task.
 *         status:
 *            type: string  
 *            description: The status of the task.
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'  
 *         user:
 *             $ref: '#/components/schemas/UserInput2' 
 *         
 *                  
 */ 

import express, { Request, Response } from 'express';
import taskService from '../service/Task.service';
import { ReminderInput, Role, TaskInput } from '../types';

const taskRouter = express.Router();


/**
 * @swagger
 * /tasks:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new task.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskInput'
 *      responses:
 *         201:
 *            description: The created Task.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 */ 
taskRouter.post('/', async (req: Request, res: Response) => {
        const taskInput: TaskInput = req.body;
    try {
        const newTask = await taskService.createTask(taskInput);
        res.status(201).json(newTask);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
        res.status(400).json({ error: errorMessage });
    }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all loged in users tasks.
 *     responses:
 *       200:
 *         description: A list of your tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/', async (req: Request, res: Response) => {
    try {
        const request = req as Request & { auth: { name: string; role: Role } };
        const { name, role } = request.auth;
        const tasks = await taskService.getAllTasks({name, role});
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a task by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The task id.
 *      responses:
 *          200:
 *              description: A Task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRouter.get('/:id', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    try {
        const task = await taskService.getTaskById(taskId);
        res.status(200).json(task);
        
    } catch (error) {
        res.status(400).json({ error: `Task with id: ${taskId} does not exist.`  });
    }
});



/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Update a task.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput2'
 *     responses:
 *       200:
 *         description: Successfully updated task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Task not found.
 */
taskRouter.put('/:id', async (req: Request, res: Response) => {
    const taskInput: TaskInput = {
        id: Number(req.params.id),
        ...req.body 
    };

    try {
        const updatedTask = await taskService.updateTask(taskInput);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } 
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
        res.status(400).json({ error: errorMessage });
    }
});



/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a task by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task id.
 *     responses:
 *       200:
 *         description: Successfully deleted task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 
taskRouter.delete('/:id', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    try {
        const deleted = await taskService.deleteTask(taskId);
        if (deleted) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete task' });
    }
});

/**
 * @swagger
 * /tasks/user/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a task by userId.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The task UserId.
 *      responses:
 *          200:
 *              description: A Task object list.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRouter.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await taskService.getTaskByUserId(Number(req.params.userId));
    res.json(tasks);
  } catch (error) {
        console.error('Error retrieving tasks for user:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});


export {taskRouter};
