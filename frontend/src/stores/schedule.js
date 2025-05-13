import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
    state: () => ({
        schedules: [],
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
    }),
  
    actions: {
        saveSchedules(schedules) {
        	this.schedules = schedules;
        },
        
        clearSchedules() {
            this.schedules = [];
        },

        setMonth(month) {
            this.currentMonth = month;
        },
        
        setYear(year) {
            this.currentYear = year;
        }
    }
})