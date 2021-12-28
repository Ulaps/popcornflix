import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllActor = createAsyncThunk(
    'actor/getAllActor',
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

            const response = await axios.get(`/api/v1/allbyrole?work=Actor&work=Actress&${keywords}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getActorInfos = createAsyncThunk(
    'actor/getActorInfos',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/staffdetails/${obj.id.id}`)
            response.data.user = obj.user._id
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getActorNames = createAsyncThunk(
    'actor/getActorNames',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/staffname?work=Actor&work=Actress`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteActor = createAsyncThunk(
    'actor/deleteActor',
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

export const createActorReview = createAsyncThunk(
    'actor/createActorReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/staffreview`, {...obj})
            response.data.review = obj
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteActorReview = createAsyncThunk(
    'actor/deleteActorReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/delstaffreview?id=${obj.id}&staffId=${obj.staffId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    staffs: [],
    staff: null,
    actorNames: [],
    actorNamesWithId: [],
    staffsCount: 0,
    resPerPage: 0,
    reviews: [],
    userReview: null,
    isLoading: false,
    errors:null,
    hasMore: true,
    page:1,
    message:''
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
        },
        clearActors : (state) => {
            state.staffs = []
            state.page =1
        },
        clearActorNames : (state) => {
            state.actorNames = []
            state.actorNamesWithId = []
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
        },
        [getActorInfos.pending] : (state) => {
            state.isLoading = true
        },
        [getActorInfos.fulfilled] : (state, action) => {
            state.staff = action.payload.staff
            state.reviews = [...action.payload.staff.reviews.filter(review => review.user !== action.payload.user)]
            state.userReview = action.payload.staff.reviews.filter(review => review.user === action.payload.user)
            state.isLoading = false
        },
        [getActorInfos.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getActorNames.pending] : (state) => {
            state.isLoading = true
        },
        [getActorNames.fulfilled] : (state, action) => {
            const names = []

            action.payload.names.reduce((obj,item) => {
                return names.push({"title":item})
            })
            state.actorNames = names
            state.actorNamesWithId = action.payload.name_id
            state.isLoading = false
        },
        [getActorNames.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteActor.pending] : (state) => {
            state.isLoading = true
        },
        [deleteActor.fulfilled] : (state, action) => {
            state.message = action.payload.message
            state.staffs = [...state.staffs.filter(staff => staff._id !== action.payload.staffId)];
            state.isLoading = false
        },
        [deleteActor.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [createActorReview.pending] : (state) => {
            state.isLoading = true
        },
        [createActorReview.fulfilled] : (state, action) => {
            // console.log('etooooo',action.payload.reviews)
            state.reviews = [...action.payload.reviews.filter(review => review.user !== action.payload.review.user._id)]
            state.userReview = action.payload.reviews.filter(review => review.user === action.payload.review.user._id)
            state.isLoading = false
        },
        [createActorReview.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteActorReview.pending] : (state) => {
            state.isLoading = true
        },
        [deleteActorReview.fulfilled] : (state, action) => {
            state.message = action.payload.message
            state.userReview = null
            state.isLoading = false
        },
        [deleteActorReview.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
});
export const {setHasMore, setPage, clearActors, clearActorNames} = actorSlice.actions
export default actorSlice.reducer
