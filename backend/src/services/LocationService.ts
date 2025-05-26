import { DataService } from '../services/DataService';
import { Location } from '../models/Location';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';

const SERVICE = new DataService<Location>(Location);

export const LocationService = {
	index: (): Promise<Location[]> => {
		const locations = SERVICE.getAll();
		
		return new Promise((resolve) => resolve(locations as Location[]));
	},
	
	find: (id: string | number): Promise<Location | null> => {
		const location = SERVICE.getById(id);
		
		if (!location) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return new Promise((resolve) => resolve(location));
	},
	
	create: (data: Omit<Location, 'id'>): Promise<Location> => {
		const { name, address } = data;
		
		if (!name || !address) {
			DATA_REQUIRED_ERROR('Nome e Endereço são obrigatórios');
		}
		
		const newLocation: Location = {
			id: uuidv4(),
			...data
		};
		
		const location = SERVICE.create(newLocation);
		
		return new Promise((resolve) => resolve(location));
	},
	
	update: (id: string | number, data: Partial<Location>): Promise<Location | null> => {
		const updatedLocation = SERVICE.update(id, data);
		
		if (!updatedLocation) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return new Promise((resolve) => resolve(updatedLocation));
	},
	
	delete: (id: string | number): Promise<boolean> => {
		const deleted = SERVICE.delete(id);
		
		if (!deleted) {
			DATA_NOT_FOUND_ERROR('Local não encontrado')
		}
		
		return new Promise((resolve) => resolve(deleted));
	}
};