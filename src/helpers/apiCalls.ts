import { AxiosRequestConfig } from "axios";
import { instance } from "./axiosInstance";

export interface APIRequestInterface<T> {
  data: T;
  message: string;
  success: boolean;
  error: { message: string };
}

export const apiCall = async <T, U>(
  url: string,
  method: string,
  body?: U
): Promise<APIRequestInterface<T>> => {
  const config: AxiosRequestConfig<U> = {
    method,
    url,
    data: body,
  };

  const response = await instance(config);

  return response.data;
};
