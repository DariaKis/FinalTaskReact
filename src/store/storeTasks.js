import {makeAutoObservable} from "mobx";
import {addTask, addTaskStatus, addTaskTime, deleteTask, getAllTasks, getTaskById} from "./api";

export class TasksStore {

    allTasks = [];

    filter={
    query: "",
    assignedUsers: [],
    userIds: [],
    type: [],
    status: [],
    rank: []
    };
    page=0;
    total=0;
    limit=10;

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });
    }
    get getAllTasks() {
        return this.allTasks;
    }


    *setQuery(query) {
        this.filter.query =query;
    }
    *setAssignedUsers(assignedUsers) {
        this.filter.assignedUsers =assignedUsers;
    }

     *setType(type) {
       yield this.filter.type =type;
    }
    *setStatus(status) {
        this.filter.status =status;
    }
    *setRank(rank) {
        this.filter.rank =rank;
    }
    *setPage(page) {
        this.page =page;
        yield this.fetch();
    }
    get countPage(){
        return Math.ceil(this.total/this.limit);
    }

    * fetchById(id) {
        const response = yield getTaskById(id);
        this.total=1;
        this.allTasks = [response];

    }


    * fetch() {
        const response = yield getAllTasks(this.filter,this.page);
        this.total=response.total;
        this.allTasks = response.data;

    }


    *addTask(data) {
        yield addTask(data);
        yield this.fetch();
    }
    *addTaskTime(id,data) {
        yield addTaskTime(id,data);
        yield this.fetchById(id);
    }
    *addTaskStatus(id,editStatus){
        yield addTaskStatus(id,editStatus);
        yield this.fetch()
    }
    *addTaskStatusById(id,editStatus){
        yield addTaskStatus(id,editStatus);
        yield this.fetchById(id);
    }

    *deleteTask(id) {
        yield deleteTask(id);
        yield this.fetch();
    }


}
