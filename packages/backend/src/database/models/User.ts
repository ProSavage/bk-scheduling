import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "@bk-scheduling/common"


const userSchema = new Schema<User>({
    _id: String,
    email: String,
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    schedules: [String]
});

export const Users = mongoose.model<User>("users", userSchema);
