import React, { DetailedHTMLProps } from "react";

interface FigureProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  src: string;
  alt: string;
  /** The caption of the figure, if not present it will use the alt */
  caption?: string;
  props?: DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}

export default function FigureImg({
  src,
  alt,
  caption,
  ...props
}: FigureProps) {
  return (
    <figure {...props} className="outline outline-2">
      <img src={src} alt={alt} />
      <figcaption className="text-kanit">{caption || alt}</figcaption>
    </figure>
  );
}
