import React from "react";
import ReactModal from "react-modal";

import './modal.scss';

ReactModal.setAppElement('#root')

const InfoModal = ({title , isActive , closeModal , info})=>{
    

    return (<ReactModal overlayClassName="modal"
                className="modal__content"
                onRequestClose={closeModal}
                isOpen={isActive}>
            <div className="modal__title">
                {title}
            </div>
            <div onClick={closeModal} className="modal__close-btn">
                <i className="bi bi-x"></i>
            </div>
            <div className="modal__container">
                <div className="info">
                    <div className="info__content">
                        <div className="info__text">
                            <span className="info__label">Назва : </span>
                            {info.text}
                        </div>
                        <div className="info__text">
                            <span className="info__label">Опис : </span>
                            <span className="info__desc">{info.description}</span>
                        </div>
                        <div className="info__text">
                            <span className="info__label">Ідентифікатор : </span>
                            {info.id}
                        </div>
                        <div className="info__text">
                            <span className="info__label">Кількість записів : </span>
                            {info.noteCount}
                        </div>
                        <div className="info__text">
                            <span className="info__label">Дата створення : </span>
                            {new Date(info.createDate).toLocaleString()}
                        </div>
                        <div className="info__text">
                            <span className="info__label">Остання зміна : </span>
                            {new Date(info.lastEditDate).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
            

            
        </ReactModal>)
}
export default InfoModal;
