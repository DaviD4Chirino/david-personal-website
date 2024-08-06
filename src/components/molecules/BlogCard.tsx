import { breakText } from "../../utils";
import Tag from "../atoms/Tag";

const borders = {
  article: "outline",
  project: "outline-dashed",
  personal: "outline-dotted",
  story: "outline-double",
  "game-development": "outline-sketchy",
};

export type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  type: "article" | "project" | "personal" | "story" | "game-development";
  tags: string;
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

  const tagsArray: string[] = breakText(tags, ",");

  return (
    <article
      className={`
      
      ${borders[type]}
     
      rounded-xl
      transition-transform
      hover:rotate-6
      p-3
      bg-[white]
      no-underline
  `}
      id="BlogCard"
    >
      <a
        href="#"
        className="
        grid grid-rows-[.1fr_.1fr_1fr_.2fr] gap-2
      aspect-auto md:aspect-square
      no_underline
      "
      >
        <b className="hover:cursor-pointer  text-2xl leading-5 no-underline">
          {title}
        </b>
        <p className="text-right text-primary opacity-60 text-kanit" id="Date">
          {formattedDate}
        </p>
        <p className="text-end" id="Description">
          {description}
        </p>
        <div className="flex gap-2 flex-wrap" id="Tags">
          {tagsArray.map((tag, i) => (
            <Tag
              title={tag}
              href={`/article?tags=${tag.toLowerCase().replaceAll(" ", "_")}`}
              key={i}
            />
          ))}
        </div>
      </a>
    </article>
  );
}
