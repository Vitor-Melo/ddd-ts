import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            
            yup
            .object()
            .shape({
                name: yup.string().required("Name is required"),
                id: yup.string().required("ID is required")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name
                },
                {
                    abortEarly: false,
                }
            )

        } catch (errors) {
            const err = errors as yup.ValidationError;
            err.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            });
        }
    }
}