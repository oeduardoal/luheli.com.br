import axios from "axios";

const api = axios.create({
  baseURL: "//luheli.canoafilmes.com.br"
});

export default api;
