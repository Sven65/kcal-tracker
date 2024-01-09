import style from './style.module.css';
import Button from '../../components/Button'
import ProgressCircle from '../../components/ProgressCircle';
import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState(0)

	return (
		<main>
			<h1 class="text-3xl font-bold underline text-amber-300">
				Hello world!
			</h1>
			<ProgressCircle
				fillColorDark={'amber-300'}
				fillColor='amber-600'
				strokeColorDark={'amber-600'}
				size={96}
				text="Hello, World!"
				max={100}
				used={value}
			/>
			<Button id="increase" onClick={() => {setValue(value + 1)}}>
				Increase Value
			</Button>
		</main>
	);
}
