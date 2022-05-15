import React, {useState} from 'react'
import {observer} from "mobx-react";


const SelectType=observer(({tasks})=>{
   const[selectedType,setSelectedType]=useState(0);

    const handleInputChange =  (evt ) => {
        let selectType=document.getElementsByClassName('type__select__input');
        const typeIds=[];
        if(selectType===null) {
            return
        }
       for(let item of selectType){
            if(item.checked){
                typeIds.push(item.id)
            }
        }
        tasks.setType(typeIds);
        setSelectedType(typeIds.length)
    };
    function selectedQuantityType(){
        if(selectedType===0){
            return "Тип"
        }else if(selectedType===2){
            return "Выбрано: все"
        }else {
            return "Выбрано: "+`${selectedType}`
        }
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
    };


    return(
        <form onSubmit={handleSubmit}>
            <div className="resetType">
                <div className="input__title">{selectedQuantityType()}</div>
                <div className="arrow"></div>
            </div>
            <div className="__select"  >
                <div className="__select__content" >
                    <div className="__select__wrapper" >
                        <input id="task" className="type__select__input" type="checkbox"
                               name="task"  value="Задача" onChange={handleInputChange}/>
                        <label htmlFor="task"  className ="__select__label" id="task" >Задача</label>
                    </div>
                    <div className="__select__wrapper" >
                        <input id="bug" className="type__select__input" type="checkbox"
                               name="bug" value="Ошибка" onChange={handleInputChange} />
                        <label  htmlFor="bug" className ="__select__label" id="bug">Ошибка</label>
                    </div>
                </div>
            </div>
        </form>
    )
});

export default SelectType;

