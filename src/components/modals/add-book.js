import React from "react";
import ReactModal from "react-modal";
import './add-book.scss';

ReactModal.setAppElement('body')
const AddBook = ({isActive , closeModal })=>{
    return (<ReactModal 
            overlayClassName="add-book"
            className="add-book__content"
            onRequestClose={closeModal}
            isOpen={isActive}>
                <div onClick={closeModal} className="add-book__close-btn">
                    <i className="bi bi-x"></i>
                </div>
        </ReactModal>)
}
export default AddBook;