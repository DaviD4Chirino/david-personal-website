import type { ClassAttributes, HTMLAttributes } from "react";
import { getRandomInArray } from "../../utils";

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

const quote: string = getRandomInArray(quotes);

/**
 * @returns A random text fetched from the quotes gist
 */
export default function RandomQuote(
	props: JSX.IntrinsicElements["p"],
): React.ReactNode {
	return <p {...props}>{quote}</p>;
}
