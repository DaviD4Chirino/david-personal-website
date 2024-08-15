import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllArticles, getArticleFile } from "../../database/getArticles";
import { routes } from "../../staticData/pages.json";
import { useState } from "react";
import { toPascalCase } from "../../utils";
import Articles from "../organisms/Articles";
import Markdown from "../atoms/Markdown";
import SectionHeader from "../templates/SectionHeader";
import Navlinks from "../molecules/Navlinks";
import { useUpdateEffect } from "react-use";

export default function Article() {
  const [article, setArticle] = useState<Article>();

  const navigate = useNavigate();
  const { title } = useParams();

  // * Document Query
  const {
    data: document,
    isLoading: documentIsLoading,
    isError: documentError,
  } = useQuery({
    queryKey: [`document-${title || "404"}`],
    queryFn: () => getArticleFile(title || ""),
  });

  // * Article Query
  const { data, error, isError } = useQuery({
    queryKey: [`article-${title || "404"}`],
    queryFn: () => getAllArticles(),
  });

  useUpdateEffect(() => {
    const newArticle: Article | undefined = data
      ? data[title || ""]
      : undefined;

    setArticle(newArticle);
  }, [data]);

  useUpdateEffect(() => {
    if (isError || documentError) {
      console.error("document or data returned an error");
      navigate(routes.articleNonExistent);
    }
  }, [error, documentError]);

  // useUpdateEffect(() => {
  //   if (!documentIsLoading && (!title || !document)) {
  //     navigate(routes.articleNonExistent);
  //     return;
  //   }
  // }, [title, document]);

  // useUpdateEffect(() => {
  //   if (!data) {
  //     navigate(routes.articleNonExistent);
  //     return;
  //   }
  // }, [data]);

  return (
    <section
      className="container grid relative gap-y-20 mx-auto mb-3"
      id="Article"
    >
      <Navlinks className="flex absolute top-5 right-5 gap-1" />

      <article
        id={`${toPascalCase(title || "unknown")}`}
        className="grid gap-5 px-5 py-5 my-10 leading-relaxed max-w-[80ch] mx-auto min-h-screen "
      >
        <Markdown
          children={
            documentIsLoading ? `# Loading Article...` : document?.content
          }
        />
      </article>

      <footer className="grid gap-10">
        <SectionHeader sectionTitle="Same Category">
          <Articles count={4} filter={`${article?.category}`} />
        </SectionHeader>
        {/* <SectionHeader sectionTitle="Read More">
          <Articles count={4} />
        </SectionHeader> */}
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
