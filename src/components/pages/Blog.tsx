import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { getAllArticles } from "../../database/getArticles";
import { useEffect, useState } from "react";

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
        const _articles: Article[] = Object.values(res as Articles);
        setArticles(_articles);
        setFilteredArticles(_articles);
        return Object.values(res as Articles);
      }),
  });

  // useEffect(() => {
  //   getAllArticles();

  //   return () => {};
  // }, []);

  return (
    <section id="Blog" className="isolate relative">
      <header className="isolate relative h-44">
        <div className="container grid content-center h-full">
          <h1>Blogs</h1>
        </div>
      </header>
      <section
        className="
          container
          grid-rows-none md:grid-rows-[.5fr_1fr] 
          grid grid-cols-1 md:grid-cols-[.5fr_1fr] 
          gap-x-24 gap-y-16
        "
      >
        <div
          id="search"
          className="
        grid grid-rows-[auto_auto] h-max gap-5
        align-middle
        outline outline-1 rounded-sm p-4"
        >
          <Filter list={articles} setFilteredList={setFilteredArticles} />
        </div>
        <div className="grid grid-cols-1 gap-y-12">
          {filteredArticles?.map((article) => (
            <BlogCard
              title={article.title}
              tags={article.tags}
              date={article.date}
              description={article.description}
              category={article.category as BlogCardProps["category"]}
              key={article.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
function Filter({
  list,
  setFilteredList,
}: {
  list: Article[];
  setFilteredList: React.Dispatch<React.SetStateAction<Article[]>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
  }

  useEffect(() => {
    const newList = list.filter(
      (art) =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(newList);
    return () => {};
  }, [searchQuery]);

  return (
    <div className=" grid-rows-[auto_1fr] gap-2 grid h-max">
      <label htmlFor="article_search" className="block">
        Filter
      </label>
      <input
        type="text"
        id="article_search"
        className="p-2 rounded-full transition-all outline outline-2 outline-offset-0 outline-secondary hover:outline-offset-2 focus:outline-offset-4"
        placeholder="Search both Titles and Tags"
        onChange={handleOnChange}
        value={searchQuery}
      />
    </div>
  );
}
