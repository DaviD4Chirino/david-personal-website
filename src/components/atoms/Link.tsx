export default function Link(props: JSX.IntrinsicElements["a"]) {
  return (
    <a {...props} className="text-tertiary-dark bg-[red]">
      {props.children}
    </a>
  );
}
