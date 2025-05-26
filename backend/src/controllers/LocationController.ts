import { Request, Response } from 'express';
import { HTTP_CODE } from '../types/http_code';
import { LocationService } from '../services/LocationService';

export const LocationController = {
    getAllLocations: async (req: Request, res: Response) => {
        try {
            const locations = await LocationService.index();

            return res.status(HTTP_CODE.SUCCESS).json(locations);
        } catch (error: any) {
            const status = error?.name ?? HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    getLocationById: async (req: Request, res: Response) => {
        try {
            const location = await LocationService.find(req.params.id);
        
            return res.status(HTTP_CODE.SUCCESS).json(location);
        } catch (error: any) {
            const status = error?.name ?? HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    createLocation: async (req: Request, res: Response) => {
        try {
            const location = await LocationService.create(req.body);
            
            return res.status(HTTP_CODE.CREATED).json(location);
        } catch (error: any) {
            const status = error?.name ?? HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    updateLocation: async (req: Request, res: Response) => {
        try {
            const updatedLocation = await LocationService.update(req.params.id, req.body);
        
            return res.status(HTTP_CODE.SUCCESS).json(updatedLocation);
        } catch (error: any) {
            const status = error?.name ?? HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    deleteLocation: async (req: Request, res: Response) => {
        try {
            await LocationService.delete(req.params.id);
            
            return res.status(HTTP_CODE.NO_CONTENT).send();
        } catch (error: any) {
            const status = error?.name ?? HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    }
};