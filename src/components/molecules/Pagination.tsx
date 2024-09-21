import ButtonLink from "../atoms/ButtonLink";

interface Props {
	pageData: PageUrl;
	/**
	 * If it has 1 of 1 page to show, it means both buttons are disabled and are useless, if you want, you can hide the pagination all together or just the buttons (or none)
	 */
	hideOnSinglePage?: "hide" | "hide-buttons";
}
const WORD_REGEX: RegExp = /([a-zA-Z\/]+)/gm;

export default function Pagination({ pageData, hideOnSinglePage }: Props) {
	const { next, prev, last, current } = pageData;

	const currentIndex: string = current.replace(WORD_REGEX, "")
		? current.replace(WORD_REGEX, "")
		: "1";
	const lastIndex: string = last?.replace(WORD_REGEX, "")
		? last?.replace(WORD_REGEX, "")
		: currentIndex;

	const isSinglePage: boolean = currentIndex == "1" && lastIndex == "1";

	if (hideOnSinglePage === "hide" && isSinglePage) {
		return <></>;
	}

	const hideButtons: boolean =
		hideOnSinglePage === "hide-buttons" && isSinglePage;

	return (
		<nav id="Pagination" className="">
			<ul
				className="grid grid-cols-[auto_1fr_auto] gap-2
							place-items-center text-center
							h-max"
			>
				{hideButtons ? (
					<div></div>
				) : (
					<li id="PreviousPage">
						<ButtonLink disabled={prev === undefined} href={prev}>
							Prev
						</ButtonLink>
					</li>
				)}
				<li id="PageInfo">
					<b>{currentIndex}</b> of {lastIndex}
				</li>
				{hideButtons ? (
					<div></div>
				) : (
					<li id="NextPage">
						<ButtonLink disabled={next === undefined} href={next}>
							Next
						</ButtonLink>
					</li>
				)}
			</ul>
		</nav>
	);
}
