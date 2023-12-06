/*eslint-disable*/
import {configureStore, createSlice} from '@reduxjs/toolkit';

//로그인 관련 state들
const userLogin = createSlice({
  name : 'userLogin',
  initialState: {
    email: "",
    password: "",
    isLoading: false,
    isLogin: null,
  },
  reducers : {
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLogin = true;
    },
    clearUser: (state, action) => {
      state.email = "";
      state.password = "";
      state.isLogin = false;
    },
  },
});
export const { loginUser, clearUser} = userLogin.actions;

const store = configureStore({
  reducer: {
    userLogin : userLogin.reducer,
  }
})


export default store;

