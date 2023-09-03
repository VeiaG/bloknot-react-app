import React from "react";
import ReactModal from "react-modal";

import './modal.scss';
import { useTranslation } from "react-i18next";

ReactModal.setAppElement('#root')

const ConfirmModal = ({title , onAnswer , isActive})=>{
    
    const {t} = useTranslation();

    return (<ReactModal overlayClassName="modal modal--confirm"
                className="modal__content"
                onRequestClose={()=>onAnswer(true)}
                isOpen={isActive}>
            <div className="modal__text">
                {title}
            </div>
            <div className="modal__button-group">
                <button 
                        className={`button button-secondary`}
                        onClick={()=>onAnswer(false)}>{t('cancel')}</button>
                <button className={`button button--danger `}
                        onClick={()=>onAnswer(true)}>{t('delete')}</button>
            </div>

            
        </ReactModal>)
}
export default ConfirmModal;
