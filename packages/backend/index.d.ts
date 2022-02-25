import { User } from "./src/database/models/User";
import { Request, Response } from "express";

declare global {
    declare namespace Express {
        export interface Request {
            user: User;
        }

        export interface Response {
            failure: (message: string, status?: number) => void
            success: (data: any) => void
        }
    }
}
