import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
      value:{
        page:0,
        bookItems:{
          id:null,
          name:'no name',
          items:[]
        },
      }
    },
    reducers: {
      page_set: (state, action) => {
        state.value.page = action.payload;
      },
      bookItems_set : (state,action)=>{
        state.value.bookItems = action.payload;
      }
    }
  })
  
  export const { page_set, bookItems_set } = pageSlice.actions;
  
  export default pageSlice.reducer;