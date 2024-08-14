import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllArticles } from "../../database/getArticles";
import { getGistFile } from "../../database";
import { routes } from "../../staticData/pages.json";
import { useState } from "react";
import { toPascalCase } from "../../utils";
import Articles from "../organisms/Articles";
import Markdown from "../atoms/Markdown";

export default function Article() {
  const [article, setArticle] = useState<Article>();
  const navigate = useNavigate();

  const { title } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`article-${title}`],
    queryFn: () =>
      getAllArticles().then((res: Articles | null) => {
        if (!res || !title) {
          navigate(routes.articleNonExistent);
          return;
        }
        const currentArticle = res[title];
        if (!currentArticle) {
          navigate(routes.articleNonExistent);
        }
        setArticle(currentArticle);

        return getGistFile(
          currentArticle.file,
          "4ada55ee93a94b48c96d472cbd58640d"
        );
      }),
  });

  return (
    <section className="container grid gap-10 mx-auto my-5" id="Article">
      <article
        id={`${toPascalCase(title || "unknown")}`}
        className="grid gap-5 px-5 py-5 leading-relaxed max-w-[80ch] mx-auto min-h-screen "
      >
        <Markdown
          children={isLoading ? `# Loading Article...` : data?.content}
        />
      </article>
      <footer className="grid gap-5">
        <section>
          <h3>Read More</h3>
          <Articles count={4} />
        </section>
        <section>
          <h3>Same category</h3>
          <Articles count={4} filter={`${article?.category}`} />
        </section>
      </footer>
      {/* <footer className="flex gap-3 justify-between">
        {prevArticle ? (
          <ContinueReadingLink article={prevArticle} key={"prevArticle"} />
        ) : (
          <div>prev</div>
        )}
        {nextArticle ? (
          <ContinueReadingLink
            article={nextArticle}
            title="Next"
            right
            key={"nextArticle"}
          />
        ) : (
          <div>NExt</div>
        )}
      </footer> */}
    </section>
  );
}
