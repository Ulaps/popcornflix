import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register =createAsyncThunk(
    'user/register',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/register`, obj, {
                "Content-Type" : "multipart/data"
            });
            return response.data       
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const loginUser =createAsyncThunk(
    'user/login',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/login`, {...obj})
            return response.data       
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/logout`, {...obj})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/userdetail/${obj.id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const googleLogin = createAsyncThunk(
    'user/googleLogin',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/googlelogin`, obj)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    user:null,
    email:'',
    name:'',
    token:null,
    avatar:'',
    isLogin:false,
    isLoading:false,
    errors:null,
    onRegister:false,
    onRegisterAvatar:'',
    isAdmin:false,
    onGoogle: false,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        setRegister : (state,action) => {
            state.onRegister = action.payload
        },
        setOnRegisterAvatar: (state, action) => {
            state.onRegisterAvatar = action.payload
        },
        setEmail : (state,action) => {
            state.email = action.payload
        },
        setOnGoogle : (state,action) => {
            state.email = action.payload
        },
        clearError : (state) => {
            state.errors = null
        }
    },
    extraReducers: {
        [loginUser.pending] : (state) => {
            state.isloading = true
        },
        [loginUser.fulfilled] : (state, action) => {
            state.user = action.payload.user
            state.name = action.payload.name
            state.token = action.payload.token
            state.isLogin = true
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            state.isLoading = false
            if(action.payload.success === true) localStorage.setItem('id', action.payload.user._id)
        },
        [loginUser.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [logout.pending]: (state) => {
            state.isLoading = true
        },
        [logout.fulfilled] : (state, action) => {
            state.user = null
            state.email =''
            state.token = null
            state.isLogin = false
            state.isAdmin = false
            state.isLoading = false
            localStorage.clear()
        },
        [logout.rejected]: (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [register.pending] : (state) => {
            state.isLoading = true
        },
        [register.fulfilled] : (state, action) => {
            state.user = action.payload.user
            state.email = action.payload.email
            state.name = action.payload.name
            state.token = action.payload.token
            state.isLogin = true
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            state.isLoading = false
            if(action.payload.success === true) localStorage.setItem('id', action.payload.user._id)
        },
        [register.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getUserDetails.pending] : (state) => {
            state.isLoading = true
        },
        [getUserDetails.fulfilled] : (state, action) => {
            state.user = action.payload.user
            state.email = action.payload.email
            state.name = action.payload.name
            // state.token = action.payload.token
            state.isLogin = true
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            state.isLoading = false
            // if(action.payload.success === true) localStorage.setItem('id', action.payload.user._id)
        },
        [getUserDetails.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [googleLogin.pending] : (state) => {
            state.isLoading = true
        },
        [googleLogin.fulfilled] : (state,action) => {
            state.user = action.payload.user
            state.email = action.payload.user.email
            state.token = action.payload.token
            state.isLogin = true
            state.isLoading = false
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            if(action.payload.success === true) localStorage.setItem('id',action.payload.user._id)
            // if(action.payload.success === true) localStorage.setItem('googleId',action.payload.user._id)
            state.isLoading = false
        },
        [googleLogin.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false 
        }  
    }
});
export const { setRegister, setOnRegisterAvatar, setEmail, setOnGoogle, clearError} = userSlice.actions
export default userSlice.reducer
