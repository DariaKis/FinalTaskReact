import React, {useState} from 'react';
import {observer} from "mobx-react";


const SelectStatus=observer(({tasks})=>{
    const[selectedStatus,setSelectedStatus]=useState(0);

    const handleInputChange =  (evt ) => {
        let selectStatus=document.getElementsByClassName('status__select__input');
        const typeIds=[];

        if(selectStatus===null) {
            return
        }
        for(let item of selectStatus) {
            if (item.checked) {
                typeIds.push(item.id)
            }
        }
        tasks.setStatus(typeIds);
        setSelectedStatus(typeIds.length)
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };
    function selectedQuantityStatus(){
        if(selectedStatus===0){
            return "Статус"
        }else if(selectedStatus==4){
            return "Выбрано: все"
        }else {
            return "Выбрано: "+`${selectedStatus}`
        }
    }



    return(
        <form onSubmit={handleSubmit}>
            <div className="reset">
                <div className="input__title">{selectedQuantityStatus()}</div>
                <div className="arrow"></div>
            </div>
            <div className="__select">

                <div className="__select__content" >
                    <div className="__select__wrapper">
                        <input id="opened" className="status__select__input" type="checkbox"
                               name="opened" onChange={handleInputChange}/>
                        <label htmlFor="opened" className="__select__label">Открыто</label>
                    </div>
                    <div className="__select__wrapper">
                        <input id="inProgress" className="status__select__input" type="checkbox"
                               name="inProgress" onChange={handleInputChange} />
                        <label htmlFor="inProgress" className="__select__label">В работе</label>
                    </div>
                    <div className="__select__wrapper">
                        <input id="testing" className="status__select__input" type="checkbox"
                               name="testing" onChange={handleInputChange}/>
                        <label htmlFor="testing" className="__select__label">Тестирование</label>
                    </div>
                    <div className="__select__wrapper">
                        <input id="complete" className="status__select__input" type="checkbox"
                               name="complete" onChange={handleInputChange}/>
                        <label htmlFor="complete" className="__select__label">Выполнено</label>
                    </div>
                </div>

            </div>
        </form>
    )
});

export default SelectStatus;