import { DataService } from '../services/DataService';
import { Company } from '../models/Company';
import { v4 as uuidv4 } from 'uuid';
import { DATA_NOT_FOUND_ERROR, DATA_REQUIRED_ERROR } from '../utils/error';
import { DB_COLLECTION } from '../types/db_collection.enum';

const SERVICE = new DataService<Company>(DB_COLLECTION.COMPANY);

export const CompanyService = {
    index: async (): Promise<Company[]> => {
        const companies = await SERVICE.getAll();
        
        return companies;
    },
    
    find: async (id: string | number): Promise<Company | null> => {
        const company = await SERVICE.getById(id);
        
        if (!company) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada');
        }
        
        return company;
    },
    
    create: async (data: Omit<Company, 'id'>): Promise<Company> => {
        const { name } = data;
        
        if (!name) {
            DATA_REQUIRED_ERROR('Nome é obrigatório');
        }
        
        const newCompany: Company = {
            id: uuidv4(),
            ...data
        };
        
        const company = await SERVICE.create(newCompany);
        return company;
    },
    
    update: async (id: string | number, data: Partial<Company>): Promise<Company | null> => {
        const updatedCompany = await SERVICE.update(id, data);
        
        if (!updatedCompany) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada');
        }
        
        return updatedCompany;
    },
    
    delete: async (id: string | number): Promise<boolean> => {
        const deleted = await SERVICE.delete(id);
        
        if (!deleted) {
            DATA_NOT_FOUND_ERROR('Empresa não encontrada');
        }
        
        return deleted;
    }
};