import { configureStore } from '@reduxjs/toolkit';
import PatientSlice from "../slice/PatientSlice.ts";
import DoctorSlice from "../slice/DoctorSlice.ts";

export const store = configureStore({
    reducer: {
     patient:PatientSlice,
        doctor:DoctorSlice,
    },
});

export type AppDispatch = typeof store.dispatch;