/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GIST_AUTH: string;
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
