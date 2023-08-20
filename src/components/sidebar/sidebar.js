import React, { useState } from "react";
import './sidebar.scss'
import FavoriteList from "./favorite-list/favorite-list";
import { useSelector } from "react-redux";

import AddBook from "../modals/add-book";



 const Sidebar =()=>{
    const [isOpened , setOpened] = useState(false);
    const [addModalVisibility, setAddModalVisibility] = useState(false);

    
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
                <div className="sidebar__opened-text">Блокнот</div>
            </div>

            <div onClick={()=>setAddModalVisibility(true)} className="sidebar__logo sidebar__icon">
                <i className="bi bi-file-earmark-plus"></i>
                <div className="sidebar__opened-text">Створити</div>
            </div>

            <div className="sidebar__list">
                <FavoriteList data={data}/>
            </div>
            
            <div onClick={()=>{}} className="sidebar__settings sidebar__icon">
                <i className="bi bi-gear"></i>
                <div className="sidebar__opened-text">Налаштування</div>
            </div>
            
        </div>
    )
}
export default Sidebar;