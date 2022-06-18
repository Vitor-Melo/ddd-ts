import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
    id: "123",
    name: "Product Updated",
    price: 200
}

const product = new Product("123", "Product 1", 10);

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValueOnce(Promise.resolve(product)),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test update a product", () => {

    it("should update a product", async () => {
        const productRepository = mockRepository();
        const productUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUseCase.execute(input);

        expect(output).toEqual(input);
    });
});