import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export const companyRoutes = Router();

const prefix = '/companies';

companyRoutes.get(`${prefix}/`, CompanyController.getAllCompanies);
companyRoutes.get(`${prefix}/:id`, CompanyController.getCompanyById);
companyRoutes.put(`${prefix}/:id`, CompanyController.updateCompany);
companyRoutes.post(`${prefix}/`, CompanyController.createCompany);
companyRoutes.delete(`${prefix}/:id`, CompanyController.deleteCompany);