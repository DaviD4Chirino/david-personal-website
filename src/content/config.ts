import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
  }),
});
export const collections = {
  posts: postsCollection,
};
// id: 2
// slug: ajin-demi-human
// title: "Ajin: Demi-Human - Review"
// description: I've recently finished Ajin and I loved it, here are my thoughts
// category: Review
// tags: Manga, Opinion
// date: 2024-08-13
