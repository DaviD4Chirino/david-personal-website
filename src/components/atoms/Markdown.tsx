import Parser, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import FigureImg from "./FigureImg";

export default function Markdown(props: Options) {
  const { remarkPlugins, ...rest } = props;
  return (
    <Parser
      remarkPlugins={remarkPlugins ? remarkPlugins : [remarkGfm]}
      components={{
        img(props) {
          const { alt, src } = props;
          return <FigureImg alt={alt || ""} src={src || ""} />;
        },
      }}
      {...rest}
    />
  );
}
