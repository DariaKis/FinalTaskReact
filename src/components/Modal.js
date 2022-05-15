import React, {useState} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {observer} from "mobx-react";



const Modal=observer(({visible, setVisible, users,comments,tasks})=>{
    const{id}=useParams();
    const{pathname}=useLocation();
    const userInfo=JSON.parse(localStorage.getItem('user-info'));

    const [editUser, setEditUser]=useState({
        name:userInfo.username,
        img: userInfo.photoUrl,
        about:userInfo.about
    });
    const handleFieldChangeUser = (evt ) => {
        const { name, value} = evt.target;
        setEditUser({...editUser, [name]: value});
    };

    const [timeCounter, setTimeCounter]=useState({
        value:10,
        quantity: "minutes",
        comment:""
    });
    const handleFieldChangeTask = (evt ) => {
        const { name, value} = evt.target;
        setTimeCounter({...timeCounter, [name]: value});
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };


let timeInMinutes=()=>{
    if(timeCounter.quantity==="hours"){
        return timeCounter.value*60
    }else if(timeCounter.quantity==="minutes"){
        return timeCounter.value
    }else{
        return timeCounter.value*1440
    }
};


    const handleToAddTime=(evt)=>{
        evt.preventDefault();
        tasks.addTaskTime(id,{
            timeInMinutes:timeInMinutes(timeCounter),
            comment:timeCounter.comment,
            currentUser: userInfo.id
        });
        setVisible(false);
        setTimeout(()=>{
            comments.fetch();
        },1000);

    };

    const handleToEditUser=(evt)=>{
        evt.preventDefault();
        users.editUser({
            id:userInfo.id,
            login: userInfo.login,
            username: editUser.name,
            about: editUser.about,
            photoUrl: editUser.img,
            password: "123"
        });
        setVisible(false);

    };

    return(
        <div className={visible? "modal__active" : "modal"} onClick={()=>setVisible(false)}  onSubmit={handleSubmit}>
            <div className="modal__wrapper" onClick={e=> e.stopPropagation()}>
                <h2 className="modal__title">{pathname.substr(0, 5)==="/task" ? "Запись о работе" :"Редактирование пользователя"  }</h2>
                {pathname.substr(0, 5)==="/task"?
                    <div className="body">
                        <div className="body__field">
                            <h4>Затрачченное время</h4>
                            <input
                                name="value"
                                id="value"
                                type="number"
                                onChange={handleFieldChangeTask}
                                defaultValue={timeCounter.value}
                            >
                            </input>
                        </div>
                        <div className="body__field">
                            <h4>Единица измерения</h4>
                             <select name="quantity"
                                     id="quantity"
                                     defaultValue={timeCounter.quantity}
                                     onChange={handleFieldChangeTask}
                             >
                                <option value="days">Дней</option>
                                <option value="hours">Часов</option>
                                <option value="minutes">Минут</option>
                             </select>
                        </div>
                        <div className="body__field">
                            <h4>Комментарий</h4>
                            <textarea
                                className="aboutInfo"
                                name="comment"
                                id="comment"
                                type="text"
                                onChange={handleFieldChangeTask}
                                defaultValue={timeCounter.comment}
                            >
                            </textarea>
                        </div>
                    </div>
                    :
                    <div className="body">
                        <div className="body__field">
                            <h4>Имя пользователя</h4>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                defaultValue={editUser.name}
                                onChange={handleFieldChangeUser}
                            >
                            </input>
                        </div>
                        <div className="body__field">
                            <h4>URL фотографии</h4>
                            <input
                                name="img"
                                id="img"
                                defaultValue={editUser.img}
                                onChange={handleFieldChangeUser}
                            >
                            </input>
                        </div>
                        <div className="body__field">
                            <h4>О себе</h4>
                            <textarea
                                name="about"
                                id="about"
                                className="aboutInfo"
                                type="text"
                                defaultValue={editUser.about}
                                onChange={handleFieldChangeUser}
                            >
                            </textarea>
                        </div>
                    </div>
                }
                <div className="modal__footer">
                    {pathname.substr(0, 5)==="/task"
                        ?
                        <button className="purpleBtn" onClick={handleToAddTime}> Добавить</button>
                        :
                        <button className="purpleBtn" onClick={handleToEditUser} > Сохранить</button>
                    }
                        <button className="greyBtn" onClick={()=>setVisible(false)}>Отмена</button>
                </div>
            </div>
        </div>

    )});

export default Modal
