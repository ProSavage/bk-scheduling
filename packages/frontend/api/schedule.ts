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
    },
    async getSchedules() {
        return (await axiosClient.get("/schedule")).data;
    },
    async getSchedule(id: string) {
        return (await axiosClient.get(`/schedule/${id}`)).data;
    },
    async getScheduleRoster(id: string) {
        return (await axiosClient.get(`/schedule/${id}/roster`)).data;
    },
    async deleteSchedule(id: string) {
        return (await axiosClient.delete(`/schedule/${id}`)).data;
    }
};