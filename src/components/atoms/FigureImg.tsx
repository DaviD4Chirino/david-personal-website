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
      <a href={src}>
        <img
          src={src}
          alt={alt}
          className={`
							mx-auto 
							shadow-lg
							w-max
							p-5
							rounded-xl
							${imgClassName}
						`}
          title={caption || alt}
        />
      </a>
      <figcaption className=" text-kanit-light text-sm leading-3 opacity-50 ">
        {caption || alt}
      </figcaption>
    </figure>
  );
}
