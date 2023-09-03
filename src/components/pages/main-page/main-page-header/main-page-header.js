import React, { useRef } from "react";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../../../context-menu/context-menu";
import useToggleState from "../../../../hooks/useToggleState";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
const MENU_ID = "HeaderDropdown";

const MainPageHeader = ({toggleColumns,onSearch , isColumns , onFilter , filterId})=>{

    const {t} = useTranslation()

    const { show , hideAll } = useContextMenu({
        id: MENU_ID,
    });

    const [contextMenuVisibility, toggleContextMenu] = useToggleState(false);

    const triggerRef = useRef();

    function getMenuPosition() {
        const { right , bottom } = triggerRef.current.getBoundingClientRect();
        return { x: right-220, y: bottom + 8 };
    }
    function displayMenu(e ) {
        if(!contextMenuVisibility){
            show({event: e,
                position: getMenuPosition()});
        }
        else{
            hideAll();
        }
        toggleContextMenu();
    }

    //ContextMenu handler 
    function handleItemClick({ data}) {
        onFilter(data ? data: 0);
    }
    
    return (
        <div className="main-page__header">

            <div className="main-page__search-input">
                <i className="bi bi-search"></i>
                <input onChange={debounce((e)=>{
                    onSearch(e.target.value);
                },300)} type="text" name="search" id="" placeholder={t('search')} autoComplete="off"/>
            </div>
            
            <div onClick={toggleColumns} className="main-page__btn">
                <i className={`bi bi-${!isColumns ? 'view-list' : 'grid'}`}></i>
            </div>


            <div onClick={displayMenu} ref={triggerRef} className="main-page__btn">
                <i className="bi bi-three-dots"></i>
            </div>
            
            <ContextMenu className="main-page__header-dropdown" id={MENU_ID} handleItemClick={handleItemClick} items={[
                //Обьект з усіма елементами контекстного меню
                {
                    type:'ITEM',
                    closeOnClick:false,
                    data: {
                        disabled:true,
                        id:'label1',
                        text: <span>
                            {t('byAlph')}
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    closeOnClick:false,
                    value : filterId===0 ? 1: 0 ,
                    data: {
                        id:'alhphabet',
                        icon: <i className={`bi bi-sort-alpha-down`}/> ,
                        text: <span>
                            {(filterId ===0 )? t('za'): t('az')}
                        </span>, 
                    }
                },
                {type :'sep2'},
                {
                    type:'ITEM',
                    closeOnClick:false,
                    data: {
                        disabled:true,
                        id:'label2',
                        text: <span>
                            {t('byDate')}
                        </span>, 
                    }
                },
                {
                    type:'ITEM',
                    closeOnClick:false,
                    value:filterId===2 ? 3: 2 ,
                    data: {
                        id:'date',
                        icon: <i className={`bi bi-sort-down`}/> ,
                        text: <span>
                            {(filterId ===2 )? t('dNew'): t('dOld')}
                        </span>, 
                    }
                }
                
                ]}/>
        </div>
    )
}
export default MainPageHeader;