import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { AuthProvider } from "@/hooks/useAuth";
import { BrowserRouter } from "@/lib/router";
import { Toaster } from "@/components/ui/sonner";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
