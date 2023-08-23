import React, {useState} from "react";
import MainPageItem from "../main-page-item/main-page-item";

import { useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../../../context-menu/context-menu";

import ConfirmModal from "../../../modals/confirm-modal";
import { useDispatch } from "react-redux";
import { book_remove } from "../../../../reducers/dataSlice";
import AddBook from "../../../modals/add-book";

const MENU_ID = "MenuItemContext";
/*
    TODO:
    - Перенести логіку контекстного меню 
    та попап видалення (confirm popup) 
    в окремі HOC компоненти
*/




const MainPageList = ({isColumns,data})=>{
    const [contextItem , setContextItem] = useState(false);

    const [confirmModalVisibility, setConfirmModalVisibility] = useState(false);
    const [addModalVisibility, setAddModalVisibility] = useState(false);

    const dispatch = useDispatch();

    const { show } = useContextMenu({
        id: MENU_ID,
    });
    
    function displayMenu(e , newProps) {
        setContextItem(newProps);
        show({event: e, props: newProps});
    }
    //Confirm Modal
    const onAnswer = (answer)=>{
        setConfirmModalVisibility(false);
        if(answer){
            dispatch(book_remove(contextItem.id));
        }
    }


    //ContextMenu handler 
    function handleItemClick({ id}) {

        switch (id) {
            case 'favorite':
                contextItem.toggleFavorite()
                setContextItem({...contextItem, isFavorite: !contextItem.isFavorite});
                break;
            case 'delete':
                setConfirmModalVisibility(true)
                break;
            case 'edit':
                setAddModalVisibility(true);
                break;
            case 'info':
                console.log(data.find(item => item.id === contextItem.id));
            break;
            default:
                console.log('click '+id)

        
        }
      }
    return (
        <div className="main-page__list-wrapper">
            
             <ConfirmModal 
                title="Дійсно видалити ?"
                onAnswer={onAnswer}
                isActive={confirmModalVisibility}
                /> 
            <AddBook 
                closeModal={()=>{setAddModalVisibility(false)}}
                isActive={addModalVisibility}
                isEdit='true'
                editId={contextItem.id}/> 
            <div  className={`main-page__list${isColumns ? '-columns' : ''}`}>
                {data.map(item=>{
                    return (<MainPageItem key={item.id} {...item} onContextMenu={displayMenu}/>)
                })}
            </div>
            <ContextMenu id={MENU_ID} handleItemClick={handleItemClick} items={[
                //Обьект з усіма елементами контекстного меню
                {
                    type:'ITEM',
                    closeOnClick:false,
                    data: {
                        id:'favorite',
                        icon: <i className={`bi bi-star${contextItem.isFavorite? '-fill' : ''}`}/> ,
                        text: <span>
                            {contextItem.isFavorite ? 'Видалити з улюбленого' :'Додати в улюблене '}
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    data: {
                        id:'edit',
                        icon: <i className="bi bi-pencil"/> ,
                        text: <span>
                            Редагувати
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    data: {
                        id:'info',
                        icon: <i className="bi bi-info-circle"></i> , 
                        text: <span > Інформація</span>,
                    }
                },
                {type:'sep1'},
                {
                    type:'ITEM',
                    data: {
                        id:'delete',
                        icon: <i  className="bi bi-trash color-danger"></i> ,
                        text: <span className="color-danger"> 
                             Видалити</span>, 
                        
                    }
                }
                
                ]}/>
        </div>
    )
}
export default MainPageList;