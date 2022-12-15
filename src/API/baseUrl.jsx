import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "https://34.128.70.114",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("myapps_token")}`,
  },
});

client.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => {
    console.log("err", error);
    if (401 === error.response.status) {
      // console.log(error);
      Cookies.remove("myapps_token");
      clearToken();
      localStorage.clear();
      // window.location.replace("/login");
    } else {
      return Promise.reject(error);
    }
  }
);
export const syncToken = () => {
  client.defaults.headers["Authorization"] = `Bearer ${Cookies.get(
    "myapps_token"
  )}`;
};
export const clearToken = () => {
  delete client.defaults.headers["Authorization"];
};

export default client
