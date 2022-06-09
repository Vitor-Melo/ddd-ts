import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123"
}

const product = {
    id: "123",
    name: "Product 1",
    price: 10
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find product", () => {

    it("should find a product", async () => {
        const productRepository = mockRepository();
        const productUseCase = new FindProductUseCase(productRepository);

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    })
});