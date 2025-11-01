import { DAY_TIME_POINT } from "../typings/config.interface";
import { DAY_MODE } from "../typings/interfaces/time-modes";
export type calendarWeekType = Date[];
export type calendarMonthType = calendarWeekType[];
export type calendarYearMonths = Date[];
export declare enum WEEK_START_DAY {
    SUNDAY = "sunday",
    MONDAY = "monday"
}
export default class Time {
    FIRST_DAY_OF_WEEK: WEEK_START_DAY;
    CALENDAR_LOCALE: string;
    ALL_HOURS: DAY_TIME_POINT[];
    DAY_START: DAY_TIME_POINT;
    DAY_END: DAY_TIME_POINT;
    HOURS_PER_DAY: number;
    MS_PER_DAY: number;
    constructor(firstDayOfWeek?: WEEK_START_DAY, locale?: string | null, dayBoundaries?: {
        start: DAY_TIME_POINT;
        end: DAY_TIME_POINT;
    });
    get dayMode(): DAY_MODE;
    getDatesBetweenTwoDates(start: Date, end: Date): Date[];
    getCalendarWeekDateObjects(date: Date): calendarWeekType;
    /**
     * Returns an array of the weeks that comprise a month
     *
     * @param {number} yyyy
     * @param {number} mm - zero indexed (January === 0)
     * */
    getCalendarMonthSplitInWeeks(yyyy: number, mm: number): calendarMonthType;
    /**
     * Returns an array with the length of 12 dates,
     * one date for the first day of each month of the year
     * */
    getCalendarYearMonths(year: number): calendarYearMonths;
    getHourAndMinutesFromTimePoints(timePoints: number): {
        hour: number;
        minutes: number;
    };
    /**
     * Given timePoints (0, 100, 200 etc.), this function returns
     * a localized string with the respective hour
     * (in en-US for example: 0 => 12 AM, 1600 => 4 PM )
     * */
    getHourLocaleStringFromHourDigits(timePoints: number): string;
    getLocalizedNameOfWeekday(date: Date, weekdayNameLength?: "long" | "short"): string;
    getLocalizedNameOfMonth(date: Date, monthNameLength?: "long" | "short"): string;
    getLocalizedDateString(date: Date): string;
    /**
     * Takes a date object, and creates a time string from it, in the format of
     * YYYY-MM-DD hh:mm
     * */
    getDateTimeStringFromDate(date: Date, timeIsStartOrEndOfDay?: "start" | "end"): string;
    getLocalizedTime(dateTimeString: string): string;
    getLocalizedHour(date: Date): string;
    getLocalizedTimeRange(start: string, end: string): string;
    /**
     * Returns numeric values for year, month, date, hour and minutes, given a dateTimeString
     * All variables are Date-Object compatible, meaning "month" is zero-indexed
     * */
    getAllVariablesFromDateTimeString(dateTimeString: string): {
        year: number;
        month: number;
        date: number;
        hour: number;
        minutes: number;
    };
    dateIsToday(date: Date): boolean;
    dateIsInWeek(dateToCheck: Date, week: Date[]): boolean;
    getDateStringFromDate(date: Date): string;
    addMinutesToDateTimeString(minutes: number, dateTimeString: string): string;
    addDaysToDateTimeString(days: number, dateTimeString: string): string;
    dateStringsHaveEqualDates(dateTimeString1: string, dateTimeString2: string): boolean;
    setDateToEndOfDay(date: Date): Date;
    protected turnMinutesIntoPercentageOfHour(minutes: number): string;
    /**
     * Every hour between 'dayStart' and 'dayEnd' is 100, in this function referred to as 100 points
     * If an event starts 30 minutes after 'dayStart', it should have 50 pointsIntoDay
     * If a day consists of 4 hours (400 points), we then have to count
     * (50 / 400) * 100 = 12.5 => event starts after 12.5 percent of the day
     *
     * Result is supposed to be a number between 0 and 100, and is used for setting the CSS- top- and height-attributes for events
     * */
    getPercentageOfDayFromDateTimeString(dateTimeString: string, dayStart: number, dayEnd: number): number;
    getTimeFromClick(clickOffsetY: number, weekHeight: number): string;
    setSegmentOfDateTimeString(dateTimeString: string, segments: {
        hour: number;
    }): string;
    isTrailingOrLeadingDate(date: Date, month: number): boolean;
    static getTimePointsFromHour(boundary: number): number;
    static getHourFromTimePoints(timePoints: number): number;
    getTimelineHours(): DAY_TIME_POINT[];
    dateStringFrom(dateTimeString: string): string;
    timeStringFrom(dateTimeString: string): string;
    hourFrom(dateTimeString: string): number;
    minutesFrom(dateTimeString: string): number;
    areDaysConsecutive(dayOne: string, dayTwo: string): boolean;
    setHourInDateTimeString(dateTimeString: string, hour: number): string;
    setMinutesInDateTimeString(dateTimeString: string, minutes: number): string;
    getDateTimeStringDayBoundariesFrom(dateString: string): {
        start: string;
        end: string;
    };
    doubleDigit(number: number): string;
}
export declare class TimeBuilder {
    private weekStartsOn;
    private locale;
    private dayBoundaries;
    build(): Time;
    withDayBoundaries(dayBoundaries: {
        start: DAY_TIME_POINT;
        end: DAY_TIME_POINT;
    }): this;
    withLocale(locale: string): this;
}
