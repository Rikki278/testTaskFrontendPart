import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";


// Configure the Redux store with the noteSlice reducer
const store = configureStore({
    reducer: {
        'notes': noteSlice, // State slice for notes, managed by noteSlice reducer
    }
});

export default store;