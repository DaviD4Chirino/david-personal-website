import Parser, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown(props: Options) {
  return (
    <Parser
      remarkPlugins={props.remarkPlugins ? props.remarkPlugins : [remarkGfm]}
      {...props}
    />
  );
}
