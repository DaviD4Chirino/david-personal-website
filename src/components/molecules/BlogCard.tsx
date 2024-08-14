import {
  breakText,
  capitalize,
  cleanString,
  getRandomInArray,
  toKebabCase,
} from "../../utils";
import Tag from "../atoms/Tag";
import { Link } from "react-router-dom";
import Markdown from "../atoms/Markdown";

const borders = [
  "outline",
  "outline-dashed",
  "outline-dotted",
  "outline-double",
];

export type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string;
  compact?: boolean;
};

export default function BlogCard({
  title,
  date,
  description,
  category = "article",
  compact = false,
  tags,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleString("en", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  });

  const tagsArray: string[] = breakText(tags, ",");

  const compactStyle = "grid grid-cols-1 ";
  const normalStyle = "grid grid-rows-[auto_1fr_auto]  ";
  const randomBorder = getRandomInArray(borders);

  return (
    <article
      className={`p-3 no-underline rounded-xl transition-transform ${randomBorder} hover:rotate-2 motion-reduce:hover:rotate-0 bg-[white]`}
      id="BlogCard"
    >
      <Link
        to={`/blogs/article/${toKebabCase(title)}`}
        className={`
        ${compact ? compactStyle : normalStyle}
        gap-5
        no-underline
      `}
      >
        <div className="flex flex-wrap gap-3 justify-between w-full">
          <b className="hover:cursor-pointer  leading-5 no-underline [align-self:baseline]">
            <h5>{title}</h5>
          </b>
          <p
            className="text-sm text-right opacity-50 text-primary text-kanit"
            id="Date"
          >
            {formattedDate}
          </p>
        </div>
        {!compact && (
          <>
            <Markdown className="line-clamp-3" children={description} />

            <div className="flex overflow-x-auto gap-2 py-1 h-max" id="Tags">
              <Tag title={capitalize(cleanString(category))} variant="filled" />
              {tagsArray.map((tag, i) => tag && <Tag title={tag} key={i} />)}
            </div>
          </>
        )}
      </Link>
    </article>
  );
}
