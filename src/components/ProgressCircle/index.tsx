import type { TailwindTextColor } from '../../types/tailwind/colors'

import {TailwindSpacingLookup } from '../../types/tailwind/tailwind'
import {TailwindTextColors} from '../../types/tailwind/colors'

interface Props {
	size?: keyof typeof TailwindSpacingLookup,
	textColor?: TailwindTextColor,
	textColorDark?: TailwindTextColor,
	fillColor?: TailwindTextColor,
	fillColorDark?: TailwindTextColor,
	strokeColor?: TailwindTextColor,
	strokeColorDark?: TailwindTextColor,
	text?: string,
	max: number,
	used: number,
}

const ProgressCircle = (props: Props) => {
	const {
		size = 64,
		textColor = 'gray-800',
		textColorDark = 'white',
		fillColor = 'blue-600',
		fillColorDark = 'blue-500',
		strokeColor = 'gray-200',
		strokeColorDark = 'gray-700',
		text = 'sex',
		max,
		used,
	} = props
	
	let newSize = TailwindSpacingLookup[size]
	
	const circleSize = parseFloat(newSize.replace('px', '')) - 4;
	
	const percentage = 100 - ((used / max) * 100);


	return (
		<>
			<div class={`relative ${TailwindSpacingLookup[size]}`}>
				<svg class="" width={circleSize} height={circleSize} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<circle cx="18" cy="18" r="16" fill="none" class={`stroke-current ${TailwindTextColors[strokeColor]} dark:${TailwindTextColors[strokeColorDark]}`} stroke-width="2"></circle>
				<g class="origin-center -rotate-90 transform">
					<circle cx="18" cy="18" r="16" fill="none" class={`stroke-current ${TailwindTextColors[fillColor]} dark:${TailwindTextColors[fillColorDark]}`} stroke-width="2" stroke-dasharray="101" stroke-dashoffset={percentage}></circle>
				</g>
				</svg>
			<div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
				<span class={`text-center text-2xl font-bold ${TailwindTextColors[textColor]} dark:${TailwindTextColors[textColorDark]}`}>{text}</span>
			</div>
			</div>
		</>
	)
}

export default ProgressCircle

