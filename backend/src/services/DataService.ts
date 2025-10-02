import { db } from '../database';
import { Database, ModelType } from '../types/db.types';
import { cacheService } from './CacheService';

// Serviço genérico para manipulação de dados
export class DataService<T extends ModelType> {
	private collection: keyof Database;
	
	constructor(collection: keyof Database) {
		this.collection = collection;
	}
	
	async getAll(): Promise<T[]> {
		const cacheKey = `${this.collection}:all`;
		let cached = cacheService.get(cacheKey);
		
		if (!cached) {
			cached = await db.readAll(this.collection);
			cacheService.set(cacheKey, cached, 5); // Cache por 5 minutos
		}
		
		return cached;
	}
	
	async getById(id: string | number): Promise<T | null> {
		const cacheKey = `${this.collection}:${id}`;
		let cached = cacheService.get(cacheKey);
		
		if (!cached) {
			cached = await db.readDb(this.collection, `${id}`);
			if (cached) {
				cacheService.set(cacheKey, cached, 10); // Cache por 10 minutos
			}
		}
		
		return cached;
	}

	// Nova função para buscar múltiplos IDs
	async getByIds(ids: (string | number)[]): Promise<T[]> {
		const stringIds = ids.map(id => `${id}`);
		const cacheKey = `${this.collection}:batch:${stringIds.join(',')}`;
		
		let cached = cacheService.get(cacheKey);
		if (!cached) {
			cached = await db.readMultiple(this.collection, stringIds);
			cacheService.set(cacheKey, cached, 5);
		}
		
		return cached.filter((item: any) => item !== null);
	}
	
	async create(item: T): Promise<T> {
		const data = await db.writeDb(this.collection, item.id, item);
		
		// Invalidar cache
		cacheService.invalidate(`${this.collection}:`);
		
		return data;
	}
	
	async update(id: string | number, updatedItem: Partial<T>): Promise<T | null> {
		const item = await this.getById(id);
		
		if (!item) {
			return null;
		}

		const updated = { ...item as unknown as T, ...updatedItem };
		const result = await db.writeDb(this.collection, `${id}`, updated);
		
		// Invalidar cache
		cacheService.invalidate(`${this.collection}:`);
		
		return result;
	}
	
	async delete(id: string | number): Promise<boolean> {
		const result = await db.deleteDb(this.collection, `${id}`);
		
		// Invalidar cache
		cacheService.invalidate(`${this.collection}:`);
		
		return result;
	}
}