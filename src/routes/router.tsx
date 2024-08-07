import { createHashRouter } from "react-router-dom";
import { routes } from "../staticData/pages.json";
import App from "../App";
import Blog from "../components/pages/Blog";

export const router = createHashRouter([
  {
    path: routes.homepage,
    element: <App />,
  },
  {
    path: routes.blogs.path,
    element: <Blog />,
    children: [{ path: routes.blogs.children.article, element: <Blog /> }],
  },
]);
