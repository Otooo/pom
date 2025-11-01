import { type Slot } from 'vue';
import { EVENT_TYPE, type eventInterface } from "../typings/interfaces/event.interface";
import Time from "./Time";
export default class Helpers {
    /**
     * If navigator.languages is present (correlating to the browser's Accept-Language header), then use it
     * otherwise just use navigator.language
     * */
    static getBrowserNavigatorLocale(): string;
    /**
     * Solution from https://github.com/vuejs/core/issues/4733#issuecomment-1024816095
     * */
    static hasSlotContent(slot: Slot | undefined): boolean;
    static getEventType(event: eventInterface, time: Time): EVENT_TYPE;
    static getTimedEventType(event: eventInterface, time: Time): EVENT_TYPE.SINGLE_DAY_TIMED | EVENT_TYPE.SINGLE_HYBRID_DAY_TIMED | EVENT_TYPE.MULTI_DAY_TIMED;
    static getFullDayEventType(event: eventInterface, time: Time): EVENT_TYPE.SINGLE_DAY_FULL_DAY | EVENT_TYPE.MULTI_DAY_FULL_DAY;
    static isUIEventTouchEvent(event: UIEvent): boolean;
}
