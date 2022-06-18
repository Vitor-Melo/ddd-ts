import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product", () => {

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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        product.changeName("Product Updated");
        product.changePrice(200);

        const output = await productUseCase.execute({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});