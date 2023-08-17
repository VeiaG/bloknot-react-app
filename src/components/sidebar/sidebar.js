import React, { Component } from "react";
import './sidebar.scss'
import FavoriteList from "./favorite-list/favorite-list";

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

export default class Sidebar extends Component {
    state={
        data : [],
        isOpened : false
    }
    addTest=()=>{
        this.setState({
                data: [ ...this.state.data ,
                    {
                        color:`#${getRandomColor()}`, 
                        iconName:'c-circle-fill',
                        text:makeid(10)
                    }
                ]
            })
    }
    removeTest=()=>{
        this.setState({
                data:[...this.state.data].slice(0,-1)
        })
    }
    toggleOpen = ()=>{
        this.setState({
            isOpened: !this.state.isOpened
        })
    }
    render(){
        return <div className={`sidebar ${this.state.isOpened ?'sidebar--open': ''}`}>
            
            <div onClick={this.toggleOpen} className="sidebar__menu sidebar__icon">
                <i className="bi bi-list"></i>
                <div className="sidebar__opened-text">Блокнот</div>
            </div>

            <div onClick={this.addTest} className="sidebar__logo sidebar__icon">
                <i className="bi bi-file-earmark-plus"></i>
                <div className="sidebar__opened-text">Створити</div>
            </div>

            <div className="sidebar__list">
                <FavoriteList isOpened={this.state.isOpened} data={this.state.data}/>
            </div>
            
            <div onClick={this.removeTest} className="sidebar__settings sidebar__icon">
                <i className="bi bi-gear"></i>
                <div className="sidebar__opened-text">Налаштування</div>
            </div>
        </div>
    }
}