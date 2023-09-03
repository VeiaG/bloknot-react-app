import React from "react";
import './settings-page.scss';
import { set_language,set_theme } from "../../../reducers/settingsSlice";

import { book_add } from "../../../reducers/dataSlice";


import CacheService from "../../../services/CacheService";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const service = new CacheService();

const toBoolean = (value)=>value==='true';

const SettingsPage = ()=>{
    const settings = useSelector(state => state.settings.value);

    const {t} = useTranslation();

    const dispatch = useDispatch();

    //import
    function openFile() {
        document.getElementById('inp').click();
    }
    function readFile(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            const result = e.target.result;
            importAll(result);
        }
        reader.readAsText(file)
    }
    const importAll = (json)=>{
        const {books,notes} = JSON.parse(json);
        books.forEach(book=>{
            const id = crypto.randomUUID();
            dispatch(book_add({...book, id}));

            const bookN = notes.find(bookNotes=> bookNotes.id === book.id)
            service.notes_set(id,bookN.notes);
        })
    }
      
    //export
    const exportData = (data) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "export.json";
    
        link.click();
      };
    const exportAll = ()=>{
        service.books_getAll().then(result=>{
            let allObj = {} ;
            allObj.books = result;
            service.notes_getAll().then(result=>{
                allObj.notes = result;
                exportData(allObj);
            })
        })
    }

    return <div className="settings-page">
        <div className="h1">{t('settings')}</div>
        <div className="underline"/>
        <div className="settings-page__theme">
            <span className="settings-page__label">{t('theme')} </span>
            <div className="btn-group btn-group-lg" role="group" >
                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" id="btnradio1" 
                    autoComplete="off" 
                    checked={!settings.isLightTheme}
                    onChange={(e)=>{
                        const value = toBoolean(e.target.value);

                        dispatch(set_theme(value));
                        service.set_theme(value);
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio1">{t('dark')}</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" id="btnradio2" 
                    autoComplete="off" 
                    checked={settings.isLightTheme}
                    onChange={(e)=>{
                        const value = toBoolean(e.target.value);

                        dispatch(set_theme(!value));
                        service.set_theme(!value);
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio2">{t('light')}</label>
            </div>
        </div>
        <div className="">
            <span className="settings-page__label">{t('language')} </span>
            <div className="btn-group btn-group-lg" role="group" >
                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio_two" id="btnradio3" 
                    autoComplete="off" 
                    checked={settings.language==="en"}
                    onChange={(e)=>{
                        dispatch(set_language("en"));
                        service.set_language("en");
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio3">{t('en')}</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio_two" id="btnradio4" 
                    autoComplete="off" 
                    checked={settings.language==="ua"}
                    onChange={(e)=>{
                        dispatch(set_language("ua"));
                        service.set_language("ua");
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio4">{t('ua')}</label>
            </div>
        </div>


        <button type="button" 
            onClick={exportAll}
            className="btn btn-lg btn-primary">{t('export')}</button>

        <button type="button" 
            onClick={openFile}
            className="btn btn-lg btn-outline-primary">{t('import')}</button>
        <input id="inp" type='file' 
            style={{visibility:'hidden'}} 
            onChange={readFile}/>
    </div>
}
export default SettingsPage;