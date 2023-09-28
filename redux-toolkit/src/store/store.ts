import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";
import { useDispatch } from 'react-redux'
import { githubApi } from "../slices/github.api";

const store = configureStore({
    reducer: {
        rootReducer: rootReducer(),
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware), 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
const { dispatch } = store;

export { store, dispatch };