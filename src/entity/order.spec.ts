import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {


    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("ID is required");
        
    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");

    });

    it("should change name", () => {

        let customer = new Customer("123", "John");
        
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");

    });

    it("should activate customer", () => {

        const customer = new Customer("123", "John");
        const address = new Address("Avenida Paulista", 123, "08080890", "São Paulo");
        customer.Address = address;

        customer.activate();

        expect(customer.isActivate()).toBe(true);

    });

    it("should deactivate customer", () => {

        const customer = new Customer("123", "John");
        const address = new Address("Avenida Paulista", 123, "08080890", "São Paulo");
        customer.Address = address;

        customer.desactivate();

        expect(customer.isActivate()).toBe(false);

    });

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            
            const customer = new Customer("123", "John");

            customer.activate();

        }).toThrowError('Address is mandatory to activate a customer');

    });
});