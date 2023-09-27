import { combineReducers } from "@reduxjs/toolkit";
import users from "../slices/data";

const rootReducer = () =>
    combineReducers({
        users
    })

export { rootReducer }