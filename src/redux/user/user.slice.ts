import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface IUserPayload {
  name: string;
  age: number;
  email: string;
}

export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    return data;
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: any, thunkAPI) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await res.json();
    return data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload?.name,
        age: payload?.age,
        email: payload?.email,
      }),
    });
    const data = await res.json();
    return data;
  }
);

const initialState: {
  listUsers: IUser[];
  user?:IUser
} = {
  listUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action?.payload;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // state.listUsers = action?.payload;
      state.user = action.payload
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
