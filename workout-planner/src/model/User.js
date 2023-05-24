const UserTypes = {
    USER: 'USER',
    TRAINER: 'TRAINER'
}

class User{
    constructor(id, username, password, type){
        this._id=id;
        this._username = username;
        this._password = password;
        this._type = type;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}


export {UserTypes, User}