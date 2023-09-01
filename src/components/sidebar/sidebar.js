import React, { useState } from "react";
import './sidebar.scss'
import FavoriteList from "./favorite-list/favorite-list";
import { useDispatch, useSelector } from "react-redux";
import { page_set } from "../../reducers/pageSlice";

import AddBook from "../modals/add-book";




 const Sidebar =()=>{
    const [isOpened , setOpened] = useState(false);
    const [addModalVisibility, setAddModalVisibility] = useState(false);

    const dispatch = useDispatch();

    const page = useSelector(state=> state.page.value.page);

    const data = useSelector(state=>state.data.value);

    const toggleOpened= ()=>{
        setOpened(!isOpened);
    }

    return (
        <div className={`sidebar ${isOpened ?'sidebar--open': ''}`}>
            <AddBook 
                closeModal={()=>{setAddModalVisibility(false)}}
                isActive={addModalVisibility}/> 
                
            <div onClick={toggleOpened} className="sidebar__menu sidebar__icon">
                <i className="bi bi-list"></i>
                <div className="sidebar__opened-text">Notate</div>
            </div>

            <div onClick={()=>{
                if(page===0){
                    setAddModalVisibility(true)
                }
                else{
                    dispatch(page_set(0));
                    
                }
            }} className="sidebar__logo sidebar__icon">
                <i className={`bi bi-${page ===0 ? 'file-earmark-plus' : 'house-fill'}`}></i>
                <div className="sidebar__opened-text">{page ===0 ?'Створити' : 'Додому'}</div>
            </div>

            <div className="sidebar__list">
                <FavoriteList data={data}/>
            </div>
            
            <div onClick={()=>{dispatch(page_set(2));}} className="sidebar__settings sidebar__icon">
                <i className="bi bi-gear"></i>
                <div className="sidebar__opened-text">Налаштування</div>
            </div>
            
        </div>
    )
}
export default Sidebar;