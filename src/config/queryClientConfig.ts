import { QueryCache, QueryClient, QueryKey } from "@tanstack/react-query";
import { apiCall } from "../helpers/apiCalls";
import { AxiosError } from "axios";

export const defaultGetQueryFn = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  if (!queryKey) return;
  const url = queryKey[0] as string;
  const response = await apiCall(url, "GET");
  return response.data;
};

const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      queryFn: defaultGetQueryFn,
    },
  },
});
