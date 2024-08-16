import { NavLink as Link } from "react-router-dom";
import { routes } from "../../staticData/pages.json";
import RandomQuote from "../atoms/RandomQuote";

export default function Hero() {
  const textClassNames: string =
    " text-[3.8rem] md:text-[6rem] leading-8 md:leading-[3rem]  text-stroke-[5px] text-stroke text-stroke-white text-stroke-outside  ";
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
      <div className="w-full opacity-60 bg-pattern-noisy"></div>
      <div className="grid relative grid-rows-2 w-full max-w-56 md:max-w-md">
        <h1 className={textClassNames + "text-left"}>David</h1>
        <h1 className={textClassNames + "text-right "}>Space</h1>
        <RandomQuote
          className="
        absolute top-[140%] md:top-36 right-0 
        text-xs text-right animate-fade
        "
          key={`${new Date().getMilliseconds}`}
        />
      </div>
      <ul className="flex gap-2 place-content-center w-full text-xl">
        <li>
          Writer
          {/* <Link to={routes.library} aria-disabled>
            Writer
          </Link> */}
        </li>
        <li>
          Developer
          {/* <Link to={routes.projects} aria-disabled>
            Developer
          </Link> */}
        </li>
        <li>
          <Link to={routes.blogs.path}>Yapper</Link>
        </li>
      </ul>
    </header>
  );
}
