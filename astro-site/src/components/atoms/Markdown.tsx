import Parser, { type Components, type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import FigureImg from "../../../../src/components/molecules/FigureImg";
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
    const { children, node, href, ...rest } = props;
    const anchorLinkRegex = /#/g;
    const isAnchorLink = anchorLinkRegex.test(href || "");

    if (isAnchorLink) {
      return (
        <HashLink to={href || ""} {...rest}>
          {children}
        </HashLink>
      );
    }

    return (
      <a {...rest} href={href}>
        {children}
      </a>
    );
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