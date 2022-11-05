import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  state_redux: 'react-redux', // initial state
  isLogin: false, // initail state
  stateColor: 'red', // initial state
};

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState, // initialState = state
  reducers: {
    changeState: (state, action) => {
      //; action la payload duoc truyen tu cai dispatch goi ben UI sang
      state.state_redux = action.payload; //payload = hello
      // console.log({action});
    },

    changeLogin: (state, action) => {
      state.isLogin = action.payload; //!isLogin
      //console.log({action});
    },
    changeColor: (state, action) => {
      state.stateColor = action.payload; //  state.stateColor gan lai gia tri cua payload cho  state.stateColor
      console.log({action});
    },
  },
  extraReducers: builder => {},
});

const {reducer, actions} = authSlice;

export const {changeState, changeLogin, changeColor} = actions;

export default reducer;
