import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../features/taskSlice";
import formSlice from "../features/formSlice";
import displaySlice from "../features/displaySlice";

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        form: formSlice,
        display: displaySlice,
    },
});
