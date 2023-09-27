import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../type/user";

export const fetchUserData: any = createAsyncThunk('users/fetchUserData', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error("Server Error");

        }
        const data = await response.json();

        return data;
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
});

export const deleteUser: any = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Can\'t delete userDataUpdate. Server error');

        }
        dispatch(removeUser(id))
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
});

export const addUser: any = createAsyncThunk('users/addUser', async (data, { rejectWithValue, dispatch }) => {
    try {
        const user = {
            name: data,
            id: new Date().toISOString()
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Can\'t Add User. Server error');

        }

        dispatch(addUsers(user))
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
});

const setError = (state: any, action: any) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const users = createSlice({
    name: 'users',
    initialState: {
        data: [] as IUser[],
        status: null as any,
        error: null as any
    },
    reducers: {
        setUser(state, action) {
            state.data = action.payload.payload
        },
        addUsers(state, action) {
            state.data.push(action.payload)
        },
        removeUser(state, action) {
            state.data = state.data.filter((user: any) => user.id !== action.payload);
        },
    },
    extraReducers: {
        [fetchUserData.pending]: (state: any) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchUserData.fulfilled]: (state: any, action: any) => {
            state.status = 'resolved';
            state.data = action.payload
        },
        [fetchUserData.rejected]: setError,
        [deleteUser.rejected]: setError,
        [addUser.rejected]: setError
    }
});
const { addUsers, removeUser } = users.actions;
export default users.reducer;
