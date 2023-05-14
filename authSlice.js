import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = true;
    },
    clearUser: (state) => {
      state.user = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
