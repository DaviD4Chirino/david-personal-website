import ReactDOM from "react-dom/client";
import "./index.css";
import MUIThemeProvider from "./MUIThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MUIThemeProvider>
    <RouterProvider router={router} />
  </MUIThemeProvider>
);
