import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios  from 'axios';

export const getAllMovies = createAsyncThunk(
    'movie/getAllMovies',
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

            const response = await axios.get(`/api/v1/movies?${keywords}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getMovieInfos = createAsyncThunk(
    'movie/getMovieInfos',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/movies/${obj.id.id}`)
            response.data.user = obj.user._id
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getMovieTitles = createAsyncThunk(
    'movie/getMovieTitles',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/movie/search`)
            return response.data
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createMovie = createAsyncThunk(
    'movie/createMovie',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/movies/create`,obj ,{
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateMovie = createAsyncThunk(
    'movie/updateMovie',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/movies/${obj.get('_id')}`,obj ,{
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            response.data.movieId = obj.get('_id')
            console.log('update',response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteMovie = createAsyncThunk(
    'movie/deleteMovie',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/movies/${obj}`)
            response.data.movieId = obj
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createMovieReview = createAsyncThunk(
    'movie/createMovieReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/review`, {...obj});
            response.data.review = obj
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteMovieReview = createAsyncThunk(
    'movie/deleteMovieReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/delreview?id=${obj.id}&movieId=${obj.movieId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    movies: [],
    movie: null,
    reviews:[],
    userReview:null,
    movieTitles: [],
    moviesCount: 0,
    resPerPage: 0,
    filteredMoviesCount: 0,
    isLoading: false,
    errors:null,
    hasMore: true,
    page:1,
    message: '',
};

const movieSlice = createSlice({
    name : 'movie',
    initialState,
    reducers: {
        setHasMore : (state, action) => {
            state.hasMore = action.payload
        },
        setPage : (state, action) => {
            state.page = action.payload
        },
        clearMovies : (state) => {
            state.movies = []
            state.page =1
        }
    },
    extraReducers: {
        [getAllMovies.pending] : (state) => {
            state.isLoading = true
        },
        [getAllMovies.fulfilled] : (state,action) => {
            state.movies = [...state.movies, ...action.payload.movies]
            state.moviesCount = action.payload.movieCount
            state.resPerPage = action.payload.resPerPage
            state.filteredMoviesCount = action.payload.filteredMoviesCount
            state.page = state.page + 1
            state.isLoading = false
        },
        [getAllMovies.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getMovieInfos.pending] : (state) => {
            state.isLoading = true
        },
        [getMovieInfos.fulfilled] : (state, action) => {
            state.movie = action.payload.movie
            state.reviews = [...action.payload.movie.reviews.filter(review => review.user !== action.payload.user)]
            state.userReview = action.payload.movie.reviews.filter(review => review.user === action.payload.user)
            state.isLoading = false
        },
        [getMovieInfos.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getMovieTitles.pending] : (state) => {
            state.isLoading = true
        },
        [getMovieTitles.fulfilled] : (state,action) => {
            const titles = []

            action.payload.titles.reduce((obj,item) => {
                return titles.push({"title":item})
            })
            state.movieTitles = titles
            state.isLoading = false
        },
        [getMovieTitles.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [createMovie.pending] : (state) => {
            state.isLoading = true
        },
        [createMovie.fulfilled] : (state, action) => {
            console.log(action.payload)
            state.movies = [action.payload.movie,...state.movies]
            state.isLoading = false
        },
        [createMovie.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [updateMovie.pending] : (state) => {
            state.isLoading = true
        },
        [updateMovie.fulfilled] : (state, action) => {
            console.log(action.payload)
            const movieIndex = state.movies.findIndex(movie => movie._id === action.payload.movie._id)
            state.movies[movieIndex] = {...action.payload.movie}
            state.isLoading = false
        },
        [updateMovie.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteMovie.pending] : (state) => {
            state.isLoading = true
        },
        [deleteMovie.fulfilled] : (state,action) => {
            state.message = action.payload.message
            state.movies = [...state.movies.filter(movie => movie._id !== action.payload.movieId)];
            state.isLoading = false
        },
        [deleteMovie.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [createMovieReview.pending] : (state) => {
            state.isLoading = true
        },
        [createMovieReview.fulfilled] : (state, action) => {
            state.reviews = [...action.payload.reviews.filter(review => review.user !== action.payload.review.user._id)]
            state.userReview = action.payload.reviews.filter(review => review.user === action.payload.review.user._id)
            state.isLoading = false
        },
        [createMovieReview.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteMovieReview.pending] : (state) => {
            state.isLoading = true
        },
        [deleteMovieReview.fulfilled] : (state, action) => {
            state.message = action.payload.message
            state.userReview = null
            state.isLoading = false
        },
        [deleteMovieReview.rejected] : (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
});
export const {setHasMore, setPage, clearMovies} = movieSlice.actions
export default movieSlice.reducer
