import { makeAutoObservable } from "mobx";

export type UserProps = {
    login : string,
    userId : number,
    name : string,
    surname : string,
    avatarUrl : string,
    city : string
}

export default class UserStore {
    user : UserProps | null = null;
    isAuth : boolean = false;

    constructor () {
        makeAutoObservable(this);
    }

    setUser(user : UserProps | null) {
        this.user = user;
    }

    setIsAuth(value : boolean) {
        this.isAuth = value;
    }
}