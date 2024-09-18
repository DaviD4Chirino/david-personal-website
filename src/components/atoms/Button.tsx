export default function Button(
  props: JSX.IntrinsicElements["button"] & { href?: string }
) {
  const { href, ...rest } = props;

  return <button {...rest}>{props.children}</button>;
}
