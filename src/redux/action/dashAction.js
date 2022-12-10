import { getProductProcess } from "../../API/dash";

// membuat action
export function getListProduct( kategori, page, keyword, lowest, highest ) {
  return async (dispatch) => {
    try {
      let response = await getProductProcess(
        kategori,
        page,
        keyword,
        lowest,
        highest
      );
      let data = response;
      console.log(data)
      return data;
    } catch (err) {
      console.log("Error", err);
      return err.response;
    }
  };
}
