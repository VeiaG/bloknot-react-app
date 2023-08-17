import React from "react";

const FavoriteItem = ({color ,iconName ,text})=>{
    return <div 
            className="favorite-list__item"><i 
                                            className={`bi bi-${iconName}`}
                                            style={{ color}} ></i>
                <span className="favorite-list__item-text">{text}</span></div>;
}
export default FavoriteItem;