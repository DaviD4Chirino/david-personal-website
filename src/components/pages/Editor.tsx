import MarkdownEditor from "@uiw/react-markdown-editor";

// TODO: Style this thing
// TODO: Build the article object
//TODO: Build the markdown file
// TODO: Find out how to update a gist from here
// ?: It may need another input taking the Github access token
export default function Editor() {
  return (
    <section className="container grid gap-16 my-10 ">
      <h1>Article Editor</h1>
      <form action="" id="ArticleEditor">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-3 gap-y-8">
          <InputLabel
            name="article-name"
            title="Name of the Article"
            placeholder="in-kebab-case"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-title"
            title="Title of the Article"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-description"
            title="Description"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-category"
            title="Category"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-tags"
            title="Tags"
            type="text"
            className="md:col-span-2"
          />
          <InputLabel
            name="article-date"
            title="Date"
            type="Date"
            className="md:col-span-2"
          />
          <MarkdownEditor className="col-span-full " height="500px" />
        </div>
      </form>
    </section>
  );
}

function InputLabel(
  props: JSX.IntrinsicElements["input"] & { name: string; title: string }
) {
  const { name, title, className, ...rest } = props;
  return (
    <div
      className={`input-container grid grid-rows-[auto_auto] h-fit ${
        className ? className : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      <input name={name} {...rest} />
    </div>
  );
}
