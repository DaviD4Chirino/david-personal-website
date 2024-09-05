import { useEffect, useRef, useState } from "react";
// import {random}
import Articles, { ArticlesProps } from "../organisms/Articles";
import Navlinks from "../molecules/Navlinks";
import { Dropdown } from "flowbite-react";
import LabelFormElement from "../templates/InputWIthLabel";
import { useToggle } from "react-use";
import { capitalize, startsWithVowel } from "../../utils";

import { IoIosArrowDown as ArrowDownI } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy: string = searchParams.get("orderBy") || "date";
  const reverse: string = searchParams.get("reverse") || "";

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
            grid grid-rows-[auto_auto] h-max gap-5 outline outline-1
            rounded-sm p-4"
        >
          <Filter setQuery={setQuery} />
        </div>

        <section className="grid gap-12">
          <Articles
            filter={query}
            className="grid grid-cols-1 gap-8 animate-fade"
            paginationTheme={{
              pages: {
                base: "inline-flex items-center -space-x-px ",
              },
            }}
            count={2}
            orderBy={orderBy as ArticlesProps["orderBy"]}
            reverseArticles={reverse === "true"}
          />
        </section>
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
    <form
      className=" grid-rows-[auto_1fr] gap-5 grid h-max "
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(searchQuery);
      }}
    >
      <LabelFormElement title="Filter" name="filter">
        <input
          name="filter"
          type="text"
          id="article_search"
          className="p-2 rounded transition-all   bg-grey-100"
          placeholder="Search Categories, Titles and Tags"
          onChange={handleOnChange}
          value={searchQuery}
        />
      </LabelFormElement>
      {/* <label htmlFor="article_search" className="block">
        Filter
      </label>
      <input
        type="text"
        id="article_search"
        className="p-2 rounded-full transition-all outline outline-2 outline-offset-0 outline-tertiary-light hover:outline-offset-2 focus:outline-offset-4 bg-grey-100"
        placeholder="Search Categories, Titles and Tags"
        onChange={handleOnChange}
        value={searchQuery}
      /> */}
      <FilterDropdown />
    </form>
  );
}

function FilterDropdown() {
  const options: Array<ArticlesProps["orderBy"]> = [
    "date",
    "alphabetically",
    "category",
  ];
  const [selectedOption, setSelectedOption] = useState<string>("date");
  const [reverse, toggleReverse] = useToggle(false);
  let [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value: string) {
    if (value == selectedOption) {
      toggleReverse();
    }
    setSelectedOption(value);
  }

  useEffect(() => {
    // setSearchParams((prevParams) => {});
    setSearchParams((prevParams) => {
      prevParams.set("orderBy", selectedOption);
      prevParams.set("reverse", `${reverse}`);
      return searchParams;
    });

    /*  navigate({
      search: `sortBy=${selectedOption}&reverse=${reverse}`,
    });
 */

    return () => {};
  }, [selectedOption, reverse]);

  return (
    <LabelFormElement title="Sort" name={"sort-options"}>
      <Dropdown
        label="Dropdown button"
        name="sort-options"
        dismissOnClick={false}
        renderTrigger={() => (
          <button
            className="
          text-left 
          outline-grey-600 outline outline-1 text-grey-900
          bg-grey-100
          p-2 rounded
          flex items-center gap-1
          "
          >
            {startsWithVowel(selectedOption) ? "" : "By "}
            {capitalize(selectedOption)} <ArrowDownI />
          </button>
        )}
      >
        {options.sort().map((opt) => (
          <DropItem
            name={opt}
            title={capitalize(opt)}
            onClick={handleClick}
            key={opt}
            icon={
              selectedOption == opt
                ? reverse
                  ? FaArrowDown
                  : FaArrowUp
                : undefined
            }
          />
        ))}
      </Dropdown>

      {/*   <div className="grid grid-cols-[1fr_.2fr] gap-x-2">
        <select
          name="sort-options"
          id="Sorting"
          className="bg-grey-100 rounded "
        >
          <option value="date">By Date</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="category">By Category</option>
        </select>
        <button className="bg-grey-700">-{">"}</button>
      </div> */}
    </LabelFormElement>
  );
}

function DropItem({
  name,
  title,
  onClick,
  icon,
}: {
  name: string;
  title: string;
  onClick: (name: string) => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Dropdown.Item onClick={() => onClick(name)} icon={icon}>
      {title}
    </Dropdown.Item>
  );
}
