import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const {pathname}=useLocation();
    return (
        <div className="navbar">
                <div className="navbar__links">
                    <Link className={`link ${pathname==="/taskList" && 'link-active'}`} to="/taskList">Задачи</Link>
                    <Link className={`link ${pathname==="/users" && 'link-active'}`} to="/users">Пользователи</Link>
                </div>
        </div>

    );
};

export default Navbar;
