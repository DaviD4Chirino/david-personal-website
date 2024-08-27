interface Gist {
  comments: number;
  comments_url: string;
  commits_url: string;
  created_at: Date;
  url: string;
  description: string;
  files: Files;
  forks: any[];
  forks_url: string;
  git_pull_url: string;
  git_push_url: string;
  history: History[];
  html_url: string;
  id: string;
  node_id: string;
  public: boolean;
  updated_at: string;
  user: User | null;
  owner: Owner;
  truncated: boolean;
}

interface Files {
  [key: string]: File;
}

interface File {
  content: string;
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  type: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface History {
  change_status: ChangeStatus;
  committed_at: string;
  url: string;
  user: User;
  version: string;
}

interface ChangeStatus {
  total: number;
  additions: number;
  deletions: number;
}

/** If Content is null, the file will be deleted */
interface GistUpdateFiles {
  [filename: string]: {
    /** If Content is null, the file will be deleted */
    content: string | null;
  };
}
