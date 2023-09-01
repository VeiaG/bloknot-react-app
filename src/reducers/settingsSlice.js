import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'page',
    initialState: {
      value:{
        isLightTheme: false,
        isList: false,
        language: 'ua'
      }
    },
    reducers: {
      set_theme: (state, action) => {
        state.value.isLightTheme = action.payload;
      },
      set_list: (state, action) => {
        state.value.isList = action.payload;
      },
      set_language: (state, action) => {
        state.value.language = action.payload;
      },
    }
  })
  
  export const { set_language,set_list,set_theme } = settingsSlice.actions;
  
  export default settingsSlice.reducer;