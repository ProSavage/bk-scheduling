import { Schedule } from "..";

export type User = UserInfo & {
    _id: string,
    isAdmin: boolean,
    schedules: Schedule["_id"][]
}

// I made this type for the frontend
// It's just a subset with the minimal data needed to create a user.
export interface UserInfo {
    email: string,
    firstName: string,
    lastName: string,
}