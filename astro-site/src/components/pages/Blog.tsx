import type { CollectionEntry } from "astro:content";
import React, { Fragment, useEffect, useState, type Dispatch } from "react";
import Pagination from "../molecules/Pagination";
import Articles from "../organisms/Articles";
import LabelInput from "../templates/formInputs/LabelInput";
import Input from "../atoms/Input";
import Datalist from "../atoms/Datalist";
import { stringIncludes } from "../../utils";

interface Props {
  page: PaginatedCollection<"posts">;
  totalPosts: CollectionEntry<"posts">[];
}

export default function Blog({ page, totalPosts }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filtering: boolean = searchQuery != "";

  // const tags = totalPosts.map((post) => post.data.tags);
  // console.log("🚀 ~ Blog ~ tags:", tags);

  let posts: CollectionEntry<"posts">[] = filtering ? totalPosts : page.data;

  if (filtering) {
    posts = posts.filter((post) =>
      stringIncludes(post.data.title, searchQuery)
    );
  }

  return (
    <section id="Blogs" className="grid isolate relative gap-16 mb-3">
      <header className="container isolate relative h-44">
        {/* <Navlinks classNameName="flex absolute top-5 right-5 gap-1" />  */}
        {/* <div classNameName="w-full opacity-60 bg-pattern-noisy"></div> */}
        <div className="grid content-center h-full">
          <h1>Blogs</h1>
        </div>
      </header>
      <section
        className="container
    grid-rows-none md:grid-rows-[.5fr_1fr]
    grid grid-cols-1 md:grid-cols-[.5fr_1fr]
    gap-16"
        id="ArticlesContainer"
      >
        <div
          id="search"
          className="grid grid-rows-[auto_auto] h-max gap-5 outline outline-1
    rounded-sm p-4"
        >
          <div className="grid-rows-[auto_1fr] gap-5 grid h-max">
            <SearchFilter
              totalPosts={totalPosts}
              setSearchQuery={setSearchQuery}
              searchQueryValue={searchQuery}
            />
          </div>
        </div>
        <section className="grid gap-12">
          {!filtering && <Pagination pageData={page.url} />}
          <Articles posts={posts} />
          {!filtering && <Pagination pageData={page.url} />}
        </section>
      </section>
      <div className="grid gap-16 container"></div>
    </section>
  );
}

function SearchFilter({
  totalPosts,
  setSearchQuery,
  searchQueryValue,
}: {
  totalPosts: CollectionEntry<"posts">[];
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  searchQueryValue: string;
}) {
  const titles = totalPosts.map((post) => post.data.title);
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  return (
    <LabelInput name="search" title="Search">
      <Input
        name="search2"
        type="text"
        placeholder="Search Categories, Titles and Tags"
        list="search-datalist"
        value={searchQueryValue}
        onChange={handleOnChange}
        aria-controls="articles search"
      />
      <Datalist array={titles} id="search-datalist" />
    </LabelInput>
  );
}
