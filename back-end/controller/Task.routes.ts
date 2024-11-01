import express, { Request, Response } from 'express';
import taskService from '../service/Task.service';
import { TaskInput } from '../types';

const taskRouter = express.Router();



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


taskRouter.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});


taskRouter.get('/:id', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    try {
        const task = await taskService.getTaskById(taskId);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve task' });
    }
});


taskRouter.put('/:id', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const taskInput: TaskInput = req.body;

    try {
        const updatedTask = await taskService.updateTask(taskInput);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
        res.status(400).json({ error: errorMessage });
    }
});


taskRouter.delete(':id', async (req: Request, res: Response) => {
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

export {taskRouter};
