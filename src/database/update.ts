import { AxiosResponse } from "axios";
import { GIST_IDS, updateGist } from ".";
import { inRange } from "../utils";
import { getAllArticles } from "./get";

export async function updateArticle(article: Article, apiKey: string) {
  const articles = await getAllArticles();

  if (!articles) {
    console.error(`Cannot get gist file articles.json`);
    return;
  }

  /* const newArticle = article;
  newArticle.file = article.name + ".md"; */

  const newArticles = { ...articles, [article.name]: article };

  return updateGist(
    GIST_IDS.database,
    {
      "articles.json": { content: JSON.stringify(newArticles) },
    },
    apiKey
  );
}
export async function updateDocument(
  documentName: string,
  content: string,
  apiKey: string
) {
  return updateGist(
    GIST_IDS.articles_files,
    {
      [documentName]: { content: content },
    },
    apiKey
  );
}

export async function deleteArticle(articleName: string, apiKey: string) {
  const articles = await getAllArticles();

  if (!articles) {
    console.error(`Cannot get gist file articles.json`);
    return;
  }
  const { [articleName]: other, ...rest } = articles;
  return updateGist(
    GIST_IDS.database,
    {
      "articles.json": { content: JSON.stringify(rest) },
    },
    apiKey
  );
}
