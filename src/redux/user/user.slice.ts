import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
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
  async (payload: IUser, thunkAPI) => {
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: IUser, thunkAPI) => {
    const res = await fetch(`http://localhost:3000/users/${payload?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:payload?.id,
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload: IUser, thunkAPI) => {
    const res = await fetch(`http://localhost:3000/users/${payload?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListUsers());
    return data;
  }
);


const initialState: {
  listUsers: {
    data?: IUser[];
    isLoading?: boolean;
  };
  user: {
    data?: IUser;
    isLoading?: boolean;
    isUpdate?: boolean;
    isGetSuccess?: boolean;
  };
  createUser: {
    isCreateSuccess?: boolean;
    isLoading?: boolean;
  };
  updateUser:{
    isUpdateSuccess?: boolean;
    isLoading?: boolean;
  };
  deleteUser:{
    isDeleteSuccess?: boolean;
    isLoading?: boolean;
  }

} = {
  listUsers: {
    data: [],
    isLoading: false,
  },
  user: {
    data: {},
    isLoading: false,
    isUpdate: false,
    isGetSuccess: false,
  },
  createUser: {
    isCreateSuccess: false,
    isLoading: false,
  },
  updateUser:{
    isUpdateSuccess: false,
    isLoading: false,
  },
  deleteUser:{
    isDeleteSuccess: false,
    isLoading: false
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetFetchUser: (state) => {
      (state.user.isLoading = false), (state.user.isGetSuccess = false);
    },
    resetCreateSuccess: (state) => {
      state.createUser.isCreateSuccess = false;
      state.createUser.isLoading = false;
    },
    resetDeleteSuccess: (state) => {
      state.deleteUser.isDeleteSuccess = false;
      state.deleteUser.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers.data = action?.payload;
    });
    builder.addCase(fetchUserById.pending, (state, action) => {
      (state.user.isLoading = true), (state.user.isGetSuccess = false);
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      (state.user.isLoading = false), (state.user.isGetSuccess = true);
      state.user.data = action.payload;
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.createUser.isLoading = true;
      state.createUser.isCreateSuccess = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.createUser.isLoading = false;
      state.createUser.isCreateSuccess = true;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.updateUser.isLoading = true;
      state.updateUser.isUpdateSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUser.isLoading = false;
      state.updateUser.isUpdateSuccess = true;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.deleteUser.isLoading = true;
      state.deleteUser.isDeleteSuccess = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleteUser.isLoading = false;
      state.deleteUser.isDeleteSuccess = true;
    });
  },
});

export const { resetCreateSuccess, resetFetchUser, resetDeleteSuccess } = userSlice.actions;

export default userSlice.reducer;
