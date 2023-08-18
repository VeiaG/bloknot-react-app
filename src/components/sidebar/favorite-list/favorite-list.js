import React from "react";
import './favorite-list.scss'
import FavoriteItem from "../favorite-item/favorite-item";

const FavoriteList =({data}) => {
    return <div className="favorite-list">
        {data.map(item=>{
            return (<FavoriteItem 
                    text={item.text} 
                    key={item.id} 
                    color={item.color} 
                    iconName={item.iconName}/>)
        })}
    </div>
}
export default FavoriteList;