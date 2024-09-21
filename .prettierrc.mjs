// .prettierrc.mjs
/** @type {Config} */
/** @typedef {import("prettier").Config} Config */
export default {
  tabWidth: 2,
  useTabs: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};