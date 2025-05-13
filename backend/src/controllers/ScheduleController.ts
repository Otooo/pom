import { Request, Response } from 'express';
import { DataService } from '../services/DataService';
import { Schedule, DaySchedule, Shift } from '../models/Schedule';
import { v4 as uuidv4 } from 'uuid';

const scheduleService = new DataService<Schedule>('schedules');

export const ScheduleController = {
  getAllSchedules: (req: Request, res: Response) => {
    const schedules = scheduleService.getAll();
    res.json(schedules);
  },

  getScheduleById: (req: Request, res: Response) => {
    const schedule = scheduleService.getById(req.params.id);
    
    if (!schedule) {
      return res.status(404).json({ message: 'Agenda não encontrada' });
    }
    
    res.json(schedule);
  },

  getScheduleByMonth: (req: Request, res: Response) => {
    const { month } = req.params; // formato YYYY-MM
    const schedules = scheduleService.getAll();
    const schedule = schedules.find(s => s.month === month);
    
    if (!schedule) {
      // Se não existir, criar uma nova agenda para o mês
      const daysInMonth = new Date(parseInt(month.split('-')[0]), parseInt(month.split('-')[1]), 0).getDate();
      const days: DaySchedule[] = [];
      
      for (let i = 1; i <= daysInMonth; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        days.push({
          date: `${month}-${day}`,
          shifts: {
            morning: [],
            afternoon: [],
            night: []
          }
        });
      }
      
      const newSchedule: Schedule = {
        id: uuidv4(),
        month,
        days
      };
      
      const created = scheduleService.create(newSchedule);
      return res.json(created);
    }
    
    res.json(schedule);
  },

  updateDayShift: (req: Request, res: Response) => {
    const { month, day, shift } = req.params;
    const { companies } = req.body;
    
    if (!Array.isArray(companies)) {
      return res.status(400).json({ message: 'Lista de empresas inválida' });
    }
    
    const schedules = scheduleService.getAll();
    let schedule = schedules.find(s => s.month === month);
    
    if (!schedule) {
      return res.status(404).json({ message: 'Agenda do mês não encontrada' });
    }
    
    const dayIndex = schedule.days.findIndex(d => d.date.endsWith(day));
    
    if (dayIndex === -1) {
      return res.status(404).json({ message: 'Dia não encontrado' });
    }
    
    // Atualizar as empresas para o turno específico
    schedule.days[dayIndex].shifts[shift as Shift] = companies;
    
    const updated = scheduleService.update(schedule.id, schedule);
    res.json(updated);
  },

  deleteSchedule: (req: Request, res: Response) => {
    const deleted = scheduleService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Agenda não encontrada' });
    }
    
    res.status(204).send();
  }
};