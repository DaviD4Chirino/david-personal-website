import axios from "axios";
/**
 *
 * @param fileName THe name of the file WITH THE EXTENSION NAME
 * @example getGistFile("library.json")
 * @returns The file or null if it doesn't have it
 */
export async function getGistFile(fileName: string): Promise<File | null> {
  const files = await getGistFiles();

  if (!files) {
    return null;
  }

  if (!files[fileName]) {
    return null;
  }
  return files[fileName];
}

export async function getGistFiles() {
  const res = await axios
    .get<Gist>("https://api.github.com/gists/63162440f99c217310eb27ae5b2fb427")
    .then((res) => res)
    .catch(() => null);

  if (res) {
    return res.data.files;
  }

  return null;
}
