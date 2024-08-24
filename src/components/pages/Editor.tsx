import MarkdownEditor from "@uiw/react-markdown-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/getArticles";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useUpdateEffect } from "react-use";
import { useEffect, useState } from "react";

import BlogCard from "../molecules/BlogCard";

// * TODO: Style this thing
// * TODO: Build the article object
// TODO: Build the markdown file
// TODO: Find out how to update a gist from here
// ?: It may need another input taking the Github access token
export default function Editor() {
  let [articleQuery] = useSearchParams();

  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const { data } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  useEffect(() => {
    const value: string | null = articleQuery.get("article");
    const art: Article | undefined = data ? data[value || ""] : undefined;
    setSelectedArticle(art);
  }, [articleQuery]);

  // useUpdateEffect(() => {}, [selectedArticle]);

  return (
    <section className="container  my-10 grid gap-y-28">
      <h1>Article Editor</h1>
      <Form article={selectedArticle} />
      {data && <ArticlesToEdit articles={data} />}
    </section>
  );
}

type ArticleObject = Article & {
  githubApiKey: string;
};

function Form({ article }: { article?: Article }) {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<ArticleObject>({
    values: {
      id: article?.id || "",
      name: article?.name || "",
      title: article?.title || "",
      description: article?.description || "",
      category: article?.category || "",
      tags: article?.tags || "",
      file: article?.file || "",
      date: article
        ? new Date(article.date).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),

      githubApiKey: "",
      // githubApiKey: ,
    },
  });

  const onSubmit: SubmitHandler<ArticleObject> = (data) => {
    console.log("🚀 ~ Form ~ data:", data);
  };

  useUpdateEffect(() => {}, [article]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="ArticleEditor"
      className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6"
    >
      <InputLabel
        title="Name of the Article"
        placeholder="in-kebab-case"
        type="text"
        {...register("name")}
      />
      <InputLabel
        title="Title of the Article"
        type="text"
        {...register("title")}
      />
      <InputLabel
        title="Description"
        type="text"
        {...register("description")}
      />
      <InputLabel title="Category" type="text" {...register("category")} />
      <InputLabel title="Tags" type="text" {...register("tags")} />
      <InputLabel title="Date" type="Date" {...register("date")} />

      <InputLabel title="Document Name" {...register("file")} />

      <InputLabel title="ID" {...register("id")} />

      <InputLabel
        title="Github Api Key"
        type="password"
        {...register("githubApiKey")}
      />
      <MarkdownEditor className="col-span-full mt-8 " height="500px" />
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
