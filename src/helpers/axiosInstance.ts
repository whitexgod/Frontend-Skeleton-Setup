import axios, { AxiosError } from "axios";
import { Token, AppTypes } from "../enums/enums";
import { URLS } from "../config/urls";

export const baseURL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
  baseURL,
  headers: {
    App: AppTypes.ADMIN,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    Token.ACCESS_TOKEN
  )}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async function (error) {
    if (error instanceof AxiosError) {
      const originalRequest = error.config;

      if (!originalRequest) {
        return;
      }

      // in case of unauthorized response
      if (error.response?.status === 401) {
        try {
          const response = await instance.post(URLS.refreshToken, {
            refreshToken: localStorage.getItem(Token.REFRESH_TOKEN),
          });

          if (!response.data.success) {
            throw new Error("Request Failed ! ");
          }

          const data = response.data.data;

          localStorage.setItem(Token.ACCESS_TOKEN, data.accessToken);
          localStorage.setItem(Token.REFRESH_TOKEN, data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return instance(originalRequest);
        } catch (error) {
          if (error instanceof AxiosError) {
            localStorage.clear();
            window.location.replace("/");
            return;
          }
          console.log("Caught An Unknown Error : ", error);
        }
      }

      return error.response;
    }
    return Promise.reject(error);
  }
);
