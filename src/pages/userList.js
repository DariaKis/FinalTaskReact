import React, {useState, useEffect} from "react";
import Header from "../components/header";
import {Link, useNavigate} from "react-router-dom";
import {UsersStore} from "../store/storeUsers";
import {observer} from "mobx-react";
import UserFooter from "../components/footerUser";


const  UserList=observer(({isAuth})=>{
    const [users,] = useState(new UsersStore(0,10));
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
    }, []);

    const {getAllUsers}=users;

    return (
        <div>
            <Header/>

            <div className="container">
                <div className="board">
                    <h1>Пользователи</h1>
                    <div className="users__wrapper">
                        <div className="userList" >
                            {getAllUsers.map(user =>
                            <Link to={`/user/${user.id}`} className="userList__item" user={user} key={user.id} >
                                {user.username}
                            </Link>

                                )}
                        </div>
                        <UserFooter users={users}/>
                    </div>
                 </div>
            </div>
        </div>
    )
});

export default UserList;