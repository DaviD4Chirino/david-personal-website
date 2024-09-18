// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "DaviD4Chirino/david-personal-website",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: "Category",
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({ label: "Tags", validation: { isRequired: true } }),
          {
            label: "Tag",
            itemLabel: (props) => props.value,
          }
        ),
        date: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        content: fields.markdoc({ label: "Content" }),

        // category: { label:"a",kind:"form" },
      },
    }),
  },
});
// id: "1"
// title: "Awesome Scene Manager"
// description: "In any game with more than 1 level you want to make sure to go the next level when the current ends, there's a lot of ways to do that"
// category: "Godot"
// tags: ["4.x", "Addon"]
// date: 2024-08-05
