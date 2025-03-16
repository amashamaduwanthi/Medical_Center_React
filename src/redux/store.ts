import { configureStore } from '@reduxjs/toolkit';
import PatientSlice from "../slice/PatientSlice.ts";

export const store = configureStore({
    reducer: {
     patient:PatientSlice
    },
});

export type AppDispatch = typeof store.dispatch;