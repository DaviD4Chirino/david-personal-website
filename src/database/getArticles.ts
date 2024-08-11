import { getGistFile } from ".";

export async function getDocument(documentName: string) {
  const articlesFile: File | null = await getGistFile(
    documentName,
    "4ada55ee93a94b48c96d472cbd58640d"
  );

  console.log(articlesFile);
}

export async function getAllArticles(): Promise<Articles | null> {
  const articlesFile: File | null = await getGistFile("articles.json");
  if (!articlesFile) {
    return null;
  }

  const articlesObject: Articles = JSON.parse(articlesFile.content);

  return articlesObject;
}
