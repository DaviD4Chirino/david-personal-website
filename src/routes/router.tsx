import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../staticData/pages.json";
import App from "../App";
import Blog from "../components/pages/Blog";
import Article from "../components/pages/Article";
import Article404 from "../components/pages/Article404";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.homepage} element={<App />} />
        <Route path={routes.blogs.path} element={<Blog />} />
        <Route path={routes.article} element={<Article />} />
        <Route path={routes.articleNonExistent} element={<Article404 />} />
      </Routes>
    </BrowserRouter>
  );
}
