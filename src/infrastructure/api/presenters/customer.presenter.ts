import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto): string {
        const xmlOption = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true
        }

        return toXML(
            {
                
            }
        )
    }
}