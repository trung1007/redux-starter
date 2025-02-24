import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    return data
  }
);

const initialState = {
  listUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('action', action);
      
    })
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
