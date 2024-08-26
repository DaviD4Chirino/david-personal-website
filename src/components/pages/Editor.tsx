import MarkdownEditor from "@uiw/react-markdown-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/get";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useUpdateEffect } from "react-use";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import BlogCard from "../molecules/BlogCard";
import { Link } from "react-router-dom";
import { getGistFiles, GIST_IDS } from "../../database";
import { updateBlog } from "../../database/update";
import DeleteArticleButton from "../molecules/editor/DeleteArticleButton";
import Modal from "../organisms/Modal";

export default function Editor() {
  let [articleQuery] = useSearchParams();

  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
  const [selectedDocument, setSelectedDocument] = useState<File | undefined>();

  const { data } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  const { data: document } = useQuery({
    queryKey: [`files`],
    queryFn: () => getGistFiles(GIST_IDS.articles_files),
  });

  useEffect(() => {
    const value: string | null = articleQuery.get("article");
    const art: Article | undefined = data ? data[value || ""] : undefined;
    setSelectedArticle(art);
  }, [articleQuery]);

  useEffect(() => {
    if (!selectedArticle || !document) return;

    const currentDocument: File = document[selectedArticle.file];
    setSelectedDocument(currentDocument);
  }, [document, selectedArticle, articleQuery]);

  return (
    <section className="container my-10 grid gap-28">
      <h1>Article Editor</h1>
      <Modal />
      <Form
        article={selectedArticle}
        markdownContent={
          selectedDocument ? selectedDocument.content : undefined
        }
      />

      {data && <ArticlesToEdit articles={data} />}
    </section>
  );
}

type ArticleObject = Article & {
  document: string;
  githubApiKey: string;
};

function Form({
  article,
  markdownContent,
}: {
  article?: Article;
  markdownContent?: string;
}) {
  const [mdContent, setMdContent] = useState(markdownContent || "");

  const defaultValues = {
    id: "",
    name: "",
    title: "",
    description: "",
    category: "",
    tags: "",
    file: "",
    date: "",
    githubApiKey: "",
    document: "",
    // githubApiKey: ,
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // watch,
    // formState: { errors },
  } = useForm<ArticleObject>({
    values: {
      id: `${article?.id}` || "",
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
      document: "",
      // githubApiKey: ,
    },
  });

  useEffect(() => {
    if ((article && !String(article.id)) || !article) {
      setValue("id", uuid());
    }
    return () => {};
  }, [article]);

  useEffect(() => {
    if (!markdownContent) {
      setMdContent("");
      return;
    }
    setMdContent(markdownContent || "");
  }, [markdownContent]);

  const onSubmit: SubmitHandler<ArticleObject> = (data) => {
    data.document = mdContent;
    const { githubApiKey, document, ...rest } = data;

    updateBlog(rest, document, githubApiKey);
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

      <InputLabel title="ID" type="text" {...register("id")} />

      <InputLabel
        title="Github Api Key"
        type="password"
        {...register("githubApiKey")}
      />
      <MarkdownEditor
        className="col-span-full mt-8 "
        height="500px"
        value={mdContent}
        onChange={(markdown) => setMdContent(markdown)}
      />
      <input type="hidden" {...register("document")} />
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
      <Link
        to={{ search: `` }}
        onClick={() => {
          reset(defaultValues);
          setMdContent("");
        }}
        className="
          py-2
          bg-primary-darkest hover:bg-primary-dark transition-colors text-primary-lightest no-underline
          text-center
          rounded-md
          col-span-full
        "
      >
        Clear
      </Link>
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
            <div className="grid grid-rows-[auto_1fr] isolate" key={art.id}>
              <DeleteArticleButton article={art} className="ms-3" />
              <BlogCard
                {...art}
                to={{
                  search: `article=${art.name}`,
                }}
              />
            </div>
          ))}
    </section>
  );
}
