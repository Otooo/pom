import Time from './Time';
export type interval = {
    intervalStart: string;
    intervalEnd: string;
    hasBorder?: boolean;
};
/**
 * Define the data for the clickable intervals to be viewed in a calendar day.
 * */
export default class DayIntervals extends Time {
    private readonly INTERVAL_MINUTES;
    private readonly DAY_START_DATE_TIME_STRING;
    HOURS_PER_DAY: number;
    constructor(intervalMinutes: 15 | 30 | 60, dayStartDateTimeString: string, hoursPerDay?: number);
    getIntervals(): interval[];
}
