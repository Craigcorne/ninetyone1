import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v2",
  // Other configuration options
});

export default axiosInstance;
