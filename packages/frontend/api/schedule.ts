import { ScheduleTime, User, UserInfo } from "@bk-scheduling/common";
import { axiosClient } from "./axios";

export const schedule = {
    async newSchedule(name: string, intervalsPerDay: number, timeIntervalInMinutes: number, daysOfWeek: string[], startTimeHour: number, startTimeMinute: number) {
        return (await axiosClient.post("/schedule/new", {
            name,
            intervalsPerDay,
            timeIntervalInMinutes,
            daysOfWeek,
            startTimeHour,
            startTimeMinute
        }));
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
    },
    async inviteUserToScheduleRoster(id: string, user: UserInfo) {
        return (await axiosClient.post(`/schedule/${id}/roster/invite`, {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })).data;
    },
    async editScheduleUser(id: string, userId: string, firstName: string, lastName: string) {
        return (await axiosClient.post(`/schedule/${id}/roster/edit`, {
            userId: userId,
            firstName: firstName,
            lastName: lastName
        })).data;
    },
    async deleteUserFromScheduleRoster(id: string, user: User) {
        return (await axiosClient.post(`/schedule/${id}/roster/delete`, { userId: user._id })).data;
    }

};