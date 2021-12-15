import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import actorReducer from './actorSlice';
import producerReducer from './producerSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        movie : movieReducer,
        actor : actorReducer,
        producer: producerReducer,

    }

})

export default store;