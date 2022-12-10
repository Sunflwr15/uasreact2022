import axios from "./baseUrl";

export async function getProductProcess(kategori, page, keyword, lowest, highest) {
  return axios.get(
    `/produk/list?kategori=${kategori}&page=${page}&pageSize=100&keyword=${keyword}&hargaTerendah=${lowest}&hargaTertinggi=${highest}`
  );
}

export async function getKategoriProcess() {
  return axios.get(
    `http://34.128.70.114/kategori`
  );
}
export async function getDetailProcess(id) {
  return axios.get(
    `http://34.128.70.114/produk/detail/${id}`
  );
}

