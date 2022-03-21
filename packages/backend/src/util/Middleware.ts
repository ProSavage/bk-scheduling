import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";

export const attachMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    res.failure = (errors: ValidationError[], status?: number) => {
        res.status(status ? status : 200).json({ success: false, errors });
    };
    res.failureWithMessage = (message: string, status?: number) => {
        res.status(status ? status : 200).json({ success: false, failure: message });
    };
    res.failureValidation = (param: string, message: string) => {
        res.status(200).json({ success: false, errors: [{ param, msg: message }] });
    }
    res.success = (data: Object) => {
        res.status(200).json({ success: true, ...data });
    };
    next()
}