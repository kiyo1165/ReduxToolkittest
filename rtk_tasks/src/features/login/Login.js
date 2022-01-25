import React from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";
import {
  editUsername,
  editPassword,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView,
} from "./loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  //username, passwordが入力されていないとbuttonが押せないよにbooleanで設定
  const btnDisabler = authen.username === "" || authen.password === "";

  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen));
    } else {
      const result = await dispatch(fetchAsyncRegister(authen));
      //新規登録が成功(resultとマッチ)すれば、自動でログインする。
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>UserName</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder="username"
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />

        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder="password"
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            onClick={login}
          >
            {isLoginView ? "Login" : "Creaet"}
          </Button>
        </div>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? "Create Acoount ?" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
