import MarkdownEditor from "@uiw/react-markdown-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/getArticles";
import EditArticleButton from "../molecules/editor/EditArticleButton";
import BlogCard from "../molecules/BlogCard";

// TODO: Style this thing
// TODO: Build the article object
//TODO: Build the markdown file
// TODO: Find out how to update a gist from here
// ?: It may need another input taking the Github access token
export default function Editor() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  return (
    <section className="container grid gap-16 my-10 ">
      <h1>Article Editor</h1>
      <form action="" id="ArticleEditor">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-3 gap-y-8">
          <InputLabel
            name="article-name"
            title="Name of the Article"
            placeholder="in-kebab-case"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-title"
            title="Title of the Article"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-description"
            title="Description"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-category"
            title="Category"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-tags"
            title="Tags"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-date"
            title="Date"
            type="Date"
            defaultValue={new Date().toLocaleDateString("en-CA")}
            className="md:col-span-2"
          />
          <InputLabel
            name="github-api-key"
            title="Github Api Key"
            type="password"
            className="col-span-full"
          />
          <MarkdownEditor className="col-span-full " height="500px" />
          <input
            type="submit"
            name="submit"
            value="Submit"
            className="
            bg-tertiary-lightest hover:bg-tertiary-light 
            text-tertiary-darkest
            rounded-md px-3 py-5 
            col-span-full 
            cursor-pointer active:cursor-default 
            transition-colors
            "
          />
        </div>
      </form>
      {data && <ArticlesToEdit articles={data} />}
    </section>
  );
}

function ArticlesToEdit(props: { articles: Articles }) {
  return (
    <section
      id="EditArticles"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {props.articles &&
        Object.values(props.articles).map((art) => (
          <BlogCard
            {...art}
            to={{
              search: `article=${art.name}`,
            }}
            key={art.id}
          />
        ))}
    </section>
  );
}
