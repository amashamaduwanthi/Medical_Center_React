
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Doctor from "../model/Doctor.ts";
import {deletePatient} from "./PatientSlice.ts";







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
export const getAllDoctors=createAsyncThunk(
    "doctor/view",
     async ()=>{
        try{
          const response= await api.get("/view");
          return response.data;

        }catch(error:any){
            return error.response?.data || error.message;
        }
    }
)

export const deleteDoctors = createAsyncThunk(
    "doctor/delete",
    async (name:string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${name}`);
            return response.data; // Return the deleted patient info
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete patient");
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
            .addCase(getAllDoctors.fulfilled,(state,action)=>{
                console.log("Fetched Doctors",action.payload);
                return action.payload;
            })
            .addCase(deleteDoctors.fulfilled, (state, action) => {
                return state.filter((doctor) => doctor.name !== action.payload.name);
            });
    }
});



export default DoctorSlice.reducer;
