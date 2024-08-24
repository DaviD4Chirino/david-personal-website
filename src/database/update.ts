import { AxiosResponse } from "axios";
import { GIST_IDS, updateGist } from ".";
import { inRange } from "../utils";
import { getAllArticles } from "./get";

export async function updateBlog(articleObject: Article, document: string) {
  const { file, name } = articleObject;

  const prevArticles = await getAllArticles();

  if (!prevArticles) {
    console.error(`Cannot get gist file articles.json`);
  }
  const newArticles = { ...prevArticles, [name]: articleObject };

  const updateArticleRes = await updateGist(GIST_IDS.database, {
    "articles.json": { content: JSON.stringify(newArticles) },
  });

  if (handleStatus(updateArticleRes)) {
    console.log("Article updated or added");
  }

  const updateDocumentRes = await updateGist(GIST_IDS.articles_files, {
    [file]: { content: document },
  });

  if (handleStatus(updateDocumentRes)) {
    console.log("Document updated or added");
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
