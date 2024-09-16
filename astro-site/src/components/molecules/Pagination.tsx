import ButtonLink from "../atoms/ButtonLink";

interface Props {
  pageData: PageUrl;
}
const WORD_REGEX: RegExp = /([a-zA-Z\/]+)/gm;

export default function Pagination({ pageData }: Props) {
  const { next, prev, last, current } = pageData;

  const currentIndex: string = current.replace(WORD_REGEX, "")
    ? current.replace(WORD_REGEX, "")
    : "1";
  const lastIndex: string = last?.replace(WORD_REGEX, "")
    ? last?.replace(WORD_REGEX, "")
    : currentIndex;
  return (
    <nav id="Pagination" className="">
      <ul
        className="grid grid-cols-[auto_1fr_auto] gap-2
  place-items-center text-center
  h-max"
      >
        {prev ? (
          <li id="PreviousPage">
            <ButtonLink href={prev}>Prev</ButtonLink>
          </li>
        ) : (
          <div className="min-w-[6ch]" />
        )}
        <li id="PageInfo">
          <b>{currentIndex}</b> of {lastIndex}
        </li>
        {next ? (
          <li id="NextPage">
            <ButtonLink href={next}>Next</ButtonLink>
          </li>
        ) : (
          <div className="min-w-[6ch]" />
        )}
      </ul>
    </nav>
  );
}
