import axios from "axios";

export async function getGistFile(fileName: string) {
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
