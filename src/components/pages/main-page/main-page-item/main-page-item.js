import React from "react";
const MainPageItem = ({color,text,description,iconName})=>{
    return <div className="main-page__item">
        <i className={`main-page__item-icon bi bi-${iconName}`} style={{color}}></i>
        <div className="main-page__item-title">
            {text}
        </div>
        <div className="main-page__item-description">
            {description}
        </div>
        <div className="main-page__item-favorite-btn">
            <i className="bi bi-star"></i>
        </div>
    </div>
}
export default MainPageItem;