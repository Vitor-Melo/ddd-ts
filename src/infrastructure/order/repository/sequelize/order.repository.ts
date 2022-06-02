import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.inteface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async update(entity: Order): Promise<void> {

        entity.items.map(async (item) => {
            await OrderItemModel.update(
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                },
                {
                    where: { id: item.id }
                }
            );
        });
        
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                items: entity.items,
                total: entity.total()
            },
            {
                where: { id: entity.id }
            },
        );
    }
    
    async find(id: string): Promise<Order> {
        let orderModel;
        let items : OrderItem[] = [];

        try {
            orderModel = await OrderModel.findOne({ where: { id }, include: ["items"], rejectOnEmpty: true });
        } catch (error) {
            throw new Error("Order not found");
        }

        orderModel.items.map((item) => {
            items.push(
                new OrderItem(
                    item.id,
                    item.product_id,
                    item.name,
                    item.price,
                    item.quantity
                )
            );
        });

        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            items
        );

        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: OrderItemModel });
        return orderModels.map((orderModel) => 
            new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map((item) => {
                    return new OrderItem(
                        item.id,
                        item.product_id,
                        item.name,
                        item.price,
                        item.quantity
                    )
                })
            )
        );
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{ model: OrderItemModel }]
        });
    }
}