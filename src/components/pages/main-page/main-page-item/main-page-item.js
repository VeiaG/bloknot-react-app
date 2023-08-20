import React from "react";
import {useDispatch} from 'react-redux';
import {book_toggle_favorite} from '../../../../reducers/dataSlice';
const MainPageItem = ({color,text,description,iconName,favorite,id,disableToggle = false})=>{
    const dispatch = useDispatch();
    const toggleFavorite= ()=>{
        if(! disableToggle) dispatch(book_toggle_favorite(id));
    }
    return <div className="main-page__item">
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
    </div>
}
export default MainPageItem;