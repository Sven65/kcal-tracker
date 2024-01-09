import { h, FunctionComponent, ComponentChildren, Component } from "preact";

interface Props extends h.JSX.HTMLAttributes<HTMLButtonElement> {
	id?: string,
	children: ComponentChildren,
}

const Button: FunctionComponent<Props> = ({id, children, ...buttonProps}: Props) => (
	<button
		id={id}
		className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:ring-opacity-75"
		{...buttonProps}
	>
		{children}
	</button>
)

export default Button