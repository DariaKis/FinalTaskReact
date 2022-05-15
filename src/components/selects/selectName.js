import React, {useState} from 'react';
import {observer} from "mobx-react";


const SelectName=observer(({users,tasks})=>{
    const{getAllUsers}=users;

    const[selectedNames,setSelectedNames]=useState(0);

    const handleInputChange =  (evt ) => {
        let selectName=document.getElementsByClassName('user__select__input');
        const typeIds=[];

        if(selectName===null) {
            return
        }
        for(let item of selectName) {
            if (item.checked) {
                typeIds.push(item.id)
            }
        }
        tasks.setAssignedUsers(typeIds);
        setSelectedNames(typeIds.length)
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

function selectedQuantity(){
    if(selectedNames===0){
        return "Пользователь"
    }else if(selectedNames===getAllUsers.length){
        return "Выбрано: все"
    }else {
        return "Выбрано: "+`${selectedNames}`
    }
}


    return(
        <form onSubmit={handleSubmit}>
            <div className="resetName">
                <div className="input__title">{selectedQuantity()}</div>
                <div className="arrow"></div>
            </div>
            <div className="__select">
                <div className="__select__content" >
                    {getAllUsers.map(user =>
                        <div className="__select__wrapper" key={user.id}>
                           <div className="__select__item" >
                                <input
                                    id={user.id}
                                    className="user__select__input"
                                    type="checkbox"
                                    name={user.id}
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor={user.id}
                                    className="__select__label"
                                    >
                                    {user.username}
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
});

export default SelectName;