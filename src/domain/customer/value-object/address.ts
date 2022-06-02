export default class Address {

    private _street: string;
    private _number: number;
    private _zipCode: string;
    private _city: string;

    constructor(street: string, number: number, zipCode: string, city: string) {
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error('Street is required');
        }

        if (this._number === 0) {
            throw new Error('Number is required');
        }

        if (this._city.length === 0) {
            throw new Error('City is required');
        }

        if (this._zipCode.length === 0) {
            throw new Error('Zip Code is required');
        }
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    toString(): string  {
        return `${this._street}, ${this._number}, ${this._zipCode}, ${this._city},`
    }
}