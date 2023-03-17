import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkmode: false,
    filter: false,
    resume: false,
};

export const displaySlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.darkmode = action.payload;
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
        setResume(state, action) {
            state.resume = action.payload;
        },
    },
});

export const { setDarkMode, setFilter, setResume } = displaySlice.actions;
export default displaySlice.reducer;
