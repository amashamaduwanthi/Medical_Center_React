
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../model/User.ts";


const api =axios.create({
    baseURL: 'http://localhost:3000',
})
const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,// user log weld kiyna eka
    loading: false,// track kranw api request eka
    error: '',
};

export const registerUser =createAsyncThunk(
    'user/register',
    async (user:User)=>{
        try {
            const response = await api.post('/user/register',{user},{withCredentials:true});
            return response.data;
        }catch (e){
            console.log(e)
        }
    }
)
export const loginUser= createAsyncThunk(
    'user/login',
    async (user : User)=>{
        try{
            const response = await api.post('/user/login', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        logOutUser(state){
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                console.log('pending user register');
            })
            .addCase(registerUser.fulfilled,(state, action)=>{
                console.log('User Registered Successfully');
            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginUser.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isAuthenticated = false;
            })

    }
})
export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;
