import ReactDOM from "react-dom/client";
import "./index.css";
import MUIThemeProvider from "./MUIThemeProvider";
import AppRoutes from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./context/Toast/ToastContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MUIThemeProvider>
      <ToastContextProvider>
        <AppRoutes />
      </ToastContextProvider>
    </MUIThemeProvider>
  </QueryClientProvider>
);
