import { DataService } from '../services/DataService';
import { Location } from '../models/Location';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';
import { DB_COLLECTION } from '../types/db_collection.enum';

const SERVICE = new DataService<Location>(DB_COLLECTION.LOCATION);

export const LocationService = {
	index: async (): Promise<Location[]> => {
		return await SERVICE.getAll();
	},
	
	find: async (id: string | number): Promise<Location | null> => {
		const location = await SERVICE.getById(id);
		
		if (!location) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return location;
	},
	
	create: async (data: Omit<Location, 'id'>): Promise<Location> => {
		const { name, address } = data;
		
		if (!name || !address) {
			DATA_REQUIRED_ERROR('Nome e Endereço são obrigatórios');
		}
		
		const newLocation: Location = {
			id: uuidv4(),
			...data
		};
		
		return await SERVICE.create(newLocation);
	},
	
	update: async (id: string | number, data: Partial<Location>): Promise<Location | null> => {
		const updatedLocation = await SERVICE.update(id, data);
		
		if (!updatedLocation) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return updatedLocation;
	},
	
	delete: async (id: string | number): Promise<boolean> => {
		const deleted = await SERVICE.delete(id);
		
		if (!deleted) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return deleted;
	}
};