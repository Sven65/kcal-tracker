import Button from '../../components/Button'
import ProgressCircle from '../../components/ProgressCircle';
import { useContext } from 'react';
import { TrackerContext } from '../../context/trackerContext';
import { useState } from 'react';
import KcalAddModal from '../../components/Modal/KcalAddModal';
import ItemTable from '../../components/ItemTable';


export default function Home() {
	const appContext = useContext(TrackerContext)

	const [usedKcal, setUsedKcal] = appContext.usedKcal

	const [lineItems, addLineItem, deleteLineItem] = appContext.lineItems

	const [modalOpen, setModalOpen] = useState(false)

	return (
		<main>
			<KcalAddModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={(name, value, save) => {
					console.log(name, value, save)
					setUsedKcal(usedKcal + value)
					addLineItem(name, value)
					setModalOpen(false)
				}}
			/>
			<ProgressCircle
				fillColorDark={'amber-300'}
				fillColor='amber-600'
				strokeColorDark={'amber-600'}
				size={96}
				text={`${usedKcal} / 2000`}
				textColor='amber-600'
				textColorDark='amber-600'
				max={2000}
				used={usedKcal}
			/>
			<Button id="add-item" onClick={() => {setModalOpen(true)}} textColor='amber-400' backgroundColor='emerald-700'>
				Add Item
			</Button>

			<ItemTable lineItems={lineItems} onDelete={deleteLineItem}/>
		</main>
	);
}
