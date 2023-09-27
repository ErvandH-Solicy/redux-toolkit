import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer"; 
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: rootReducer()
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
const { dispatch } = store;

export { store, dispatch };