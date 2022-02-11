import mongoose from "mongoose";
import { Schema } from "mongoose";

const tokenSchema = new Schema({
      _id: String,
      token: String,
      userEmail: String,
      createdAt: Date,
});

const Token = mongoose.model("tokens", tokenSchema);