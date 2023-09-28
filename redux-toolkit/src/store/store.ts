import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";
import { useDispatch } from 'react-redux'
import { githubApi } from "../slices/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubReducer } from "../slices/github.slice";

const store = configureStore({
    reducer: {
        rootReducer: rootReducer(),
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware), 
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
const { dispatch } = store;

export { store, dispatch };