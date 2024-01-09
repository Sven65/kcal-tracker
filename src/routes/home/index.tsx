import Button from '../../components/Button'
import ProgressCircle from '../../components/ProgressCircle';
import { useContext } from 'react';
import { TrackerContext } from '../../context/trackerContext';


export default function Home() {
	const appContext = useContext(TrackerContext)

	const [usedKcal, setUsedKcal] = appContext.usedKcal

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
				text={`${usedKcal} / 100`}
				max={100}
				used={usedKcal}
			/>
			<Button id="increase" onClick={() => {setUsedKcal(usedKcal + 1)}} textColor='amber-400' backgroundColor='emerald-700'>
				Increase Value
			</Button>
			<Button id="decrease" onClick={() => {setUsedKcal(usedKcal - 1)}} textColor='amber-400' backgroundColor='emerald-700'>
				Decrease Value
			</Button>
		</main>
	);
}
