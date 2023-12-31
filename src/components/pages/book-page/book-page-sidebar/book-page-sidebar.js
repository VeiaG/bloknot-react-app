import React, {useState} from "react";
import CacheService from "../../../../services/CacheService";
import removeMd from "remove-markdown";

import ContextMenu from "../../../context-menu/context-menu";

import debounce from "lodash.debounce";
import { useContextMenu } from "react-contexify";
import ConfirmModal from "../../../modals/confirm-modal";
import useToggleState from "../../../../hooks/useToggleState"

import { useTranslation } from 'react-i18next';

const MENU_ID = "NoteContextMenu";
const service = new CacheService();

const BookPageSidebar = ({data , setNote , refreshList , togglePin, deleteNote , curNote})=>{
    const [searchValue,setSearchValue] = useState('');

    const [contextItem , setContextItem] = useState(false);
    //show & hide sidebar
    const [isOpenedSidebar, toggleOpen] = useToggleState(true);

    const [confirmModalVisibility, setConfirmModalVisibility] = useState(false);

    //багато умов))) ну , зате помилки точно не буде 
    const curNoteID =  data.items && (data.items[curNote]=== undefined ? undefined : data.items[curNote].id);

    const {t} = useTranslation();
    
    //прикріплені записи ( відсортовані по даті прикріплення)
    const dataPinned = data.items && data.items.filter(item => item.isPinned).sort((a,b)=>{
        const dateA = a.pinDate;
        const dateB = b.pinDate;
        return dateB - dateA ;
    });
    //не прикріплені записи
    const dataNotPinned = data.items && data.items.filter(item => !item.isPinned);

    // остаточний масив з записами
    const PinSortedData = data.items && [...dataPinned, ...dataNotPinned];


    //ContextMenu handler 
    function handleItemClick({ id}) {

        switch (id) {
            case 'pin':
                togglePin(contextItem.id);
                setContextItem({
                    ...contextItem,
                    isPinned: !contextItem.isPinned
                })
                break;
            case 'delete':
                setConfirmModalVisibility(true)
                
                break;
            default:
                console.log('click '+id)

        
        }
      }

    

    
    //Confirm Modal
    const onAnswer = (answer)=>{
        setConfirmModalVisibility(false);
        if(answer){
            deleteNote(contextItem.id);
        }
    }
    //функції для контекстного меню
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    
    function displayMenu(e , newProps) {
        if (isOpenedSidebar){
            setContextItem(newProps);
            show({event: e, props: newProps});
        }
        
    }
    // пошук
    const search = (items,search)=>{
        if(search.length ===0){
          return items
        }
        return items.filter(item => {
            return removeMd(item.content.split('\n', 1)[0]).toLowerCase().includes(search.toLowerCase())
        });
      }

    const HandleSearch = (e)=>{
        setSearchValue(e.target.value);
    }
    
    const debouncedSearch = debounce(HandleSearch,300);
    //render list
    const renderList = (items )=>{
        return search(items,searchValue).map(item=>{
            return <div 
                key={item.id}
                className={`book-page__sidebar-item 
                    ${item.id === curNoteID ? 'book-page__sidebar-item--selected': '' }`}
                onClick={()=>{
                    if(isOpenedSidebar){
                        setNote(item.id)
                    }
                }}
                onContextMenu={(e)=>{
                    displayMenu(e,{
                        id:item.id,
                        isPinned: item.isPinned
                    })
                }}>
                    <span className="book-page__sidebar-item-text">
                    {removeMd(item.content.split('\n', 1)[0])  ||  t('newNote')}
                    </span>
                <div className="book-page__sidebar-item-icons"> 
                <i 
                    onClick={(e)=>{
                        e.stopPropagation();
                        if(isOpenedSidebar){
                            togglePin(item.id)
                        }
                        
                    }}
                    className={`bi bi-pin${item.isPinned ? '-fill' :''}`}></i>
                <i
                    onClick={(e)=> {
                        e.stopPropagation();
                        displayMenu(e,{
                            id:item.id,
                            isPinned: item.isPinned
                        })
                    }}
                    className="book-page__sidebar-item-menu bi bi-three-dots"></i>
                </div>
            </div>
    })}

    

    return <div className={`book-page__sidebar ${!isOpenedSidebar && 'book-page__sidebar--closed'  }`}>
        
       
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
                <input onChange={debouncedSearch} type="text" name="search" id="" placeholder={t('search')} autoComplete="off"/>
            </div>
       <div className="book-page__sidebar-list-container">
        <div className="book-page__sidebar-list">
            {
                data.items && renderList(PinSortedData) 
            }
            </div>
       </div>
       <div className="book-page__sidebar-footer">
            <i onClick={toggleOpen} className={`bi bi-arrow-bar-${isOpenedSidebar ? 'left': 'right'}`}></i>
       </div>
       <ConfirmModal 
                title={t('deleteConfirm')}
                onAnswer={onAnswer}
                isActive={confirmModalVisibility}
                /> 
       <ContextMenu id={MENU_ID} handleItemClick={handleItemClick} items={[
                //Обьект з усіма елементами контекстного меню
                {
                    type:'ITEM',
                    closeOnClick:false,
                    data: {
                        id:'pin',
                        icon: <i className={`bi bi-pin${ contextItem.isPinned ? '-fill' : ''}`}/> ,
                        text: <span>
                            {contextItem.isPinned ? t('unpin') :t('pin')}
                        </span>, 
                    }
                },
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
}
export default BookPageSidebar;

