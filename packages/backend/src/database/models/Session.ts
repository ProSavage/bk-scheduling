import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface Session {
      _id: string,
      token: string,
      user: string,
}

const sessionSchema = new Schema<Session>({
      _id: String,
      token: String,
      user: String
});

export const Sessions = mongoose.model<Session>("sessions", sessionSchema);
