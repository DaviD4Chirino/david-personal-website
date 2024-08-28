import ReactDOM from "react-dom/client";
import "./index.css";
import MUIThemeProvider from "./MUIThemeProvider.tsx";
import AppRoutes from "./routes/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./context/Toast/ToastContext.tsx";

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
