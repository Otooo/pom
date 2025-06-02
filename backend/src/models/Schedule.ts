import { Company } from "./Company";
import { Location } from "./Location";

export type Shift = 'morning' | 'afternoon' | 'night';

export enum ShiftEnum {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    NIGHT = 'night',
}

export class Schedule {
    id!: string;
    date!: string; // formato YYYY-MM-DD
    shift!: Shift;
    company_id!: string;
    location_id!: string;

    company?: Company;
    location?: Location;
}