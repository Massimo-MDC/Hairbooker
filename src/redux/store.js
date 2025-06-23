import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import appointmentsReducer from './appointmentsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        appointments: appointmentsReducer,
    },
});

export default store;