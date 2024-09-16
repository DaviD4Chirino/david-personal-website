import React from "react";

export default function Select(props: JSX.IntrinsicElements["select"]) {
  const { children, ...rest } = props;
  return (
    <select {...rest} className="p-2 rounded transition-all bg-grey-100">
      {children}
    </select>
  );
}
