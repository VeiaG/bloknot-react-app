import React from "react";
import CacheService from "../../../../services/CacheService";

const service = new CacheService();

const BookPageSidebar = ({data , setNote , refreshList})=>{
    console.log(data);
    return <div className="book-page__sidebar">
        <div className="book-page__sidebar-header">
            {data.name}
            <i onClick={()=>{
                const newId = crypto.randomUUID();
                service.notes_add(data.id,{
                    id:newId,
                    content: 'test'
                }).then(()=>{
                    refreshList()
                })
                
            }} 
                className="bi bi-plus-square"></i>
        </div>
        {
            data.items && data.items.map(item=>{
                return <div 
                    key={item.id}
                    className="book-page__sidebar-header"
                    onClick={()=>setNote(item.id)}>
                    {item.content.substring(0,10)}
                    
                </div>
            })
        }
    </div>
}
export default BookPageSidebar;