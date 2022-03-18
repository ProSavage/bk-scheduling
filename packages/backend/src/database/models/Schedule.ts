import { Schedule } from "@bk-scheduling/common";
import mongoose from "mongoose";
import { Schema } from "mongoose";


const scheduleSchema = new Schema<Schedule>({
    _id: String,
    owner: String,
    name: String,
    intervalsPerDay: Number,
    timeIntervalInMinutes: Number,
    
    startTime: {
        hour: Number,
        minute: Number
    },
    daysOfWeek: [],
});

export const Schedules = mongoose.model<Schedule>("schedules", scheduleSchema);
