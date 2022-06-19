import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name:string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
        
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate(): void {
        if (this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "ID is required"
            });
        }

        if (this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            })
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
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

    changeAddress(address: Address): void {
        this._address = address;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points
    }

    desactivate(): void {
        this._active = false
    }
}