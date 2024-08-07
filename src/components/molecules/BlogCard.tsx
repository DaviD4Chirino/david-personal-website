import { breakText, capitalize, cleanString, toKebabCase } from "../../utils";
import Tag from "../atoms/Tag";
import { routes } from "../../staticData/pages.json";
import { Link } from "react-router-dom";

const borders = {
  article: "outline",
  project: "outline-dashed",
  personal: "outline-dotted",
  "game-development": "outline-double",
};

export type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  category: "article" | "project" | "personal" | "game-development";
  tags: string;
};

export default function BlogCard({
  title,
  date,
  description,
  category = "article",
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
      
      ${borders[category]}
     
      rounded-xl
      transition-transform
      hover:rotate-3
      p-3
      bg-[white]
      no-underline
  `}
      id="BlogCard"
    >
      <Link
        to={`${routes.blogs.path}/article/${toKebabCase(title)}`}
        className="
        grid grid-rows-[.1fr_.1fr_1fr_.2fr] gap-2
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
          <Tag
            title={capitalize(cleanString(category))}
            href={`${routes.blogs.path}?tags=${toKebabCase(
              cleanString(category)
            )}`}
            chipProps={{ variant: "filled" }}
          />
          {tagsArray.map((tag, i) => (
            <Tag
              title={tag}
              href={`${routes.blogs.path}?tags=${toKebabCase(tag)}`}
              key={i}
            />
          ))}
        </div>
      </Link>
    </article>
  );
}
