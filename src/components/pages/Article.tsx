import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllArticles, getArticleFile } from "../../database/getArticles";
import { routes } from "../../staticData/pages.json";
import { useState } from "react";
import { toPascalCase } from "../../utils";
import Markdown from "../atoms/Markdown";
import Navlinks from "../molecules/Navlinks";
import { useUpdateEffect } from "react-use";
import ContinueReadingLink from "../organisms/ContinueReadingLink";

//? this reload 4 times, guess why
export default function Article() {
  const [article, setArticle] = useState<Article>();
  const [prevArticle, setPrevArticle] = useState<Article>();
  const [nextArticle, setNextArticle] = useState<Article>();

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

  useUpdateEffect(() => {
    if (!data || !title) {
      return;
    }
    const articlesArray: Article[] = Object.values(data);
    const currentArticleIndex: number = Object.keys(data).findIndex(
      (art) => art == title
    );

    setNextArticle(articlesArray[currentArticleIndex + 1]);
    setPrevArticle(articlesArray[currentArticleIndex - 1]);
    console.log(
      articlesArray[currentArticleIndex + 1],
      articlesArray[currentArticleIndex - 1]
    );
  }, [article]);

  useUpdateEffect(() => {
    if (title) {
      window.scrollTo({ top: 0 });
    }
  }, [title]);
  return (
    <section
      className="container grid relative gap-y-20 mx-auto mb-3"
      id="Article"
      key={title}
    >
      <Navlinks className="flex absolute top-5 right-5 gap-1" />
      <article
        id={`${toPascalCase(title || "unknown")}`}
        className={`grid gap-5 px-5 py-5 my-10 leading-relaxed max-w-[80ch] mx-auto min-h-screen ${
          documentIsLoading ? "":"animate-fade-up"}`}
      >
        <Markdown
          children={
            documentIsLoading ? `# Loading Article...` : document?.content
          }
        />
      </article>
      {/*  <footer className="grid gap-10">
        <SectionHeader sectionTitle="Same Category">
          <Articles count={4} filter={`${article?.category}`} />
        </SectionHeader>
        {/* <SectionHeader sectionTitle="Read More">
          <Articles count={4} />
        </SectionHeader> 
      </footer> */}
      <footer className="flex gap-3 justify-between">
        {prevArticle ? (
          <ContinueReadingLink article={prevArticle} />
        ) : (
          <div></div>
        )}
        {nextArticle ? (
          <ContinueReadingLink article={nextArticle} title="Next" right />
        ) : (
          <div></div>
        )}
      </footer>
    </section>
  );
}
