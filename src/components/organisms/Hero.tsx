import { NavLink as Link } from "react-router-dom";
import { routes } from "../../staticData/pages.json";

export default function Hero() {
  const textClassNames: string =
    " text-7xl md:text-8xl leading-9 md:leading-[3rem]  text-stroke-[5px] text-stroke text-stroke-white text-stroke-outside ";
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
      text-xl
      "
      >
        <li>
          <Link to={routes.library}>Writer</Link>
        </li>
        <li>
          <Link to={routes.projects}>Developer</Link>
        </li>
        <li>
          <Link to={routes.blogs}>Yapper</Link>
        </li>
      </ul>
    </header>
  );
}
