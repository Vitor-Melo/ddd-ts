import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product",
    price: 10
}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {

    it("should create a product", async() => {
        const productRepostory = mockRepository();
        const productUseCase = new CreateProductUseCase(productRepostory);

        const output = productUseCase.execute(input);

    })
});