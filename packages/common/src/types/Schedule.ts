import { WeekDay } from "../WeekDay";

export interface ScheduleTime {
    hour: number,
    minute: number
}
export interface Schedule {
    _id: string,
    owner: string,
    name: string,
    intervalsPerDay: number,
    timeIntervalInMinutes: number,
    startTime: ScheduleTime,
    daysOfWeek: WeekDay[],
}
