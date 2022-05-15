import React, { useState} from 'react';
import {useParams} from "react-router-dom";
import {CommentsStore} from "../store/storeComments";
import {observer} from "mobx-react";


const Comment=observer(({tasks,users,comments})=>{
    const {getAllTasks}=tasks;
    const {getAllUsers}=users;
    const{id}=useParams();
    let task = getAllTasks.find(item => item.id === id);
    const userInfo=JSON.parse(localStorage.getItem('user-info'));
    const [comment, setComment]=useState(
        {
            taskId: task.id,
            userId: userInfo.id,
            text: ""
        }
    );
    if(comments.allComments === undefined){
        return (<div></div>);
    }

    const handleFieldChange = (evt ) => {
        const { name, value} = evt.target;
        setComment({...comment, [name]: value});
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
    };
    const handleToAddComment= (evt)=>{
        evt.preventDefault();
        comments.addComment(
            comment
        );
        setComment({
            taskId: task.id,
            userId: userInfo.id,
            text: ""
        });

    };

    const handleToDelete=(evt)=>{
        evt.preventDefault();
        comments.deleteComment(evt.target.value);
    };

    return (
        <div className="comment__task">
            <div className="comment__form">
                <p>Комментарий ({comments.allComments.length})</p>
                <textarea
                    type="text"
                    name="text"
                    id="text"
                    onChange={handleFieldChange}
                    value={comment.text}
                >
                </textarea>
                <button onClick={handleToAddComment}>Добавить комментарий</button>
            </div>
            {comments.getAllComments.map(commentItem=>
                <div className="comment__wrapper" key={commentItem.id}  >
                    <div className="comment__body" >
                        <div className="comment__author"> {getAllUsers.find(x=>x.id===commentItem.userId).username}</div>
                        <div className="comment" >{commentItem.text} </div>
                    </div>
                    {commentItem.userId === userInfo.id &&
                    <button onClick={handleToDelete} value={commentItem.id}>Удалить</button>
                    }
                </div>
           )}
        </div>
    )
});

export default Comment;