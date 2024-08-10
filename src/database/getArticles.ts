import { getGistFile } from ".";

export async function getAllArticles(): Promise<Articles | null> {
  const articlesFile: File | null = await getGistFile("articles.json");
  if (!articlesFile) {
    return null;
  }

  const articlesObject: Articles = JSON.parse(articlesFile.content);

  return articlesObject;
}
