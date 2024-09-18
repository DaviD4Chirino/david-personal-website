// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro'

import rehypeRewrite from 'rehype-rewrite';

import remarkToc from "remark-toc"
import remarkGfm from "remark-gfm"


// https://astro.build/config
export default defineConfig({
  markdown:{
    remarkPlugins :[remarkGfm,[remarkToc, { heading: "Contents"} ]],
    
  },
  integrations: [react(), tailwind(), markdoc(),keystatic()],
  output:"hybrid",
  adapter: vercel(),

});