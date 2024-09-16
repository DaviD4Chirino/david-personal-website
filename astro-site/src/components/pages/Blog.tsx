import React, { Fragment } from "react";
import Pagination from "../molecules/Pagination";
import Articles from "../organisms/Articles";
import reactUse from "react-use";
import type { CollectionEntry } from "astro:content";
import LabelInput from "../templates/formInputs/LabelInput";
import Input from "../atoms/Input";
import Datalist from "../atoms/Datalist";

const { useToggle } = reactUse;

interface Props {
  page: PaginatedCollection<"posts">;
  totalPosts: CollectionEntry<"posts">[];
}

export default function Blog({ page, totalPosts }: Props) {
  const [filtering, toggleFiltering] = useToggle(false);

  const titles = totalPosts.map((post) => post.data.title);
  // const tags = totalPosts.map((post) => post.data.tags);
  // console.log("🚀 ~ Blog ~ tags:", tags);

  const posts: CollectionEntry<"posts">[] = filtering ? totalPosts : page.data;

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
          <form
            className="grid-rows-[auto_1fr] gap-5 grid h-max"
            name="filter"
            onSubmit={(e) => e.preventDefault()}
          >
            <LabelInput name="search" title="Search">
              <Input
                name="search2"
                type="text"
                placeholder="Search Categories, Titles and Tags"
                list="search-datalist"
              />
              <Datalist array={titles} id="search-datalist" />
            </LabelInput>
          </form>
        </div>
        <section className="grid gap-12">
          <Pagination pageData={page.url} />
          <Articles posts={posts} />
          <Pagination pageData={page.url} />
        </section>
      </section>
      <div className="grid gap-16 container"></div>
    </section>
  );
}
