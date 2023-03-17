import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    viewForm: false,
    editID: undefined,
};

export const formSlice = createSlice({
    name: "viewForm",
    initialState,
    reducers: {
        openForm(state, action) {
            state.viewForm = true;
            state.editID = action.payload;
        },
        closeForm(state) {
            state.viewForm = false;
        },
    },
});

export const { openForm, closeForm } = formSlice.actions;
export default formSlice.reducer;
