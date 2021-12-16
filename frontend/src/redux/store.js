import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import actorReducer from './actorSlice';
import producerReducer from './producerSlice';
import filterReducer from './filterSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        movie : movieReducer,
        actor : actorReducer,
        producer: producerReducer,
        filter: filterReducer

    }

})

export default store;