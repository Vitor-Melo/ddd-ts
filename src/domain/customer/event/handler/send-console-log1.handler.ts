import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import eventInterface from "../../../@shared/event/event.interface";
import CustomerCreatedEvent from "../customer-created-event";

export default class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: eventInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}