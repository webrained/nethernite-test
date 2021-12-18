import axios from "axios";
import headers from "./ApiHeaders";

const instance = axios.create({
  baseURL: "https://api.npms.io/v2/",
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  config.headers = headers();
  return config;
});

export default {
  search(q) {
    return instance({
      url: `search?q=${q}`,
      method: "get",
    });
  },
};
