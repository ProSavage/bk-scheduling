import { NextFunction, Request, Response } from "express";

export const attachMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.failure = (message: string, status?: number) => {
        res.status(status ? status : 400).json({ success: false, error: { message } });
    };
    res.success = (data: any) => {
        res.status(200).json({ success: true, data });
    };
    next()
}