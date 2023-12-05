/*eslint-disable*/
import {configureStore, createSlice} from '@reduxjs/toolkit';

//로그인 관련 state들
const userLogin = createSlice({
  name : 'userLogin',
  initialState: {
    name: "",
    id: "",
    isLoading: false,
    isLogin: null,
  },
  reducers : {
    loginUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isLogin = true;
    },
    clearUser: (state, action) => {
      state.name = "";
      state.id = "";
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

