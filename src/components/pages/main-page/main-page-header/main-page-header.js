import React from "react";
const MainPageHeader = ()=>{
    return (
        <div className="main-page__header">

            <div className="main-page__search-input">
            <i className="bi bi-search"></i>
                <input type="text" name="search" id="" placeholder="Пошук" autoComplete="off"/>
            </div>
            
            <div className="main-page__btn">
                <i className="bi bi-grid"></i>
            </div>

            <div className="main-page__btn">
                <i className="bi bi-columns"></i>
            </div>

            <div className="main-page__btn">
                <i className="bi bi-three-dots"></i>
            </div>
        </div>
    )
}
export default MainPageHeader;