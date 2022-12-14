import {
  authMeProcess,
  forgotProses,
  loginProses,
  registerProses,
  resetProses,
} from "../../API/auth";
import Cookies from "js-cookie";
import { bindActionCreators } from "redux";
import { authProcess } from "../reducers/authReducer";

export function authLogin(payload) {
  return async (dispatch) => {
    try {
      let response = await loginProses(payload);
      console.log(payload);
      console.log("res", response);
      let data = response.data;
      // console.log(data.user.email);
      // console.log(data.msg);
      dispatch({
        type: "login",
        name: data?.user?.name,
        email: data?.user?.email,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      // console.log("Data", data);
      return data;
    } catch (err) {
      console.log("Error", err);
      return err.response;
    }
  };
}

export function authRegister(payload) {
  return async (dispatch) => {
    try {
      let response = await registerProses(payload);
      const data = response.data;
      dispatch({
        type: "login",
        name: data?.user?.name,
        email: data?.user?.email,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
export function forgotPassword(payload) {
  return async (dispatch) => {
    try {
      let response = await forgotProses(payload);
      const data = response.data;
      dispatch({
        type: "login",
        email: data?.user?.email,
      });
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
export function resetPassword(id, token, payload) {
  return async (dispatch) => {
    try {
      let response = await resetProses(id, token, payload);
      const data = response.data;
      dispatch({
        type: "login",
        email: data?.user?.email,
      });
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function authMe(payload) {
  return async (dispatch) => {
    try {
      let response = await authMeProcess();
      let data = response.data;
      dispatch({
        type: "login",
        name: data.user.name,
        email: data.user.email,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
