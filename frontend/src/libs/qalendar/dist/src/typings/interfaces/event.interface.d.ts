import type { modeType } from '../types';
export type eventId = string | number;
export declare enum EVENT_TYPE {
    SINGLE_DAY_TIMED = "SINGLE_DAY_TIMED",
    SINGLE_DAY_FULL_DAY = "SINGLE_DAY_FULL_DAY",
    SINGLE_HYBRID_DAY_TIMED = "SINGLE_HYBRID_DAY_TIMED",
    MULTI_DAY_TIMED = "MULTI_DAY_TIMED",
    MULTI_DAY_FULL_DAY = "MULTI_DAY_FULL_DAY"
}
export type EventColor = "blue" | "yellow" | "green" | "red" | "purple";
export interface eventInterface {
    id: eventId;
    title?: string;
    time: {
        start: string;
        end: string;
    };
    description?: string;
    topic?: string;
    location?: string;
    with?: string;
    colorScheme?: string;
    color?: EventColor;
    isEditable?: boolean;
    disableDnD?: modeType[];
    disableResize?: modeType[];
    isCustom?: boolean | modeType[];
    zIndex?: number;
    nOfPreviousConcurrentEvents?: number;
    totalConcurrentEvents?: number;
    timeJS?: {
        start: Date;
        end: Date;
    };
    originalEvent?: Omit<eventInterface, 'originalEvent'>;
    eventType?: EVENT_TYPE;
}
