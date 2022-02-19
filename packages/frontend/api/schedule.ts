import { WeekDay } from "@bk-scheduling/common";
import { axiosClient } from "./axios";

export const schedule = {
    async newSchedule(name: string, intervalsPerDay: number, timeIntervalInMinutes: number, daysOfWeek: string[]) {
        return (await axiosClient.post("/schedule/new", {
            name,
            intervalsPerDay,
            timeIntervalInMinutes,
            daysOfWeek
        })).data;
    }
};