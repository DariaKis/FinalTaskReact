import Header from "../components/header";
import React, {useEffect, useState} from "react";
import Modal from "../components/Modal";
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react";
import {UsersStore} from "../store/storeUsers";
import {TasksStore} from "../store/storeTasks";
import Footer from "../components/footerTasks";
import {CommentsStore} from "../store/storeComments";


const  User=observer(()=>{

    const {id}=useParams();
    const [modalVisible, setModalVisible]=useState(false);
    const userInfo=JSON.parse(localStorage.getItem('user-info'));
    const [users,] = useState(()=>{return new UsersStore(0,0)});
    const [comments,] = useState(()=>{ return new CommentsStore(id)});
    const [tasks,] = useState(()=>{return new TasksStore()});
    useEffect(()=>{
        tasks.setAssignedUsers([id]);
        tasks.fetch();
    },[]);


    const {getAllTasks}=tasks;

    if(users.getAllUsers.length ===0){
        return (<div></div>);
    }
    let user = users.getAllUsers.find(item => item.id === id);


    return (
        <div>
            <Header/>
            <div className="container">
                <div className="board">
                    <div className="board__header">
                        <div className="task_header">
                            <h1 className="nameOfTask">
                                {user.username}
                            </h1>
                        </div>
                        <div>
                            <Link to={`/createTask/userId/${id}`} className="take__to__work" >Добавить задачу</Link>
                            {userInfo.id===id && <button className="edit__task" onClick={()=>setModalVisible(true)}>Редактировать</button> }
                        </div>
                    </div>
                    <div className="task__wrapper">
                            <div className="user">
                                <img className="userIcon" src={require('../scss/img/icon.png')}/>
                                <h2 className="aboutTitle">
                                    О себе:
                                </h2>
                                <h2 className="aboutSubtitle">
                                    {user.about}
                                </h2>
                            </div>
                            <div className="about__tasks">
                                <h2 className="taskTitle">Задачи</h2>
                                <div className="about__board">
                                    {getAllTasks.map(task=>
                                    <Link to={`/task/${task.id}`} className="about__wrapper" key={task.id}>
                                        <div className="task__check">
                                            {task.type==="task" && <img src={require('../scss/img/Task.png')}/>}
                                            {task.type==="bug" && <img src={require('../scss/img/Bug.png')}/>}
                                        </div>
                                        <div className="bodyTask">
                                            {task.title}
                                        </div>
                                        <div className="statusTask">
                                                {task.status==="opened" && <button className="openedBtn">Открыта</button>}
                                                {task.status==="testing" && <button className="testingOrInProgressBtn">Тестирование</button>}
                                                {task.status==="complete"  && <button className="completeBtn">Выполнено</button>}
                                                {task.status==="inProgress" && <button className="testingOrInProgressBtn">В работе</button>}
                                        </div>
                                        <div className="wrapper">
                                            {task.rank==="high" && <div className="task__highRank"><img className="arrowIcon" src={require('../scss/img/high.png')}/>Высокий</div>}
                                            {task.rank==="medium" && <div className="task__mediumRank"><img className="arrowIcon" src={require('../scss/img/medium.png')}/>Средний</div>}
                                            {task.rank==="low" && <div className="task__lowRank"><img className="arrowIcon" src={require('../scss/img/low.png')}/>Низкий</div>}

                                        </div>
                                    </Link>
                                    )}
                                </div>
                                <Footer tasks={tasks}/>
                            </div>
                      <Modal  visible={modalVisible} setVisible={setModalVisible} users={users} comments={comments} tasks={tasks}/>
                    </div>

                    </div>
                </div>
            </div>

    )});

export default User;