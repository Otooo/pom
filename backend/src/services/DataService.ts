import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { Schedule } from '../models/Schedule';

class Database {
	users: User[] = [];
	companies: Company[] = [];
	locations: Location[] = [];
	schedules: Schedule[] = [];
}

type ModelType = User | Company | Location | Schedule;

const dbPath = path.join(__dirname, '..', 'data', 'database.json');

// Garantir que o arquivo de banco de dados existe
const ensureDbExists = (): void => {
	if (!fs.existsSync(path.dirname(dbPath))) {
		fs.mkdirSync(path.dirname(dbPath), { recursive: true });
	}
	
	if (!fs.existsSync(dbPath)) {
		const initialData: Database = new Database();
		fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
	}
};

// Ler o banco de dados
const readDb = (): Database => {
	ensureDbExists();
	const data = fs.readFileSync(dbPath, 'utf8');
	const database = JSON.parse(data) as Database;

	return database;
};

// Escrever no banco de dados
const writeDb = (data: Database): void => {
	ensureDbExists();
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Serviço genérico para manipulação de dados
export class DataService<T extends ModelType> {
	private static typeMap: Record<string, keyof Database> = {
		'User': 'users',
		'Company': 'companies',
		'Location': 'locations',
		'Schedule': 'schedules'
	};
	private collection: keyof Database;
	
	constructor(private entityType: new (...args: any[]) => T) {
		const typeName = entityType.name;
		const collectionName = DataService.typeMap[typeName];
		
		if (!collectionName) {
			throw new Error(`Tipo de entidade desconhecido: ${typeName}`);
		}

		this.collection = collectionName;
		ensureDbExists();
	}
	
	getAll(): T[] {
		const db = readDb();

		return db[this.collection] as T[];
	}
	
	getById(id: string | number): T | null {
		const items = this.getAll();
		return items.find(item => item.id === id) || null;
	}
	
	create(item: T): T {
		const db = readDb();
		const items = db[this.collection] as T[];
		const updatedItems = [...items, item];
		(db as any)[this.collection] = updatedItems;
		writeDb(db);

		return item;
	}
	
	update(id: string | number, updatedItem: Partial<T>): T | null {
		const db = readDb();
		const items = db[this.collection] as unknown as T[];
		const index = items.findIndex(item => item.id === id);
		
		if (index === -1) return null;
		
		const updated = { ...items[index], ...updatedItem };
		items[index] = updated;
		(db as any)[this.collection] = items;
		writeDb(db);
		
		return updated;
	}
	
	delete(id: string | number): boolean {
		const db = readDb();
		const items = db[this.collection] as unknown as T[];
		const filteredItems = items.filter(item => item.id !== id);
		
		if (filteredItems.length === items.length) return false;
		
		(db as any)[this.collection] = filteredItems;
		writeDb(db);
		
		return true;
	}
}