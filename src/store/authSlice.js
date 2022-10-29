import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  state_redux: 'react-redux',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.state_redux = action.payload;
      // console.log({action});
    },
  },
  extraReducers: builder => {},
});

const {reducer, actions} = authSlice;

export const {changeState} = actions;

export default reducer;
