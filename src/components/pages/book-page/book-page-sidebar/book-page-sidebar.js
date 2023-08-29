import React, {useState} from "react";
import CacheService from "../../../../services/CacheService";
import removeMd from "remove-markdown";

import debounce from "lodash.debounce";

const service = new CacheService();

const BookPageSidebar = ({data , setNote , refreshList , togglePin})=>{
    const [searchValue,setSearchValue] = useState('');
    const dataPinned = data.items && data.items.filter(item => item.isPinned).sort((a,b)=>{
        const dateA = a.pinDate;
        const dateB = b.pinDate;
        return dateA > dateB ? 1 : -1;
    });
    const dataNotPinned = data.items && data.items.filter(item => !item.isPinned);
    const PinSortedData = [...dataPinned, ...dataNotPinned];

    const search = (items,search)=>{
        if(search.length ===0){
          return items
        }
        return items.filter(item => {
            return removeMd(item.content.split('\n', 1)[0]).toLowerCase().includes(search.toLowerCase())
        });
      }

      const HandleSearch = (e)=>{
        console.log('handle');
        setSearchValue(e.target.value);
      }
    
    const debouncedSearch = debounce(HandleSearch,300);

    const renderList = (items )=>{
        return search(items,searchValue).map(item=>{
            return <div 
                key={item.id}
                className="book-page__sidebar-item"
                onClick={()=>setNote(item.id)}>
                    <span className="book-page__sidebar-item-text">
                    {removeMd(item.content.split('\n', 1)[0])  ||  'Новий запис..'}
                    </span>
                <i 
                    onClick={(e)=>{
                        e.stopPropagation();
                        togglePin(item.id)
                    }}
                    className={`bi bi-pin${item.isPinned ? '-fill' :''}`}></i>
                
            </div>
    })}
    return <div className="book-page__sidebar">
        <div className="book-page__sidebar-header">
            <span className="book-page__sidebar-header-text">
                {data.name}
            </span>
            <i onClick={()=>{
                const newId = crypto.randomUUID();
                service.notes_add(data.id,{
                    id:newId,
                    content: '',
                    pinDate: Date.now(),
                    isPinned:false,
                }).then(()=>{
                    refreshList()
                })
                
            }} 
                className="bi bi-plus-square"></i>
        </div>
            <div className="book-page__search-container">
            <i className="bi bi-search"></i>
                <input onChange={debouncedSearch} type="text" name="search" id="" placeholder="Пошук" autoComplete="off"/>
            </div>
       <div className="book-page__sidebar-list-container">
       <div className="book-page__sidebar-list">
        {
            data.items && renderList(PinSortedData) 
            
        }
        </div>
       </div>
    </div>
}
export default BookPageSidebar;