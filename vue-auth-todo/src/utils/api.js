
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/auth/login",
  timeout: 5000,
});

export default api;
