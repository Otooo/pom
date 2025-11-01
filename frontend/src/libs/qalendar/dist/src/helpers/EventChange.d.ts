import Time from "./Time";
import { DRAG_N_RESIZE_DIRECTION } from "../typings/types";
import type { eventInterface } from "../typings/interfaces/event.interface";
export declare class EventChange {
    private timeInstance;
    private date;
    private dayStart;
    private dayEnd;
    constructor(timeInstance: Time, date: string);
    canEventBeMoved(event: eventInterface, direction: DRAG_N_RESIZE_DIRECTION): boolean;
    private handleNonFlexibleDays;
    private handleFlexibleDays;
    private handleForwardsMoveForNonFlexibleDays;
    private handleBackwardsMoveForNonFlexibleDays;
    private handleForwardsMoveForFlexibleDays;
    private handleBackwardsMoveForFlexibleDays;
    private setDayBoundariesTimeStrings;
}
