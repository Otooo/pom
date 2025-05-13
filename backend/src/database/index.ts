import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { Schedule } from '../models/Schedule';

const DB_PATH = path.join(__dirname, '../../data');
const USERS_FILE = path.join(DB_PATH, 'users.json');
const COMPANIES_FILE = path.join(DB_PATH, 'companies.json');
const LOCATIONS_FILE = path.join(DB_PATH, 'locations.json');
const SCHEDULES_FILE = path.join(DB_PATH, 'schedules.json');

// Garante que o diretório de dados existe
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Inicializa arquivos de banco de dados se não existirem
export function initializeDatabase() {
  // Inicializa usuários com um usuário padrão (bypass de login)
  if (!fs.existsSync(USERS_FILE)) {
    const defaultUser: User = {
      id: uuidv4(),
      name: 'Admin User',
      login: 'admin',
      password: 'admin123' // Em produção, usaríamos hash
    };
    fs.writeFileSync(USERS_FILE, JSON.stringify([defaultUser], null, 2));
  }

  // Inicializa outros arquivos
  if (!fs.existsSync(COMPANIES_FILE)) {
    fs.writeFileSync(COMPANIES_FILE, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(LOCATIONS_FILE)) {
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(SCHEDULES_FILE)) {
    fs.writeFileSync(SCHEDULES_FILE, JSON.stringify([], null, 2));
  }
}

// Funções genéricas para manipulação do banco de dados
export function readData<T>(filePath: string): T[] {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  } catch (error) {
    return [];
  }
}

export function writeData<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Exporta funções específicas para cada entidade
export const usersDB = {
  getAll: () => readData<User>(USERS_FILE),
  save: (users: User[]) => writeData<User>(USERS_FILE, users)
};

export const companiesDB = {
  getAll: () => readData<Company>(COMPANIES_FILE),
  save: (companies: Company[]) => writeData<Company>(COMPANIES_FILE, companies)
};

export const locationsDB = {
  getAll: () => readData<Location>(LOCATIONS_FILE),
  save: (locations: Location[]) => writeData<Location>(LOCATIONS_FILE, locations)
};

export const schedulesDB = {
  getAll: () => readData<Schedule>(SCHEDULES_FILE),
  save: (schedules: Schedule[]) => writeData<Schedule>(SCHEDULES_FILE, schedules)
};