import React, {useState} from "react";
import './main-page.scss';
import MainPageHeader from "./main-page-header/main-page-header";
import MainPageList from "./main-page-list/main-page-list";
import { useSelector } from "react-redux";

const MainPage = ()=>{
    const data = useSelector(state=>state.data.value);
    const [searchValue,setSearchValue] = useState('');
    //se
    const search = (items,search)=>{
        if(search.length ===0){
          return items
        }
        return items.filter(item => {
            return item.text.toLowerCase().includes(search.toLowerCase())
                || item.description.toLowerCase().includes(search.toLowerCase())
        });
      }
    const onSearch = (value)=>{
        setSearchValue(value);
    }
    const [isColumns , setColumns] = useState(false);
    return (
        <div className="main-page">
            <div className="main-page__content">
                <MainPageHeader onSearch={onSearch} toggleColumns={setColumns}/>
                <MainPageList  data={search(data,searchValue)} isColumns={isColumns}/>
            </div>
        </div>
    )
}
export default MainPage;