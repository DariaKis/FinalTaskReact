import './scss/App.css';
import Login from "./pages/login";
import React from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/appRouter";
import {observer} from "mobx-react";




const App=observer(()=> {

    let isAuth=false;
  return (
     <BrowserRouter>
         {isAuth?  <Login/>:<AppRouter/> }
     </BrowserRouter>

  );
});

export default App;
