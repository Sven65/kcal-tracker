import { LineItem } from "../../context/trackerContext"

interface Props {
	lineItems: LineItem[],
	onDelete?: (id: number) => void
}

const ItemTable = ({
	lineItems,
	onDelete = () => {},
}: Props) => {
	return (
		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							Date
						</th>
						<th scope="col" class="px-6 py-3">
							Name
						</th>
						<th scope="col" class="px-6 py-3">
							Kcal
						</th>
						<th scope="col" class="px-6 py-3">
							
						</th>
					</tr>
				</thead>
				<tbody>
					{lineItems.map(({date, id, value, name}) => (
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

							<td class="px-6 py-4">
								{date}
							</td>
							<td class="px-6 py-4">
								{name}
							</td>
							<td class="px-6 py-4">
								{value}
							</td>
							<td class="px-6 py-4">
								<button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => onDelete(id)}>
									<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
									</svg>
									<span class="sr-only">Delete item</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ItemTable
