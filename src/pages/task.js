import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Modal from "../components/Modal";
import {Link, useNavigate, useParams} from "react-router-dom";
import Comment from "../components/comment";
import { TasksStore} from "../store/storeTasks";
import {observer} from "mobx-react";
import moment from "moment";
import {UsersStore} from "../store/storeUsers";
import {CommentsStore} from "../store/storeComments";



const  Task= observer(()=>{
    const [modalVisible, setModalVisible]=useState(false);
    const [value,]=useState(0);
    const {id}=useParams();
    const navigate = useNavigate();
    const [users,] = useState(()=>{return new UsersStore(0,0)});
    const [comments,] = useState(()=>{return new CommentsStore(id)});
    const [tasks,] = useState(()=>{return new TasksStore()});
    useEffect(()=>{
        tasks.fetchById(id);
    },[]);
    const {getAllUsers}=users;
    const {getAllTasks}=tasks;
    if(getAllTasks.length  === 0 || getAllUsers.length===0){
        return (<div></div>)
    }
    let task = getAllTasks[0];



    const handleToDelete=(evt)=>{
        evt.preventDefault();
        tasks.deleteTask(task.id);
        navigate("/taskList")
    };



    const handleToChangeStatusProgress=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatusById(task.id, "inProgress"
        );
    };
    const handleToChangeStatusComplete=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatusById(task.id, "complete"
        );
    };
    const handleToChangeStatusOpened=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatusById(task.id, "opened"
        );
    };
    const handleToChangeStatusTesting=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatusById(task.id, "testing"
        );
    };



    const arrForHours=["час","часа","часов"];
    const arrForMinutes=["минута","минуты","минут"];

    let hours = Math.trunc(task.timeInMinutes/60);
    let minutes = task.timeInMinutes % 60;
    let hEnding, i,mEnding;
    function getNumEndingHours()
    {
        let iNumber = hours % 100;
        if (hours>=11 && hours<=19) {
            hEnding=arrForHours[2];
        }
        else {
            i = iNumber % 10;
            switch (i)
            {
                case (1): hEnding = arrForHours[0]; break;
                case (2):
                case (3):
                case (4): hEnding = arrForHours[1]; break;
                default: hEnding = arrForHours[2];
            }
        }
        return hEnding;
    }
    function getNumEndingMinutes()
    {
        let iNumber = minutes % 100;
        if (minutes>=11 && minutes<=19) {
            mEnding=arrForMinutes[2];
        }
        else {
            i = iNumber % 10;
            switch (i)
            {
                case (1): mEnding = arrForMinutes[0]; break;
                case (2):
                case (3):
                case (4): mEnding = arrForMinutes[1]; break;
                default: mEnding = arrForMinutes[2];
            }
        }
        return mEnding;
    }
    let isShowForInProgress=task.status==="opened" || task.status==="testing" ;
    let isShowForInTesting=task.status==="inProgress"  ;
    let isShowForOpened=task.status==="inProgress" || task.status==="complete"|| task.status==="testing";
    let isShowForComplete=task.status==="opened" ||task.status==="inProgress"|| task.status==="testing" ;

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="board">
                    <div className="board__header">
                        <div className="task_header">
                            <h1 className="nameOfTask">
                                {task.title}<br/>
                            </h1>
                            {task.status==="opened" && <button className="openedBtn">Открыта</button>}
                            {task.status==="testing" && <button className="testingOrInProgressBtn">Тестирование</button>}
                            {task.status==="complete"  && <button className="completeBtn">Выполнено</button>}
                            {task.status==="inProgress" && <button className="testingOrInProgressBtn">В работе</button>}
                        </div>

                        <div>
                            {isShowForInProgress &&
                                <button className="take__to__work" onClick={handleToChangeStatusProgress}>Взять в работу</button>
                            }
                            {isShowForInTesting &&
                                <button className="take__to__work" onClick={handleToChangeStatusTesting}>На тестирование</button>
                            }
                            {isShowForOpened &&
                                <button className="take__to__work" onClick={handleToChangeStatusOpened}>Переоткрыть</button>
                            }
                            {isShowForComplete &&
                                <button className="take__to__work" onClick={handleToChangeStatusComplete}>Готово</button>
                            }
                            <Link to={`/editTask/${task.id}`} type="button" className="edit__task" >Редактировать</Link>
                            <button className="delete__task" onClick={handleToDelete}>Удалить</button>
                        </div>

                    </div>
                    <div className="task__wrapper">
                        <div className="about__task">
                            <div className="formItem">
                                <h3 className="itemTitle">Исполнитель</h3>
                                <h3 className="itemSubtitle">{getAllUsers.find(x=>x.id===task.assignedId).username}</h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Автор задачи</h3>
                                <h3 className="itemSubtitle">{getAllUsers.find(x=>x.id===task.userId).username}</h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Тип запроса</h3>
                                <h3 className="itemSubtitle">
                                    {task.type==="task" && "Задача"}
                                    {task.type==="bug" && "Ошибка"}
                                </h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Приоритет</h3>
                                <h3 className="itemSubtitle">
                                    {task.rank==="high" && "Высокий"}
                                    {task.rank==="medium" && "Средний"}
                                    {task.rank==="low" && "Низкий"}
                                </h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Дата создания</h3>
                                <h3 className="itemSubtitle">{moment(task.dateOfCreation).format('DD.MM.YY HH:mm')}</h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Дата изменения</h3>
                                <h3 className="itemSubtitle">{moment(task.dateOfUpdate).format('DD.MM.YY HH:mm')}</h3>
                            </div>
                            <div className="formItem">
                                <h3 className="itemTitle">Затрачено времени</h3>
                                <h3 className="itemSubtitle">{hours +" "+getNumEndingHours(hours) +" "+ minutes+ " " +getNumEndingMinutes(minutes)}</h3>
                            </div>
                            <button className="taskBtn" onClick={()=>setModalVisible(true)}>Сделать запись о работе</button>
                        </div>
                        <div className="description__task">
                            <h3 >Описание</h3>
                            <p>
                                {task.description}
                            </p>
                        </div>
                         <Comment tasks={tasks} users={users} comments={comments}/>
                     <Modal visible={modalVisible} setVisible={setModalVisible} value={value} comments={comments} users={users} tasks={tasks} />
                </div>
            </div>
        </div>
    </div>
  )
});

export default Task;