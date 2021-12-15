import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllActor = createAsyncThunk(
    'actor/getAllActor',
    async(obj, {rejectWithValue}) => {
        try {
            // console.log(obj)
            // //PAGKUHA NG PARAMETERS sa getAllMovies, Search
            // let keywords = '';
            // if(obj.toString().length > 0) {
            //     keywords = Object.keys(obj).map((item,index) => {
            //         return `${item}=${obj[item]}`
            //     }).join('&')
            // }

            const response = await axios.get(`/api/v1/allbyrole?work=Actor&work=Actress`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    staffs: [],
    staffsCount: 0,
    resPerPage: 0,
    isLoading: false,
    errors:null,
    hasMore: true,
    page:1,
};

const actorSlice = createSlice({
    name : 'staff',
    initialState,
    reducers: {
        setHasMore : (state, action) => {
            state.hasMore = action.payload
        },
        setPage : (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [getAllActor.pending] : (state) => {
            state.isLoading = true
        },
        [getAllActor.fulfilled] : (state,action) => {
            state.staffs = [...state.staffs, ...action.payload.staffs]
            state.staffsCount = action.payload.staffsCount
            state.resPerPage = action.payload.resPerPage
            state.page = state.page + 1
            state.isLoading = false
        },
        [getAllActor.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
});
export const {setHasMore, setPage} = actorSlice.actions
export default actorSlice.reducer
