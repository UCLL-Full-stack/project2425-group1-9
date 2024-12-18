/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            name:
 *              type: string
 *              description: User name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [user, admin, guest]
 */




import express, { Request, Response } from 'express';
import userService from '../service/User.service';
import { UserInput } from '../types';

const userRouter = express.Router();


/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         201:
 *            description: The created User.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 *         400:
 *            description: Invalid input data.
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 *         409:
 *            description: User already exists.
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 */
userRouter.post('/signup', async (req: Request, res: Response) => {
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
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get all users.
 *      responses:
 *          200:
 *              description: An array of User objects.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            error:
 *                              type: string
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});

/**
 * @swagger
 * /users/{name}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a user by name.
 *      parameters:
 *          - in: path
 *            name: name
 *            schema:
 *              type: string
 *              required: true
 *              description: The user name.
 *      responses:
 *          200:
 *              description: A user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserInput'
 *          404:
 *              description: User not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            error:
 *                              type: string
 */
userRouter.get('/:name', async (req: Request, res: Response) => {
    const name = String(req.params.name);
    try {
        const user = await userService.getUserByName(name);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User  not found' });
    }} catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });
    }
});


/**
 * @swagger
 * /users/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and user name when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const userInput = <UserInput>req.body;
        const authenticationResponse = await userService.authenticate(userInput); 
        res.status(200).json(authenticationResponse); 
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id.
 *     responses:
 *       200:
 *         description: Successfully deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 
userRouter.delete('/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    try {
        const deleted = await userService.deleteUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete User' });
    }
});

export {userRouter};
