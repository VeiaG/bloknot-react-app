import React, {useEffect, useRef, useState} from "react";
import './book-page.scss';

import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { quotePlugin } from '@mdxeditor/editor/plugins/quote'
import { linkPlugin } from "@mdxeditor/editor";
import { markdownShortcutPlugin } from "@mdxeditor/editor";

import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
// ------------

import { useDispatch, useSelector } from "react-redux";

import BookPageSidebar from './book-page-sidebar/book-page-sidebar';
import { BlockTypeSelect } from "@mdxeditor/editor";

import {bookItems_set} from '../../../reducers/pageSlice'

import CacheService from "../../../services/CacheService";

import debounce from "lodash.debounce";

const service = new CacheService();

//переробити шоб замість NoteIndex використовувався індекс в масиві
// currentState.bookItems.items
//Так легше буде змінювати. Оновлення робити ТІЛЬКИ в стейті компонента 
// завантажувати лише при додаванні , бо по іншому злітає


const BookPage = ()=>{
    const currentState = useSelector(state=> state.page.value);
    const editorRef = useRef();

    const dispatch = useDispatch();

    const [NoteIndex, setNoteIndex] = useState(undefined);

    const NoteIndexRef = useRef(NoteIndex);

    const curStateRef = useRef(currentState.bookItems);


    const SetNote = (id)=>{
        const noteIndex = currentState.bookItems.items.findIndex(item => item.id === id);
        setNoteIndex(noteIndex);
        NoteIndexRef.current = noteIndex;
        curStateRef.current = currentState.bookItems;
        editorRef.current.setMarkdown(currentState.bookItems.items[noteIndex].content);
    }

    const refresh = ()=>{
        service.notes_get(currentState.bookItems.id).then(result =>{
            const newBooksItems = {
                ...currentState.bookItems,
                items:result 
            };
            dispatch(bookItems_set(newBooksItems));
            curStateRef.current = newBooksItems;
        })
    }

  

    const handleChange = (value )=>{
        console.log('handle change')
        const newText = value;
        if(NoteIndexRef.current !== undefined){
            const newNote = { 
                id: curStateRef.current.items[NoteIndexRef.current].id ,
                content:newText}
            let newList = [...curStateRef.current.items ];

            newList[NoteIndexRef.current] = newNote;
            
            service.notes_set( curStateRef.current.id,newList);
            
            dispatch(bookItems_set({
                ...curStateRef.current,
                items: newList
            }));
        }
    }
    const debouncedHandleChange = debounce(handleChange,300);
    return <div className="book-page">
        <BookPageSidebar 
            data={currentState.bookItems} 
            setNote={SetNote}
            refreshList={refresh}/>
        <div className="book-page__editor">
            <MDXEditor 
                onChange={debouncedHandleChange}
                ref={editorRef}
                className="dark-theme MDEditor"
                markdown={'' }
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    linkPlugin(),
                    quotePlugin(),
                    markdownShortcutPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => ( <> 
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect/>
                        </>)
                    })]
                    } />
        </div>
    </div>
}
export default BookPage;