type Paginate = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  items: any[];
};

type PickOnly<T, K extends keyof T> = Pick<T, K> & {
  [P in Exclude<keyof T, K>]?: never;
};
