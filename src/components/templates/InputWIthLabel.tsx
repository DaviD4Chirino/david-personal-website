import React from "react";

export default function LabelFormElement(
  props: JSX.IntrinsicElements["div"] & {
    name: string;
    title: string;
    children: React.ReactNode;
  }
) {
  const { name, title, children, ...divProps } = props;
  return (
    <div {...divProps} className="grid h-max ">
      <label htmlFor={name}>{title}</label>
      {children}
    </div>
  );
}
