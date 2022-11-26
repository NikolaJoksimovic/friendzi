import { configureStore, createSlice } from "@reduxjs/toolkit";

const varsSlice = createSlice({
  name: "vars",
  initialState: {
    authToken: false,
    isSignIn: true,
  },
  reducers: {
    invertAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    invertIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
  },
});

export const selectAllVariables = (state) => state.vars;
export const { invertAuthToken, invertIsSignIn } = varsSlice.actions;
export const store = configureStore({
  reducer: {
    vars: varsSlice.reducer,
  },
});
