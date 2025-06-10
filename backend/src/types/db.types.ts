import { User } from '../models/User';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { Schedule } from '../models/Schedule';

export class Database {
	users: User[] = [];
	companies: Company[] = [];
	locations: Location[] = [];
	schedules: Schedule[] = [];
}

export type ModelType = User | Company | Location | Schedule;