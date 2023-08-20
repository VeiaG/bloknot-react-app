import React from "react";
const MainPageHeader = ({toggleColumns,onSearch})=>{
    return (
        <div className="main-page__header">

            <div className="main-page__search-input">
            <i className="bi bi-search"></i>
                <input onChange={(e)=>{
                    onSearch(e.target.value);
                }} type="text" name="search" id="" placeholder="Пошук" autoComplete="off"/>
            </div>
            
            <div onClick={()=>toggleColumns(false)} className="main-page__btn">
                <i className="bi bi-grid"></i>
            </div>

            <div onClick={()=>toggleColumns(true)} className="main-page__btn">
                <i className="bi bi-columns"></i>
            </div>

            <div className="main-page__btn">
                <i className="bi bi-three-dots"></i>
            </div>
        </div>
    )
}
export default MainPageHeader;