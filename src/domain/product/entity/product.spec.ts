import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            const product = new Product("", "Product 1", 1200);
        }).toThrow("product: ID is required");
    });

    it("should throw error when name is empty", () => {
        
        expect(() => {
            const product = new Product("1231", "", 1200);
        }).toThrow("product: Name is required");
    });

    it("should throw error when price less than 0", () => {
        
        expect(() => {
            const product = new Product("1231", "Product 1", -1);
        }).toThrow("product: Price must be greater than zero");
    });

    it("should throw error when id and name are empty and price less than 0", () => {
        
        expect(() => {
            const product = new Product("", "", -1);
        }).toThrow("product: ID is required,product: Name is required,product: Price must be greater than zero");
    });

    it("Should change name", () => {
        const product = new Product("123", "Product 1", 1200);
        
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it("Should change price", () => {
        const product = new Product("123", "Product 1", 1200);
        
        product.changePrice(2000);

        expect(product.price).toBe(2000);
    });
});