import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123"
}

const product = {
    id: "123",
    name: "Product",
    price: 10
}

describe("Integration test find product", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(new Product(product.id, product.name, product.price));

        const productUseCase = new FindProductUseCase(productRepository);

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});