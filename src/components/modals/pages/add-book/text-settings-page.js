import React from "react"
const TextSettingsPage = ({titleValue,descValue,onTitleChange , onDescChange})=>{
    return (
        <div className="text-settings">
            <div className="text-settings__title-input">
                <i className="bi bi-pencil"></i>

                <input onChange={onTitleChange} type="text" 
                        placeholder="Назва" 
                        value={titleValue}/>
            </div>

            <div className="text-settings__desc-input">
                <i className="bi bi-file-earmark"></i>

                <textarea onChange={onDescChange} 
                        placeholder="Опис"
                        value={descValue}/>
            </div>
        </div>
    )
}
export default TextSettingsPage;