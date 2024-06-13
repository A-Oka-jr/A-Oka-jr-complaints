import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signinFailuar: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    signOutUserStart: (state) => {
      state.loading = true;
    },

    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    signOutUserFailuar: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailuar,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailuar,
} = userSlice.actions;
export default userSlice.reducer;
