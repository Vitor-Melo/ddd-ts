import Notification from "../notification/notification";

export default abstract class Entity {
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }
}