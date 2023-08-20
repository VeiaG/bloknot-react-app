import React from "react";
import './favorite-list.scss'
import FavoriteItem from "../favorite-item/favorite-item";

const FavoriteList =({data}) => {
    const dataFavorite = data.filter(item => item.favorite)
    return <div className="favorite-list">
        {dataFavorite.map(item=>{
            return (<FavoriteItem key={item.id} {...item}/>)
        })}
    </div>
}
export default FavoriteList;