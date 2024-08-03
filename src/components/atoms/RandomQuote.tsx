import { ClassAttributes, HTMLAttributes, useState } from "react";
import { useMount } from "react-use";
import { getGistFile } from "../../database";
import { JSX } from "react/jsx-runtime";
/**
 * @returns A random text fetched from the quotes gist
 */
export default function RandomQuote(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLParagraphElement> &
    HTMLAttributes<HTMLParagraphElement>
): JSX.Element {
  const [quote, setQuote] = useState("");
  useMount(() => {
    getGistFile("quotes.json").then((res) => {
      const content: string[] = JSON.parse(res?.content || "[]");
      setQuote(content[Math.floor(Math.random() * content.length)]);
    });
  });
  return <p {...props}>{quote}</p>;
}
