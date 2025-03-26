import { configureStore } from '@reduxjs/toolkit';
import PatientSlice from "../slice/PatientSlice.ts";
import DoctorSlice from "../slice/DoctorSlice.ts";
import AppointmentSlice from "../slice/AppointmentSlice.ts";
import UserSlice from "../slice/UserSlice.ts";
import SignUpSlice from "../slice/SignUpSlice.ts";

export const store = configureStore({
    reducer: {
     patient:PatientSlice,
        doctor:DoctorSlice,
        appointment:AppointmentSlice,
        users : UserSlice,
        signUp:SignUpSlice,
    },
});

export type AppDispatch = typeof store.dispatch;