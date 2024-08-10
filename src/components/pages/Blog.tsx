import { useQuery } from "@tanstack/react-query";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { getAllArticles } from "../../database/getArticles";
import { useEffect } from "react";

export default function Blog() {
  const { data: articles } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
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
          <div className=" grid-rows-[auto_1fr] gap-2 grid h-max">
            <label htmlFor="first_name" className="block">
              Filter
            </label>
            <input
              type="text"
              id="first_name"
              className="p-2 rounded-full transition-all outline outline-2 outline-offset-0 outline-secondary hover:outline-offset-2 focus:outline-offset-4"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12">
          {articles?.map((article, i) => (
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
