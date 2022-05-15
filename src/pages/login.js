import React, {useState} from "react";
import Header from "../components/header";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";



const  Login= observer(({isAuth})=>{

    const navigate = useNavigate();
    const isLogin = () => navigate('/taskList');

    const [login, setLogin]=useState("");
    const [password, setPassword]=useState("");

    const handleLogIn=(e)=>{
        e.preventDefault();
    };

    async function userIsLogin (){
        let user={password, login};
        try {
            let result=await fetch('http://93.95.97.34/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );
            console.log(result.status);
            if(result.status !==200 && result.status !==204){
                throw new Error()
            }
            result= await result.json();
            localStorage.setItem("user-info",JSON.stringify(result));
                isLogin();
            isAuth=true
        }
        catch(e) {
                alert("Неверный пароль или логин");
        }

    }

    return (
        <div >
            <Header/>
            <div className="login">
                <form className="login__form" onSubmit={handleLogIn}>
                    <p className="title">Авторизация</p>
                    <div className="login__input">
                        <p className="subtitle">Логин</p>
                        <input
                            className="input__text"
                            placeholder="username@e.mail"
                            required
                            onChange={(e)=>setLogin(e.target.value)}
                        >

                        </input>
                    </div>
                    <div className="login__input">
                        <p className="subtitle">Пароль</p>
                        <input
                            className="input__text"
                            type="password"
                            placeholder="*******"
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <button
                        type="submit"
                        onClick={userIsLogin}
                        >
                            Вход
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
});

export default Login