import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  light: true,
};

export const lightSlice = createSlice({
  name: "light",
  initialState,
  reducers: {
    setLight: (state, action) => {
      state.light = action.payload;
    },
  },
});

export const { setLight } = lightSlice.actions;

export default lightSlice.reducer;
