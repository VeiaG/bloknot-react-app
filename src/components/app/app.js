import React, { useEffect  } from "react";
import Sidebar from "../sidebar/sidebar";
import './app.scss';
import MainPage from "../pages/main-page/main-page";
import CacheService from "../../services/CacheService";
import { useDispatch, useSelector } from "react-redux";
import { books_load } from "../../reducers/dataSlice";
import BookPage from "../pages/book-page/book-page";
import SettingsPage from "../pages/settings-page/settings-page";

import i18n from "../../il8n";

import { set_language,set_list,set_theme } from "../../reducers/settingsSlice";

const service = new CacheService();
const App = ()=>{
    const page = useSelector(state=> state.page.value.page);

    const {isLightTheme,language} = useSelector(state=> state.settings.value);

    const dispatch = useDispatch();
    
    //load saved data
    useEffect(()=>{
        service.books_getAll().then(result =>{
            dispatch(books_load(result)
        );
        service.get_settings().then(result =>{
            const {language,list,theme} = result;
            if( !language ){
                service.set_language('ua');
                service.set_list(false);
                service.set_theme(false);
            }
            else{
                dispatch(set_language(language));
                dispatch(set_list(list));
                dispatch(set_theme(theme))
            }
            
        })
       });
    },[dispatch])

    //theme update
    useEffect(()=>{
        document.body.classList.remove('dark');
        document.body.classList.remove('light');
        document.body.classList.add(`${isLightTheme? 'light': 'dark'}`);
    },[isLightTheme])
    
    //lang update
    useEffect(()=>{
       i18n.changeLanguage(language);
    },[language])
    
    const currentPage = ()=>{
        switch(page){
            case 0: return <MainPage/>
            case 1: return <BookPage/>
            case 2: return <SettingsPage/>
            default: return <MainPage/>
        }
    }
    return <div className="app">
        <Sidebar/>
        {currentPage()}
    </div>
}
export default App;