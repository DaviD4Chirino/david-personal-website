type Article = {
  id: number;
  title: string;
  description: string;
  file: string;
  category: string;
  tags: string;
  date: string;
};
interface Articles {
  [key: string]: Article;
}
