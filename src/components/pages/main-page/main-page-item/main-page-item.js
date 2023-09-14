import React from "react";
import {useDispatch} from 'react-redux';
import {book_toggle_favorite} from '../../../../reducers/dataSlice';
import { contextMenu } from "react-contexify";
const MainPageItem = ({ onClick,onContextMenu ,color,text,description,iconName,favorite,id,disableToggle = false})=>{
    
    const dispatch = useDispatch();

    const toggleFavorite= (e)=>{
        if(e) e.stopPropagation();
        if(!disableToggle) dispatch(book_toggle_favorite(id));
    }
    
    return <div 
                onClick={()=>{
                    if(!disableToggle)
                    onClick();
                }}
                onContextMenu={(e)=>{
                    if(!disableToggle) 
                        onContextMenu(e,{
                            id:id,
                            isFavorite: favorite,
                            toggleFavorite})
                }}
                className="main-page__item">
        
            <i className={`main-page__item-icon bi bi-${iconName}`} style={{color}}></i>
       <div className="main-page__text-wrapper">
        <div className="main-page__item-title">
                {text}
            </div>
            <div className="main-page__item-description">
                {description}
            </div>
       </div>
        <div onClick={toggleFavorite} className="main-page__item-favorite-btn">
            <i className={`bi bi-star${favorite ? '-fill':''}`}></i>
        </div>
        <div onClick={(e)=> {
                e.stopPropagation();
                onContextMenu(e,{
                    id:id,
                    isFavorite: favorite,
                    toggleFavorite})
            }}
            className="main-page__item-menu-btn">
            <i className="bi bi-three-dots"></i>
        </div>
    </div>
}
export default MainPageItem;