import React, {useState, useEffect} from "react";
import Header from "../components/header";
import {Link} from "react-router-dom";
import SelectType from "../components/selects/selectType";
import SelectName from "../components/selects/selectName";
import SelectStatus from "../components/selects/selectStatus";
import SelectRank from "../components/selects/selectRank";
import {observer} from "mobx-react";
import { TasksStore} from "../store/storeTasks";
import {UsersStore} from "../store/storeUsers";
import {useNavigate} from "react-router-dom";
import SelectQuery from "../components/selects/selectQuery";
import Footer from "../components/footerTasks";



const  TaskList= observer(({isAuth})=>{

    const navigate = useNavigate();
    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
        tasks.fetch()
    }, []);

    const [users,] = useState(()=>{return new UsersStore(0,0)});
    const [tasks,] = useState(()=>{return new TasksStore()});
    const {getAllTasks}=tasks;


    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

    const handleToFetch=(evt)=>{
        evt.preventDefault();
        tasks.fetch();
    };
    const handleToDelete=(evt)=>{
        evt.preventDefault();
        tasks.deleteTask(evt.target.id);
    };


    const handleToChangeStatusProgress=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatus(evt.target.id, "inProgress"
        );
    };
    const handleToChangeStatusComplete=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatus(evt.target.id, "complete"
        );
    };
    const handleToChangeStatusOpened=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatus(evt.target.id, "opened"

        );
    };
    const handleToChangeStatusTesting=(evt)=>{
        evt.preventDefault();
        tasks.addTaskStatus(evt.target.id, "testing"
        );
    };



    function isShowForInProgress(status){
        return status==="opened" || status==="testing"
    }
    function  isShowForTesting(status) {
        return status === "inProgress"
    }
    function isShowForOpened(status){
        return status==="inProgress" || status==="complete"|| status==="testing"
    }
    function isShowForComplete(status){
        return status==="opened" ||status==="inProgress"|| status==="testing"
    }

    return (
        <div>
            <Header/>
        <div className="container" onSubmit={handleSubmit}>
            <div className="board">
                <div className="board__header">
                    <h1 className="nameOfTask">????????????</h1>
                    <Link to={`/createTask`} className="addTask">???????????????? ????????????</Link>
                </div>
                <div className="card__wrapper">
                    <div className="filter">
                        <SelectType tasks={tasks}/>
                       <SelectQuery tasks={tasks}/>
                        <SelectName users={users} tasks={tasks} />
                        <SelectStatus tasks={tasks}/>
                        <SelectRank tasks={tasks}/>
                        <button onClick={handleToFetch}>??????????????????</button>
                    </div>
                    <div className="card__task" >
                        {getAllTasks.map(task =>
                       <div  className="task" key={task.id}>
                           <div className="task__check">
                               <div>
                                   {task.type==="task" && <img className="typeImg" src={require('../scss/img/Task.png')}/>}
                                   {task.type==="bug" && <img className="typeImg" src={require('../scss/img/Bug.png')}/>}
                               </div>
                           </div>
                           <Link to={`/task/${task.id}`} className="task__title">
                               {task.title}
                           </Link>
                           <div className="task__user">
                                {task.assignedId===""? "???? ???????????????? ??????????????????????": users.getAllUsers.find(x=>x.id===task.assignedId)?.username}
                           </div>
                           <div className="task__status">

                               {task.status==="opened" && <button className="openedBtn">??????????????</button>}
                               {task.status==="testing" && <button className="testingOrInProgressBtn">????????????????????????</button>}
                               {task.status==="complete"  && <button className="completeBtn">??????????????????</button>}
                               {task.status==="inProgress" && <button className="testingOrInProgressBtn">?? ????????????</button>}

                           </div>
                           <div className="wrapper">
                               {task.rank==="high" && <div className="task__highRank"><img className="userIcon" src={require('../scss/img/high.png')}/>??????????????</div>}
                               {task.rank==="medium" && <div className="task__mediumRank"><img className="userIcon" src={require('../scss/img/medium.png')}/>??????????????</div>}
                               {task.rank==="low" && <div className="task__lowRank"><img className="userIcon" src={require('../scss/img/low.png')}/>????????????</div>}
                           </div>
                           <div className="task__edit">
                               <div className="bar"></div>
                               <div className="bar"></div>
                               <div className="bar"></div>
                               <div className="task__tools">
                                   <div className="tools__wrapper" id={task.id}>
                                       <Link to={`/editTask/${task.id}`} className="tools" >??????????????????????????</Link>
                                       <h4 className="tools" onClick={handleToDelete} id={task.id}>??????????????</h4>
                                       {isShowForInProgress(task.status) &&
                                       <h4 className="tools" id={task.id} onClick={handleToChangeStatusProgress}>?????????? ?? ????????????</h4>
                                       }
                                       {isShowForTesting(task.status) &&
                                       <h4 className="tools" id={task.id} onClick={handleToChangeStatusTesting}>???? ????????????????????????</h4>
                                       }
                                       {isShowForOpened(task.status) &&
                                       <h4 className="tools" id={task.id} onClick={handleToChangeStatusOpened}>??????????????????????</h4>
                                        }
                                       {isShowForComplete(task.status) &&
                                       <h4 className="tools" id={task.id} onClick={handleToChangeStatusComplete}>????????????</h4>}
                                   </div>
                               </div>
                           </div>
                       </div>
                        )}
                    </div>
                    <Footer tasks={tasks}/>
                </div>
            </div>
        </div>
      </div>
    )
});

export default TaskList;