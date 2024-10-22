// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro'

import remarkToc from "remark-toc"
import remarkGfm from "remark-gfm"

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  site: "https://davidspace.vercel.app",
  markdown: {
    remarkPlugins: [remarkGfm, [remarkToc, { heading: "Contents" }]],
  },
  integrations: [react(), tailwind(), markdoc(), keystatic(), sitemap(), mdx()],
  output: "hybrid",
  adapter: vercel(),
  devToolbar: { enabled: false }

});