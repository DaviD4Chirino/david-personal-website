// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), markdoc(),keystatic()],
  output:"hybrid",
  adapter: vercel()
});