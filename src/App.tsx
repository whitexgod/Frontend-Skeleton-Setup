import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { GlobalProvider } from "./context/GlobalContext";
import Router from "./router/Router";
import { queryClient } from "./config/queryClientConfig";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-gray-50 ">
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Router />
        </GlobalProvider>

        <ToastContainer autoClose={3000} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
