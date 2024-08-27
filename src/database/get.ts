import { getGistFile } from ".";

export async function getAllArticles(): Promise<Articles | null> {
  const articlesFile: File | null = await getGistFile(
    "articles.json",
    "database"
  );
  if (!articlesFile) {
    return null;
  }

  const articlesObject: Articles = JSON.parse(articlesFile.content);

  return articlesObject;
}

export async function getArticleFile(
  articleTitle: string
): Promise<File | undefined> {
  const database: Articles | null = await getAllArticles().catch((err) => err);

  if (!database) {
    console.error(`Database Invalid`);
    return;
  }

  const currentArticle: Article | undefined = database[articleTitle];

  if (!currentArticle) {
    console.error(articleTitle, "does not exist in articles");
    return;
  }

  const articlesFile: File | null = await getGistFile(
    currentArticle.file,
    "articles_files"
  ).catch((err) => err);

  if (!articlesFile) {
    console.error("articlesFile does not exist in articles_files");
    return;
  }

  return articlesFile;
}
