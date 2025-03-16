
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Doctor from "../model/Doctor.ts";







const initialState:Doctor[] = [];


const api = axios.create({
    baseURL: "http://localhost:3000/doctor",
});



export const saveDoctor = createAsyncThunk(
    "doctor/add",
    async (doctor:Doctor, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", doctor);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const DoctorSlice = createSlice({
    name: 'doctor',
    initialState: initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDoctor.fulfilled, (state, action) => {
                state.push(action.payload);
            })

    }
});



export default DoctorSlice.reducer;
