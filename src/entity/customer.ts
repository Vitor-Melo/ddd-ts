class Customer {

    _id: string;
    _name: string;
    _address: string;
    _active: boolean = true;

    constructor(id: string, name:string, address:string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    changeName(name: string) {
        this._name = name
    }

    activate() {
        this._active = true
    }

    desactivate() {
        this._active = false
    }

}