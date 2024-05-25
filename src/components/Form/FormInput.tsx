import { InputHTMLAttributes, useId } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorMessage?: string;
}

export default function FormInput({
  errorMessage,
  ...inputProps
}: FormInputProps) {
  const { register, control } = useFormContext();
  const { fieldState } = useController({
    control,
    name: inputProps.name,
  });

  const id = useId();

  return (
    <div>
      <input
        id={inputProps.id ?? id}
        {...inputProps}
        {...register(inputProps.name)}
        className={`form-input p-2 w-full ${inputProps.className}`}
      />
      {fieldState.error?.message ? (
        <p className="text-red-700 text-sm ml-2">{fieldState.error?.message}</p>
      ) : (
        errorMessage && (
          <p className="text-red-700 text-sm ml-2">{errorMessage}</p>
        )
      )}
    </div>
  );
}
