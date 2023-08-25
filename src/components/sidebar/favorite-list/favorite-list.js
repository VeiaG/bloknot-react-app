import React from "react";
import './favorite-list.scss'
import FavoriteItem from "../favorite-item/favorite-item";
import { useDispatch } from "react-redux";
import {page_set, bookItems_set} from "../../../reducers/pageSlice";
import CacheService from "../../../services/CacheService";
const service = new CacheService();
const FavoriteList =({data}) => {
    const dispatch = useDispatch();
    const dataFavorite = data.filter(item => item.favorite).sort((a,b)=>{
        const dateA = a.favoriteDate;
        const dateB = b.favoriteDate;
        return dateA < dateB ? 1 : -1;
    });
    
    return <div className="favorite-list">
        {dataFavorite.map(item=>{
            return (<FavoriteItem 
                        onClick={()=>{
                            
                            dispatch(page_set(1));
                            service.notes_get(item.id).then(result =>{
                                dispatch(bookItems_set({
                                    id:item.id,
                                    name: item.text,
                                    items:result 
                                }));
                            })
                            
                        }} 
                        key={item.id} 
                        {...item}/>)
        })}
    </div>
}
export default FavoriteList;