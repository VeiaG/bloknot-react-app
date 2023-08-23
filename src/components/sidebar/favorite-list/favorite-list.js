import React from "react";
import './favorite-list.scss'
import FavoriteItem from "../favorite-item/favorite-item";

const FavoriteList =({data}) => {
    const dataFavorite = data.filter(item => item.favorite).sort((a,b)=>{
        const dateA = a.favoriteDate;
        const dateB = b.favoriteDate;
        return dateA < dateB ? 1 : -1;
    });
    
    return <div className="favorite-list">
        {dataFavorite.map(item=>{
            return (<FavoriteItem key={item.id} {...item}/>)
        })}
    </div>
}
export default FavoriteList;