import axios, { syncToken } from "./baseUrl";

export async function loginProses(payload) {
  return axios.post(`/login`, payload);
}
export async function registerProses(payload) {
  return axios.post(`/register`, payload);
}
export async function forgotProses(payload) {
  return axios.post(`/lupa-password`, payload);
}
export async function resetProses(id, token, payload) {
  return axios.post(`/reset-password/${id}/${token}`, payload);
}

export function authMeProcess() {
  syncToken();
  return axios.get("/authme");
}
