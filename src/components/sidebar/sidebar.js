import React, { useState } from "react";
import './sidebar.scss'
import FavoriteList from "./favorite-list/favorite-list";
import { useDispatch, useSelector } from "react-redux";
import { page_set } from "../../reducers/pageSlice";

import { useTranslation } from 'react-i18next';

import AddBook from "../modals/add-book";

import useToggleState from "../../hooks/useToggleState";




 const Sidebar =()=>{
    const [isOpened , toggleOpened] = useToggleState(false);
    const [addModalVisibility, setAddModalVisibility] = useState(false);

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const page = useSelector(state=> state.page.value.page);

    const data = useSelector(state=>state.data.value);
    const closeOnMobile = ()=>{
        const mq = window.matchMedia("(max-width: 735px)");
        if(mq.matches){
            if(isOpened){
                toggleOpened();
            }
        }
    }
    //handlers
    const btnClickHandler =()=>{
       
        if(page===0){
            setAddModalVisibility(true)
            
        }
        else{
            dispatch(page_set(0));
            
        }
        closeOnMobile();
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

            <div onClick={btnClickHandler} className="sidebar__logo sidebar__icon">
                <i className={`bi bi-${page ===0 ? 'file-earmark-plus' : 'house-fill'}`}></i>
                <div 
                className="sidebar__opened-text">
                    {page ===0 ? t('create') : t('home')}</div>
            </div>

            <div className="sidebar__list">
                <FavoriteList data={data} closeOnMobile={()=> closeOnMobile()}/>
            </div>
            
            <div onClick={()=>{dispatch(page_set(2));closeOnMobile();}} 
            className="sidebar__settings sidebar__icon">
                <i className="bi bi-gear"></i>
                <div className="sidebar__opened-text">{t('settings')}</div>
            </div>
            
        </div>
    )
}
export default Sidebar;