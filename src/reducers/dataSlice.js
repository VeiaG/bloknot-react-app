import { createSlice } from '@reduxjs/toolkit'
import CacheService from '../services/CacheService';
const service = new CacheService();

/* я розумію що редьюсер повинен бути чистою функцією 
але тоді мені прийдеться викликати сервіс кожен раз виклику редьюсера  , АБО
(може так і зроблю пізніше ) зробити додаткові функції , які будуть повертати
action-creator-ри , але викликаючи перед тим потрібні мені функції з сервіса*/

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
      value:[]
    },
    reducers: {
      book_add: (state, action) => {
        const newBook = {
          ...action.payload, 
          createDate: Date.now(),
          lastEditDate: Date.now(),
          favoriteDate : Date.now(),
        }
        state.value.push(newBook);

        service.book_set(action.payload.id, newBook);

      },
      book_remove: (state ,action) => {
        const id = action.payload;
        const index = state.value.findIndex(item=>item.id===id);
        state.value.splice(index,1);

        service.book_remove(id);
      },
      book_edit:(state,action)=>{
          const id = action.payload.id;
          const index = state.value.findIndex(item=>item.id===id);
          const newBook = {
            ...action.payload,
            lastEditDate: Date.now()
          };
          state.value[index] = newBook;

          service.book_set(id, newBook);
      },
      book_toggle_favorite: (state,action)=>{
          const id = action.payload;
          const index = state.value.findIndex(item=>item.id===id);
          const newBook = {
            ...state.value[index],
            favorite: !state.value[index].favorite,
            favoriteDate : Date.now(),
          };
          state.value[index] = newBook;

          service.book_set(id, newBook);
      },
      books_load : (state,action)=>{
          state.value = action.payload;
      }
    }
  })
  
  export const { book_add,book_remove,book_edit,book_toggle_favorite , books_load } = dataSlice.actions;
  
  export default dataSlice.reducer;