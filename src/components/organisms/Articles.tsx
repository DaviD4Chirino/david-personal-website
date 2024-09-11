"use client";
import { useState } from "react";
import { getAllArticles } from "../../database/get";
import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { useEffectOnce } from "react-use";
import { paginate, sortAlphabetically, sortByNumberSize } from "../../utils";
import { Pagination, PaginationProps } from "flowbite-react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";

export type ArticlesProps = {
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
  orderBy: "date" | "alphabetically" | "category";
  /** Can be use to reverse sorting */
  reverseArticles?: boolean;
};
type Filters = {
  [type in ArticlesProps["orderBy"]]: (a: Article, b: Article) => number;
};

const filters: Filters = {
  date: (a: Article, b: Article): number =>
    sortByNumberSize(
      DateTime.fromFormat(a.date, "yyyy-MM-dd").toUnixInteger(),
      DateTime.fromFormat(b.date, "yyyy-MM-dd").toUnixInteger(),
      "bigger"
    ),
  alphabetically: (a: Article, b: Article): number => {
    return sortAlphabetically(a.title, b.title);
  },
  category: (a: Article, b: Article): number => {
    return sortAlphabetically(a.category, b.category);
  },
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
  orderBy = "date",
  reverseArticles = false,
}: ArticlesProps) {
  const { isLoading, data } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  // We get the current page
  const [showLoading, _setShowLoading] = useState(false);
  const searchParams = useSearchParams();

  const articlePage = searchParams.get("articlePage");

  let articles: Article[] = data ? Object.values(data) : [];

  // First we sort the articles
  articles = articles.sort(filters[orderBy]);

  // Second we filter them
  articles =
    articles.length > 0
      ? articles.filter(
          (art) =>
            // not elegant but its the easiest way
            // check for either the title, tags or category
            art.title.toLowerCase().includes(filter.toLowerCase()) ||
            art.tags.toLocaleLowerCase().includes(filter.toLowerCase()) ||
            art.category.toLocaleLowerCase().includes(filter.toLowerCase())
        )
      : articles;

  // Third we reverse them in case we want them descending or ascending
  articles = reverseArticles ? articles.reverse() : articles;

  // Fourth we Paginate them
  const { items, current_page, total } = paginate(
    articles,
    count >= 0 ? Number(articlePage) : page,
    count <= -1 ? articles.length : count
  );

  useEffectOnce(() => {
    if (count <= 0) return;
    /*  setSearchParams((prevParams) => {
      prevParams.set("articlePage", `${page}`);
      return searchParams;
    }); */
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
  const searchParams = useSearchParams();
  return (
    <Pagination
      theme={theme}
      showIcons
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page: number) => {
        /* setSearchParams((prevParams) => {
          prevParams.set("articlePage", `${page}`);
          return searchParams;
        }); */
      }}
    />
  );
}
