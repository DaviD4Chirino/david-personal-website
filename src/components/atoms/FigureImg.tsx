import React, { DetailedHTMLProps } from "react";

interface FigureProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  src: string;
  alt: string;
  /** The caption of the figure, if not present it will use the alt */
  caption?: string;
  imgClassName?: string;
  props?: DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}

export default function FigureImg({
  src,
  alt,
  caption,
  imgClassName = "",
  ...props
}: FigureProps) {
  return (
    <figure
      {...props}
      className={`
   grid grid-rows-[1fr_auto] gap-2
   justify-center 
   
  ${props.className ? props.className : ""}
   `}
    >
      <img
        src={src}
        alt={alt}
        className={`
            p-3 mx-auto 
            w-max max-h-[80vh]
            rounded-xl shadow
            min-w-32 min-h-32
            bg-grey-100
            ${imgClassName}`}
        title={caption || alt}
      />
      <figcaption className="text-sm leading-3 text-center text-kanit-light text-grey-600">
        <a href={src}>{caption || alt}</a>
      </figcaption>
    </figure>
  );
}
