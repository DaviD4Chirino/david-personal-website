import React from "react";
import { JSX } from "react/jsx-runtime";

export default function SectionHeader(
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLElement> & {
      sectionTitle: string;
    }
) {
  const { sectionTitle, ...otherProps } = props;
  return (
    <section
      {...otherProps}
      className={`${props.className ? props.className : ""}
    
    grid gap-8
    h-max
    `}
    >
      <h3>{sectionTitle}</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {props.children}
      </div>
    </section>
  );
}
