import React from "react"
import { useTranslation } from "react-i18next";
const TextSettingsPage = ({titleValue,descValue,onTitleChange , onDescChange})=>{

    const {t} = useTranslation();
    return (
        <div className="text-settings">
            <div className="text-settings__title-input">
                <i className="bi bi-pencil"></i>

                <input onChange={onTitleChange} type="text" 
                        placeholder={t('name')} 
                        value={titleValue}/>
            </div>

            <div className="text-settings__desc-input">
                <i className="bi bi-file-earmark"></i>

                <textarea onChange={onDescChange} 
                        placeholder={t('desc')}
                        value={descValue}/>
            </div>
        </div>
    )
}
export default TextSettingsPage;