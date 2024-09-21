type ButtonLinkProps = {
	disabled?: boolean;
	color?: "primary" | "secondary" | "tertiary" | "grey";
	icon?: React.ReactNode;
};

type ButtonOrLinkProps<T> = T extends { href: string }
	? JSX.IntrinsicElements["a"] & ButtonLinkProps
	: JSX.IntrinsicElements["button"] & ButtonLinkProps;

// NOTE: I should not be constructing tailwindcss classes like this
const coloredInteractiveClasses = (color: string, disabled?: boolean) =>
	disabled
		? `bg-${color} text-${color}-lightest`
		: `bg-${color}-darkest text-${color}-lightest  hover:bg-${color}-dark active:bg-${color}-darkest`;

const schemes = {
	primary: {
		classes:
			"bg-primary-darkest text-primary-lightest  hover:bg-primary-dark active:bg-primary-darkest",
		disabled: "bg-primary text-primary-lightest",
	},
	secondary: {
		classes:
			"bg-secondary-darkest text-secondary-lightest  hover:bg-secondary-dark active:bg-secondary-darkest",
		disabled: "bg-secondary text-secondary-lightest",
	},
	tertiary: {
		classes:
			"bg-tertiary-darkest text-tertiary-lightest  hover:bg-tertiary-dark active:bg-tertiary-darkest",
		disabled: "bg-tertiary text-tertiary-lightest",
	},
	grey: {
		classes: "bg-grey-800 text-grey-200  hover:bg-grey-600 active:bg-grey-800",
		disabled: "bg-grey text-grey-200",
	},
};

const generalClasses: string = `
		px-3 py-2
		rounded
		cursor-pointer 
		disabled:cursor-not-allowed
		transition-colors
		grid grid-cols-[auto_auto] w-max h-max gap-1 align-items-center
		`;

export default function ButtonLink<T extends { href: string }>(
	props: ButtonOrLinkProps<T>,
) {
	const { href, children, color = "primary", disabled, icon, ...rest } = props;

	const theme: string = disabled
		? schemes[color].disabled
		: schemes[color].classes;

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

function IconContainer({ children }: JSX.IntrinsicElements["div"]) {
	return <div className="flex icon-container">{children}</div>;
}
