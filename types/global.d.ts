type orders = "date" | "alphabetically" | "category";

interface Filters<C extends CollectionKey> {
  [type in orders]: (a: CollectionEntry<C>, b: CollectionEntry<C>) => number;
}

type Pagination = {
  start: number;
  end: number;
  size: number;
  total: number;
  currentPage: number;
  lastPage: number;
};

type PageUrl = {
  current: string;
  next: string;
  prev: string;
  first: string;
  last: string;
};
declare interface PaginatedCollection<C extends CollectionKey> {
  data: CollectionEntry<C>[];
  pagination: Pagination;
  url: PageUrl;
}

declare interface keystaticCollection<C extends CollectionKey> {
  slug: string;
  entry: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    date: Date;
    content: AsyncFunction;
  };
}
