import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { APIRequestInterface, apiCall } from "../helpers/apiCalls";
import { errorMessageToast, successMessageToast } from "../helpers/toast";
import { MutationMethods } from "../enums/enums";

export const usePostOrDeleteMutationQuery = <T, U>({
  url,
  method = MutationMethods.POST,
  showPopup = true,
  ...mutationOptions
}: {
  url: string;
  method?: MutationMethods;
  mutationOptions?: UseMutationOptions<T>;
  showPopup?: boolean;
}) => {
  const defaultPostQueryFn = async (body: U): Promise<T> => {
    const response: APIRequestInterface<T> = await apiCall(url, method, body);

    if (response.success && showPopup) {
      successMessageToast(response.message);
    }

    if (!response.success) {
      if (showPopup) {
        errorMessageToast(response.message);
      }
      throw response;
    }

    return response.data;
  };

  return useMutation<T, Error, U>({
    ...mutationOptions,
    mutationFn: defaultPostQueryFn,
  });
};

// Example usage
// const { mutate: login } = usePostOrDeleteMutationQuery<
// AdministratorLoginResponseType,
// LoginRequestType
// >({
// url: URLS.login,
// showPopup: false,
// });
