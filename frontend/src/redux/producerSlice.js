import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProducer = createAsyncThunk(
    'producer/getAllProducer',
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj)
            //PAGKUHA NG PARAMETERS sa getAllMovies, Search
            let keywords = '';
            if(obj.toString().length > 0) {
                keywords = Object.keys(obj).map((item,index) => {
                    return `${item}=${obj[item]}`
                }).join('&')
            }

            const response = await axios.get(`/api/v1/allbyrole?work=Producer&${keywords}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getProducerInfos = createAsyncThunk(
    'producer/getProducerInfos',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/staffdetails/${obj.id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getProducerNames = createAsyncThunk(
    'producer/getProducerName',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/staffname?work=Producer`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteProducer = createAsyncThunk(
    'producer/delteProducer',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/staff/${obj}`)
            response.data.staffId = obj
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    staffs: [],
    staffsCount: 0,
    producerNames: [],
    producerNamesWithId: [],
    resPerPage: 0,
    isLoading: false,
    errors:null,
    hasMore: true,
    page:1,
    message: ''
};

const producerSlice = createSlice({
    name : 'staff',
    initialState,
    reducers: {
        setHasMore : (state, action) => {
            state.hasMore = action.payload
        },
        setPage : (state, action) => {
            state.page = action.payload
        },
        clearProducers : (state) => {
            state.staffs = []
            state.page =1
        },
        clearProducerNames : (state) => {
            state.producerNames = []
            state.producerNamesWithId = []
        }
    },
    extraReducers: {
        [getAllProducer.pending] : (state) => {
            state.isLoading = true
        },
        [getAllProducer.fulfilled] : (state,action) => {
            state.staffs = [...state.staffs, ...action.payload.staffs]
            state.staffsCount = action.payload.staffsCount
            state.resPerPage = action.payload.resPerPage
            state.page = state.page + 1
            state.isLoading = false
        },
        [getAllProducer.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getProducerInfos.pending] : (state) => {
            state.isLoading = true
        },
        [getProducerInfos.fulfilled] : (state, action) => {
            state.staff = action.payload.staff
            state.isLoading = false
        },
        [getProducerInfos.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getProducerNames.pending] : (state) => {
            state.isLoading = true
        },
        [getProducerNames.fulfilled] : (state, action) => {
            const names = []

            action.payload.names.reduce((obj,item) => {
                return names.push({"title":item})
            })
            state.producerNames = names
            state.producerNamesWithId = action.payload.name_id
            state.isLoading = false
        },
        [getProducerNames.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteProducer.pending] : (state) => {
            state.isLoading = true
        },
        [deleteProducer.fulfilled] : (state, action) => {
            state.message = action.payload.message
            state.staffs = [...state.staffs.filter(staff => staff._id !== action.payload.staffId)]
            state.isLoading = false
        },
        [deleteProducer.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
});
export const {setHasMore, setPage, clearProducers, clearProducerNames} = producerSlice.actions
export default producerSlice.reducer
