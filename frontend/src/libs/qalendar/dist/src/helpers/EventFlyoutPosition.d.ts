type elementDimensions = {
    height: number;
    width: number;
};
import type { DOMRect } from "../typings/types";
export declare const EVENT_FLYOUT_WIDTH = 400;
export default class EventFlyoutPosition {
    calculateFlyoutPosition(eventElementDOMRect: DOMRect, flyoutDimensions: elementDimensions, calendarDomRectParam?: DOMRect | null): {
        top: number | null;
        left: number | null;
    } | undefined;
}
export {};
