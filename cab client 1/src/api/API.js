import axios from "axios";
import endpoints from "./endpoints.json";
const ServerInstance = axios.create({
  baseURL: `${endpoints.serverURL}/api/v1`,
});

ServerInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});

export default ServerInstance;
