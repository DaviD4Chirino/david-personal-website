import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../keystatic.config";

export default createGitHubReader(keystaticConfig, {
  repo: "DaviD4Chirino/david-personal-website",
  token: process.env.GITHUB_PAT,
});
