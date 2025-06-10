import { db } from '../database';
import { Database, ModelType } from '../types/db.types';

// Serviço genérico para manipulação de dados
export class DataService<T extends ModelType> {
	private collection: keyof Database;
	
	constructor(collection: keyof Database) {
		this.collection = collection;
	}
	
	async getAll(): Promise<T[]> {
		return await db.readAll(this.collection);
	}
	
	async getById(id: string | number): Promise<T | null> {
		return db.readDb(this.collection, `${id}`);
	}
	
	async create(item: T): Promise<T> {
		const data = await db.writeDb(this.collection, item.id, item); 

		return data;
	}
	
	async update(id: string | number, updatedItem: Partial<T>): Promise<T | null> {
		const item = await this.getById(id);
		
		if (!item) {
			return new Promise(resolve => resolve(null));
		}

		const updated = { ...item as unknown as T, ...updatedItem };
		
		return db.writeDb(this.collection, `${id}`, updated);
	}
	
	async delete(id: string | number): Promise<boolean> {
		return db.deleteDb(this.collection, `${id}`);
	}
}