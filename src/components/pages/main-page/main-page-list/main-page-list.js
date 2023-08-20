import React from "react";
import MainPageItem from "../main-page-item/main-page-item";


const MainPageList = ({isColumns,data})=>{
    
    return (
        <div className="main-page__list-wrapper">
            <div  className={`main-page__list${isColumns ? '-columns' : ''}`}>
                {data.map(item=>{
                    return (<MainPageItem key={item.id} {...item}/>)
                })}
            </div>
        </div>
    )
}
export default MainPageList;