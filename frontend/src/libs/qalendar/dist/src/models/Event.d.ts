import type { EventColor, eventId, eventInterface } from "../typings/interfaces/event.interface";
import type { modeType } from "../typings/types";
export declare class EventImpl implements eventInterface {
    time: {
        start: string;
        end: string;
    };
    id: eventId;
    title?: string;
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
    nOfPreviousConcurrentEvents?: number;
    constructor(time: {
        start: string;
        end: string;
    }, id: eventId);
}
export declare class EventBuilder {
    time: {
        start: string;
        end: string;
    };
    private eventImpl;
    constructor(time: {
        start: string;
        end: string;
    }, id?: eventId);
    build(): EventImpl;
    withTitle(title: string): this;
    withColor(color: EventColor): this;
    withColorScheme(colorScheme: string): this;
    withDescription(description: string): this;
    withTopic(topic: string): this;
    withLocation(location: string): this;
    withWith($with: string): this;
    withNOfPreviousConcurrentEvents(nOfPreviousConcurrentEvents: number): this;
    withIsEditable(isEditable: boolean): this;
    withIsCustom(isCustom: boolean | modeType[]): this;
    withDisableDnD(disableDnD: modeType[]): this;
    withDisableResize(disableResize: modeType[]): this;
}
