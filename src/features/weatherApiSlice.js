import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    result:'empty'
}
export const weatherApiSlice=createSlice({
    name: 'weatherApi',
  initialState,
  reducers: {
      changeResult: (state, action) => {
        state.result='change';
    }

  }

}) 
export const { changeResult } = weatherApiSlice.actions

export default weatherApiSlice.reducer