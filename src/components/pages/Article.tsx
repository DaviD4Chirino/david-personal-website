import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllArticles } from "../../database/getArticles";
import { getGistFile } from "../../database";
import { routes } from "../../staticData/pages.json";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Article() {
  const navigate = useNavigate();

  const { title } = useParams();
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
        console.log(res, title);

        if (!res || !title) {
          console.log("res, title");
          navigate(routes.articleNonExistent);
          return;
        }
        const currentArticle = res[title];
        if (!currentArticle) {
          navigate(routes.articleNonExistent);
        }

        return getGistFile(
          currentArticle.file,
          "4ada55ee93a94b48c96d472cbd58640d"
        );
      }),
  });
  return (
    <section className="max-w-[75ch] mx-auto my-10" id="Article">
      <Markdown
        remarkPlugins={[remarkGfm]}
        className="grid gap-5 px-5 md:px-10 py-5  shadow-2xl bg-[white]"
        children={data?.content}
      ></Markdown>
    </section>
  );
}
