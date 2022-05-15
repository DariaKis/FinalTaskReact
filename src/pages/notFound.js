import React from 'react';
import {Link} from "react-router-dom";


const NotFound=()=>{

    return(
        <section className="board">
            <div className="notfound">
                <div className="notfound__wrapper">
                    <h1 className="notfound__title">
                        Ooops...
                    </h1>
                    <h3 className="notfound__subtitle">
                        Sorry, we can`t find that page
                        <h5 className="notfound__subsubtitle">
                            It`s a just 404 Error!
                        </h5>
                    </h3>
                    <Link
                        to="/taskList"
                        className="notfound__btn"
                    >
                        Take me away

                    </Link>
                </div>
            </div>
        </section>
    )
};

export default NotFound;