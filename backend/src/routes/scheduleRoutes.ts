import { Router } from 'express';
import { ScheduleController } from '../controllers/ScheduleController';

export const scheduleRoutes = Router();

scheduleRoutes.get('/', ScheduleController.getAllSchedules);
scheduleRoutes.get('/:id', ScheduleController.getScheduleById);
scheduleRoutes.get('/month/:month', ScheduleController.getScheduleByMonth);
scheduleRoutes.put('/month/:month/day/:day/shift/:shift', ScheduleController.updateDayShift);
scheduleRoutes.delete('/:id', ScheduleController.deleteSchedule);