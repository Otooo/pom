import { Request, Response } from 'express';
import { HTTP_CODE, HTTP_CODE_IS_VALID } from '../types/http_code.enum';
import { ScheduleService } from '../services/ScheduleService';

export const ScheduleController = {
    getAllSchedules: async (req: Request, res: Response) => {
        try {
            const schedules = await ScheduleService.index();
            
            return res.status(HTTP_CODE.SUCCESS).json(schedules);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    getScheduleById: async (req: Request, res: Response) => {
        try {
            const schedule = await ScheduleService.find(req.params.id);
        
            return res.status(HTTP_CODE.SUCCESS).json(schedule);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    getScheduleByDate: async (req: Request, res: Response) => {
        try {
            const schedules = await ScheduleService.filter(req.params);
        
            return res.status(HTTP_CODE.SUCCESS).json(schedules);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    createSchedule: async (req: Request, res: Response) => {
        try {
            const schedule = await ScheduleService.create(req.body);

            return res.status(HTTP_CODE.CREATED).json(schedule);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },

    updateSchedule: async (req: Request, res: Response) => {
        try {
            const updated = await ScheduleService.update(req.params.id, req.body);

            return res.status(HTTP_CODE.SUCCESS).json(updated);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
    
    deleteSchedule: async (req: Request, res: Response) => {
        try {
            await ScheduleService.delete(req.params.id);
           
            return res.status(HTTP_CODE.NO_CONTENT).send();
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },

    generateDataToMsg: async (req: Request, res: Response) => {
        try {
            const dataMsg = await ScheduleService.generateDataToMsg(req.body?.monthYear);
           
            return res.status(HTTP_CODE.SUCCESS).send(dataMsg);
        } catch (error: any) {
            const status = HTTP_CODE_IS_VALID(error?.name) 
                ? error.name 
                : HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }
    },
};