import React from "react";
import Navbar from "./NavBar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";




const  Header= observer(({isAuth})=>{
    const userInfo=JSON.parse(localStorage.getItem('user-info'));
    const {pathname}=useLocation();
    const navigate = useNavigate();

    const loginOut=()=>{
        localStorage.removeItem('user-info');
        isAuth=false;
        if (localStorage.length===0) {
            navigate('/')
        }
    };


        return (

            <div className="header">
                <img src={require('../scss/img/Logo.png')}/>
                {pathname!== "/" &&
                    <div className="headerIsLogin">
                        <Navbar/>
                        <div className="user__info">
                            <h3 className="user__name" >{userInfo.username}</h3>
                            <img className="user__icon" src={require('../scss/img/icon.png')}/>
                            <div className="info">
                                <div className="info__wrapper">
                                    <Link className="linkTo" to={`/user/${userInfo.id}`}>Посмотреть профиль</Link>
                                    <div className="linkTo" onClick={()=>loginOut()} >Выйти из системы</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    });

export default Header