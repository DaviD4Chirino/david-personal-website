import Parser, { Components, Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import FigureImg from "./FigureImg";
import { isValidElement } from "react";
import { HashLink } from "react-router-hash-link";
const components: Partial<Components> = {
  p(props) {
    const { children } = props;

    if (isValidElement(children)) {
      return <>{children}</>;
    }

    return <p>{children}</p>;
  },
  img(props) {
    const { alt, src } = props;
    return <FigureImg alt={alt || ""} src={src || ""} />;
  },
  a(props) {
    const { children, node, ...rest } = props;
    const anchorLinkRegex = /#/g;
    const isAnchorLink = anchorLinkRegex.test(rest.href || "");

    console.log(isAnchorLink);
    if (isAnchorLink) {
      return <HashLink></HashLink>;
    }

    return <a {...rest}>{children}</a>;
  },
};

export default function Markdown(props: Options) {
  const { remarkPlugins, ...rest } = props;
  return (
    <Parser
      remarkPlugins={remarkPlugins ? remarkPlugins : [remarkGfm]}
      components={components}
      {...rest}
    />
  );
}
