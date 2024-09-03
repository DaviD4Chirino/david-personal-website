import MDEditor from "@uiw/react-md-editor";
import InputLabel from "../molecules/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../database/get";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import BlogCard from "../molecules/BlogCard";
import { Link } from "react-router-dom";
import { getGistFiles, GIST_IDS } from "../../database";
import { updateArticle, updateDocument } from "../../database/update";
import DeleteArticleButton from "../molecules/editor/DeleteArticleButton";
import { useToast } from "../../context/Toast/useToast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker } from "flowbite-react";

export default function Editor() {
  let [articleQuery] = useSearchParams();

  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
  const [selectedDocument, setSelectedDocument] = useState<File | undefined>();

  const { data, error } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(),
  });

  const { data: document } = useQuery({
    queryKey: [`files`],
    queryFn: () => getGistFiles(GIST_IDS.articles_files),
  });

  useEffect(() => {
    const searchQuery: string = articleQuery.get("article") || "";
    if (!data) {
      console.error(`article query error: `, error);
      setSelectedArticle(undefined);
      return;
    }

    const art: Article | undefined = Object.values(data).find(
      (art) => art.name == searchQuery
    );

    if (!art) {
      console.error("Could not find article", searchQuery);
      setSelectedArticle(undefined);
      return;
    }

    setSelectedArticle(art);
    console.log("🚀 ~ useEffect ~ art:", art.date);
  }, [articleQuery]);

  useEffect(() => {
    if (!selectedArticle || !document) return;

    const currentDocument: File = document[selectedArticle.file];
    setSelectedDocument(currentDocument);
  }, [document, selectedArticle, articleQuery]);

  return (
    <section className="container my-10 grid gap-28 ">
      <h1>Article Editor</h1>

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

const ArticleSchema: yup.ObjectSchema<ArticleObject> = yup.object().shape({
  id: yup.string().required("Required"),
  name: yup.string().required("Required"),
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  category: yup.string().required("Required"),
  tags: yup.string().required("Required"),
  file: yup.string().default(""),
  date: yup.string().required("Required"),
  githubApiKey: yup.string().required("Required"),
  document: yup.string().default(""),
});

function Form({
  article,
  markdownContent,
}: {
  article?: Article;
  markdownContent?: string;
}) {
  const [mdContent, setMdContent] = useState(markdownContent || "");
  const toast = useToast();

  const defaultValues = {
    id: uuid(),
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
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleObject>({
    resolver: yupResolver(ArticleSchema),
    values: {
      id: `${article?.id}` || "",
      name: article?.name || "",
      title: article?.title || "",
      description: article?.description || "",
      category: article?.category || "",
      tags: article?.tags || "",
      file: article?.file || "",
      date: article
        ? DateTime.fromFormat(article.date, "yyyy-MM-dd").toFormat(
            "yyyy-MM-dd",
            DateTime.DATETIME_HUGE
          )
        : DateTime.now().toFormat("yyyy-MM-dd", DateTime.DATETIME_HUGE),

      githubApiKey: "",
      document: "",
      // githubApiKey: ,
    },
  });
  // watch(({ date }) => {
  //   console.log(date);
  // });

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
    setMdContent(markdownContent);
  }, [markdownContent]);

  const onSubmit: SubmitHandler<ArticleObject> = (data) => {
    data.document = mdContent;
    const { githubApiKey, document, ...rest } = data;
    rest.file = rest.name + ".md";

    // const [year, month, day] = data.date.split("-");
    // console.log("🚀 ~ data.date:", data.date);
    // console.log("🚀 ~ data.date:", new Date(data.date.replaceAll("-", "/")));

    // console.log(data.date);
    // console.log(data.date);
    // data.date = new Date(data.date).toLocaleDateString("en");
    /*  console.log(
      "🚀 ~ new Date(data.date).toLocaleDateString('en'):",
      new Date(data.date).toLocaleDateString("en")
    ); */

    async function sendData() {
      updateArticle(rest, githubApiKey)
        .then(() => toast.success("Article updated!"))
        .catch((err) => toast.error(`Article Error ${err}`));

      updateDocument(rest.file, document, githubApiKey)
        .then(() => toast.success("Document updated!"))
        .catch((err) => toast.error(`Document Error ${err}`));
      // if(articleRes)
    }

    sendData();
  };

  // useUpdateEffect(() => {}, [article]);

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
        helperText={errors["name"]?.message}
        color={errors["name"] ? "failure" : ""}
      />
      <InputLabel
        title="Title of the Article"
        type="text"
        {...register("title")}
        helperText={errors["title"]?.message}
        color={errors["title"] ? "failure" : ""}
      />
      <InputLabel
        title="Description"
        type="text"
        {...register("description")}
        helperText={errors["description"]?.message}
        color={errors["description"] ? "failure" : ""}
      />
      <InputLabel
        title="Category"
        type="text"
        {...register("category")}
        helperText={errors["category"]?.message}
        color={errors["category"] ? "failure" : ""}
      />

      <InputLabel
        title="Tags"
        type="text"
        {...register("tags")}
        helperText={errors["tags"]?.message}
        color={errors["tags"] ? "failure" : ""}
      />

      <InputLabel
        title="Date"
        type="date"
        {...register("date")}
        helperText={errors["date"]?.message}
        color={errors["date"] ? "failure" : ""}
      />

      {/* <InputLabel
        title="Document Name"
        {...register("file")}
        disabled
        helperText={errors["file"]?.message}
        color={errors["file"] ? "failure" : ""}
      /> */}

      <InputLabel
        title="ID"
        type="text"
        {...register("id")}
        helperText={errors["id"]?.message}
        color={errors["id"] ? "failure" : ""}
        disabled
      />

      <InputLabel
        title="Github Api Key"
        type="text"
        {...register("githubApiKey")}
        helperText={errors["githubApiKey"]?.message}
        color={errors["githubApiKey"] ? "failure" : ""}
      />
      <MDEditor
        value={mdContent}
        onChange={(markdown) => setMdContent(markdown || "")}
        className="col-span-full mt-8 "
        height={"20rem"}
        textareaProps={{ spellCheck: true, autoCapitalize: "on" }}
      />
      <InputLabel title="" type="hidden" {...register("document")} />
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
        to={{ search: "" }}
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
