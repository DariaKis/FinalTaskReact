import React, {useEffect, useState} from 'react'
import Header from "./header";
import {Link, useParams, useLocation, useNavigate} from "react-router-dom";
import {TasksStore} from "../store/storeTasks";
import {UsersStore} from "../store/storeUsers";
import {observer} from "mobx-react";


const EventTask=observer(()=>{
    const {id,userId}=useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tasks,] = useState(()=>{return new TasksStore()});
    const [users,] = useState(()=>{return new UsersStore(0,0)});
    const {getAllTasks} = tasks;
    const userInfo=JSON.parse(localStorage.getItem('user-info'));
    const {getAllUsers}=users;
    useEffect(()=>{
       if (id){
           tasks.fetchById(id)
       }
    },[]);
    useEffect(()=>{
        let task = getAllTasks.find(item => item.id === id);
        if(task){
            setForm({...form,...task});
        }
    },[tasks.allTasks]);


    const [form, setForm]=useState({
        title: "",
        description: "",
        type: "task",
        rank:"low",
        assignedId:userId?userId:"",
        userId: userInfo.id,
        id:""
    });
    if(users.getAllUsers.length ===0){
        return (<div></div>);
    }
    const handleFieldChange = (evt ) => {
        const { name, value} = evt.target;
        setForm({...form, [name]: value});
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

function  navigateToTaskList() {
    setTimeout(()=>{navigate("/taskList")} , 1000)
}
    const handleToAdd=(evt)=>{
        evt.preventDefault();
        tasks.addTask(
            form
        );
        navigateToTaskList()
    };

    return(
    <div>
        <Header/>
        <div className="container">
            <div className="board">
                <div className="board__header">
                    <div className="task_header">
                        <h1 className="nameOfTask">
                            {pathname==="/createTask" ? "Создание" : "Редактирование"}
                        </h1>
                    </div>
                    <div>
                        <button className="edit__task" onClick={handleToAdd}>Сохранить</button>
                        <Link to="/taskList" className="take__to__work">Отмена</Link>
                    </div>
                </div>

                <div className="task__wrapper" onSubmit={handleSubmit}>
                    <div className="user">
                        <h3 className="itemTitle">Исполнитель</h3>
                        <select
                            name="assignedId"
                                id="assignedId"
                                onChange={handleFieldChange}
                                type="text"
                            disabled={userId?true:false}
                                required
                                defaultValue={form.assignedId}
                        >
                            <option>Не назначено</option>
                            {getAllUsers.map(user =>
                                <option onChange={handleFieldChange} value={user.id} key={user.id} selected={form.assignedId === user.id}>
                                    {user.username}
                                </option>
                            )}
                        </select>
                        <h3 className="itemTitle">Тип запроса</h3>
                        <select
                            name="type"
                            id="type"
                            onChange={handleFieldChange}
                            required
                            defaultValue={form.type}
                        >
                            <option  onChange={handleFieldChange} value="task">Задача</option>
                            <option  onChange={handleFieldChange} value="bug">Ошибка</option>
                        </select>

                        <h3 className="itemTitle">Приоритет</h3>
                        <select
                            name="rank"
                            id="rank"
                            onChange={handleFieldChange}
                            required
                            defaultValue={form.rank}
                        >
                            <option  onChange={handleFieldChange} value="low">Низкий</option>
                            <option  onChange={handleFieldChange} value="medium">Средний</option>
                            <option  onChange={handleFieldChange} value="high">Высокий</option>
                        </select>
                    </div>
                    <div className="about__task__wrapper">
                        <h2 className="taskTitle">Название</h2>
                        <input name="title"
                               id="title"
                               onChange={handleFieldChange}
                               required
                               defaultValue={form.title}
                        >
                        </input>
                        <h2 className="taskTitle">Описание</h2>
                        <textarea name="description"
                               id="description"
                               onChange={handleFieldChange}
                               required
                               defaultValue={form.description}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
});

export default EventTask;

