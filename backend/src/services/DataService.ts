import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { Schedule } from '../models/Schedule';

interface Database {
  users: User[];
  companies: Company[];
  locations: Location[];
  schedules: Schedule[];
}

type ModelsType = {
  users: User;
  companies: Company;
  locations: Location;
  schedules: Schedule;
}
type ModelsTypeKeys = keyof ModelsType;

const dbPath = path.join(__dirname, '..', 'data', 'database.json');

// Garantir que o arquivo de banco de dados existe
const ensureDbExists = (): void => {
  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  
  if (!fs.existsSync(dbPath)) {
    const initialData: Database = {
      users: [],
      companies: [],
      locations: [],
      schedules: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
};

// Ler o banco de dados
const readDb = (): Database => {
  ensureDbExists();
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data) as Database;
};

// Escrever no banco de dados
const writeDb = (data: Database): void => {
  ensureDbExists();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Serviço genérico para manipulação de dados
export class DataService<T> {
  private collection: keyof Database;

  constructor(collection: keyof Database) {
    this.collection = collection;
    ensureDbExists();
  }

  getAll(): T[] {
    const db = readDb();
    return db[this.collection] as unknown as T[];
  }

  getById(id: string): T | null {
    const items = this.getAll();
    return items.find(item => item.id === id) || null;
  }

  create(item: T): T {
    const db = readDb();
    db[this.collection] = [...db[this.collection] as unknown as T[], item];
    writeDb(db);
    return item;
  }

  update(id: string, updatedItem: Partial<T>): T | undefined {
    const db = readDb();
    const items = db[this.collection] as unknown as T[];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return undefined;
    
    const updated = { ...items[index], ...updatedItem };
    items[index] = updated;
    db[this.collection] = items;
    writeDb(db);
    
    return updated;
  }

  delete(id: string): boolean {
    const db = readDb();
    const items = db[this.collection] as unknown as T[];
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    db[this.collection] = filteredItems;
    writeDb(db);
    
    return true;
  }
}