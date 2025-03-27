import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Payment from "../model/Payment.ts";


const initialState: Payment[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/payment",
});



// Add a new patient
export const savePayment = createAsyncThunk(
    "payment/add",
    async (payment: Payment, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", payment);
            return response.data; // Return the newly added patient
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add payment");
        }
    }
);



// Redux slice
const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(savePayment.fulfilled, (state, action) => {
                state.push(action.payload);
            })

    },
});

export default PaymentSlice.reducer;
