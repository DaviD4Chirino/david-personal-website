export default function ContinueReadingLink({
  title,
  articleSlug,
  right = false,
  prevOrNext = "Previously",
}: {
  title: string;
  articleSlug: string;
  right?: boolean;
  prevOrNext?: "Previously" | "Next";
}) {
  const rightClassNames: string = "text-right align-self-end";

  return (
    <a
      href={articleSlug}
      className="grid grid-rows-[auto_auto] h-max no-underline group leading-6 "
      id={`ContinueReading-${right ? "Right" : "Left"}`}
    >
      <p
        className={`text-md text-grey-600
        ${right ? rightClassNames : ""}`}
      >
        {prevOrNext}
      </p>
      <h5
        className={`underline group-hover:no-underline leading-5 ${
          right ? rightClassNames : ""
        }`}
      >
        {title}
      </h5>
    </a>
  );
}
