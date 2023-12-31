import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-xl mx-auto">
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
