import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {

        try {
            
            yup
            .object()
            .shape({
                id: yup.string().required("ID is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().min(1, "Price must be greater than zero")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                },
                {
                    abortEarly: false,
                }
            )

        } catch (errors) {
            const err = errors as yup.ValidationError;
            err.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product",
                    message: error
                })
            });
        }

    }
}