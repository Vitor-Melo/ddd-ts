import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Route 66", 1, "ZipCode 1", "City 1");
customer.changeAddress(address);

const mockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Route 66", 1, "ZipCode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Route 66",
                city: "City 1",
                number: 1,
                zip: "ZipCode 1"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

});