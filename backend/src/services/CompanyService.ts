import { DataService } from '../services/DataService';
import { Company } from '../models/Company';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';

const SERVICE = new DataService<Company>(Company);

export const CompanyService = {
    index: (): Promise<Company[]> => {
        const companies = SERVICE.getAll();
        
        return new Promise((resolve) => resolve(companies as Company[]));
    },
    
    find: (id: string | number): Promise<Company | null> => {
        const company = SERVICE.getById(id);
        
        if (!company) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada')
        }
        
        return new Promise((resolve) => resolve(company));
    },
    
    create: (data: Omit<Company, 'id'>): Promise<Company> => {
        const { name, location_id } = data;
        
        if (!name || !location_id) {
            DATA_REQUIRED_ERROR('Nome e Local são obrigatórios');
        }
        
        const newCompany: Company = {
            id: uuidv4(),
            ...data
        };
        
        const company = SERVICE.create(newCompany);
        
        return new Promise((resolve) => resolve(company));
    },
    
    update: (id: string | number, data: Partial<Company>): Promise<Company | null> => {
        const updatedCompany = SERVICE.update(id, data);
        
        if (!updatedCompany) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada')
        }
        
        return new Promise((resolve) => resolve(updatedCompany));
    },
    
    delete: (id: string | number): Promise<boolean> => {
        const deleted = SERVICE.delete(id);
        
        if (!deleted) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada')
        }
        
        return new Promise((resolve) => resolve(deleted));
    }
};