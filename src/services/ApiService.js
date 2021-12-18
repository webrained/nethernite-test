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
  searchPackages(params) {
    return instance({
      url: "search",
      method: "get",
      params,
    });
  },
};
