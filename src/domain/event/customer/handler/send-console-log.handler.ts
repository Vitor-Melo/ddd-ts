import EventHandlerInterface from "../../@shared/event-handler.interface";
import eventInterface from "../../@shared/event.interface";
import ChangeAddressEvent from "../change-address-event";

export default class SendConsoleLogHandler implements EventHandlerInterface<ChangeAddressEvent> {
    handle(event: eventInterface): void {
        console.log(
            `Endereço do cliente: ${ event.eventData.id }, ${ event.eventData.name } ` 
            + `alterado para: ${ event.eventData.address.toString() }`
        );
    }
}