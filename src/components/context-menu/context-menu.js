import React from "react";
import { Menu, Item, Separator } from "react-contexify";

const ContextMenu = ({className,id , items , handleItemClick , MenuReference = undefined})=>{

    return  <Menu className={className} ref={MenuReference} id={id}>
                {items.map(item=>{
                    switch(item.type){
                        case 'ITEM':
                            return(
                                <Item 
                                    closeOnClick={item.closeOnClick}
                                    key={item.data.id} 
                                    id={item.data.id} 
                                    onClick={handleItemClick}
                                    disabled={item.data.disabled}
                                    data={item.value}>
                                    {item.data.icon}
                                    {item.data.text}
                                    
                                    
                                </Item>
                            )
                        
                        default:
                            return( <Separator key={item.type}/>)
                        
                    }
                    
                })}
                
            </Menu>
}
export default ContextMenu;