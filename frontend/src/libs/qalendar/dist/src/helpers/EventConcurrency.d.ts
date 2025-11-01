import { type eventInterface } from "../typings/interfaces/event.interface";
export default class EventConcurrency {
    protected sortEventsAccordingToStartOfTime(events: eventInterface[]): eventInterface[];
    /**
     * Sets the "zIndex" and "nOfPreviousConcurrentEvents" properties on an event
     *
     * zIndex - lets the event know with which z-index it should be displayed
     * nOfPreviousConcurrentEvents - lets the event know, how many other, previous events, are competing for the same width
     * */
    calculateConcurrencyForEvents(events: eventInterface[]): eventInterface[];
}
