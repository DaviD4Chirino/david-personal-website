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

let renders = 0;

//? this reload 4 times, guess why
export default function Article() {
  const [article, setArticle] = useState<Article>();
  const [prevArticle, setPrevArticle] = useState<Article>();
  const [nextArticle, setNextArticle] = useState<Article>();

  const navigate = useNavigate();
  const { title } = useParams();

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
    if (isError) {
      console.error("document or data returned an error");
      navigate(routes.articleNonExistent);
    }
  }, [error]);

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
    /*  console.log(
      articlesArray[currentArticleIndex + 1],
      articlesArray[currentArticleIndex - 1]
    ); */
  }, [article]);
  // const {[refresh,]}=useCounter(0)

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
      <Document title={title || ""} />
      {/*  <footer className="grid gap-10">
        <SectionHeader sectionTitle="Same Category">
          <Articles count={4} filter={`${article?.category}`} />
        </SectionHeader>
        {/* <SectionHeader sectionTitle="Read More">
          <Articles count={4} />
        </SectionHeader> 
      </footer> */}
      {data && <Footer articles={data} />}
    </section>
  );
}

function Document({ title }: { title: string }) {
  renders++;
  console.log("Total Renders:", renders);
  const navigate = useNavigate();
  // * Document Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`document-${title || "404"}`],
    queryFn: () => getArticleFile(title),
  });

  useUpdateEffect(() => {
    if (isError) {
      console.error("Document query returned an error: " + error);
      navigate(routes.articleNonExistent);

      return;
    }
  }, [isError]);

  return (
    <article
      id={toPascalCase(title)}
      className={`grid gap-5 px-5 py-5 mx-auto my-10 min-h-screen leading-relaxed max-w-[80ch] animate-fade-up`}
    >
      <Markdown children={isLoading ? `# Loading Article...` : data?.content} />
    </article>
  );
}

function Footer({ articles }: { articles: Articles }) {
  const { title } = useParams();
  const articlesArray = Object.values(articles);
  const currentArticleIndex: number = Object.keys(articles).findIndex(
    (art) => art == title
  );

  const nextArticle = articlesArray[currentArticleIndex + 1];
  const prevArticle = articlesArray[currentArticleIndex - 1];

  return (
    <footer className="flex gap-3 justify-between">
      {prevArticle ? (
        <ContinueReadingLink article={prevArticle} />
      ) : (
        <div></div>
      )}
      {prevArticle ? (
        <ContinueReadingLink article={prevArticle} title="Next" right />
      ) : (
        <div></div>
      )}
    </footer>
  );
}
