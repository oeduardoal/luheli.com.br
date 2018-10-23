import axios from "axios";

const api = axios.create({
  baseURL: "//canoa.canoafilmes.com.br"
});

export default api;
