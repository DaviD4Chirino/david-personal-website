import type { ClassAttributes, HTMLAttributes } from "react";
import { getGistFile } from "../../../../src/database";
import type { JSX } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { getRandomInArray } from "../../utils";
import type { AstroAssets } from "astro:assets";

const quotes = [
  "No war, Not here",
  "No rain, No clouds",
  "No final breaths, No senseless deaths",
  "See you space cowboy",
  "You're gonna carry that weight",
  "The head of the Basilisk",
  "With 30+ dead projects",
  "Expansión de dominio: arepa frita con queso",
  "Skill issue",
];

/**
 * @returns A random text fetched from the quotes gist
 */
export default function RandomQuote(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLParagraphElement> &
    HTMLAttributes<HTMLParagraphElement>
): JSX.Element {
  // const { data } = useQuery({
  //   queryKey: ["heroQuote"],
  //   queryFn: () =>
  //     getGistFile("quotes.json", "database").then((res) => {
  //       const content: string[] = JSON.parse(res?.content || "[]");
  //       return getRandomInArray(content);
  //     }),
  // });

  return (
    <p {...props} key={"data"}>
      {getRandomInArray(quotes)}
    </p>
  );
}
