import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "../model/Patient.ts";

const initialState: Patient[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/patient",
});

// Fetch all patients
export const getAllPatients = createAsyncThunk("patient/view", async () => {
    try {
        const response = await api.get("/view");
        return response.data || []; // Fallback to empty array if no data
    } catch (error: any) {
        console.error("Error fetching patients:", error);
        return []; // Return empty array in case of error
    }
});

// Add a new patient
export const savePatient = createAsyncThunk(
    "patient/add",
    async (patient: Patient, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", patient);
            return response.data; // Return the newly added patient
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add patient");
        }
    }
);

// Delete a patient
export const deletePatient = createAsyncThunk(
    "patient/delete",
    async (email:string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data; // Return the deleted patient info
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete patient");
        }
    }
);

// Redux slice
const PatientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPatients.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(savePatient.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                return state.filter((patient) => patient.email !== action.payload.email);
            });
    },
});

export default PatientSlice.reducer;
