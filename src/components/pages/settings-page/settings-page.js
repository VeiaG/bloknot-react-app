import React from "react";
import './settings-page.scss';
import { set_language,set_theme } from "../../../reducers/settingsSlice";

import CacheService from "../../../services/CacheService";

import { useDispatch, useSelector } from "react-redux";

const service = new CacheService();

const toBoolean = (value)=>value==='true';

const SettingsPage = ()=>{
    const settings = useSelector(state => state.settings.value);

    console.log(settings);
    const dispatch = useDispatch();

    return <div className="settings-page">
        <div className="h1">Налаштування</div>
        <div className="underline"/>
        <div className="settings-page__theme">
            <span className="settings-page__label">Тема : </span>
            <div className="btn-group btn-group-lg" role="group" >
                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" id="btnradio1" 
                    autoComplete="off" 
                    checked={!settings.isLightTheme}
                    onChange={(e)=>{
                        const value = toBoolean(e.target.value);
                        console.log(value);
                        dispatch(set_theme(value));
                        service.set_theme(value);
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio1">Темна</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" id="btnradio2" 
                    autoComplete="off" 
                    checked={settings.isLightTheme}
                    onChange={(e)=>{
                        const value = toBoolean(e.target.value);
                        console.log(value);
                        dispatch(set_theme(!value));
                        service.set_theme(!value);
                    }}/>
                <label className="btn btn-outline-primary" 
                    htmlFor="btnradio2">Світла</label>
            </div>
        </div>


        <button type="button" className="btn btn-lg btn-primary">Експортувати нотатки</button>

        <button type="button" className="btn btn-lg btn-outline-primary">Імпортувати нотатки</button>
        
    </div>
}
export default SettingsPage;