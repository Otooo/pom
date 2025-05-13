import { Request, Response } from 'express';
import { DataService } from '../services/DataService';
import { Company } from '../models/Company';
import { v4 as uuidv4 } from 'uuid';

const companyService = new DataService<Company>('companies');

export const CompanyController = {
  getAllCompanies: (req: Request, res: Response) => {
    const companies = companyService.getAll();
    res.json(companies);
  },

  getCompanyById: (req: Request, res: Response) => {
    const company = companyService.getById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    res.json(company);
  },

  createCompany: (req: Request, res: Response) => {
    const { name, location_id } = req.body;
    
    if (!name || !location_id) {
      return res.status(400).json({ message: 'Nome e local são obrigatórios' });
    }
    
    const newCompany: Company = {
      id: uuidv4(),
      name,
      location_id,
    };
    
    const company = companyService.create(newCompany);
    res.status(201).json(company);
  },

  updateCompany: (req: Request, res: Response) => {
    const updatedCompany = companyService.update(req.params.id, req.body);
    
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    res.json(updatedCompany);
  },

  deleteCompany: (req: Request, res: Response) => {
    const deleted = companyService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    res.status(204).send();
  }
};