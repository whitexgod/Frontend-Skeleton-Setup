import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Token } from "../../enums/enums";
import { useNavigate } from "react-router-dom";
import { signInValidationSchema } from "../../validators/signInValidationSchema";
import {
  AdministratorLoginResponseType,
  LoginRequestType,
} from "../../interfaces/Login";
import FormInput from "../../components/Form/FormInput";
import { usePostOrDeleteMutationQuery } from "../../hooks/useMutationQueries";
import { URLS } from "../../config/urls";
import { successMessageToast } from "../../helpers/toast";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<LoginRequestType>({
    resolver: yupResolver(signInValidationSchema),
  });

  const { mutate: login } = usePostOrDeleteMutationQuery<
    AdministratorLoginResponseType,
    LoginRequestType
  >({
    url: URLS.login,
    showPopup: false,
  });

  const handleSignIn = (formValue: LoginRequestType) => {
    login(formValue, {
      onSuccess: (data) => {
        successMessageToast(`Welcome ${data.name}`);
        localStorage.setItem(Token.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(Token.REFRESH_TOKEN, data.refreshToken);
        navigate("/dashboard");
      },

      onError: (error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <>
      <FormProvider {...form}>
        <div className="flex items-center justify-center bg-gray-100 p-10 rounded-2xl h-screen">
          <div className="max-w-md w-full space-y-8 p-6 bg-gray-200 rounded-2xl">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Login
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={form.handleSubmit(handleSignIn)}
              onChange={() => setErrorMessage("")}
            >
              <div>
                <div>
                  <FormInput
                    placeholder="Email address"
                    name="email"
                    type="text"
                    className="my-2 p-5 rounded-2xl"
                  />
                </div>

                <div>
                  <FormInput
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="my-2 p-5 rounded-2xl"
                  />

                  {errorMessage && (
                    <p className="text-red-700 text-sm my-2 w-full mx-auto">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
