import { useState } from "react";
import { getAllArticles } from "../../database/getArticles";
import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { useUpdateEffect } from "react-use";

type ArticlesProps = {
  /** A string to filter the articles by their title or tag */
  filter?: string;
};

/**
 * This will fetch all the Articles and return them unwrapped
 * @returns
 */
export default function Articles({ filter = "" }: ArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isLoading, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
        const _articles: Article[] = Object.values(res as Articles);
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

  if (isLoading) {
    return <div>Loading...</div>;
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
