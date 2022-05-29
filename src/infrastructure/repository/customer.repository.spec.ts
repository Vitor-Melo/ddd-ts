import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
        customer.Address = address;

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zipCode,
            city: address.city
        });

    });

    it("should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
        customer.Address = address;

        await customerRepository.create(customer);

        customer.changeName('Vitor Melo');
        
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zipCode,
            city: address.city
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find("123");

        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("12312312");
        }).rejects.toThrow("Customer not found");
    });

    // it("should find all products", async() => {
// 
    // });

});