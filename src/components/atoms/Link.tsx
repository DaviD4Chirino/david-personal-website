export default function Link({
	children,
	...props
}: JSX.IntrinsicElements["a"]) {
	return (
		<a {...props} target="_blank">
			{children}
		</a>
	);
}
