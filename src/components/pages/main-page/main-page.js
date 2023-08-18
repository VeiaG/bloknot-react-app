import React from "react";
import './main-page.scss';
import MainPageHeader from "./main-page-header/main-page-header";
import MainPageList from "./main-page-list/main-page-list";


const MainPage = ()=>{
    return (
        <div className="main-page">
            <div className="main-page__content">
                <MainPageHeader/>
                <MainPageList/>
            </div>
        </div>
    )
}
export default MainPage;