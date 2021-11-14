import {Project} from "./list";
import {User} from "./search-panel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {projects} from "jira-dev-tool/dist/server/initial-data";
import {AppDispatch, RootState} from "../../store";

interface State {
    projectModalOpen: boolean;
    projects: Project[];
    user: User | null;
}

const initialState: State = {
    projectModalOpen: false,
    projects: [],
    user: null,
};

export const projectLitSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state) {
            state.projectModalOpen = true;
        },
        closeProjectModal(state) {
            state.projectModalOpen = false;
        },
        setProjectList(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});

const { setProjectList } = projectLitSlice.actions;

export const refreshProjects =(promise: Promise<Project[]>) => (
    dispatch: AppDispatch
) => {
    promise.then((projects) => dispatch(setProjectList(projects)));
};

export const projectListActions = projectLitSlice.actions;


export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
