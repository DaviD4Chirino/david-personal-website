import Tag, { TagProps } from "../atoms/Tag";

const borders = {
  article: "solid",
  project: "dashed",
  personal: "dotted",
  story: "double",
  "game-development": "sketchy",
};

// TODO: Add diferent border by the type of blog, no idea how many yet,
// TODO: but at least: Article, Project, Personal, Story, Game Development,
// TODO: With special conditions like Project release the diferent kinds of update
// TODO: and game release and updates as well

// * Maybe the specials should be only tags

export type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  type: "article" | "project" | "personal" | "story" | "game-development";
  tags: TagProps[];
};

export default function BlogCard({
  title,
  date,
  description,
  type = "article",
  tags,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleString("en", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  });
  return (
    <article
      className={`
      grid grid-rows-[.1fr_.1fr_1fr_.2fr] gap-2
      aspect-auto md:aspect-square
      outline-${borders[type]}
      outline
      rounded-xl
      p-3
      bg-[white]
  `}
      id="BlogCard"
    >
      <a className="text-2xl leading-5 no-underline hover:underline" id="Title">
        <b className="hover:cursor-pointer w-min">{title}</b>
      </a>
      <p className="text-right text-primary opacity-60 text-kanit" id="Date">
        {formattedDate}
      </p>
      <p className="text-end" id="Description">
        {description}
      </p>
      <div className="flex gap-2 flex-wrap" id="Tags">
        {tags.map((tag, i) => (
          <Tag title={tag.title} href={tag.href} key={i} />
        ))}
      </div>
    </article>
  );
}
