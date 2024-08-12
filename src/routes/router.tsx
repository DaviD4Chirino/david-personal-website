import { createBrowserRouter } from "react-router-dom";
import { routes } from "../staticData/pages.json";
import App from "../App";
import Blog from "../components/pages/Blog";
import Article from "../components/pages/Article";
import Article404 from "../components/pages/Article404";

export const router = createBrowserRouter([
  {
    path: routes.homepage,
    element: <App />,
  },
  {
    path: routes.blogs.path,
    element: <Blog />,
  },
  {
    path: routes.article,
    element: <Article />,
  },
  {
    path: routes.articleNonExistent,
    element: <Article404 />,
  },
]);
