import React from "react";

export default function LabelInput(
  props: JSX.IntrinsicElements["div"] & {
    name: string;
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }
) {
  const { name, title, children, icon, ...divProps } = props;
  return (
    <div {...divProps} className="grid h-max ">
      <label htmlFor={name} className="flex gap-1 place-items-center">
        {title}
        {icon}
      </label>
      {children}
    </div>
  );
}
