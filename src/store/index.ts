import {projectLitSlice} from "../screens/project-list/project-list.slice";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth.slice";

export const rootReducer = {
    projectList: projectLitSlice.reducer,
    auth: authSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;


export type RootState = ReturnType<typeof store.getState>;
