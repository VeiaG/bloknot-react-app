import React from "react";
import ReactModal from "react-modal";

import './modal.scss';
import { useTranslation } from "react-i18next";

ReactModal.setAppElement('#root')

const InfoModal = ({ isActive , closeModal , info})=>{
    
    const {t} = useTranslation();

    return (<ReactModal overlayClassName="modal"
                className="modal__content"
                onRequestClose={closeModal}
                isOpen={isActive}>
            <div className="modal__title">
                {t('info')}
            </div>
            <div onClick={closeModal} className="modal__close-btn">
                <i className="bi bi-x"></i>
            </div>
            <div className="modal__container">
                <div className="info">
                    <div className="info__content">
                        <div className="info__text">
                            <span className="info__label">{t('name')} : </span>
                            {info.text}
                        </div>
                        <div className="info__text">
                            <span className="info__label">{t('desc')} : </span>
                            <span className="info__desc">{info.description}</span>
                        </div>
                        <div className="info__text">
                            <span className="info__label">{t('id')} : </span>
                            {info.id}
                        </div>
                        <div className="info__text">
                            <span className="info__label">{t('noteCount')} : </span>
                            {info.noteCount}
                        </div>
                        <div className="info__text">
                            <span className="info__label">{t('createDate')} : </span>
                            {new Date(info.createDate).toLocaleString()}
                        </div>
                        <div className="info__text">
                            <span className="info__label">{t('lastEditDate')} : </span>
                            {new Date(info.lastEditDate).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
            

            
        </ReactModal>)
}
export default InfoModal;
