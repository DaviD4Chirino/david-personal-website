import React from "react";

export default function EditArticleButton(
  props: JSX.IntrinsicElements["button"] & { article: Article }
) {
  const { article, ...rest } = props;
  return (
    <button {...rest}>
      <b>{article.title}</b>
    </button>
  );
}
