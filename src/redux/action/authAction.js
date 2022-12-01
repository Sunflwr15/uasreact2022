import { authMeProcess, loginProses, registerProses } from "../../API/auth";
import Cookies from "js-cookie";
import { bindActionCreators } from "redux";

export function authLogin(payload) {
  return async (dispatch) => {
    try {
      let response = await loginProses(payload);
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
