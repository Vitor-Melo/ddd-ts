import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public errors: NotificationErrorProps[]) {
        super();
    }
}