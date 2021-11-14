import {projectLitSlice} from "../screens/project-list/project-list.slice";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = {
    projectList: projectLitSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;


export type RootState = ReturnType<typeof store.getState>;
