import {configureStore, combineReducers} from '@reduxjs/toolkit';
import login from './slices/login';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';


const config = {
    key :'redux',
    version:1,
    storage
}

const slices = combineReducers({
    login
})


const store = configureStore({
    reducer: persistReducer(config,slices),
    devTools : true,
    middleware : (setup)=>setup({
        serializableCheck:false
    })
})

export default store;