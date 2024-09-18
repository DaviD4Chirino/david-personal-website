import type { CollectionEntry } from "astro:content";
import BlogCard from "../templates/BlogCard";

export type ArticlesProps = {
  /** The things to add to the Articles Wrapper */
  className?: string;
  /** A string to filter the articles by their title, tag or category */
  filter?: string;
  /** How many articles you want,
   * This will also render a pagination component
   */
  count?: number;
  /** This will Slice the articles by the number of counts, non indexed.
   *  @eg the page 2 with a count of 10 will be starting from the 20th element
   */
  page?: number;
  paginationControls?: boolean;
  paginationTop?: boolean;
  paginationBelow?: boolean;
  // paginationTheme?: PaginationProps["theme"];
  orderBy: orders;
  /** Can be use to reverse sorting */
  reverseArticles?: boolean;
};
export default function Articles({
  posts,
}: {
  posts: CollectionEntry<"posts">[];
}) {
  return (
    <>
      {posts.map((post) => (
        <BlogCard post={post} key={post.id} />
      ))}
    </>
  );
}
