import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorMessageToast = (message: string) => toast.error(message);

export const successMessageToast = (message: string) => toast.success(message);

export const infoMessageToast = (message: string) => toast.info(message);

export const warningMessageToast = (message: string) => toast.warn(message);
