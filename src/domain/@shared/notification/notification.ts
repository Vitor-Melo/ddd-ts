export type NotificationError = {
    message: string,
    context: string;
}

export default class Notification {
    private errors: NotificationError[] = [];

    addError(error: NotificationError): void {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }
}