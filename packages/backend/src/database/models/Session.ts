import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./User";

export interface Session {
      _id: string,
      token: string,
      user: User["_id"],
}

const sessionSchema = new Schema<Session>({
      _id: String,
      token: String,
      user: String
});

export const Sessions = mongoose.model<Session>("sessions", sessionSchema);
