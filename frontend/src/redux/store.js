import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import actorReducer from './actorSlice';
import producerReducer from './producerSlice';
import filterReducer from './filterSlice';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        movie : movieReducer,
        actor : actorReducer,
        producer: producerReducer,
        filter: filterReducer,
        dashboard : dashboardReducer

    }

})

export default store;