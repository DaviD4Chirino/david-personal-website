import { AxiosResponse } from "axios";
import { GIST_IDS, updateGist } from ".";
import { inRange } from "../utils";
import { getAllArticles } from "./get";

export async function updateBlog(
  articleObject: Article,
  document: string,
  apiKey: string
) {
  const { file, name } = articleObject;

  const prevArticles = await getAllArticles();

  if (!prevArticles) {
    console.error(`Cannot get gist file articles.json`);
    return;
  }
  const newArticles = { ...prevArticles, [name]: articleObject };

  const updateArticleRes = await updateGist(
    GIST_IDS.database,
    {
      "articles.json": { content: JSON.stringify(newArticles) },
    },
    apiKey
  );

  if (handleStatus(updateArticleRes)) {
    console.log("Article updated or added");
  }

  const updateDocumentRes = await updateGist(
    GIST_IDS.articles_files,
    {
      [file]: { content: document },
    },
    apiKey
  );

  if (handleStatus(updateDocumentRes)) {
    console.log("Document updated or added");
  }
}

export async function deleteArticle(articleId: string, apiKey: string) {
  const articles = await getAllArticles();

  if (!articles) {
    console.error(`Cannot get gist file articles.json`);
    return;
  }
  const filteredArticles = Object.values(articles).filter(
    (art) => art.id != articleId
  );
  console.log("🚀 ~ deleteArticle ~ filteredArticles:", filteredArticles);

  if (filteredArticles === Object.values(articles)) {
    console.error("Could not be filtered");
    return;
  }

  const updateArticleRes = await updateGist(
    GIST_IDS.database,
    {
      "articles.json": { content: JSON.stringify(filteredArticles) },
    },
    apiKey
  );

  if (handleStatus(updateArticleRes)) {
    console.log("Article removed");
  }
}

function handleStatus(res: AxiosResponse): boolean {
  if (inRange(res.status, 400, 599)) {
    console.error(`Error - ${res.status}`, res.statusText);
    return true;
  }

  if (inRange(res.status, 200, 299)) {
    console.log(`Update successful - ${res.status}`, res.statusText);
    return false;
  }
  console.log(`Response out of range - ${res.status}`, res.statusText);
  return false;
}
