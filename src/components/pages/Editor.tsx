import MarkdownEditor from "@uiw/react-markdown-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/getArticles";
import BlogCard from "../molecules/BlogCard";
import { SubmitHandler, useForm } from "react-hook-form";

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
    <section className="container  my-10 grid gap-y-28">
      <h1>Article Editor</h1>
      <Form />
      {data && <ArticlesToEdit articles={data} />}
    </section>
  );
}

type Inputs = {
  articleName: string;
  exampleRequired: string;
  articleTitle: string;
  articleDescription: string;
  articleCategory: string;
  articleTags: string;
  articleDate: string;
  githubApiKey: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="ArticleEditor"
      className="grid grid-cols-1 md:grid-cols-6 gap-x-3 gap-y-8"
    >
      <InputLabel
        title="Name of the Article"
        placeholder="in-kebab-case"
        type="text"
        className="md:col-span-2"
        {...register("articleName")}
      />
      <InputLabel
        title="Title of the Article"
        type="text"
        className="md:col-span-2"
        {...register("articleTitle")}
      />
      <InputLabel
        title="Description"
        type="text"
        className="md:col-span-2"
        {...register("articleDescription")}
      />
      <InputLabel
        title="Category"
        type="text"
        className="md:col-span-2"
        {...register("articleCategory")}
      />
      <InputLabel
        title="Tags"
        type="text"
        className="md:col-span-2"
        {...register("articleTags")}
      />
      <InputLabel
        title="Date"
        type="Date"
        defaultValue={new Date().toLocaleDateString("en-CA")}
        className="md:col-span-2"
        {...register("articleDate")}
      />
      <InputLabel
        title="Github Api Key"
        type="password"
        className="col-span-full"
        {...register("githubApiKey")}
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
    </form>
  );
}

function ArticlesToEdit(props: { articles: Articles }) {
  return (
    <section
      id="EditArticles"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {props.articles &&
        Object.values(props.articles)
          .reverse()
          .map((art) => (
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
