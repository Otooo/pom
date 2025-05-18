import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();

const prefix = '/users';

userRoutes.get(`${prefix}/`, UserController.getAllUsers);
userRoutes.get(`${prefix}/:id`, UserController.getUserById);
userRoutes.put(`${prefix}/:id`, UserController.updateUser);
userRoutes.post(`${prefix}/`, UserController.createUser);
userRoutes.delete(`${prefix}/:id`, UserController.deleteUser);

userRoutes.post('/login', UserController.login);
userRoutes.post('/bypass-login', UserController.bypassLogin);