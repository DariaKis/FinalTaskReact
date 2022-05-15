import {makeAutoObservable} from "mobx";
import {editUser, getUsersByPage} from "./api";

export class UsersStore {

    allUsers = [];
    total=0;
    limit=0;
    page=0;


    constructor(page = 0,limit=0) {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });
        this.page = page;
        this.limit = limit;
        this.fetch(page,limit);
    }

    get getAllUsers(){
        return this.allUsers
    }
    *setPage(page) {
        this.page =page;
        yield this.fetch(this.page,this.limit);
    }
    get countPage(){
        return Math.ceil(this.total/this.limit);
    }
    *editUser(data) {
        yield editUser(data);
        yield this.fetch(this.page,this.limit);
    }

    * fetch(page,limit) {
            const response = yield getUsersByPage(page, limit);
            yield this.allUsers = response.data;
            yield this.total = response.total;
    }

}

