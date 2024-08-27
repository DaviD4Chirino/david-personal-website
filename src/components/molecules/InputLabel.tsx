import { ForwardedRef, forwardRef } from "react";

const InputLabel = forwardRef(function (
  props: JSX.IntrinsicElements["input"] & { name: string; title: string },
  ref: ForwardedRef<HTMLInputElement>
) {
  const { name, title, className, ...rest } = props;
  return (
    <div
      className={`input-container grid grid-rows-[auto_auto] h-fit ${
        className ? className : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      <input name={name} {...rest} ref={ref} className="rounded-md px-2 py-1" />
    </div>
  );
});

export default InputLabel;
