import React, { useEffect  } from "react";
import Sidebar from "../sidebar/sidebar";
import './app.scss';
import MainPage from "../pages/main-page/main-page";
import CacheService from "../../services/CacheService";
import { useDispatch, useSelector } from "react-redux";
import { books_load } from "../../reducers/dataSlice";
import BookPage from "../pages/book-page/book-page";

const service = new CacheService();
const App = ()=>{
    const page = useSelector(state=> state.page.value.page);
    const dispatch = useDispatch();
    //load saved data
    useEffect(()=>{
        service.books_getAll().then(result =>{
            dispatch(books_load(result)
        );
       });
    },[dispatch])
    
    const currentPage = ()=>{
        console.log(page);
        switch(page){
            case 0: return <MainPage/>
            case 1: return <BookPage/>
            default: return <MainPage/>
        }
    }
    return <div className="app">
        <Sidebar/>
        {currentPage()}
    </div>
}
export default App;