import {createSlice} from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

const loginSlice = createSlice({
    name : 'login',
    initialState: {
        user:null,
        token: null
    },
    reducers: {
        UserLogin(state,action) {
            state.user = jwt(action.payload.token);
            state.token = action.payload.token;
        },
        UserLogout(state) {
            state.user = null;
        }
    }
})

export const {UserLogin,UserLogout} = loginSlice.actions;
export default loginSlice.reducer;
