import React, { useState } from "react";
import './sidebar.scss'
import FavoriteList from "./favorite-list/favorite-list";
import { useDispatch, useSelector } from "react-redux";
import list from '../icon-name-list/icon-name-list'
import { book_add,book_remove} from '../../reducers/dataSlice'

const getRandomColor = ()=>{
    return Math.floor(Math.random()*16777215).toString(16);
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const getRandomIcon = ()=>{
    return list[Math.floor(Math.random()*list.length)];
}

 const Sidebar =()=>{
    const [isOpened , setOpened] = useState();

    const dispatch = useDispatch()
    const data = useSelector(state=>state.data.value);

    const addTest=()=>{
        const newBook={
                id:crypto.randomUUID(),
                color:`#${getRandomColor()}`, 
                iconName:getRandomIcon(),
                text:makeid(10),
                description:makeid(20)
        }
        dispatch(book_add(newBook));
    }
    const removeTest=()=>{
        dispatch(book_remove());
    }
    const toggleOpened= ()=>{
        setOpened(!isOpened);
    }

    return (
        <div className={`sidebar ${isOpened ?'sidebar--open': ''}`}>
            
            <div onClick={toggleOpened} className="sidebar__menu sidebar__icon">
                <i className="bi bi-list"></i>
                <div className="sidebar__opened-text">Блокнот</div>
            </div>

            <div onClick={addTest} className="sidebar__logo sidebar__icon">
                <i className="bi bi-file-earmark-plus"></i>
                <div className="sidebar__opened-text">Створити</div>
            </div>

            <div className="sidebar__list">
                <FavoriteList data={data}/>
            </div>
            
            <div onClick={removeTest} className="sidebar__settings sidebar__icon">
                <i className="bi bi-gear"></i>
                <div className="sidebar__opened-text">Налаштування</div>
            </div>
        </div>
    )
}
export default Sidebar;