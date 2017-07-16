import {Severity} from "./Severity.type";
export interface Message {
    severity: Severity;
    msg: string;
}