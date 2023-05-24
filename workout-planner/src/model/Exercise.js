class Exercise{
    constructor(id, name, description, userId) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._userId = userId;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}

export default Exercise;