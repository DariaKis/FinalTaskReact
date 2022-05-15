import React, {useEffect, useState} from 'react'

import {observer} from "mobx-react";


const SelectQuery=observer(({tasks})=>{

    const handleInputChange =  (evt ) => {
        tasks.setQuery(evt.target.value);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="resetTypeText">
                <div className="__select__content__text" >
                    <input
                        className="text__select__input"
                        type="text"
                        name="text"
                        placeholder="Название задачи"
                        onChange={handleInputChange}
                    >
                    </input>
                </div>
            </div>
        </form>
    )
});

export default SelectQuery;