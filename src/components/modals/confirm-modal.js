import React from "react";
import ReactModal from "react-modal";

import './modal.scss';

ReactModal.setAppElement('#root')

const ConfirmModal = ({title , onAnswer , isActive})=>{
    

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
                        onClick={()=>onAnswer(false)}>Відміна</button>
                <button className={`button button--danger `}
                        onClick={()=>onAnswer(true)}>Видалити</button>
            </div>

            
        </ReactModal>)
}
export default ConfirmModal;
