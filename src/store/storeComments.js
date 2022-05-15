import {makeAutoObservable} from "mobx";
import {addComment, deleteComment, getAllComments} from "./api";

export class CommentsStore {

    allComments = [];
    taskId;


    constructor(taskId) {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });


        this.taskId = taskId;
        this.fetch();
    }

    get getAllComments(){
        return this.allComments
    }




    *setTaskId(id) {
        this.taskId =id;
    }

    *addComment(data) {
        yield addComment(data);
        yield this.fetch();
    }
    *deleteComment(id) {
        yield deleteComment(id);
        yield this.fetch();
    }
    * fetch() {
        const response = yield getAllComments(this.taskId);
        this.allComments = response;
    }

}


