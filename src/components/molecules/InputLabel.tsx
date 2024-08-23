export default function InputLabel(
  props: JSX.IntrinsicElements["input"] & { name: string; title: string }
) {
  const { name, title, className, ...rest } = props;
  return (
    <div
      className={`input-container grid grid-rows-[auto_auto] h-fit ${
        className ? className : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      <input name={name} {...rest} className="rounded-md px-2 py-1" />
    </div>
  );
}
