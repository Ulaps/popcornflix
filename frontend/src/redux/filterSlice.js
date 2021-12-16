import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    keywords : null,
    search : ''
}

const filterSlice = createSlice({
    name : 'filter',
    initialState,
    reducers : {
        setKeywords : (state,action) => {
            state.keywords= {...state.keywords, ...action.payload}
        },
        clearFilters : (state) => {
            state.keywords = null
        },
        setSearch : (state,action) => {
            state.search = action.payload
        }
    }
})

export const { setKeywords, clearFilters, setSearch } = filterSlice.actions

export default filterSlice.reducer