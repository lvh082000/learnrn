import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login as loginApi} from '../api/auth-api';

const initialState = {
  state_redux: 'react-redux',
  userId: null,
};

export const loginAsyncThunk = createAsyncThunk('auth/login', async data => {
  const responseLogin = await loginApi(data);
  return responseLogin;
});

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.state_redux = action.payload;
      // console.log({action});
    },
    resetAuth: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, (state, action) => {});
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.userId = action.payload?.userId;
    });
    builder.addCase(loginAsyncThunk.rejected, (state, action) => {});
  },
});

const {reducer, actions} = authSlice;

export const {changeState, resetAuth} = actions;

export default reducer;
