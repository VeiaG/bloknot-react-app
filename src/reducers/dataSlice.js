import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
      value:[]
    },
    reducers: {
      book_add: (state, action) => {
        state.value.push(action.payload)
      },
      book_remove: (state) => {
        state.value = state.value.slice(0,-1);
      },
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { book_add,book_remove} = dataSlice.actions;
  
  export default dataSlice.reducer;