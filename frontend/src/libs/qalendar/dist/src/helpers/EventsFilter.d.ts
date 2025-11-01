import type { eventInterface } from "../typings/interfaces/event.interface";
import Time from "./Time";
export declare class EventsFilter {
    private events;
    constructor(events: eventInterface[]);
    getEventsForDay(timeInstance: Time, startDateTimeString: string): eventInterface[];
    private isEventInDayBoundaries;
    private handleDayStretchingTwoDates;
    private handlePartialDayWithinOneDayBoundary;
}
