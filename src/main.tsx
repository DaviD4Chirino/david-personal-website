import ReactDOM from "react-dom/client";
import "./index.css";
import MUIThemeProvider from "./MUIThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MUIThemeProvider>
      <RouterProvider router={router} />
    </MUIThemeProvider>
  </QueryClientProvider>
);
