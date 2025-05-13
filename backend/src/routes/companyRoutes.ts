import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export const companyRoutes = Router();

companyRoutes.get('/', CompanyController.getAllCompanies);
companyRoutes.get('/:id', CompanyController.getCompanyById);
companyRoutes.post('/', CompanyController.createCompany);
companyRoutes.put('/:id', CompanyController.updateCompany);
companyRoutes.delete('/:id', CompanyController.deleteCompany);