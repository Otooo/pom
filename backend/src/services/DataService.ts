import { db } from '../database';
import { Database, ModelType } from '../types/db.types';

// Serviço genérico para manipulação de dados
export class DataService<T extends ModelType> {
	private collection: keyof Database;
	
	constructor(collection: keyof Database) {
		this.collection = collection;
	}
	
	async getAll(): Promise<T[]> {
		// const db = readDb();

		// return new Promise(resolve => resolve(db[this.collection] as T[]));

		return await db.readAll(this.collection);
	}
	
	async getById(id: string | number): Promise<T | null> {
		// const items = await this.getAll();
		// const result = items.find(item => item.id === id) || null;

		return db.readDb(this.collection, `${id}`);
		// return new Promise(resolve => resolve(result));
	}
	
	async create(item: T): Promise<T> {
		// const db = readDb();
		// const items = db[this.collection] as T[];
		// const updatedItems = [...items, item];
		// (db as any)[this.collection] = updatedItems;
		// writeDb(db);

		const data = await db.writeDb(this.collection, item.id, item); 

		return data;
	}
	
	async update(id: string | number, updatedItem: Partial<T>): Promise<T | null> {
		// const db = readDb();
		const item = await this.getById(id);
		
		if (!!item) {
			return new Promise(resolve => resolve(null));
		}

		const updated = { ...item as unknown as T, ...updatedItem };
		// items[index] = updated;
		// (db as any)[this.collection] = items;
		// writeDb(db);
		
		return db.writeDb(this.collection, `${id}`, updated);
	}
	
	async delete(id: string | number): Promise<boolean> {
		// const db = readDb();
		// const items = db[this.collection] as unknown as T[];
		// const filteredItems = items.filter(item => item.id !== id);
		
		// if (filteredItems.length === items.length) 
		// 	return new Promise(resolve => resolve(false));
		
		// (db as any)[this.collection] = filteredItems;
		// writeDb(db);
		
		return db.deleteDb(this.collection, `${id}`);
	}
}