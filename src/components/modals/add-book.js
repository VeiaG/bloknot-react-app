import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import MainPageItem from '../pages/main-page/main-page-item/main-page-item';
import { book_add , book_edit} from '../../reducers/dataSlice';
import { useColor,ColorService } from "react-color-palette";

import './modal.scss';

import TextSettingsPage from "./pages/add-book/text-settings-page";
import ColorSettingsPage from "./pages/add-book/color-settings-page";
import IconSettingsPage from './pages/add-book/icon-settings-page';
import { useDispatch , useSelector} from "react-redux";
import { useTranslation } from "react-i18next";

import KnobGroup from "./knob-group";

ReactModal.setAppElement('#root')


const AddBook = ({isActive , closeModal  ,isEdit =false, editId=null})=>{
    const pageCount = 3;
    const data = useSelector(state=>state.data.value);

    const {t} = useTranslation();
    const dispatch = useDispatch()

    const [page,setPage] = useState(0);
    const [color, setColor] = useColor("#fff");
    const [isValid,setValid] = useState(false);

    const defaultbook = {
        id:crypto.randomUUID(),
        color:`#fff`, 
        iconName:'bookmarks-fill',
        text:'',
        description:'',
        favorite:false,
    } ;
    const [book , setBook] = useState(defaultbook)

    //ініціалізація книги , тобто якщо редагуємо - завантажуємо данні в поля , 
    //а якщо  ні - створюємо пусті данні
    useEffect(()=>{
        if(isEdit){
            const editBook = data.find(item => item.id===editId);
            if(editBook){
                setBook({...editBook})
                setValid(true);
            } 
        }
        else{
            setBook({
                id:crypto.randomUUID(),
                color:`#fff`, 
                iconName:'bookmarks-fill',
                text:'',
                description:'',
                favorite:false
            })
            setValid(false);
        }
        setPage(0);
        setColor(ColorService.convert("hex",book.color))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isActive,setColor,editId,isEdit]);

    const onTitleChange = (e)=>{
        setBook({
            ...book,
            text: e.target.value
        })
        setValid(e.target.value !=='');
    }

    //Обробники подій для кожного параметра ( певно можна було б коротше )))
    const onDescChange = (e)=>{
        setBook({
            ...book,
            description: e.target.value
        });
    }
    const onColorChange = (color)=>{
        setColor(color);
        setBook({
            ...book,
            color:color.hex
        })
    }
    const onIconChange = (icon)=>{
        setBook({
            ...book,
            iconName:icon
        })
    }
    //переключення сторінок
    const HandlePage=(isForward )=>{
        if(isForward && page<pageCount-1){
            setPage(page+1);
        }
        else if(! isForward && page>0 ){
            setPage(page-1);
        }
        if(isValid && isForward && page===pageCount-1){
            dispatch(isEdit ? book_edit(book) : book_add(book));
            closeModal();
        }
    }
    // світч для переключеня сторінок
    const currentPage = ()=>{
        switch(page){
            case 0: return (<TextSettingsPage 
                titleValue={book.text}
                descValue={book.description}
                onTitleChange={onTitleChange} 
                onDescChange={onDescChange}/>)
            case 1: return (<ColorSettingsPage
                color={color}
                setColor={onColorChange}/>)
            case 2: return (<IconSettingsPage
                onIconChange={onIconChange} 
                iconName={book.iconName}
                color={color.hex}/>)
            default: return (<h2>something went wrong | PAGE {page}</h2>)
        }
    }

    return (<ReactModal overlayClassName="modal"
                className="modal__content"
                onRequestClose={closeModal}
                isOpen={isActive}>

            <div className="modal__title">{isEdit ? t('editBook') : t('addBook')}</div>
            <div onClick={closeModal} className="modal__close-btn">
                <i className="bi bi-x"></i>
            </div>

            <button className={`modal__next-btn button ${!isValid && page===2 ? 'button-disabled' :''}`}
                    onClick={()=>HandlePage(true)}>
                {page===2 ? isEdit ? t('confirm') : t('create') : t('next')}
            </button>
            <button 
                    className={`modal__back-btn button button-secondary ${(page===0)? 'button-disabled' :''}`}
                    onClick={()=>HandlePage(false)}>{t('back')}</button>
            
            <div className="modal__container">
                <div className="modal__page">
                    {
                        currentPage()
                    }
                </div>
                <MainPageItem disableToggle={true} {...book} 
                            text={book.text===''? t('name'): book.text}
                            description={book.description===''? t('desc'): book.description}/>
            </div>
            <KnobGroup count={pageCount} value={page}/>
        </ReactModal>)
}
export default AddBook;

//це якийсь самий загружений компонент 