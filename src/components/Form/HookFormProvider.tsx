// components/HookFormProvider.tsx
import React, { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";

interface HookFormProviderProps {
  validationSchema: AnyObjectSchema;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => void;
  children: ReactNode;
}

const HookFormProvider: React.FC<HookFormProviderProps> = ({
  validationSchema,
  defaultValues = {},
  onSubmit,
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const handleSubmit = (data: any) => {
    try {
      onSubmit(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        onChange={() => setErrorMessage("")}
      >
        {children}
        {errorMessage && (
          <p className="text-red-700 text-sm my-2 w-full mx-auto">
            {errorMessage}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default HookFormProvider;
