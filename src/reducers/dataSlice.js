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
      book_toggle_favorite: (state,action)=>{
          const id = action.payload;
          const index = state.value.findIndex(item=>item.id===id);
          state.value[index] = {
            ...state.value[index],
            favorite: !state.value[index].favorite
          }
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { book_add,book_remove,book_toggle_favorite} = dataSlice.actions;
  
  export default dataSlice.reducer;