import * as yup from "yup";
import { regex } from "../helpers/regex";

export const signInValidationSchema = yup.object({
  password: yup.string().required("This field is required."),
  email: yup
    .string()
    .trim()
    .required("This field is required.")
    .email("Email is invalid!")
    .matches(regex.mailFormat, "Invalid Email Format!"),
});
