
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Appointments from "../model/Appointments.ts";








const initialState:Appointments[] = [];


const api = axios.create({
    baseURL: "http://localhost:3000/appointment",
});



export const saveAppointment = createAsyncThunk(
    "appointment/add",
    async (appointment:Appointments, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", appointment);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAllAppointments=createAsyncThunk(
    "appointment/view",
    async ()=>{
        try{
            const response= await api.get("/view");
            return response.data;
        }catch(error:any){
            return error.response?.data || error.message;
        }
    }
)






const AppointmentSlice = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAppointment.fulfilled, (state, action) => {
                state.push(action.payload);
            })

    }
});



export default AppointmentSlice.reducer;
