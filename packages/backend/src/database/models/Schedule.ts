import { WeekDay } from "@bk-scheduling/common";
import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface Schedule {
    _id: string,
    owner: string,
    name: string,
    intervalsPerDay: number,
    timeIntervalInMinutes: number,
    daysOfWeek: WeekDay[],
}

const scheduleSchema = new Schema<Schedule>({
    _id: String,
    owner: String,
    name: String,
    intervalsPerDay: Number,
    timeIntervalInMinutes: Number,
    daysOfWeek: [],
});

export const Schedules = mongoose.model<Schedule>("schedules", scheduleSchema);
