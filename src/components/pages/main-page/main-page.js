import React, {useState} from "react";
import './main-page.scss';
import MainPageHeader from "./main-page-header/main-page-header";
import MainPageList from "./main-page-list/main-page-list";
import { useSelector } from "react-redux";

import useToggleState from '../../../hooks/useToggleState'

const MainPage = ()=>{
    const data = useSelector(state=>state.data.value);
    const [searchValue,setSearchValue] = useState('');
    //default filter
    const [filterId, setFilter] = useState(2);
    //search
    const search = (items,search)=>{
        if(search.length ===0){
          return items
        }
        return items.filter(item => {
            return item.text.toLowerCase().includes(search.toLowerCase())
                || item.description.toLowerCase().includes(search.toLowerCase())
        });
      }
    const filter = (items)=>{
        console.log(items);
        switch(filterId){
            //від А до Я
            case 0 :
                return [...items].sort( (a,b)=>{
                    const titleA= a.text.toLowerCase();
                    const titleB = b.text.toLowerCase();
                    return titleA.localeCompare(titleB);
                });
            //Від Я до А
            case 1:
                return [...items].sort( (a,b)=>{
                    const titleA= a.text.toLowerCase();
                    const titleB = b.text.toLowerCase();
                    return titleB.localeCompare(titleA);
                });
            //Від нового
            case 2:
                return [...items].sort( (a,b)=>{
                    const dateA= a.createDate;
                    const dateB = b.createDate;
                    return dateA > dateB ? 1 : -1;
                });
             //Від старого
            case 3:
                return [...items].sort( (a,b)=>{
                    const dateA= a.createDate;
                    const dateB = b.createDate;
                    return dateA < dateB ? 1 : -1;
                });
            default:return items;
        }
    }
    const onSearch = (value)=>{
        setSearchValue(value);
    }

    const [isColumns , toggleColumns] = useToggleState();


    return (
        <div className="main-page">
            <div className="main-page__content">
                <MainPageHeader 
                    onSearch={onSearch} 
                    toggleColumns={toggleColumns} 
                    isColumns={isColumns}
                    onFilter={setFilter}
                    filterId={filterId}/>
                <MainPageList  data={filter(search(data,searchValue))} isColumns={isColumns}/>
            </div>
        </div>
    )
}
export default MainPage;