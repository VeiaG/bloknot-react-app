import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import MainPageItem from '../pages/main-page/main-page-item/main-page-item';
import { book_add} from '../../reducers/dataSlice';
import { useColor,ColorService } from "react-color-palette";

import './add-book.scss';

import TextSettingsPage from "./pages/add-book/text-settings-page";
import ColorSettingsPage from "./pages/add-book/color-settings-page";
import IconSettingsPage from './pages/add-book/icon-settings-page';
import { useDispatch } from "react-redux";
ReactModal.setAppElement('#root')

const KnobGroup = ({count, value})=>{
    let knobs=[];
    for(let i=0 ;i<count;i++){
        knobs.push(i===value);
    }
    return (
        <div className="add-book__knob-group">
                {
                    knobs.map((knob,index)=>{
                        return (
                            <div key={index} 
                            className={`knob ${knob ? 'knob-active' :''}`}/>
                        )
                    })
                }
        </div>
    )
}

const AddBook = ({isActive , closeModal })=>{

    const dispatch = useDispatch()
    const pageCount = 3;

    const [page,setPage] = useState(0);

    const [color, setColor] = useColor("#fff");

    const [isValid,setValid] = useState(false);

    const checkValid = ()=>{
        setValid(book.text !== '');
    }

    const defaultbook = {
        id:crypto.randomUUID(),
        color:`#fff`, 
        iconName:'bookmarks-fill',
        text:'',
        description:'',
        favorite:false,
    };
    const [book , setBook] = useState(defaultbook)

    useEffect(()=>{
        setBook({
                    id:crypto.randomUUID(),
                    color:`#fff`, 
                    iconName:'bookmarks-fill',
                    text:'',
                    description:'',
                    favorite:false,
                })
        setPage(0);
        setValid(false);
        setColor(ColorService.convert("hex",'#FFF'))
    },[isActive]);

    const onTitleChange = (e)=>{
        setBook({
            ...book,
            text: e.target.value
        })
        checkValid();
    }
    const onDescChange = (e)=>{
        setBook({
            ...book,
            description: e.target.value
        });
        checkValid();
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

    const HandlePage=(isForward )=>{
        if(isForward && page<pageCount-1){
            setPage(page+1);
        }
        else if(! isForward && page>0 ){
            setPage(page-1);
        }
        if(isValid && isForward && page===pageCount-1){
            dispatch(book_add(book));
            closeModal();
        }
    }

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
                icon={book.iconName}
                color={color.hex}/>)
            default: return (<h2>something went wrong | PAGE {page}</h2>)
        }
    }

    return (<ReactModal overlayClassName="add-book"
                className="add-book__content"
                onRequestClose={closeModal}
                isOpen={isActive}>

            <div className="add-book__title">Додати книгу</div>
            <div onClick={closeModal} className="add-book__close-btn">
                <i className="bi bi-x"></i>
            </div>

            <button className={`add-book__next-btn button ${!isValid && page===2 ? 'button-disabled' :''}`}
                    onClick={()=>HandlePage(true)}>
                {page===2 ? 'Створити' : 'Далі'}
            </button>
            <button 
                    className={`add-book__back-btn button button-secondary ${(page===0)? 'button-disabled' :''}`}
                    onClick={()=>HandlePage(false)}>Назад</button>
            
            <div className="add-book__container">
                <div className="add-book__page">
                    {
                        currentPage()
                    }
                </div>
                <MainPageItem disableToggle={true} {...book}/>
            </div>
            <KnobGroup count={pageCount} value={page}/>
        </ReactModal>)
}
export default AddBook;
