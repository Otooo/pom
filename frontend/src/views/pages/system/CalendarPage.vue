<template>
    <div>
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
  </template>

<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import { format } from 'date-fns';
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
 
// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const calendarApp = createCalendar({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
    calendars: {
        personal: {
            colorName: 'personal',
            lightColors: {
                main: '#f9d71c',
                container: '#fff5aa',
                onContainer: '#594800',
            },
            darkColors: {
                main: '#fff5c0',
                onContainer: '#fff5de',
                container: '#a29742',
            },
        },
        work: {
        colorName: 'work',
        lightColors: {
            main: '#f91c45',
            container: '#ffd2dc',
            onContainer: '#59000d',
        },
        darkColors: {
            main: '#ffc0cc',
            onContainer: '#ffdee6',
            container: '#a24258',
        },
        },
        school: {
            colorName: 'school',
            lightColors: {
                main: '#1c7df9',
                container: '#d2e7ff',
                onContainer: '#002859',
            },
            darkColors: {
                main: '#c0dfff',
                onContainer: '#dee6ff',
                container: '#426aa2',
            },
            },
            
    },
  views: [
    // createViewDay(),
    // createViewWeek(),
    createViewMonthGrid(),
    // createViewMonthAgenda(),
  ],
  plugins: [
    createDragAndDropPlugin(),
    createEventModalPlugin()
  ],

  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2025-05-19',
      end: '2025-05-19',
      id: "98d85d98541f",
      calendarId: "work"
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2025-05-20 12:00',
      end: '2025-05-20 13:00',
      id: "98d85d985412",
      calendarId: "school"
    },
  ],
}, )
</script>