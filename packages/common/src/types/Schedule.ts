import { WeekDay } from "../WeekDay";

export interface Schedule {
    _id: string,
    owner: string,
    name: string,
    intervalsPerDay: number,
    timeIntervalInMinutes: number,
    daysOfWeek: WeekDay[],
}
