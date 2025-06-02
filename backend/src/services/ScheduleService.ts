import { DataService } from '../services/DataService';
import { Schedule } from '../models/Schedule';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';
import { Company } from '../models/Company';
import { Location } from '../models/Location';

const SERVICE = new DataService<Schedule>(Schedule);

const COMPANY_SERVICE = new DataService<Company>(Company);
const LOCATION_SERVICE = new DataService<Location>(Location);

export const ScheduleService = {
    index: (): Promise<Schedule[]> => {
        const schedules = SERVICE.getAll();

        schedules.map(schedule => {
            schedule.company = COMPANY_SERVICE.getById(schedule.company_id) as Company;
            schedule.location = LOCATION_SERVICE.getById(schedule.location_id) as Location;
        })
        
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
		const { date, shift, company_id, location_id } = data;
		
		if (!date || !shift || !company_id || !location_id) {
            DATA_REQUIRED_ERROR('Data, turnos, companhia e local são obrigatórios');
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
    },

    generateDataToMsg: (monthYear: string): any => {
        if (monthYear.length !== 7) {
            DATA_REQUIRED_ERROR('Mês e ano devem ser informado');
        }

        let schedules = SERVICE.getAll();
        schedules = schedules.filter(s => s.date.substring(0, 7) === monthYear);
        schedules.map(schedule => {
            schedule.company = COMPANY_SERVICE.getById(schedule.company_id) as Company;
            schedule.location = LOCATION_SERVICE.getById(schedule.location_id) as Location;
        })

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