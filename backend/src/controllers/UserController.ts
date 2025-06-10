import { Request, Response } from 'express';
import { DataService } from '../services/DataService';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { DB_COLLECTION } from '../types/db_collection.enum';

const userService = new DataService<User>(DB_COLLECTION.USER);

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await userService.getAll();
    // Não retornar as senhas
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  },

  getUserById: async (req: Request, res: Response) => {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Não retornar a senha
    const { password, ...safeUser } = user;
    res.json(safeUser);
  },

  createUser: async (req: Request, res: Response) => {
    const { name, login, password } = req.body;
    
    if (!name || !login || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    const newUser: User = {
      id: uuidv4(),
      name,
      login,
      password // Em um sistema real, deveria ser criptografado
    };
    
    const user = await userService.create(newUser);
    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  },

  updateUser: async (req: Request, res: Response) => {
    const updatedUser = await userService.update(req.params.id, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const { password, ...safeUser } = updatedUser;
    res.json(safeUser);
  },

  deleteUser: async (req: Request, res: Response) => {
    const deleted = await userService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.status(204).send();
  },

  login: async (req: Request, res: Response) => {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ message: 'Login e senha são obrigatórios' });
    }
    
    const users = await userService.getAll();
    const user = users.find(u => u.login === login && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Em um sistema real, deveria gerar um token JWT
    const { password: _, ...safeUser } = user;
    res.json({
      user: safeUser,
      token: 'fake-jwt-token'
    });
  },

  bypassLogin: async (req: Request, res: Response) => {
    const users = await userService.getAll();
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado para bypass' });
    }
    
    const user = users[0];
    const { password: _, ...safeUser } = user;
    
    res.json({
      user: safeUser,
      token: 'fake-jwt-token'
    });
  }
};