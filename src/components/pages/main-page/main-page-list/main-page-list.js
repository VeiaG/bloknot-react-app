import React from "react";
import MainPageItem from "../main-page-item/main-page-item";
import { useSelector } from "react-redux";

const MainPageList = ()=>{
    const data = useSelector(state=>state.data.value);
    return (
        <div className="main-page__list-wrapper">
            <div className="main-page__list">
                {data.map(item=>{
                    return (<MainPageItem key={item.id} {...item}/>)
                })}
            </div>
        </div>
    )
}
export default MainPageList;