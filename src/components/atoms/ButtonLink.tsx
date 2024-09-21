type ButtonLinkProps = {
	disabled?: boolean;
	color?: "primary" | "secondary" | "tertiary" | "grey";
};

type ButtonOrLinkProps<T> = T extends { href: string }
	? JSX.IntrinsicElements["a"] & ButtonLinkProps
	: JSX.IntrinsicElements["button"] & ButtonLinkProps;

const coloredInteractiveClasses = (color: string, disabled?: boolean) =>
	disabled
		? `bg-${color} text-${color}-light`
		: `bg-${color}-darkest text-${color}-lightest hover:bg-${color}-dark active:bg-${color}-darkest`;

const generalClasses: string = `
				px-3 py-2
				rounded
				cursor-pointer 
				disabled:cursor-not-allowed
				transition-colors
		`;

export default function ButtonLink<T extends { href: string }>(
	props: ButtonOrLinkProps<T>,
) {
	const { href, children, color = "primary", disabled, ...rest } = props;

	const theme: string = coloredInteractiveClasses("secondary", disabled);
	console.log(theme);

	if (href) {
		if (disabled) {
			return (
				<div
					{...(rest as JSX.IntrinsicElements["div"])}
					className={`${generalClasses} ${theme} `}
					aria-disabled
				>
					{children}
				</div>
			);
		}
		return (
			<a href={href} {...rest} className={`${generalClasses} ${theme}`}>
				{children}
			</a>
		);
	}

	return (
		<button
			disabled={disabled}
			{...(rest as JSX.IntrinsicElements["button"])}
			className={`${generalClasses} ${theme}`}
		>
			{children}
		</button>
	);
}
