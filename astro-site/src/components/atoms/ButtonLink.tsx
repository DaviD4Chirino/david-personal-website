export default function ButtonLink(
  props: JSX.IntrinsicElements["a"] & { disabled?: boolean }
) {
  const { disabled, ...rest } = props;

  const sharedClasses: string = "px-3 py-2 rounded";

  if (disabled) {
    return (
      <span
        className={`bg-tertiary-lightest text-tertiary-light cursor-not-allowed h-min w-min ${sharedClasses}`}
      >
        {props.children}
      </span>
    );
  }

  return (
    <a
      {...rest}
      className={`
    text-tertiary-lightest
    bg-tertiary-dark
    
    no-underline
    hover:bg-tertiary hover:shadow-lg
    transition-colors
  ${sharedClasses}
    `}
    >
      {props.children}
    </a>
  );
}
