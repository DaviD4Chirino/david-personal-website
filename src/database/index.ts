import axios from "axios";
/**
 *
 * @param fileName THe name of the file WITH THE EXTENSION NAME
 * @example getGistFile("library.json")
 * @returns The file or null if it doesn't have it
 */
export async function getGistFile(
  fileName: string,
  gistID = "63162440f99c217310eb27ae5b2fb427"
): Promise<File | null> {
  const files: Files | null = await getGistFiles(gistID);
  if (!files) {
    return null;
  }

  if (!files[fileName]) {
    return null;
  }
  return files[fileName];
}

export async function getGistFiles(
  gistID: string = "63162440f99c217310eb27ae5b2fb427"
) {
  const res: Gist | any | null = await axios
    .get<Gist>(`https://api.github.com/gists/${gistID}`)
    .then((res) => res)
    .catch(() => null);

  if (res) {
    return res.data.files;
  }

  return null;
}
