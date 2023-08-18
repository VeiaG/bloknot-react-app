import React from "react";
import Sidebar from "../sidebar/sidebar";
import './app.scss';
import MainPage from "../pages/main-page/main-page";

const App = ()=>{
    return <div className="app">
        <Sidebar/>
        <MainPage/>
    </div>
}
export default App;