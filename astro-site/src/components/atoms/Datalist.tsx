import React from "react";
import { v4 as uuid } from "uuid";
export default function Datalist({
  array,
  ...rest
}: JSX.IntrinsicElements["datalist"] & {
  array: any[];
}) {
  return (
    <datalist {...rest}>
      {array.map((element) => (
        <React.Fragment key={uuid()}>
          <option value={element} />
        </React.Fragment>
      ))}
    </datalist>
  );
}
