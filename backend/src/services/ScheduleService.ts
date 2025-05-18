import { DataService } from '../services/DataService';
import { Schedule } from '../models/Schedule';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';

const SERVICE = new DataService<Schedule>(Schedule);

export const ScheduleService = {
    index: (): Promise<Schedule[]> => {
        const schedules = SERVICE.getAll();
        
        return new Promise((resolve) => resolve(schedules as Schedule[]));
    },
    
    find: (id: string | number): Promise<Schedule | null> => {
        const schedule = SERVICE.getById(id);
        
        if (!schedule) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
        
        return new Promise((resolve) => resolve(schedule));
    },
    
    filter: (filters: any): Promise<Schedule[]> => {
        const { date } = filters; // formato YYYY-MM-DD
        
        let schedules = SERVICE.getAll();
        
        if (date) {
            schedules = schedules.filter(s => s.date === date);
        }
        
        return new Promise((resolve) => resolve(schedules));
    },

    create: (data: Omit<Schedule, 'id'>): Promise<Schedule> => {
		const { date, shift, company_id } = data;
		
		if (!date || !shift || !company_id) {
            DATA_REQUIRED_ERROR('Data, turnos e companhia são obrigatórios');
        }
		
		const newSchedule: Schedule = {
            id: uuidv4(),
            ...data
        };
        
        const schedule = SERVICE.create(newSchedule);
		
		return new Promise((resolve) => resolve(schedule));
	},
    
    update: (id: string | number, data: Partial<Schedule>): Promise<Schedule | null> => {
        
        const updated = SERVICE.update(id, data);
    
        if (!updated) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
            
        return new Promise((resolve) => resolve(updated));
    },
    
    delete: (id: string | number): Promise<boolean> => {
        const deleted = SERVICE.delete(id);
        
        if (!deleted) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
        
        return new Promise((resolve) => resolve(deleted));
    }
};