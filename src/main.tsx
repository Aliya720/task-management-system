import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    </ModalsProvider>
  </MantineProvider>
);
