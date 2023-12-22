import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ContextProvider>
            <App />
            {/* <ToastContainer /> */}
          </ContextProvider>
        </AuthProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"}/> */}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
