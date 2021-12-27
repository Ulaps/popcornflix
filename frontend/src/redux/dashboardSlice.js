import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTopRatedMovies = createAsyncThunk(
    'dashboard/getTopRatedMovies',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/top/rated/movies`);

            return response.data.movies
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTopRatedTvShows = createAsyncThunk(
    'dashboard/getTopRatedTvShows',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/top/rated/tvshow`);

            return response.data.movies
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTopRatedActors = createAsyncThunk(
    'dashboard/getTopRatedActors',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/top/rated/actors`);

            return response.data.actors
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getPopularGenres = createAsyncThunk(
    'dashboard/getPopularGenres',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/popular/genre`);

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getPopularMovies = createAsyncThunk(
    'dashboard/getPopularMovies',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/popular/movies`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTopGrossingFilm = createAsyncThunk(
    'dashboard/getTopGrossingFilm',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/grossing/film`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTopGrossingTvShow = createAsyncThunk(
    'dashboard/getTopGrossingTvShow',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/grossing/tvshow`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    topRatedMovies: [],
    topRatedTvShows: [],
    topRatedActors: [],
    popularGenres: [],
    popularMovies: [],
    genreLabels: [],
    movieLabels: [],
    genreValues:[],
    movieValues:[],
    grossingFilms: [],
    grossingFilmLabels:[],
    grossingFilmValues:[],
    grossingShows: [],
    grossingShowLabels:[],
    grossingShowValues:[],
    isLoading:false,
    errors:null,
};

const dashboardSlice = createSlice({
    name : 'dashboard',
    initialState,
    // reducers: {},
    extraReducers: {
        [getTopRatedMovies.pending] : (state) => {
            state.isLoading = true
        },
        [getTopRatedMovies.fulfilled] : (state,action) => {
            state.topRatedMovies = action.payload
            state.isLoading = false
        },
        [getTopRatedMovies.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopRatedTvShows.pending] : (state) => {
            state.isLoading = true
        },
        [getTopRatedTvShows.fulfilled] : (state,action) => {
            state.topRatedTvShows = action.payload
            state.isLoading = false
        },
        [getTopRatedTvShows.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopRatedActors.pending] : (state) => {
            state.isLoading = true
        },
        [getTopRatedActors.fulfilled] : (state,action) => {
            state.topRatedActors = action.payload
            state.isLoading = false
        },
        [getTopRatedActors.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getPopularGenres.pending] : (state) => {
            state.isLoading = true
        },
        [getPopularGenres.fulfilled] : (state,action) => {
            state.popularGenres = action.payload.genres
            state.genreLabels = action.payload.labels
            state.genreValues = action.payload.values
            state.isLoading = false
        },
        [getPopularMovies.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getPopularMovies.fulfilled] : (state,action) => {
            state.popularMovies = action.payload.movies
            state.movieLabels = action.payload.labels
            state.movieValues = action.payload.values
            state.isLoading = false
        },
        [getPopularMovies.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopGrossingFilm.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopGrossingFilm.fulfilled] : (state,action) => {
            state.grossingFilms = action.payload.films
            state.grossingFilmLabels = action.payload.labels
            state.grossingFilmValues = action.payload.values
            state.isLoading = false
        },
        [getTopGrossingFilm.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopGrossingTvShow.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getTopGrossingTvShow.fulfilled] : (state,action) => {
            state.grossingShows = action.payload.tvshows
            state.grossingShowLabels = action.payload.labels
            state.grossingShowValues = action.payload.values
            state.isLoading = false
        },
        [getTopGrossingTvShow.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
});
// export const {} = dashboardSlice.actions
export default dashboardSlice.reducer
