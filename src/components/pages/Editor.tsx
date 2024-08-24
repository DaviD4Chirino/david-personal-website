import MarkdownEditor from "@uiw/react-markdown-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/getArticles";
import BlogCard from "../molecules/BlogCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { useUpdateEffect } from "react-use";
import { useEffect, useState } from "react";

// TODO: Style this thing
// TODO: Build the article object
//TODO: Build the markdown file
// TODO: Find out how to update a gist from here
// ?: It may need another input taking the Github access token
export default function Editor() {
  let [articleQuery] = useSearchParams();

  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  useUpdateEffect(() => {
    const value: string | null = articleQuery.get("article");
    const art: Article | undefined = data ? data[value || ""] : undefined;
    setSelectedArticle(art);
  }, [articleQuery]);

  useUpdateEffect(() => {}, [selectedArticle]);

  return (
    <section className="container  my-10 grid gap-y-28">
      <h1>Article Editor</h1>
      <Form article={selectedArticle} />
      {data && <ArticlesToEdit articles={data} />}
    </section>
  );
}

type Inputs = {
  articleName: string;

  articleTitle: string;
  articleDescription: string;
  articleCategory: string;
  articleTags: string;
  articleDate: string;
  articleFile: string;
  githubApiKey: string;
};

function Form({ article }: { article?: Article }) {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>({
    values: {
      articleName: article?.name || "",
      articleTitle: article?.title || "",
      articleDescription: article?.description || "",
      articleCategory: article?.category || "",
      articleTags: article?.tags || "",
      articleFile: article?.file || "",
      articleDate: article
        ? new Date(article.date).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),

      githubApiKey: "",
      // githubApiKey: ,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("🚀 ~ Form ~ data:", data);
  };

  useUpdateEffect(() => {}, [article]);

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
        {...register("articleDescription", { value: article?.description })}
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
        className="md:col-span-2"
        {...register("articleDate")}
      />
      <InputLabel
        title="Github Api Key"
        type="password"
        className="col-span-full"
        {...register("githubApiKey")}
      />
      <div className="grid gap-y-2 col-span-full grid-cols-1 md:grid-cols-3 ">
        <InputLabel
          title="Document Name"
          type="text"
          className=""
          {...register("articleFile")}
        />
        <MarkdownEditor className="col-span-full " height="500px" />
      </div>
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
