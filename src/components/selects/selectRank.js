import React, {useState} from 'react';
import {observer} from "mobx-react";


const SelectRank=observer(({tasks})=>{
    const[selectedRank,setSelectedRank]=useState(0);

    const handleInputChange =  (evt ) => {
            let selectRank=document.getElementsByClassName('rank__select__input');
            const typeIds=[];
            if(selectRank===null) {
                return
            }
            for(let item of selectRank) {
                if (item.checked) {
                    typeIds.push(item.id)
                }
            }
        tasks.setRank(typeIds);
            setSelectedRank(typeIds.length)
    };

    function selectedQuantityRank(){
        if(selectedRank===0){
            return "Приоритет"
        }else if(selectedRank===3){
            return "Выбрано: все"
        }else {
            return "Выбрано: "+`${selectedRank}`
        }
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
    };


    return(
        <form onSubmit={handleSubmit}>
            <div className="reset">
                <div className="input__title">{selectedQuantityRank()}</div>
                <div className="arrow"></div>
            </div>
            <div className="__select">
                <div className="__select__content">
                    <div className="__select__wrapper">
                        <input id="low" className="rank__select__input" type="checkbox"
                               name="low" onChange={handleInputChange} />
                        <label htmlFor="low" className="__select__label">Низкий</label>
                    </div>
                    <div className="__select__wrapper">
                        <input id="medium" className="rank__select__input" type="checkbox"
                               name="medium" onChange={handleInputChange} />
                        <label htmlFor="medium" className="__select__label">Средний</label>
                    </div>
                    <div className="__select__wrapper">
                        <input id="high" className="rank__select__input" type="checkbox"
                               name="high" onChange={handleInputChange} />
                        <label htmlFor="high" className="__select__label" >Высокий</label>
                    </div>
                </div>
            </div>
        </form>
    )
});

export default SelectRank;