import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name:string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate(): void {
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }

        if (this._id.length === 0) {
            throw new Error('ID is required')
        }
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string): void {
        this._name = name
        this.validate()
    }

    activate(): void {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    isActivate(): boolean {
        return this._active;
    }

    set Address(address: Address) {
        this._address = address;
    }

    desactivate(): void {
        this._active = false
    }
}