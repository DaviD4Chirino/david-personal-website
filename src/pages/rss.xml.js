import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import routes from "../routes.json"
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const posts = await getCollection('posts');

  return rss({
    title: "David's Blog",
    description: "Direct feed into David's Space head",
    site: context.site,
    items: posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        category: post.data.category,
        tags: post.data.tags,
        link: `${routes.article}/${post.slug}/`,
        content:  sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        })
      })),
    customData: `<language>en-us</language>`,
  });
}