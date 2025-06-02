import { Router } from 'express';
import { ScheduleController } from '../controllers/ScheduleController';

export const scheduleRoutes = Router();

const prefix = '/schedules';

scheduleRoutes.get(`${prefix}`, ScheduleController.getAllSchedules);
scheduleRoutes.get(`${prefix}/:id`, ScheduleController.getScheduleById);
scheduleRoutes.get(`${prefix}/:date`, ScheduleController.getScheduleByDate);

scheduleRoutes.put(`${prefix}/:id`, ScheduleController.updateSchedule);

scheduleRoutes.post(`${prefix}`, ScheduleController.createSchedule);
scheduleRoutes.post(`${prefix}/data-msg`, ScheduleController.generateDataToMsg);

scheduleRoutes.delete(`${prefix}/:id`, ScheduleController.deleteSchedule);