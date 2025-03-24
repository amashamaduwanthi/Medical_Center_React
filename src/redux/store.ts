import { configureStore } from '@reduxjs/toolkit';
import PatientSlice from "../slice/PatientSlice.ts";
import DoctorSlice from "../slice/DoctorSlice.ts";
import AppointmentSlice from "../slice/AppointmentSlice.ts";

export const store = configureStore({
    reducer: {
     patient:PatientSlice,
        doctor:DoctorSlice,
        appointment:AppointmentSlice
    },
});

export type AppDispatch = typeof store.dispatch;