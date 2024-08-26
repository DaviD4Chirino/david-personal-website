import { MdCancel as CrossI } from "react-icons/md";

export default function DeleteArticleButton(
  props: JSX.IntrinsicElements["button"] & {
    article: Article;
  }
) {
  const { article, ...rest } = props;
  return (
    <button
      {...rest}
      title={`Delete ${article.title}?`}
      className={`
        flex gap-1
        bg-grey-900 text-grey-100
        w-fit
        align-middle
        py-3 px-5
        rounded-tr-lg rounded-tl-lg
        leading-[20px]

        ${rest.className ? rest.className : ""}
    `}
    >
      <CrossI className="inline size-4" />
      <p>Delete Article ?</p>
    </button>
  );
}
