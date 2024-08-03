import { createHashRouter } from "react-router-dom";
import { routes } from "../staticData/pages.json";
import App from "../App";

export const router = createHashRouter([
  {
    path: routes.homepage,
    element: <App />,
  },
]);
