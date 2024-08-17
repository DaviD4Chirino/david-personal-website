import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/getArticles";
import { useState } from "react";
import Articles from "../organisms/Articles";
import Navlinks from "../molecules/Navlinks";

export default function Blog() {
  const [query, setQuery] = useState("");
  const { isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      getAllArticles().then((res) => {
        return Object.values(res as Articles);
      }),
  });
  return (
    <section id="Blog" className="grid isolate relative gap-16 mb-3">
      <header className="container isolate relative h-44">
        <Navlinks className="flex absolute top-5 right-5 gap-1" />
        {/* <div className="w-full opacity-60 bg-pattern-noisy"></div> */}
        <div className="grid content-center h-full">
          <h1>Blogs</h1>
        </div>
      </header>

      <section
        className="
          container
          grid-rows-none md:grid-rows-[.5fr_1fr] 
          grid grid-cols-1 md:grid-cols-[.5fr_1fr] 
          gap-10
        "
        id="ArticlesContainer"
      >
        <div
          id="search"
          className="
        grid grid-rows-[auto_auto] h-max gap-5
        align-middle
        outline outline-1 rounded-sm p-4"
        >
          <Filter setQuery={setQuery} />
        </div>
        <div className="grid grid-cols-1 gap-8 animate-fade">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <Articles filter={query} count={10} page={1} />
          )}
        </div>
      </section>
    </section>
  );
}
function Filter({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
    setQuery(e.currentTarget.value);
  }

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
