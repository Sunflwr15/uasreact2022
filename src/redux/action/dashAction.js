import { getProductProcess, postBuyProcess, postCartProcess, putItemProcess } from "../../API/dash";

// membuat action
export function addToCartProcess(payload) {
  return async (dispatch) => {
    try {
      let response = await postCartProcess(payload);
      console.log(response);
      let data = response;
      console.log(data.data);
      return data;
    } catch (err) {
      console.log("Error", err);
      return err.response;
    }
  };
}



export function putProcess(payload) {
  return async (dispatch) => {
    console.log(payload);
    try {
      let response = await putItemProcess(payload);
      console.log(response);
      let data = response;
      console.log(data.data);
      // return data;
    } catch (err) {
      console.log("Error", err);
      return err.response;
    }
  };
}


export function buyNowProcess(payload) {
  return async (dispatch) => {
    console.log(payload);
    try {
      let response = await postBuyProcess(payload);
      console.log(response);
      let data = response;
      console.log(data.data);
      // return data;
    } catch (err) {
      console.log("Error", err);
      return err.response;
    }
  };
}
