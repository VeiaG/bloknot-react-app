import React from "react";
import { useContextMenu, Menu, Item, Separator } from "react-contexify";

const ContextMenu = ({id , items , handleItemClick})=>{

    return  <Menu id={id}>
                {items.map(item=>{
                    switch(item.type){
                        case 'ITEM':
                            return(
                                <Item 
                                    closeOnClick={item.closeOnClick}
                                    key={item.data.id} 
                                    id={item.data.id} 
                                    onClick={handleItemClick}>
                                    {item.data.icon}
                                    {item.data.text}
                                    
                                </Item>
                            )
                        //Додати підтримку submenu
                        default:
                            return( <Separator key={item.type}/>)
                        
                    }
                    
                })}
                
            </Menu>
}
export default ContextMenu;