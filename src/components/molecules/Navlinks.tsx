export default function Navlinks({
  li = true,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  li?: boolean;
  className?: string;
}) {
  if (li) {
    <li className={`${className ? className : ""} `}></li>;
  }
  return <></>;
}
