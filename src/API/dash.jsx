import axios from "./baseUrl";

export async function getProductProcess(
  kategori,
  page,
  keyword,
  lowest,
  highest
) {
  return axios.get(
    `/produk/list?kategori=${kategori}&page=${page}&pageSize=100&keyword=${keyword}&hargaTerendah=${lowest}&hargaTertinggi=${highest}`
  );
}

export async function getKategoriProcess() {
  return axios.get(`/kategori`);
}
export async function getCartProcess() {
  return axios.get(`/keranjang`);
}

export async function postCartProcess(payload) {
  console.log("id", payload);
  return axios.post(`/keranjang/tambah`, payload);
}

export async function postBuyProcess(payload) {
  console.log("payload", payload);
  return axios.post(`/beli/tambah`, payload);
}
export async function putItemProcess(payload) {
  console.log("payload", payload);
  return axios.put(`/keranjang/ubah-jumlah-item`, payload);
}

export async function deleteCartProcess(id) {
  return axios.delete(`/keranjang/hapus/${id}`);
}

export async function getDetailProcess(id) {
  return axios.get(`/produk/detail/${id}`);
}

export async function getHistoryProcess() {
  return axios.get(`/beli/history`);
}
