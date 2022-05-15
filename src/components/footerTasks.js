import React from "react";
import {observer} from "mobx-react";



const Footer=observer(({tasks, ref}) => {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(item => {
        item.addEventListener('click', function() {
            tabs.forEach(elem => elem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    let pages=[];
    for(let i=0; i<tasks.countPage;i++){
        pages.push(i);

    }



    return(
    <div className="card__footer" >
        <div className="tabs">

            <button  className="tabs__btn" disabled={tasks.page===0} onClick={() => tasks.setPage(tasks.page-1)}>Назад</button>
            {pages.map(item=>{
                    return <button className={tasks.page+1===(item+1)?"tab active":"tab"} onClick={() => tasks.setPage(item)} >{item + 1} </button>
                })}
            <button className="tabs__btn" disabled={tasks.page===pages.length-1} onClick={() => tasks.setPage(tasks.page+1)}>Вперед</button>
        </div>
        <div className="showing__list">
            Показано {tasks.page+1}-{tasks.countPage} из {tasks.countPage}
        </div>
    </div>
)
});

export default Footer;