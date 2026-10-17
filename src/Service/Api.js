import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const publicUrls = [
      "/auth/login",
      "/auth/register",
      
    ];

    const isPublicUrlRequest = publicUrls.some((url) =>
      config.url?.startsWith(url)
    );

    if (token && !isPublicUrlRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;