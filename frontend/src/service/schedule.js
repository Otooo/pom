import axios from '@/config/axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useScheduleStore } from '@/stores/schedule';
import { executeActionService } from './serviceBase';

/** VARs */
const API_PATH = '/schedules';

/** METHODS */
export const fetchSchedules = async () => {
    return executeActionService(async () => axios.get(API_PATH));
}

export const getScheduleById = async (id) => {
    return executeActionService(async () => axios.get(`${API_PATH}/${id}`));
}
  
export const createSchedule = async ({ id, ...schedule }) => {
    return executeActionService(async () => axios.post(API_PATH, schedule));
}
  
export const updateSchedule = async (id, { _id, ...schedule }) => {
    return executeActionService(async () => axios.put(`${API_PATH}/${id}`, schedule))
}

export const deleteSchedule = async (id) => {
    return executeActionService(async () => axios.delete(`${API_PATH}/${id}`))
}
  
export const calendarDays = () => {
    const scheduleStore = useScheduleStore();
    
    const days = [];
    const today = new Date(scheduleStore.currentMonth, scheduleStore.currentYear);
    const startDate = startOfMonth(today);
    const endDate = endOfMonth(startDate);
      
    const datesInMonth = eachDayOfInterval({ start: startDate, end: endDate });
      
    for (const date of datesInMonth) {
        const dateString = format(date, 'yyyy-MM-dd');
        const daySchedules = this.schedules.filter(s => s.date === dateString);
        
        const getShiftCompanies = ((shift) => daySchedules
            .filter(s => s.shift === shift)
            .map(s => companyStore.companies.find(s2 => s2.id === s.company_id))
            .filter(Boolean)
        );
        
        days.push({
            date,
            schedules: {
                morning: getShiftCompanies('morning'),
                afternoon: getShiftCompanies('afternoon'),
                night: getShiftCompanies('night')
            }
        });
    }
      
    return days;
}
  