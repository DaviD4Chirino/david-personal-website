import RandomQuote from "./RandomQuote";
import routes from "../../routes.json";
import { FaArrowDown as ArrowI } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Hero() {
	const [ready, setReady] = useState(false);
	const textClassNames: string =
		" text-[3.8rem] md:text-[6rem] leading-8 md:leading-[3rem]  text-stroke-[5px] text-stroke text-stroke-outside text-grey-900 ";

	useEffect(() => {
		setReady(true);

		return () => {};
	}, []);

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
			<div className="w-full opacity-30 bg-pattern-noisy"></div>
			<div className="grid relative grid-rows-2 w-full max-w-56 md:max-w-md">
				<h1 className={textClassNames + "text-left"}>David</h1>
				<h1 className={textClassNames + "text-right "}>Space</h1>
				{ready && (
					<RandomQuote
						className="
						absolute top-[140%] md:top-36 right-0 
						text-xs text-right animate-fade animate-delay-[1s]
					"
					/>
				)}
			</div>
			<ul className="flex gap-2 place-content-center w-full text-xl">
				<li className="text-grey-600">
					Writer
					{/* <Link to={routes.library} aria-disabled>
            Writer
          </Link> */}
				</li>
				<li className="text-grey-600">
					Developer
					{/* <Link to={routes.projects} aria-disabled>
            Developer
          </Link> */}
				</li>
				<li>
					<a
						href={routes.blogs}
						className="text-grey-900 skip-css hover:underline active:no-underline"
					>
						Yapper
					</a>
				</li>
			</ul>
			{ready && (
				<span
					className="
					absolute
					bottom-5 right-5
					animate-fade animate-duration-[400ms] animate-delay-[4s]
				"
				>
					<ArrowI
						className="
						size-16
						text-secondary-dark
						animate-bounce animate-infinite animate-duration-[600ms] 
					"
					/>
				</span>
			)}
		</header>
	);
}
