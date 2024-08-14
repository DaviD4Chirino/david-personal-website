import { Link } from "react-router-dom";
import { toKebabCase } from "../../utils";

export default function ContinueReadingLink({
  article,
  right = false,
  title = "Previously",
}: {
  article: Article;
  right?: boolean;
  title?: "Previously" | "Next";
}) {
  const rightClassNames: string = "text-right";

  return (
    <Link
      to={`/blogs/article/${toKebabCase(article.title)}`}
      onClick={() => window.location.reload()}
      className="grid grid-rows-[auto_auto] h-max no-underline group gap-2"
      id={`ContinueReading-${right ? "Right" : "Left"}`}
    >
      <p className={`${right ? rightClassNames : ""}`}>{title}</p>
      <h5
        className={`underline group-hover:no-underline ${
          right ? rightClassNames : ""}`}
      >
        {article.title}
      </h5>
    </Link>
  );
}
