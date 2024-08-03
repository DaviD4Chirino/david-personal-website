import React from "react";

const textClassNames: string =
  " text-7xl md:text-8xl leading-9 md:leading-[3rem]  text-stroke-[5px] text-stroke text-stroke-secondary text-stroke-outside ";

export default function Hero() {
  return (
    <header
      className="
      isolate
    bg-secondary h-screen w-full
    grid grid-rows-[1fr_.05fr]
    place-items-center 
    p-3
    relative
    "
    >
      <div className="w-full bg-pattern-noisy opacity-60"></div>
      <div
        className="
      grid grid-rows-2  
      w-full
      max-w-56
      md:max-w-md
      
      "
      >
        <h1 className={textClassNames + "text-left"}>David</h1>
        <h1 className={textClassNames + "text-right "}>Space</h1>
      </div>
      <ul
        className="
      w-full
      flex gap-2 
      place-content-center
      "
      >
        {/* 
				TODO: Turn this into its own Molecule, also each link should be an Atom */}
        <li>
          <a href="">Writer</a>
        </li>
        <li>
          <a href="">Writer</a>
        </li>
        <li>
          <a href="">Writer</a>
        </li>
        <li>
          <a href="">Writer</a>
        </li>
        <li>
          <a href="">Writer</a>
        </li>
      </ul>
    </header>
  );
}
