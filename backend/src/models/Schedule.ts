export type Shift = 'morning' | 'afternoon' | 'night';

export interface DaySchedule {
  schedule_id: string; // ID do agendamento
  shifts: {
    [key in Shift]: string[]; // Array de IDs de empresas
  };
}

export interface Schedule {
  id: string;
  date: string; // formato YYYY-MM
  shift: Shift;
  company_id: string;
}