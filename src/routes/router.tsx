import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../staticData/pages.json";
import App from "../App";
import Blog from "../components/pages/Blog";
import Article from "../components/pages/Article";
import Article404 from "../components/pages/Article404";
import ScrollToTop from "../../astro-site/src/components/atoms/ScrollToTop";
import Editor from "../components/pages/Editor";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={routes.homepage} index element={<App />} />
        <Route path={routes.blogs.path} element={<Blog />} />
        <Route path={routes.article} element={<Article />} />
        <Route path={routes.articleNonExistent} element={<Article404 />} />
        <Route path={routes.editor} element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}
