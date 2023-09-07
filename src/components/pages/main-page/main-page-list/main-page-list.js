import React, {useState} from "react";
import MainPageItem from "../main-page-item/main-page-item";

import { useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../../../context-menu/context-menu";

import ConfirmModal from "../../../modals/confirm-modal";
import { useDispatch } from "react-redux";
import { book_remove } from "../../../../reducers/dataSlice";
import AddBook from "../../../modals/add-book";

import {page_set, bookItems_set} from "../../../../reducers/pageSlice";
import CacheService from "../../../../services/CacheService";
import InfoModal from "../../../modals/info-modal";
import { useTranslation } from "react-i18next";

const service = new CacheService();

const MENU_ID = "MenuItemContext";



const MainPageList = ({isColumns,data})=>{
    const [contextItem , setContextItem] = useState(false);
    const {t} = useTranslation();

    //modals visibility state
    const [confirmModalVisibility, setConfirmModalVisibility] = useState(false);
    const [addModalVisibility, setAddModalVisibility] = useState(false);
    const [infoModalVisibility, setInfoModalVisibility] = useState(false);
    const [infoObject, setInfoObject] = useState({});

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
                const {createDate,text,lastEditDate,id,description} = data.find(item => item.id === contextItem.id);
                service.notes_get(id).then(result=>{
                    const noteCount = result ? result.length : '0';

                    const InfoObj = {
                        createDate,
                        lastEditDate,
                        text,
                        description,
                        id,
                        noteCount
                    }
                    setInfoObject(InfoObj);
                    setInfoModalVisibility(true);
                }
                );
                
            break;
            default:
                console.log('click '+id)

        
        }
      }
    return (
        <div className="main-page__list-wrapper">
            <InfoModal 
                closeModal={()=>setInfoModalVisibility(false)}
                info={infoObject}
                isActive={infoModalVisibility}/>
            <ConfirmModal 
                title={t('deleteConfirm')}
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
                    return (<MainPageItem 
                        key={item.id} {...item} 
                        onContextMenu={displayMenu}
                        onClick={()=>{
                            
                            dispatch(page_set(1));
                            service.notes_get(item.id).then(result =>{
                                dispatch(bookItems_set({
                                    id:item.id,
                                    name: item.text,
                                    items:result 
                                }));
                            })
                            
                        }} />)
                })}
            </div>
            <ContextMenu id={MENU_ID} handleItemClick={handleItemClick} items={[
                //Обьект з усіма елементами контекстного меню (для динамічного генерування)
                {
                    type:'ITEM',
                    closeOnClick:false,
                    data: {
                        id:'favorite',
                        icon: <i className={`bi bi-star${contextItem.isFavorite? '-fill' : ''}`}/> ,
                        text: <span>
                            {contextItem.isFavorite ? t('unfavorite') :t('favorite')}
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    data: {
                        id:'edit',
                        icon: <i className="bi bi-pencil"/> ,
                        text: <span>
                            {t('edit')}
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    data: {
                        id:'info',
                        icon: <i className="bi bi-info-circle"></i> , 
                        text: <span > {t('info')}</span>,
                    }
                },
                {type:'sep1'},
                {
                    type:'ITEM',
                    data: {
                        id:'delete',
                        icon: <i  className="bi bi-trash color-danger"></i> ,
                        text: <span className="color-danger"> 
                             {t('delete')}</span>, 
                        
                    }
                }
                
                ]}/>
        </div>
    )
}
export default MainPageList;