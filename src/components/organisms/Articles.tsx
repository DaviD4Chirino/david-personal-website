import { useState } from "react";
import { getAllArticles } from "../../database/getArticles";
import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { useUpdateEffect } from "react-use";
import { paginateArray } from "../../utils";

type ArticlesProps = {
  /** A string to filter the articles by their title or tag */
  filter?: string;
  /** How many articles you want */
  count?: number;
  /** This will Slice the articles by the number of counts, non indexed
   *  @eg the page 2 with a count of 10 will be starting from the 20th element
   */
  page?: number;
};

/**
 * This will fetch all the Articles and return them unwrapped
 * @returns
 */
export default function Articles({
  filter = "",
  count = -1,
  page = 1,
}: ArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isLoading, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
        const _articles: Article[] = Object.values(res as Articles);

        if (count >= 0) {
          const newArticles: Article[] = paginateArray(_articles, count, page);

          if (newArticles.length <= 0) {
            console.error("page exceeds the limits of the article array");
          }

          setArticles(newArticles);
          return _articles;
        }
        setArticles(_articles);
        return _articles;
      }),
  });

  useUpdateEffect(() => {
    if (!filter) {
      return;
    }
    const newList = data?.filter(
      (art) =>
        art.title.toLowerCase().includes(filter.toLowerCase()) ||
        art.tags.toLocaleLowerCase().includes(filter.toLowerCase())
    );
    setArticles(newList || []);
  }, [filter]);

  useUpdateEffect(() => {
    if (count <= 0) return;
    const newArticles: Article[] = paginateArray(data || articles, count, page);
    setArticles(newArticles);
  }, [count, page]);

  if (articles.length <= 0) {
    return <h3>No articles to show</h3>;
  }
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      {articles?.map((article) => (
        <BlogCard
          title={article.title}
          tags={article.tags}
          date={article.date}
          description={article.description}
          category={article.category as BlogCardProps["category"]}
          key={article.id}
        />
      ))}
    </>
  );
}
