type Article = {
  name: string;
  id: string | number;
  title: string;
  description: string;
  file: string;
  category: string;
  tags: string;
  date: string;
};
type Articles = {
  [key: string]: Article;
};
