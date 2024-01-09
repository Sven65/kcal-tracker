import { h, FunctionComponent, ComponentChildren } from "preact";
import { TailwindBackgroundColor, TailwindBackgroundColors, TailwindTextColor, TailwindTextColors } from "../../types/tailwind/colors";

interface Props extends h.JSX.HTMLAttributes<HTMLButtonElement> {
	id?: string,
	children: ComponentChildren,
	backgroundColor?: TailwindBackgroundColor,
	textColor?: TailwindTextColor,
}

const Button: FunctionComponent<Props> = ({
	id,
	children,
	backgroundColor,
	textColor,
	...buttonProps
}: Props) => (
	<button
		id={id}
		className={`py-2 px-4 ${TailwindBackgroundColors[backgroundColor]} ${TailwindTextColors[textColor]} font-semibold rounded-lg shadow-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:ring-opacity-75`}
		{...buttonProps}
	>
		{children}
	</button>
)

export default Button