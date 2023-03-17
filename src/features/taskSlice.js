import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [
    {
        id: uuid(),
        title: "Task 1",
        description: "Task 1 description here",
        date: "2023-03-15",
        completed: true,
        important: true,
        visible: true,
    },
    {
        id: uuid(),
        title: "Task 2",
        description: "Task 2 description here",
        date: "2023-03-14",
        completed: false,
        important: false,
        visible: true,
    },
];

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        createTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            const taskFound = state.find((task) => task.id === action.payload);
            if (taskFound) {
                // taskFound es el objeto dentro del array
                state.splice(state.indexOf(taskFound), 1); // se quita el objeto en el indice que matchea el objeto encontrado
            }
        },
        editTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const taskFound = state.find((task) => task.id === id);
            if (taskFound) {
                taskFound.completed = status;
            }
        },
        editTaskFavourite: (state, action) => {
            const { id, status } = action.payload;
            const taskFound = state.find((task) => task.id === id);
            if (taskFound) {
                taskFound.important = status;
            }
        },
        editTask: (state, action) => {
            const { id, title, description, date, completed, important } =
                action.payload;
            const taskFound = state.find((task) => task.id === id);
            if (taskFound) {
                taskFound.title = title;
                taskFound.description = description;
                taskFound.date = date;
                taskFound.completed = completed;
                taskFound.important = important;
            }
        },
        sortState: (state, action) => {
            switch (action.payload) {
                case "earlier-first":
                    state.sort((p1, p2) =>
                        p1.date > p2.date ? 1 : p1.date < p2.date ? -1 : 0
                    );
                    break;
                case "later-first":
                    state.sort((p1, p2) =>
                        p1.date > p2.date ? -1 : p1.date < p2.date ? 1 : 0
                    );
                    break;
                case "completed-first":
                    state.sort((p1, p2) => p2.completed - p1.completed);
                    break;
                case "uncompleted-first":
                    state.sort((p1, p2) => p1.completed - p2.completed);
                    break;
                default:
                    break;
            }
        },
    },
});

export const {
    createTask,
    deleteTask,
    editTaskStatus,
    editTaskFavourite,
    editTask,
    sortState,
} = taskSlice.actions;

export default taskSlice.reducer;
