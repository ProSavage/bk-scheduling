import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface LoginToken {
      _id: string,
      token: string,
      userEmail: string,
      createdAt: Date,
      activated: boolean
}

const tokenSchema = new Schema<LoginToken>({
      _id: String,
      token: String,
      userEmail: String,
      createdAt: Date,
      activated: Boolean
});

export const LoginTokens = mongoose.model<LoginToken>("logintokens", tokenSchema);

export const isExpired = (token: LoginToken): boolean => {
      const now = new Date();
      const createdAt = token.createdAt;
      const diff = now.getTime() - createdAt.getTime();
      const diffMinutes = diff / 1000 / 60;
      return diffMinutes > 15;
}