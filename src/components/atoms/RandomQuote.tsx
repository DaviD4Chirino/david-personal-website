import { ClassAttributes, HTMLAttributes } from "react";
import { getGistFile } from "../../database";
import { JSX } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { getRandomInArray } from "../../utils";

/**
 * @returns A random text fetched from the quotes gist
 */
export default function RandomQuote(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLParagraphElement> &
    HTMLAttributes<HTMLParagraphElement>
): JSX.Element {
  const { data } = useQuery({
    queryKey: ["heroQuote"],
    queryFn: () =>
      getGistFile("quotes.json", "database").then((res) => {
        const content: string[] = JSON.parse(res?.content || "[]");
        return getRandomInArray(content);
      }),
  });

  return (
    <p {...props} key={data}>
      {data}
    </p>
  );
}
