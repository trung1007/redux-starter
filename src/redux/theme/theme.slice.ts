import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  theme: string;
} = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action){
        state.theme = action.payload
    }
  },
});

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer
