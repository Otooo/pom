import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/login', UserController.login);
userRoutes.post('/bypass-login', UserController.bypassLogin);