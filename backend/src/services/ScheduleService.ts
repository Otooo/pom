import { DataService } from '../services/DataService';
import { Schedule } from '../models/Schedule';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { DB_COLLECTION } from '../types/db_collection.enum';

const SERVICE = new DataService<Schedule>(DB_COLLECTION.SCHEDULE);

const COMPANY_SERVICE = new DataService<Company>(DB_COLLECTION.COMPANY);
const LOCATION_SERVICE = new DataService<Location>(DB_COLLECTION.LOCATION);

export const ScheduleService = {
    index: async (): Promise<Schedule[]> => {
        const schedules = await SERVICE.getAll();

        await Promise.all(
            schedules.map(async (schedule) => {
                schedule.company = await COMPANY_SERVICE.getById(schedule.company_id) as Company;
                schedule.location = await LOCATION_SERVICE.getById(schedule.location_id) as Location;
            })
        );

        return schedules;
    },
    
    find: async (id: string | number): Promise<Schedule | null> => {
        const schedule = await SERVICE.getById(id);
        
        if (!schedule) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
        
        return schedule;
    },
    
    filter: async (filters: any): Promise<Schedule[]> => {
        const { date } = filters; // formato YYYY-MM-DD
        
        let schedules = await SERVICE.getAll();
        
        
        if (date) {
            schedules = schedules.filter(s => s.date === date);
        }
        
        return schedules;
    },

    create: async (data: Omit<Schedule, 'id'>): Promise<Schedule> => {
		const { date, shift, company_id, location_id } = data;
		
		if (!date || !shift || !company_id || !location_id) {
            DATA_REQUIRED_ERROR('Data, turnos, companhia e local são obrigatórios');
        }
		
		const newSchedule: Schedule = {
            id: uuidv4(),
            ...data
        };
        
        return await SERVICE.create(newSchedule);
	},
    
    update: async (id: string | number, data: Partial<Schedule>): Promise<Schedule | null> => {
        const updated = await SERVICE.update(id, data);
    
        if (!updated) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
            
        return updated;
    },
    
    delete: async (id: string | number): Promise<boolean> => {
        const deleted = await SERVICE.delete(id);
        
        if (!deleted) {
            DATA_NOT_FOUND_ERROR('Agenda não encontrada')
        }
        
        return deleted;
    },

    generateDataToMsg: async (monthYear: string): Promise<any> => {
        if (monthYear.length !== 7) {
            DATA_REQUIRED_ERROR('Mês e ano devem ser informado');
        }

        let schedules = await SERVICE.getAll();
        schedules = schedules.filter(s => s.date.substring(0, 7) === monthYear);
        await Promise.all(
            schedules.map(async (schedule) => {
                schedule.company = await COMPANY_SERVICE.getById(schedule.company_id) as Company;
                schedule.location = await LOCATION_SERVICE.getById(schedule.location_id) as Location;
            })
        );

        const groupedSchedules = schedules.reduce((acc: any, schedule: Schedule) => {
        	const key = schedule.company_id;
        	if (!acc[key]) {
        		acc[key] = [];
        	}

            const data = {
                companyName: schedule.company?.name || 'SEM NOME',
                date: schedule.date,
                shift: schedule.shift,
                locationName: schedule.location?.name || 'SEM LOCAL',
            }

            acc[key].push(data);
            return acc;
        }, {} as any);

        return groupedSchedules;
    },
};