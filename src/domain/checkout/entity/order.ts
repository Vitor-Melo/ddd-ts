import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;

        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }

        if (this._customerId.length === 0) {
            throw new Error("customerId is required");
        }

        if (this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than zero");
        }

        return true;
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    set customerId(customerId: string) {
        this._customerId = customerId
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}