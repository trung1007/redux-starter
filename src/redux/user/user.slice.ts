import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface IUserPayload {
  name?: string;
  age?: number;
  email?: string;
}

export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async () => {
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
    if (data && data?.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
);

const initialState: {
  listUsers: IUser[];
  user?: IUser;
  isCreateSuccess?: boolean;
  isLoading?: boolean;
} = {
  listUsers: [],
  isCreateSuccess: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.isCreateSuccess = false; 
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action?.payload;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // state.listUsers = action?.payload;
      state.user = action.payload;
    });
    builder.addCase(createUser.pending, (state, action) => {
      // state.listUsers = action?.payload;
      state.isLoading = true;
      state.isCreateSuccess = false
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // state.listUsers = action?.payload;
      state.isLoading = false;
      state.isCreateSuccess = true;
    });
  },
});

export const {resetCreateSuccess} = userSlice.actions;

export default userSlice.reducer;
