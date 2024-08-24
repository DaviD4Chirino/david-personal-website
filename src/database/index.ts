import axios from "axios";

export enum GIST_IDS {
  database = "b8bc2293fd39b57751cc6d92be90818a",
  articles_files = "4ada55ee93a94b48c96d472cbd58640d",
}

type Gists = "database" | "articles_files";

/**
 *
 * @param fileName THe name of the file WITH THE EXTENSION NAME
 * @example getGistFile("library.json")
 * @returns The file or null if it doesn't have it
 */
export async function getGistFile(
  fileName: string,
  gist: Gists = "database"
): Promise<File | null> {
  const gistID: string = GIST_IDS[gist];

  const files: Files | null = await getGistFiles(gistID);
  if (!files) {
    return null;
  }

  if (!files[fileName]) {
    return null;
  }
  return files[fileName];
}

export async function getGistFiles(gistID: string = GIST_IDS.database) {
  const res = await axios
    .get(`https://api.github.com/gists/${gistID}`, {
      headers: { Authorization: `token ${import.meta.env.VITE_GIST_AUTH}` },
    })
    .then((res) => res)
    .catch((err) => err);

  if (res) {
    return res.data.files;
  }

  return null;
}

export async function updateGist(
  gistID: string = GIST_IDS.database,
  files: GistUpdateFiles
) {
  return axios.patch(
    `https://api.github.com/gists/${gistID}`,
    {
      files: files,
    },
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GIST_AUTH}`,
      },
    }
  );
}
