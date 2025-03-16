
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "../model/Patient.ts";






const initialState:Patient[] = [];


const api = axios.create({
    baseURL: "http://localhost:3000/patient",
});



export const savePatient = createAsyncThunk(
    "patient/add",
    async (patient:Patient, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", patient);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const getAllPatients=createAsyncThunk(
    "patient/view",
    async ()=>{
        try {
            const response = await api.get("/view");
            return response.data;
        }catch (error:any){
            return error.response?.data || error.message;
        }

    }
)

const PatientSlice = createSlice({
    name: 'patient',
    initialState: initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(savePatient.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(getAllPatients.fulfilled, (state, action)=>{
                console.log("Fetched Patients:", action.payload);
                return action.payload;
            })

    }
});



export default PatientSlice.reducer;
