import { auth } from "./auth";
import { schedule } from "./schedule";

export const API = {
    auth: auth,
    schedule: schedule
}

export interface ValidationError {
    param: string;
    msg: string;
    value: string,
    location: string
}
export const transformValidationErrorsForForm = (errors: ValidationError[]): any => {
    return errors.reduce((errorsObject, element) => {
        errorsObject[element.param] = element.msg
        return errorsObject
    }, {} as Record<string, string>);
}