import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllArticles, getArticleFile } from "../../database/get";
import { routes } from "../../staticData/pages.json";
import { toPascalCase } from "../../utils";
import Markdown from "../atoms/Markdown";
import Navlinks from "../molecules/Navlinks";
import { useTitle, useUpdateEffect } from "react-use";
import ContinueReadingLink from "../organisms/ContinueReadingLink";
import { DiscussionEmbed } from "disqus-react";
import SharePage from "../molecules/SharePage";

//? this reload 4 times, guess why
export default function Article() {
  const navigate = useNavigate();
  const { title } = useParams();
  // * Article Query
  const { data, error, isError } = useQuery({
    queryKey: [`article-${title ? title : "404"}`],
    queryFn: () => getAllArticles(),
  });

  useUpdateEffect(() => {
    if (isError && !data) {
      console.error("document or data returned an error");
      navigate(routes.articleNonExistent);
    }
  }, [error]);

  const currentArticle = data ? data[title || ""] : null;

  useTitle(
    currentArticle ? `${currentArticle?.title} - David'Space` : "David'Space",
    {
      restoreOnUnmount: true,
    }
  );
  console.log("location", `${window.location.href}`);

  return (
    <section
      className="container grid relative gap-y-24 mb-12"
      id="Article"
      key={title}
    >
      <Navlinks className="flex absolute top-5 right-5 gap-1" />
      <Document title={title || ""} />

      <footer className="grid gap-y-20">
        {data && <ContinueReading articles={data} />}
        <SharePage
          title={data ? data[title || ""].title : ""}
          className="flex flex-wrap gap-x-3 -mb-28 h-fit place-items-center"
          iconSize={40}
        />
        <DiscussionEmbed
          shortname="david-space"
          config={{
            url: `${window.location.href}`,
            identifier: title,
            title: title,
            language: "en",
          }}
        />
      </footer>

      {/* ? Maybe */}
      {/* <SectionHeader sectionTitle="Same Category">
        <Articles count={4} filter={`${article?.category}`} />
      </SectionHeader> */}
    </section>
  );
}

function Document({ title }: { title: string }) {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`document-${title || "404"}`],
    queryFn: () => getArticleFile(title),
  });

  // getGistFiles
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
      className="
        mt-36 mx-auto
        grid gap-6
        leading-relaxed 
        max-w-[80ch] w-fit min-h-screen
        animate-fade-up
        break-words whitespace-break-spaces
        article-md
      "
    >
      <Markdown children={isLoading ? `# Loading Article...` : data?.content} />
    </article>
  );
}

function ContinueReading({ articles }: { articles: Articles }) {
  const { title } = useParams();

  const articlesArray = Object.values(articles);
  const articlesKeys = Object.keys(articles);

  const currentArticleIndex: number = Object.keys(articles).findIndex(
    (art) => art == title
  );

  const prevIndex: number = currentArticleIndex - 1;
  const nextIndex: number = currentArticleIndex + 1;

  const prevArticle: Article | undefined = articlesArray[prevIndex];
  const nextArticle: Article | undefined = articlesArray[nextIndex];

  const prevSlug: string = articlesKeys[prevIndex];
  const nextSlug: string = articlesKeys[nextIndex];

  return (
    <section className="grid h-max grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-5">
      {prevArticle ? (
        <ContinueReadingLink title={prevArticle.title} articleSlug={prevSlug} />
      ) : (
        <div></div>
      )}
      {nextArticle ? (
        <ContinueReadingLink
          title={nextArticle.title}
          articleSlug={nextSlug}
          prevOrNext="Next"
          right
        />
      ) : (
        <div></div>
      )}
    </section>
  );
}
