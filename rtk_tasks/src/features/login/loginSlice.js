import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/";
const token = localStorage.localJWT;

//ログイン
export const fetchAsyncLogin = createAsyncThunk(
  "login/post",
  //コンポーネントからpostされた情報をauthで受け取る。
  async (auth) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

//新規登録
export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  //コンポーネントからpostされた情報をauthで受け取る。
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

//自分のProfileを取得
export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiUrl}api/myself/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});
const loginSlice = createSlice({
  name: "login",
  initialState: {
    authen: {
      username: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      username: "",
    },
  },
  reducers: {
    //actionを定義
    /*
      1. username, passwordの変更
      2. dispatchで渡ってきたaction.payloadを上書き
      */
    editUsername(state, action) {
      state.authen.username = action.payload;
      console.log(state.authen.username);
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    //ログイン可否をトグルで反転
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    //ログインが成功
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      //localStorageにpayload( === return res.data)で渡ってきたtokenを保存
      localStorage.setItem("localJWT", action.payload.access);
      //成功した場合は/tasksへリダイレクト
      action.payload.access && (window.location.href = "/tasks");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      //action.payload( === return res.data)で渡ってきたprofdataをstate.profileへ保存
      state.profile = action.payload;
    });
  },
});

//actionをコンポーネントで使えるようにしている。
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;

// stateをコンポーネントで利用できるようにする。
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

//reducerをエキスポート
export default loginSlice.reducer;
