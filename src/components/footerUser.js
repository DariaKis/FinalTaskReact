
import React from "react";
import {observer} from "mobx-react";


const UserFooter=observer(({users})=> {


    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(item => {
        item.addEventListener('click', function() {
            tabs.forEach(elem => elem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    let pages=[];
    for(let i=0; i<users.countPage;i++){
        pages.push(i)
    }

    return(
        <div className="card__footer">
            <div className="tabs">
                <button className="tabs__btn" disabled={users.page===0} onClick={() => users.setPage(users.page-1)}>Назад</button>
                {pages.map(item=>{
                    return <button id={item.id} className={users.page+1===(item+1)?"tab active":"tab"}  onClick={()=>users.setPage(item)}>{item+1} </button>
                })}
                <button className="tabs__btn" disabled={users.page===pages.length-1} onClick={() => users.setPage(users.page+1)}>Вперед</button>
            </div>
            <div className="showing__list">
                Показано {users.page+1}-{users.countPage} из {users.countPage}
            </div>
        </div>
    )
});

export default UserFooter;