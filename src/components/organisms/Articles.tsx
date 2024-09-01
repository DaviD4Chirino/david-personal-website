import { useState } from "react";
import { getAllArticles } from "../../database/get";
import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { useEffectOnce } from "react-use";
import { paginate } from "../../utils";
import { Pagination, PaginationProps } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";

type ArticlesProps = {
  /** The things to add to the Articles Wrapper */
  className?: string;
  /** A string to filter the articles by their title, tag or category */
  filter?: string;
  /** How many articles you want,
   * This will also render a pagination component
   */
  count?: number;
  /** This will Slice the articles by the number of counts, non indexed.
   *  @eg the page 2 with a count of 10 will be starting from the 20th element
   */
  page?: number;
  compact?: BlogCardProps["compact"];
  paginationControls?: boolean;
  paginationTop?: boolean;
  paginationBelow?: boolean;
  paginationTheme?: PaginationProps["theme"];
};

/**
 * This will fetch all the Articles and return them unwrapped
 * @returns
 */
export default function Articles({
  className = "",
  filter = "",
  count = -1,
  page = 1,
  compact,
  paginationControls = count > 0,
  paginationBelow = true,
  paginationTop = false,
  paginationTheme,
}: ArticlesProps) {
  const { isLoading, data } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  const articles: Article[] = data ? Object.values(data) : [];

  const [searchParams, setSearchParams] = useSearchParams();
  const articlePage = searchParams.get("articlePage");

  const filteredArticles =
    articles.length > 0
      ? articles.filter(
          (art) =>
            art.title.toLowerCase().includes(filter.toLowerCase()) ||
            art.tags.toLocaleLowerCase().includes(filter.toLowerCase()) ||
            art.category.toLocaleLowerCase().includes(filter.toLowerCase())
        )
      : articles;

  const { items, current_page, total } = paginate(
    filteredArticles,
    count >= 0 ? Number(articlePage) : page,
    count <= -1 ? articles.length : count
  );
  /*  console.log(
    "🚀 ~ count <= -1? articles.length: count:",
    count <= -1 ? articles.length : count
  );
  console.log("🚀 ~ articles.length:", articles.length);
  console.log("🚀 ~ count:", count); */

  const [showLoading, _setShowLoading] = useState(false);

  useEffectOnce(() => {
    if (count <= 0) return;
    setSearchParams(`articlePage=${page}`);
  });

  if (articles.length <= 0) {
    return <h3>No articles to show</h3>;
  }
  if (isLoading) {
    return <>{showLoading ? <h3>Loading... </h3> : <></>}</>;
  }

  return (
    <>
      {paginationControls && paginationTop && (
        <PaginationComponent
          theme={paginationTheme}
          currentPage={current_page}
          totalPages={total}
        />
      )}
      <div className={className}>
        {items?.map((article) => (
          <BlogCard
            title={article.title}
            to={`/blogs/article/${article.name}`}
            tags={article.tags}
            date={article.date}
            description={article.description}
            category={article.category as BlogCardProps["category"]}
            key={article.id}
            compact={compact}
          />
        ))}
      </div>
      {paginationControls && paginationBelow && (
        <PaginationComponent
          theme={paginationTheme}
          currentPage={current_page}
          totalPages={total}
        />
      )}
    </>
  );
}

function PaginationComponent({
  currentPage,
  totalPages,
  theme,
}: {
  currentPage: number;
  totalPages: number;
  theme?: PaginationProps["theme"];
}) {
  const navigate = useNavigate();
  return (
    <Pagination
      theme={theme}
      showIcons
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page: number) => {
        navigate({ search: `articlePage=${page}` });
      }}
    />
  );
}
