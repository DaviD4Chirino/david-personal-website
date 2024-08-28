import { Label, TextInput, TextInputProps } from "flowbite-react";
import { ForwardedRef, forwardRef } from "react";

export type InputLabelProps = TextInputProps & { name: string; title: string };

const InputLabel = forwardRef(function (
  props: InputLabelProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { name, title, className, ...rest } = props;
  return (
    <div
      className={`input-container grid grid-rows-[auto_auto] gap-y-1  h-fit`}
    >
      <Label htmlFor={name}>{title}</Label>
      <TextInput
        {...rest}
        sizing="sm"
        name={name}
        ref={ref}
        // className="bg-text"
      />
    </div>
  );
});

export default InputLabel;
