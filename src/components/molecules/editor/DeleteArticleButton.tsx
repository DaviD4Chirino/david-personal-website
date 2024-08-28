import { MdCancel as CrossI } from "react-icons/md";
import ConsentModal from "../../organisms/ConsentModal";
import { deleteArticle, deleteDocument } from "../../../database/update";
import { useToast } from "../../../context/Toast/useToast";

export default function DeleteArticleButton(
  props: JSX.IntrinsicElements["button"] & {
    article: Article;
    apiKey: string;
  }
) {
  const toast = useToast();
  const { article, apiKey, ...rest } = props;

  function handleDeleteArticle() {
    // console.log("🚀 ~ deleteArticle ~ Not implemented");
    deleteArticle(article.name, apiKey)
      .then(() => toast.success(`Article ${article.name} deleted`))
      .catch((err) => toast.error(`Article Delete Error: ${err}`));

    deleteDocument(article.file, apiKey)
      .then(() => toast.success(`Document ${article.file} deleted`))
      .catch((err) => toast.error(`Document Delete Error: ${err}`));
  }

  return (
    <ConsentModal
      button={
        <p className="flex gap-2 place-items-center">
          <CrossI className="inline size-5" />
          Delete Article ?
        </p>
      }
      className={`
        flex gap-6
        bg-grey-900 text-grey-100 hover:bg-grey-800 
        w-fit rounded-none rounded-tl-xl rounded-tr-xl
        ${rest.className ? rest.className : ""}
    `}
      dialogProps={{
        size: "md",
        dismissible: true,
        position: "center",
      }}
      onAccept={handleDeleteArticle}
    >
      <p className="text-center">
        You will delete{" "}
        <b>
          <u>{article.title}</u>
        </b>
        , are you <b>sure</b>?
      </p>
    </ConsentModal>
  );
}
