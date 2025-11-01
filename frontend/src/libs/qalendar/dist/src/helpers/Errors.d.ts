import { type eventInterface } from "../typings/interfaces/event.interface";
import { type configInterface } from "../typings/config.interface";
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export default class Errors {
    static PREFIX: string;
    static SUFFIX: string;
    static readonly MISSING_ID_WARNING: string;
    static readonly MISSING_TITLE_WARNING: string;
    static readonly MISSING_TIME_WARNING: string;
    static readonly MISSING_TIME_START_WARNING: string;
    static readonly MISSING_TIME_END_WARNING: string;
    static checkEventProperties(event: RecursivePartial<eventInterface>): void;
    static checkConfig(config: configInterface): void;
}
export {};
