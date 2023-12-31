import React, {useState} from "react";
import list from '../../../icon-name-list/icon-name-list';
import './icon-settings-page.scss';
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
/*
    Колись звідкись взнати як зробити щоб пошук здійснювався на фоні , 
    а тільки потім показувався результат  (тому що при пошуку лагає)

    жоден спосіб шо я пробував , з промісами . з async + map і т.д не працював

    мб лаги через те що 1900+ елементів рендериться на екрані
*/
const IconSettingsPage = ({iconName , onIconChange ,color})=>{
    const [searchValue,setSearch]= useState('');

    const {t} = useTranslation();

    const search = (items,search)=>{
        if(search.length ===0){
          return items
        }
        return items.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase())
                || item.tags.toLowerCase().includes(search.toLowerCase())
                || item.categories.toLowerCase().includes(search.toLowerCase())
        });
      }
    
    return <div className="icon-settings">
        <div className="icon-settings__search-input">
                <i className="bi bi-search"></i>
                <input onChange={debounce((e)=>{setSearch(e.target.value)},300)}
                        type="text" 
                        placeholder={t('search')}/>
        </div>
        <div className="icon-settings__list-wrapper">
            <div className="icon-settings__list">
                {search(list,searchValue).map(item=>{
                    return(
                        <div onClick={()=>onIconChange(item.name)} 
                            key={item.name} 
                            className={`icon-settings__list-item ${iconName===item.name ? 'icon-settings__list-item-selected' :''}`}>
                            
                            <i style={{color}}className={`bi bi-${item.name}`}></i>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
}
export default IconSettingsPage;