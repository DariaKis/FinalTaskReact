import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../pages/login";
import TaskList from "../pages/taskList";
import User from "../pages/user";
import UserList from "../pages/userList";
import EventTask from "./eventTask";
import Task from "../pages/task";
import {observer} from "mobx-react";
import NotFound from "../pages/notFound";



const AppRouter = observer(() => {

    return (
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/taskList" element={<TaskList/>} />
            <Route exact path="/task/:id" element={<Task />} />
            <Route path="/editTask/:id" element={<EventTask />} />
            <Route path="/createTask" element={<EventTask/>} />
            <Route path="/createTask/userId/:userId" element={<EventTask/>} />
            <Route exact path="/users" element={<UserList/>} />
            <Route exact path="/user/:id" element={<User/>}/>
            <Route path ="*" element={<NotFound/>}/>
        </Routes>
    );
});

export default AppRouter;

