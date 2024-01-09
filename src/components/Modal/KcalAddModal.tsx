import { useState } from "preact/hooks"
import Modal from "."

type OnSaveFunction = (name: string, value: number, save: boolean) => void

interface Props {
	open?: boolean,
	onClose?: () => void,
	onSave?: OnSaveFunction,
}


const KcalAddModal = ({
	open,
	onClose,
	onSave,
}: Props) => {
	const [name, setName] = useState('')
	const [value, setValue] = useState<number>()
	const [saveItem, setSaveItem] = useState(false)

	const saveForm = () => {
		if (!onSave) return

		onSave(name, value, saveItem)
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Add kcal"
		>
			<form class="space-y-4" action="#">
				<div>
					<label for="item-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
					<input
						type="text"
						name="item-name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="Energy Drink"
						value={name}
						// @ts-ignore
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label for="kcal-value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kcal Value</label>
					<input
						type="number"
						name="kcal-value"
						placeholder="47"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						value={value}
						// @ts-ignore
						onChange={(e) => setValue(parseInt(e.target.value, 10))}
						required
					/>
				</div>
				<div class="flex justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								type="checkbox"
								checked={saveItem}
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
								// @ts-ignore
								onChange={(e) => setSaveItem(e.target.checked)}
								required
							/>
						</div>
						<label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Save as favourite</label>
					</div>
				</div>
				<button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={saveForm}>Add item</button>
			</form>
		</Modal>
	)
}

export default KcalAddModal
