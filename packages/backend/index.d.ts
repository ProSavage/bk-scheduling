import { User } from "./src/database/models/User";
import { Request, Response } from "express";
import { ValidationError } from "express-validator";

declare global {
    declare namespace Express {
        export interface Request {
            user: User;
        }

        export interface Response {
            failureWithMessage: (message: string, status?: number) => void
            failureValidation: (param: string, message: string ) => void
            failure: (errors: ValidationError[], status?: number) => void
            success: (data: any) => void
        }
    }
}
