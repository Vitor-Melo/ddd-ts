import ListProductUseCase from "./list.product.usecase"

const input = {}

const product1 = {
    id: "123",
    name: "Product 1",
    price: 10
}

const product2 = {
    id: "456",
    name: "Product 2",
    price: 15
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockRejectedValue([product1, product2]),
        update: jest.fn()
    }
}

describe("Unit test list products", () => {
    
    it("should list products", async () => {
        const productRepository = mockRepository();
        const productUseCase = new ListProductUseCase(productRepository);

        const output = await productUseCase.execute(input)

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
});