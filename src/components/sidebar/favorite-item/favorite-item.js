import React from "react";

const FavoriteItem = ({color ,iconName ,text , onClick})=>{
    return <div 
            className="favorite-list__item"
            onClick={onClick}>
                <i 
                    className={`bi bi-${iconName}`}
                    style={{ color}} ></i>
                <span className="favorite-list__item-text">{text}</span>
            </div>;
}
export default FavoriteItem;