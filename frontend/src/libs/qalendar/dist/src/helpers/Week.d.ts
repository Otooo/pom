import Time from "./Time";
import { type eventInterface } from "../typings/interfaces/event.interface";
export declare class WeekHelper {
    static getNHoursIntoDayFromHour(hour: number, timeInstance: Time): number;
    static eventSeparator(events: eventInterface[], time: Time): {
        fullDayAndMultipleDayEvents: eventInterface[];
        singleDayTimedEvents: eventInterface[];
    };
}
