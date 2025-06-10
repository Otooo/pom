import { Request, Response } from 'express';
import { HTTP_CODE, HTTP_CODE_IS_VALID } from '../types/http_code.enum';
import { CompanyService } from '../services/CompanyService';

export const CompanyController = {
    getAllCompanies: async (req: Request, res: Response) => {
        try {
            const companies = await CompanyService.index();
            
            return res.status(HTTP_CODE.SUCCESS).json(companies);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    getCompanyById: async (req: Request, res: Response) => {
        try {
            const company = await CompanyService.find(req.params.id);
        
            return res.status(HTTP_CODE.SUCCESS).json(company);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    createCompany: async (req: Request, res: Response) => {
       try {
            const company = await CompanyService.create(req.body);

            return res.status(HTTP_CODE.SUCCESS).json(company);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    updateCompany: async (req: Request, res: Response) => {
        try {
            const updatedCompany = await CompanyService.update(req.params.id, req.body);
        
            return res.status(HTTP_CODE.SUCCESS).json(updatedCompany);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    deleteCompany: async (req: Request, res: Response) => {
        try {
            await CompanyService.delete(req.params.id);
        
            return res.status(HTTP_CODE.NO_CONTENT).send();
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    }
};