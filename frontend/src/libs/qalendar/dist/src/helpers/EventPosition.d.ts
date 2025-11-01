/**
 * The following class contains methods for calculating where to position
 * calendar events within a given day
 * */
import type { eventInterface } from '../typings/interfaces/event.interface';
import Time from './Time';
import type { dayInterface } from '../typings/interfaces/day.interface';
export default class EventPosition extends Time {
    /**
     * Yields a full calendar week, with all full-day events positioned in it
     * */
    positionFullDayEventsInWeek(weekStart: Date, weekEnd: Date, events: eventInterface[]): any[];
    positionFullDayEventsInMonth(calendarMonth: dayInterface[][], fullDayEvents: eventInterface[]): dayInterface[][];
}
